/////////////////////////////////////////////////////

//DEPLOYMENT:

const Compiler = require('./compile/compiler');
const compiler = new Compiler();
const Deployer = require('./deploy/deployer');
const Logger = require('./logging/logger')
const defaultConfig = require('./config/default-config');
const Flattener = require('./compile/flattener');
const flattener = new Flattener(Logger.state.MASTER);
const inquirer = require('inquirer');

const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const util = require('util');

const config = require('./config/deploy-config');
console.log(config);

const minimist = require('minimist');
const args = minimist(process.argv.slice(2));



const provider = new HDWalletProvider(
   config.mnemonic, 
   `https://rinkeby.infura.io/v3/${config.infuraKey}`,
   0,
   10
);
const web3 = new Web3(provider);
const Stage = {
  CALCULATOR: 1,
  NUMBER: 2,
  NUMBERBASIC: 3
}

//===========|MAIN|============//
run();
//=============================//


async function run() {
  const compiled = config.root ? compiler.compileDirectory(config.root) : compiler.compileDirectory(defaultConfig.root);
  const deployer = await Deployer.build(web3, compiled);

  const stage = args['stage'];

  switch(stage) {
    case Stage.CALCULATOR:
      await deployer.deploy("Calculator");

      break;
    case Stage.NUMBER:

      const compiledNumber = await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);
      const numberDeployer = await Deployer.build(web3, compiledNumber);
      await numberDeployer.deploy("Number");

      break;
    case Stage.NUMBERBASIC:
      const compiledNumberBasic = await flattener.flattenAndCompile('../contracts/main-contracts/NumberBasic.sol', true);
      const numberBasicDeployer = await Deployer.build(web3, compiledNumberBasic);
      await numberBasicDeployer.deploy("NumberBasic", [5]);
      break;

  }

}

async function promptExistence(name, x) {
  console.log("Prompting existence...")
  if(!x) {
    let answers = await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Value ' + name + ' was not passed a value or has not been set. Continue?' }])
    if(answers['continue'] == "y" || answers['continue'] == "Y" || answers['continue'].toLowerCase() == "yes") {
      answers = await inquirer.prompt([{ type: 'input', name: 'value', message: 'Enter the value to be used: ' }]);
      console.log("Using value: " + answers['value'] + "...");
      return answers['value'];
    } else {
      process.exit(0);
    }
  }
}
