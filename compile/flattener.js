const truffleFlattener = require('truffle-flattener');
const Compiler = require('./compiler');
const Logger = require('../logging/logger')
const fs = require('fs');
const path = require('path');
const ora = require('ora');

const config = require('../config/deploy-config');
const defaultConfig = require('../config/default-config');

class Flattener {

  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
    this.compiler = new Compiler(logSetting);
  }

  //Files is essentially an array of filepaths to be passed, e.g. (['./contracts/meme.sol'])
  //Generic function in order to work with various kinds of flatteners
  async flatten(files = [], filepath = null, writeToFile = false) {
    const spinner = ora('Flattening .sol file ' + filepath + '...').start();
    const flattened = await truffleFlattener(files);
    if(writeToFile){
      const dir = path.resolve(__dirname, "../flattened/");
      fs.writeFileSync(filepath, flattened);
      spinner.succeed();
      this.log.print(Logger.state.NORMAL, "Flattened file \"" + filepath + "\" written!");
    } else {
      spinner.fail();
    }
    return flattened;
  }

  async flattenAndCompile(filepath, writeToFile = false) {
    const root = config.root ? config.root : defaultConfig.root;

    const base = path.basename(filepath);
    //TODO: Throw error if not an array
    const src = writeToFile ? await this.flatten([filepath], path.resolve(__dirname, "../flattened/", base), true) : await this.flatten([filepath]);

    const compiled = this.compiler.compileSource(base, src);
    return compiled;
  }


}

module.exports = Flattener;
