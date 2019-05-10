/*
 * ================
 *  truffle-deploy
 * ================
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

class TruffleDeploy {
  
  constructor(config={}) {
    this.config = Object.assign(defaultConfig, config);
  }


  createCompiler(config=this.config, logSetting=undefined) {
    return new Compiler(config, logSetting);
  }
  
  createFlattener(config=this.config, logSetting=undefined) {
    return Flattener(config, logSetting);
  }
  
  
  
  
}


module.exports = {
  TruffleDeploy
}


exports.compile = {
  Compiler,
  Flattener,
  SolcUtil
}

exports.deploy = {
  Deployer,
  DeployUtil
}

exports.logging = {
  Logger,
  LogUtil
}

exports.styling = {
  PrettyPrint
}

exports.verify = {
  EtherscanVerify
}
