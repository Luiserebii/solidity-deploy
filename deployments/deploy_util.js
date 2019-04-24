class DeployUtil {


  //Function which takes solc compiled output, a contract name to extract, and returns a convenience object
  //  this returned object contains name, abi, bytecode, and the raw solc output
  extractContract(output, name){

    //Find all raw contract output
    let raw;
    let isFound = false;
    for(solFile in output.contracts) {
      for(c in solFile) {
        if(c === name) { 
          raw = output.contracts.c;
          isFound = true;
        }
      }
    }
    //If we failed to find any contract, throw:
    if(!isFound) throw "Contract \"" + name + "\" not found within compiled output.";
    
    const contract = {
      "name": name,
      "abi": raw.abi,
      "bytecode": raw.evm.bytecode.object,
      "raw": raw
    }

    return contract;
  }



}



module.exports = DeployUtil;
