const truffleFlattener = require('truffle-flattener');
const Compiler = require('compiler.js');
const compiler = new Compiler();
const path = require('path');

const config = require('../deploy-config');
const defaultConfig = require('./default_config');

class Flattener {


 
  //Files is essentially an array of filepaths to be passed, e.g. (['./contracts/meme.sol'])
  //Generic function in order to work with various kinds of flatteners
  async function flatten(files = []) {
    return await truffleFlattener(files);
  }

  async function flattenAndCompile(filepath, verbose = true, superverbose = false) {
    const root = config.root ? config.root : defaultConfig.root;

    const base = path.basename(filepath);
    const src = await this.flatten(filepath);

    const compiled = compiler.compileSinglePure(base, src);
    return compiled;
  }


}
