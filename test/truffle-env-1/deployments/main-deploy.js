/////////////////////////////////////////////////////

const SolidityDeploy = require('solidity-deploy');
const config = require('./deploy-config');

const solidityDeploy = new SolidityDeploy.SolidityDeploy(config);

//DEPLOYMENT:
const Logger = SolidityDeploy.logging.Logger;
const defaultState = Logger.state.NORMAL;

const compiler = solidityDeploy.createCompiler(defaultState);
const Deployer = SolidityDeploy.deploy.Deployer; //May keep it this way as short-hand
const flattener = solidityDeploy.createFlattener(defaultState);
const logutil = new SolidityDeploy.logging.LogUtil();

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
  //Specify solidityDeploy, the object, as our Object.assign() has taken place in the object; therefore good practice to obtain our "true settings" (although... not completely necessary in this case, I think)
  //Perhaps assume we know what we set, anyways
  const compiled = compiler.compileDirectory(config.root);
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


