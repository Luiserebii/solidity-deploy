const path = require('path');
const fs = require('fs');
const solc = require('solc');
const ora = require('ora');

const Logger = require('../logging/logger');

/** Utility class to hold solc-related operations. */
class SolcUtil {

  /**
   * Initialize a SolcUtil instance.
   * @param {Logger.state.ENUM} logSetting - Log setting, as represented by the Logger state enum.
   */
  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
  }

  /**
   * Converts an absolute regular .sol filepath into one to be input to the compiler. 
   * Essentially returns a kind of "relative filepath" removing the root from the .sol filepath passed.
   * 
   * @param {string} filepath - String of the filepath to convert to a solc filename. (e.g. "/home/luiserebii/github/solidity-math/Calculator.sol")
   * @param {string} root - String of the root to utilize in conversion of the solc filename.
   * @return {string} solcFilename
   */
  //This needs to be improved by using some sort of "node.js path equivalent"
  toSolcFilename(filepath, root) {
    let index = filepath.indexOf(root);
    if(index === -1) {
      throw "Error - no main contract directory found within filepath";
    }
    return filepath.substring(index + root.length + 1);
  }

  /**
   * Recursively looks for files with the .sol extension within the root filepath passed.
   * 
   * @param {string} root - Root filepath to search within
   * 
   * @return {string[]} results - String array of all filenames ending in ".sol", as absolute filepaths.
   */
  findSolInDir(root) {
    return this.findExtInDir(root, ".sol");
  }

  /**
   * Recursively looks for files within a given root filepath passed of a particular extension (e.g. .sol).
   * 
   * @param {string} root - Root filepath to search within
   * @param {string} ext - File extension
   * 
   * @return {string[]} results - String array of all filenames which satisfied the constraints, as absolute filepaths.
   */  
  findExtInDir(root, ext) {
    let condition = (filename) => {
      return (filename.slice(ext.length * -1) === ext);
    } 
    return this.findFilesInDir(root, condition);
  }


  /**
   * Recursively looks for files within a given root filepath passed, using the "condition" function passed in to determine whether to include it in the results.
   * 
   * @param {string} root - Root filepath to search within
   * @param {Function} condition - A function whose return value dictates whether or not a file is included in the results. The general format of the input function is: 
   *
   * function(filename){ return isValid; }
   * or
   * (filename) => return isValid;
   * 
   * @return {string[]} results - String array of all filenames which satisfied the constraints, as absolute filepaths.
   */
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

  /**
   * Generate input object, assuming Solidity as language, from root filepath of sources. This function will search for all .sol files in the root directory, and attach them to the solc input as specified in the solc documentation.
   *
   * @param {string} root - Root filepath to search within
   * @return {JSON} input - solc input including all .sol files found.
   * 
   */
  generateSolcInputDirectory(root) {
    const spinner = ora('Generating solc input from directory ' + root).start().clear();
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

  /**
   * Generate input object, assuming Solidity as language, a singular .sol file. 
   *
   * @param {string} filepath - .sol filepath
   * @param {string} root - String of the root to utilize in conversion of the solc filename. For more information, see the function "toSolcFilename".
   *
   * @return {JSON} input - solc input generated.
   * 
   */ 
  generateSolcInputFile(filepath, root) {
    let base = this.toSolcFilename(filepath, root);
    let src = fs.readFileSync(filepath, 'utf8');
    return this.generateSolcInputSinglePure(base, src);  
  }

  /**
   * Generate input object, assuming Solidity as language, a raw contract source file (singular contract) as a string.
   *
   * @param {string} base - "base" is the "solc filename" we use in generating the solcInput; needs a better name, essentially think of it as the output of toSolcFilename() (function above).
   * @param {string} src - Raw Solidity source code.
   *
   * @return {JSON} input - solc input generated.
   * 
   */  
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
