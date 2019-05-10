/////////////////////////////////////////////////////

const TruffleDeploy = require('truffle-deploy');
const config = require('./deploy-config');

const truffleDeploy = new TruffleDeploy(config);

//DEPLOYMENT:
const Logger = new TruffleDeploy.logging.Logger();
const defaultState = Logger.state.NORMAL;

const compiler = truffleDeploy.createCompiler(undefined, defaultState);
const Deployer = new TruffleDeploy.deploy.Deployer();
const flattener = truffleDeploy.createFlattener(undefined, defaultState);
const logutil = new TruffleDeploy.logging.LogUtil();

const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const util = require('util');
const inquirer = require('inquirer');
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


