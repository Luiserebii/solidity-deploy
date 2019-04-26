const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util')

const solcutil = require('./solc_util');
const SolcUtil = new solcutil();

async function compile(root = path.resolve(__dirname, '../contracts'), verbose = true, superverbose = false) {

  /*if(verbose) {*/ console.log("Config: "); //}
  /*if(verbose) {*/ console.log("  Root contract directory: " + root); //}
  /*if(verbose) {*/ console.log("\n") //}

  console.log("Generating solc_input...\n");
  const generatedInput = SolcUtil.generateSolcInput(root);
  if(verbose) { console.log(util.inspect(generatedInput)); }
  if(verbose) { console.log("\n") }

  console.log("Compiling...\n");
  const output = JSON.parse(solc.compile(JSON.stringify(generatedInput))); 
  console.log(output);
  //Logic on what to show post-compilation (regarding the output post-compilation)
  if(superverbose) { 
    console.log("OUTPUT"); 
    console.log(util.inspect(output, { depth: null }));
  } else if(output.errors) {
    console.log("Error: "); 
    console.log(util.inspect(output, { depth: null }));
    throw "solc " + await getPackageVersion("solc");
  }
  
  return output;

}

async function getPackageVersion(module) {
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
      return packages.dependencies[module];
    }
  });
}


module.exports = compile;
