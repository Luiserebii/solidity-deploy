const truffleFlattener = require('truffle-flattener');
const Compiler = require('../compile/compiler');
const Logger = require('../logging/logger');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

/** Flattener class. Abstracts flattener functionality for the use of the user, as well as general code modularity. */
class Flattener {

  /**
   * Initializes a Flattener instance.
   *
   * @param {object} options - Options object.
   * @param {Logger.state.ENUM) logSetting - Log setting to use with all class functions.
   */
  constructor(options, logSetting = Logger.state.NORMAL) {
    this.options = options;
    this.log = new Logger(logSetting);
    this.compiler = new Compiler(options, logSetting);
  }

  /**
   * ASYNC - Flattens all files passed, and optionally writes to file. Generic function in order to work with various kinds of flatteners (truffle-flattener is currently the only one used, but will very likely introduce more options for users in the near future)
   *
   * @param {string[]} files - Files to flatten; an array of filepaths to be passed, e.g. (['./contracts/meme.sol'])
(note; this should usually only be one in most instances; this piece of the API may change soon)
   * @param {string} filepath - Filepath to write flattened contract to.
   * @param {boolean} [writeToFile=false]
   * 
   * @return {string} flattened - Flattened contract.
   * [NOTE FOR DEV]: Seems to be a conflict in using this.options to determine write location, or even whether to write at all; return to this later, commenting out "const dir" line.
   */
  async flatten(files = [], filepath = null, writeToFile = false) {
    const spinner = ora('Flattening .sol file ' + filepath + '...').start();
    const flattened = await truffleFlattener(files);
    if(writeToFile){
      //const dir = this.options.flatten.writeLocation;
      fs.writeFileSync(filepath, flattened);
      spinner.succeed();
      this.log.print(Logger.state.NORMAL, "Flattened file \"" + filepath + "\" written!");
    } else {
      spinner.fail();
    }
    return flattened;
  }


  /**
   * ASYNC - Flattens the contract at the specified filepath, and compiles the flattened output, returning the compiler.compileSource() output.
   * 
   * @param {string} filepath - Filepath of the single contract to flatten and compile.
   * @param {boolean} [writeToFile=false]
   * 
   * @return {object} compiled - See Compiler class for what the output of this may look like.
   */
  async flattenAndCompile(filepath, writeToFile = false) {
    const root = this.options.root;

    const base = path.basename(filepath);
    //TODO: Throw error if not an array
    const src = writeToFile ? await this.flatten([filepath], path.resolve(this.options.flatten.writeLocation, base), true) : await this.flatten([filepath]);

    const compiled = this.compiler.compileSource(base, src);
    return compiled;
  }


}

module.exports = Flattener;
