/*
 * =================
 *  solidity-deploy
 * =================
 *
 * MIT License 
 * Copyright (c) 2019 Luiserebii
 *
 *
 */

const defaultConfig = require('./config/default-config');

const Compiler = require('./compile/compiler');
const Flattener = require('./flatten/flattener');
const SolcUtil = require('./compile/solc-util');

const Deployer = require('./deploy/deployer');
const DeployUtil = require('./deploy/deploy-util');

const Logger = require('./logging/logger');
const LogUtil = require('./logging/util');

const PrettyPrint = require('./styling/pretty-print');
const EtherscanVerify = require('./verify/etherscan-verify');
const util = require('util')

class SolidityDeploy {

  /**
   * Initialize a SolidityDeploy object. Main point of entry for config-based needs. In other words, if you are looking to use an object listed here with particular configuration, please initialize this and call the appropriate method.
   *
   * @param {object} options - User options, which will overwrite any default ones.
   *
   */
  constructor(config={}) {
    this.config = Object.assign(defaultConfig, config);
  }

  /**
   * Create a Compiler object.
   *
   * @param {Logger.state.ENUM} logSetting - Log setting, as represented by the Logger state enum. 
   * @param {object} options - User options
   */
  createCompiler(logSetting=undefined, config=this.config) {
    return new Compiler(config, logSetting);
  }

  /**
   * Create a Flattener object.
   *
   * @param {Logger.state.ENUM} logSetting - Log setting, as represented by the Logger state enum. 
   * @param {object} options - User options
   */  
  createFlattener(logSetting=undefined, config=this.config) {
    return new Flattener(config, logSetting);
  }
 
  /**
   * Create a Deployer object.
   *
   * @param {web3_instance} _web3 - Initizalized web3 instance, with provider set
   * @param {JSON} [_compiled=null] - solc compilation output. Required for using `async deploy()` function!
   * @param {Logger.state.ENUM} logSetting - Log setting, as represented by the Logger state enum. 
   * @param {object} options - User options
   */    
  async createDeployer(web3, compiled=undefined, logSetting=undefined, config=this.config) {
    return await Deployer.build(web3, compiled, logSetting, config);
  }  
  
  
}

//Allows for easy straightforward constructor
module.exports = SolidityDeploy;

module.exports.compile = {
  Compiler,
  SolcUtil
}

module.exports.deploy = {
  Deployer,
  DeployUtil
}

module.exports.flatten = {
  Flattener
}

module.exports.logging = {
  Logger,
  LogUtil
}

module.exports.styling = {
  PrettyPrint
}

module.exports.verify = {
  EtherscanVerify
}

