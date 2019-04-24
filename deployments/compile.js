const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util')

const solcutil = require('./solc_util');
const SolcUtil = new solcutil();

function compile(root = path.resolve(__dirname, '../contracts'), verbose = true) {

  /*if(verbose) {*/ console.log("Config: "); //}
  /*if(verbose) {*/ console.log("  Root contract directory: " + root); //}
  /*if(verbose) {*/ console.log("\n") //}

  console.log("Generating solc_input...\n");
  const generatedInput = SolcUtil.generateSolcInput(root);
  if(verbose) { console.log(util.inspect(generatedInput)); }
  if(verbose) { console.log("\n") }

  console.log("Compiling...\n");
  const output = solc.compile(JSON.stringify(generatedInput));
  if(verbose) { console.log("OUTPUT: "); console.log(util.inspect(JSON.parse(output), { depth: null })); }

  return output;

}

module.exports = compile;
