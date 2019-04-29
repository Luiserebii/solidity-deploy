/*
 *  INCOMPLETE CLASS: SIMPLY TESTING FOR PROOF OF WORKING ATM
 *  
 *  FUTURE: Integrate Logger class.js
 */

const Compiler = require('../compile/compiler');
const compiler = new Compiler();
const deployutil = require('../deploy/deploy-util');
const DeployUtil = new deployutil();

const config = require('../config/deploy-config');
const defaultConfig = require('../config/default-config');

const path = require('path');
const axios = require('axios'); 
const util = require('util');

//Verifying contracts:
const compiled = config.root ? compiler.compileDirectory(config.root) : compiler.compileDirectory(defaultConfig.root);
let contractObj = DeployUtil.extractContract(compiled, "Calculator");
let addr = "0x5E0318D57c2F0d1262df93478A92EeDAd246A374";
let solFile = path.resolve(config.root, contractObj.solFile);

console.log("Verifying contract: " + util.inspect(contractObj));
console.log("Address: " + addr);
console.log(".sol file location: " + solFile);


class EtherscanVerify {

  //Takes the following: (contractObj, addr, solFile);
  async verifyContract(contract, address, filepath) {

    let data = {
      apikey: config.etherscan.apiKey,
      module: 'contract',
      action: 'verifysourcecode', 
      contractaddress: address,
      sourceCode: fs.readFileSync(filepath, 'utf8'),
      contractname: contract.name,
      compilerversion: 'v0.5.7+commit.6da8b019',
      optimizationUsed: 1,
      runs: 200    
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


module.exports = EtherscanVerify;
