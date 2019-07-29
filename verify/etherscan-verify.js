/*
 *  INCOMPLETE CLASS: SIMPLY TESTING FOR PROOF OF WORKING ATM
 *  Lacks refactoring, better use of config, etc. etc.  
 *
 *  FUTURE: Integrate Logger class.js
 */

const fs = require('fs');
//const path = require('path');
const axios = require('axios'); 
const util = require('util');

//const Compiler = require('../compile/compiler');
//const compiler = new Compiler();

//const deployutil = require('../deploy/deploy-util');
//const DeployUtil = new deployutil();


/////////////////////////////////////////////////////

//Verifying contracts:
/*
const compiled = config.root ? compiler.compileDirectory(config.root) : compiler.compileDirectory(defaultConfig.root);
let contractObj = DeployUtil.extractContract(compiled, "Calculator");
let addr = "0x5E0318D57c2F0d1262df93478A92EeDAd246A374";
let solFile = path.resolve(config.root, contractObj.solFile);

console.log("Verifying contract: " + util.inspect(contractObj));
console.log("Address: " + addr);
console.log(".sol file location: " + solFile);
*/
/////////////////////////////////////////////////////

/**
 *  A class to verify contracts on Etherscan. 
 *
 *  INCOMPLETE CLASS: SIMPLY TESTING FOR PROOF OF WORKING ATM
 *  Lacks refactoring, better use of config, etc. etc.  
 *
 *  FUTURE: Integrate Logger class.js
 */
class EtherscanVerify {

  /**
   * Create an instance of EtherscanVerify.
   * @param {object} config - Configuration object.
   */
  constructor(config={}){
    this.config = config;
  }

  /**
   * Verifies a contract on Etherscan, as designated by the configuration passed to the object (i.e., API key, Etherscan URL, are all set there)
   *
   * @param {object} contract - Internal contract object, as defined in DeployUtil.extractContract
   * @param {string} address - Contract address at which it was deployed
   * @param {string} filepath - Filepath of the .sol file to verify.
   */
  //Takes the following: (contractObj, addr, solFile);
  async verifyContract(contract, address, filepath) {
    let data = {
      apikey: config.etherscan.apiKey,
      module: 'contract',
      action: 'verifysourcecode', 
      contractaddress: address,
      sourceCode: fs.readFileSync(filepath, 'utf8'),
      contractname: contract.name,
      compilerversion: contract.compilerVersion,
      optimizationUsed: contract.optimizer.enabled === true ? 0 : 1,
      runs: contract.optimizer.runs    
    }

    console.log(util.inspect(data))

    let res = await axios.post(config.etherscan.url, data);
    if(res.data.status === "1") {
      console.log("Request submitted! Message: " + res.data.message + "\nguid: " + res.data.result)
    } else {
      throw "Request submission failed! Reason: " + util.inspect(res.data);
    }

    let poll = setInterval(async () => {  
      console.log("Attempting to poll Etherscan for status...")
      let pollRes = await axios.get(config.etherscan.url, {
        guid: res.data.result,
        module: "contract",
        action: "checkverifystatus"
      });

      if(pollRes.data.status === "1") {
        console.log("Contract successfully verified! Status received: " + pollRes.data.status)
        clearInterval(poll);
      } else {
        console.log("Not verified yet... attempting again in 5 seconds")
      }
    }, 5*1000); //poll api every 5 seconds

  }

}

///////////////////////////////////////////////////////////////
//let testverify = new EtherscanVerify();
//testverify.verifyContract(contractObj, addr, solFile);
///////////////////////////////////////////////////////////////


module.exports = EtherscanVerify;
