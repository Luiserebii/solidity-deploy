const truffleFlattener = require('truffle-flattener');
const Compiler = require('./compiler');
const Logger = require('../logging/logger')
const path = require('path');

const config = require('../config/deploy-config');
const defaultConfig = require('../config/default-config');

class Flattener {

  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
    this.compiler = new Compiler(logSetting);
  }

  //Files is essentially an array of filepaths to be passed, e.g. (['./contracts/meme.sol'])
  //Generic function in order to work with various kinds of flatteners
  async flatten(files = []) {
    return await truffleFlattener(files);
  }

  async flattenAndCompile(filepath) {
    const root = config.root ? config.root : defaultConfig.root;

    const base = path.basename(filepath);
    //TODO: Throw error if not an array
    const src = await this.flatten([filepath]);

    const compiled = this.compiler.compileSource(base, src);
    return compiled;
  }


}

module.exports = Flattener;
