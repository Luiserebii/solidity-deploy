/**
 * Contract class for providing a simple interface for classes to read a specific contract from compiler output.
 *
 * For more information on these properties, please see the Solidity documentation on solc regarding the output: https://solidity.readthedocs.io/en/v0.5.8/using-the-compiler.html#output-description
 */
class Contract {

  /**
   * Initialize a Contract object. 
   * @param {string} name - Contract name
   * @param {JSON|object} raw - The raw piece of the compiler output JSON pertaining to the contract. For more information, please see the solc docs on compiler output: https://solidity.readthedocs.io/en/v0.5.0/using-the-compiler.html#output-description
   * @param {string} sol - Name of the .sol file the contract was compiled in.
   */
  constructor(name, raw, sol){
    this.name = name;
    this.raw = raw;
    this.solFile = sol;
  }

  /**
   * Returns the ABI object as defined within the JSON.
   * @return {JSON} ABI
   */
  get abi() { 
    return this.raw.abi; 
  }

  /**
   * Returns the compiled bytecode of the contract, as a hex string.
   * @return {string} bytecode
   */
  get bytecode() {
    return this.raw.evm.bytecode.object; 
  }

  /**
   * Returns the compiler metadata.
   * @return {JSON} metadata
   */
  get metadata() { 
    return JSON.parse(this.raw.metadata); //the metadata object is just a string, so let's parse for convenience...
  }   

  /**
   * Returns the compiler version.
   * @return {string} version
   */
  get compilerVersion() { 
    return this.metadata.compiler.version; 
  }

  /**
   * Returns the optimizer metadata object.
   * @return {JSON} optimizer
   */
  get optimizer() {
    return this.metadata.settings.optimizer; 
  }

}

module.exports = Contract;
