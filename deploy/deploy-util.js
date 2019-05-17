
const Logger = require('../logging/logger');
const Contract = require('./contract');

/** Utility class for Deployer. */
class DeployUtil {

  /**
   * Initialize an instance of DeployUtil.
   * @param {Logger.state.ENUM} logSetting - Log setting for DeployUtil's functions
   *
   */
  constructor(logSetting = Logger.state.NORMAL) {
    this.log = new Logger(logSetting);
  }

  /**
   * Function which takes solc compiled output, a contract name to extract, and returns a convenience object.
   * This returned object contains name, abi, bytecode, the raw solc output, and other properties conveniently mapped to pieces of the raw JSON.
   *
   * @param {JSON} output - solc compiled output. 
   * @param {string} name - Name of the contract (e.g. MemeToken) 
   *
   * @return {object} contract - An internally defined contract object., with the following properties: 
   * "name" {string} - Name of contract
   * "abi" {JSON} - Contract ABI
   * "bytecode" {string} - Bytecode
   * "metadata" {object} - Metadata (contains metadata on compilation)
   * "compilerVersion" {string} - Compiler version used in compilation
   * "optimizer" {JSON} - JSON Object with both number of runs, and whether enabled or not
   * "raw" {JSON} - Holds the raw compilation output of the contract
   * "solFile": Name of the .sol file the contract was compiled in.
   */
  extractContract(output, name){

    //Find all raw contract output
    let raw;
    let isFound = false;
    //Let's just hang onto the reference of the filename as well...
    let sol;
    for(let solFile in output.contracts) {
      this.log.print(Logger.state.SUPER, "Looking over " + solFile + "...");
      for(let c in output.contracts[solFile]) {
        console.log("    " + c);
        if(c === name) { 
          raw = output.contracts[solFile][c];
          sol = solFile;
          isFound = true;
          this.log.print(Logger.state.SUPER, "Found contract!!!");
        }
      }
    }
    //If we failed to find any contract, throw:
    if(!isFound) throw "Contract \"" + name + "\" not found within compiled output.";
    
/*    const contract = {
      "name": name,
      get abi() { return this.raw.abi; },
      get bytecode() { return this.raw.evm.bytecode.object; },
      get metadata() { return JSON.parse(this.raw.metadata); }, //the metadata object is just a string, so let's parse for convenience...
      get compilerVersion() { return this.metadata.compiler.version; },
      get optimizer() { return this.metadata.settings.optimizer; },
      "raw": raw,
      "solFile": sol
    }
*/
    const contract = new Contract(name, raw, sol);
    return contract;
  }



}



module.exports = DeployUtil;
