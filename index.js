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

class TruffleDeploy {
  
  constructor(config={}) {
    this.config = Object.assign(defaultConfig, config);
  }


  createCompiler(config=this.config, logSetting=undefined) {
    return new Compiler(config, logSetting);
  }
  
  
  
  
  
  
}


module.exports = TruffleDeploy;
