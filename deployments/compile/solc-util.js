const path = require('path');
const fs = require('fs');
const solc = require('solc');
const ora = require('ora');

const Logger = require('../logging/logger');

class SolcUtil {

  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
  }

  //This needs to be improved by using some sort of "node.js path equivalent"
  toSolcFilename(filepath, root) {
    let index = filepath.indexOf(root);
    if(index === -1) {
      throw "Error - no main contract directory found within filepath";
    }
    return filepath.substring(index + root.length + 1);
  }

  findSolInDir(root) {
    return this.findExtInDir(root, ".sol");
  }

  findExtInDir(root, ext) {
    let condition = (filename) => {
      return (filename.slice(ext.length * -1) === ext);
    } 
    return this.findFilesInDir(root, condition);
  }


  //Takes a root filepath, and a condition function
  //Condition function is expected to take a filename and return a bool; i.e., something like:
  // public bool isSol(filename){} (pseudo-code syntax)

  findFilesInDir(root, condition){
    var results = [];

    if(!fs.existsSync(root)){
      console.log("No directory found", root);
      return;
    }

    var files = fs.readdirSync(root);

    for(var i = 0; i < files.length; i++){
      var filename = path.join(root, files[i]);
      var stat = fs.lstatSync(filename);

      if(stat.isDirectory()){
        results = results.concat(this.findFilesInDir(filename, condition)); //recurse
      } else if(condition(filename)) {
  //    console.log('-- found: ', filename);
        results.push(filename);
      }
    }
    return results;
  }

  //Generate input object, assuming Solidity as language, from filepath of sources
  generateSolcInputDirectory(root) {
    const spinner = ora('Generating solc input from directory ' + root + '...');
    let input = { language: 'Solidity', sources: {}, settings: { outputSelection: { '*': { '*': [ '*' ] } } } };
    //By default, we will print all output, therefore, we directly stick the output settings above ^^^

    //parse through all the paths
    let files = this.findSolInDir(root);

    //For each .sol file found,
    //  (Grab contents of contract)
    //  (Grab base filename, which should end in .sol)
    //  Find contract name (assume we only have 1 potential contract name to parse) 
    //Finally, define input.sources.[name of contract] = {contents: [contentsofcontract]}
    for(var i = 0; i < files.length; i++) {
      let base = this.toSolcFilename(files[i], root);
      //Skipping over the Migrations.sol by Truffle... (TODO: Should we do this?)
      if(base !== "Migrations.sol") {
        let src = fs.readFileSync(files[i], 'utf8');
        input.sources[base] = { content: src };
        this.log.print(Logger.state.SUPER, "PROCESSED CONTRACT: " + base);
      }
    }
    spinner.succeed();
    return input;  

  }

  //Generate input object, assuming Solidity as language, from singular contract
  generateSolcInputFile(filepath, root) {
    let base = this.toSolcFilename(filepath, root);
    let src = fs.readFileSync(filepath, 'utf8');
    return this.generateSolcInputSinglePure(base, src);  
  }

  //Generate input object, assuming Solidity as language, from singular contract
  //base simply for compiling (e.g. Meme.sol) (make this automatic in the future)
  generateSolcInput(base, src) {
    
    const spinner = ora('Generating solc input for ' + base + '...').start();
    let input = { language: 'Solidity', sources: {}, settings: { outputSelection: { '*': { '*': [ '*' ] } } } };
    //By default, we will print all output, therefore, we directly stick the output settings above ^^^

    input.sources[base] = { content: src };
    this.log.print(Logger.state.NORMAL, "PROCESSED CONTRACT: " + base);
    spinner.succeed();

    return input;  
  }



}

module.exports = SolcUtil;
