const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util');

const solcutil = require('./solc-util');
const SolcUtil = new solcutil();

const Logger = require('../logging/logger');

class Compiler {
  
  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
  }


  //solc input object --> Compiled stuff
  compile(solcInput) {

    this.log.print(Logger.state.SUPER, 
      util.inspect(solcInput),
      "\n"
    );

    this.log.print(Logger.state.NORMAL, "Compiling...\n");
    const output = JSON.parse(solc.compile(JSON.stringify(solcInput))); 
    //Logic on what to show post-compilation (regarding the output post-compilation)
    if(this.log.setting >= Logger.state.SUPER) {
      this.log.print(Logger.state.SUPER,
        "OUTPUT",
        util.inspect(output, { depth: null })
      );
    } else if(output.errors) {
      this.log.print(Logger.state.NORMAL,
        "Error: ",
        util.inspect(output, { depth: null })
      );
      throw "Failed to compile!";
    }
    return output;
  }

  compileDirectory(root = path.resolve(__dirname, '../contracts')) {

    this.log.print(Logger.state.MASTER, 
      "Config: ",
      "  Root contract directory: " + root,
      "\n"
    );
    this.log.print(Logger.state.NORMAL, "Generating solc_input...\n");
    return this.compile(SolcUtil.generateSolcInputDirectory(root));
  }


  compileFile(filepath, root = path.resolve(__dirname, '../contracts')) {

    this.log.print(Logger.state.MASTER, 
      "Config: ",
      "  Root contract directory: " + root,
      "\n"
    );

    this.log.print(Logger.state.NORMAL, "Generating solc_input...\n");
    return this.compile(SolcUtil.generateSolcInputFile(filepath, root));

  }

  compileSource(base, src) {
    return this.compile(SolcUtil.generateSolcInput(base, src));
  }

  //Not working... :/ Uncertain how to handle this sort of callback stuff synchronously
  async getPackageVersion(module) {
    //Assume package-lock.json exists, by default
    let packageJSON = "../package-lock.json";
  /*  if(fs.access(packageJSON, fs.constants.F_OK)){
      packageJSON = "../package.json";
      if(fs.access(packageJSON, fs.constants.F_OK)){
        throw "Neither package.json or package-lock.json exists";
      }
    }*/

    fs.access(packageJSON, fs.constants.F_OK, (err) => {
      if(err) {
        packageJSON = "../package.json";
        fs.access(packageJSON, fs.constants.F_OK, (err2) => {
          if(err2) {
            throw "Neither package.json or package-lock.json exists\n" + err + "\n" + err2;
          } else {
            const packages = require(packageJSON);
            return packages.dependencies[module];
          }
        });
      } else {
        const packages = require(packageJSON);
        console.log(packages.dependencies)
        return packages.dependencies[module];
      }
    });

  }


}

module.exports = Compiler;
