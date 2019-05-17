/**
 * Contract class for providing a simple interface for classes to read a specific contract from compiler output.
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

  get abi() { 
    return this.raw.abi; 
  }

  get bytecode() {
    return this.raw.evm.bytecode.object; 
  }

  get metadata() { 
    return JSON.parse(this.raw.metadata); //the metadata object is just a string, so let's parse for convenience...
  }   

  get compilerVersion() { 
    return this.metadata.compiler.version; 
  }

  get optimizer() {
    return this.metadata.settings.optimizer; 
  }

}

