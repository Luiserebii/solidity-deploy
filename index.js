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
const Flattener = require('./compile/flattener');
const SolcUtil = require('./compile/solc-util');

const Deployer = require('./deploy/deployer');
const DeployUtil = require('./deploy/deploy-util');

const Logger = require('./logging/logger');
const LogUtil = require('./logging/util');

const PrettyPrint = require('./styling/pretty-print');
const EtherscanVerify = require('./verify/etherscan-verify');
const util = require('util')

class SolidityDeploy {
  
  constructor(config={}) {
    this.config = Object.assign(defaultConfig, config);
  }


  createCompiler(logSetting=undefined, config=this.config) {
    return new Compiler(config, logSetting);
  }
  
  createFlattener(logSetting=undefined, config=this.config) {
    return new Flattener(config, logSetting);
  }
  
  
  
  
}


module.exports = {
  SolidityDeploy
}


module.exports.compile = {
  Compiler,
  Flattener,
  SolcUtil
}

module.exports.deploy = {
  Deployer,
  DeployUtil
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

