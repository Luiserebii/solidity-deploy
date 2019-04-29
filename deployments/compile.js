const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util');

const solcutil = require('./solc_util');
const SolcUtil = new solcutil();

const Logger = require('./logging/logger');

class Compiler {
  
  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
  }


  compile(root = path.resolve(__dirname, '../contracts')) {

    //Idea; make log.printM take multiple string params, and print them individually (done for syntactical sugar and all)
    this.log.print(Logger.state.MASTER, 
      "Config: ",
      "  Root contract directory: " + root,
      "\n"
    );
    this.log.print(Logger.state.NORMAL, "Generating solc_input...\n");

    const generatedInput = SolcUtil.generateSolcInput(root);
    this.log.print(Logger.state.SUPER, 
      util.inspect(generatedInput),
      "\n"
    );

    this.log.print(Logger.state.NORMAL, "Compiling...\n");
    const output = JSON.parse(solc.compile(JSON.stringify(generatedInput))); 
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

  compileSingle(filepath, root = path.resolve(__dirname, '../contracts')) {

    this.log.print(Logger.state.MASTER, 
      "Config: ",
      "  Root contract directory: " + root,
      "\n"
    );

    this.log.print(Logger.state.NORMAL, "Generating solc_input...\n");
    const generatedInput = SolcUtil.generateSolcInputSingle(filepath, root);
    this.log.print(Logger.state.SUPER, 
      util.inspect(generatedInput),
      "\n"
    );

    this.log.print(Logger.state.NORMAL, "Compiling...\n");
    const output = JSON.parse(solc.compile(JSON.stringify(generatedInput))); 
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

  compileSinglePure(base, src, verbose = true, superverbose = false) {

    console.log("Generating solc_input...\n");
    const generatedInput = SolcUtil.generateSolcInputSinglePure(base, src);
    if(verbose) { console.log(util.inspect(generatedInput)); }
    if(verbose) { console.log("\n") }

    console.log("Compiling...\n");
    const output = JSON.parse(solc.compile(JSON.stringify(generatedInput))); 
    //Logic on what to show post-compilation (regarding the output post-compilation)
    if(superverbose) { 
      console.log("OUTPUT"); 
      console.log(util.inspect(output, { depth: null }));
    } else if(output.errors) {
      console.log("Error: "); 
      console.log(util.inspect(output, { depth: null }));
      throw "Failed to compile!";
    }
    return output;
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
