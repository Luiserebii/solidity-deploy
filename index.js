/*
 * ================
 *  truffle-deploy
 * ================
 *
 * MIT License 
 * Copyright (c) 2018 Luiserebii
 *
 *
 */

const defaultConfig = require('./config/default-config');

const Compiler = require('./compile/compiler');
const Flattener = require('./compile/flattener');
const SolcUtil = require('./compile/solc-util');

const Deployer = require('./deploy/deployer');
const DeployUtil = require('./deploy/deploy-util');



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
};

exports.Compiler = Compiler;
exports.Flattener = Flattener;
exports.SolcUtil = SolcUtil;
exports.Deployer = Deployer;
exports.DeployUtil = DeployUtil;
