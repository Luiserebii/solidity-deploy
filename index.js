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
const util = require('util')

class TruffleDeploy {
  
  constructor(config={}) {
    console.log("WE ARE PASSED, IN CONSTRUCTOR: ", util.inspect(config));
    this.config = Object.assign(defaultConfig, config);
    console.log("POST-OBJECT.ASSIGN: ", util.inspect(this.config))
    
  }


  createCompiler(logSetting=undefined, config=this.config) {
    return new Compiler(config, logSetting);
  }
  
  createFlattener(logSetting=undefined, config=this.config) {
    console.log(config);
    return new Flattener(config, logSetting);
  }
  
  
  
  
}


module.exports = {
  TruffleDeploy
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

//console.log(exports)
