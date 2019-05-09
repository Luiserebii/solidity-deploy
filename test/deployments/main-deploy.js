/////////////////////////////////////////////////////

//DEPLOYMENT:
const Logger = require('./logging/logger')
const defaultState = Logger.state.NORMAL;
const Compiler = require('./compile/compiler');
const compiler = new Compiler(defaultState);
const Deployer = require('./deploy/deployer');
const defaultConfig = require('./config/default-config');
const Flattener = require('./compile/flattener');
const flattener = new Flattener(defaultState);
const inquirer = require('inquirer');
const LogUtil = require('./logging/util')
const logutil = new LogUtil();

const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const util = require('util');

const config = require('./config/deploy-config');
//console.log(config);

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


