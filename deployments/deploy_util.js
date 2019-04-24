class DeployUtil {


  //Function which takes solc compiled output, a contract name to extract, and returns a convenience object
  //  this returned object contains name, abi, bytecode, and the raw solc output
  extractContract(output, name){

    //Find all raw contract output
    let raw;
    let isFound = false;
    console.log(typeof output);
    for(solFile in output.contracts) {
      console.log("Looking over " + solFile + "...");
      for(c in solFile) {
        console.log("    " + c);
        if(c === name) { 
          raw = output.contracts.c;
          isFound = true;
          console.log("Found contract!!!");
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
