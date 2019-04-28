/////////////////////////////////////////////////////

//DEPLOYMENT:

const Compiler = require('./compile');
const compiler = new Compiler();
const defaultConfig = require('./default_config')
const util = require('util');

const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const config = require('../deploy-config');



console.log(config)

const provider = new HDWalletProvider(
   config.mnemonic, 
   `https://rinkeby.infura.io/v3/${config.infuraKey}`
   ,
   0,
   10
);
const web3 = new Web3(provider, null, { transactionConfirmationBlocks: 2 }); //This isn't quite working.... hmmmm, darn.
const Deployer = require('./deployer');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
 
//Sample 
/*
 * main-deploy.js -- 
 */


const Stage = {
  CALCULATOR: 1
}

//===========|MAIN|============//
run();
//=============================//


async function run() {
  const compiled = config.root ? compiler.compile(config.root) : compiler.compile(defaultConfig.root);
  const deployer = await Deployer.build(web3, compiled);

  const stage = args['stage'];

  switch(stage) {
    case Stage.CALCULATOR: 
      await deployer.deploy("Calculator");

      break;
   /* case Stage.:

      break;
    case Stage.:
  
      break;
*/
  }

}

//////////////////////////////////////////////////////////////////////

//Verifying contracts:
/*
const axios = require('axios'); 

let contractObj = DeployUtil.extractContract(compiled, "Calculator");
let addr = "0x5E0318D57c2F0d1262df93478A92EeDAd246A374";
let solFile = path.resolve(config.root, contractObj.solFile);

console.log("Verifying contract: " + util.inspect(contractObj));
console.log("Address: " + addr);
console.log(".sol file location: " + solFile);

//verifyContract(contractObj, addr, solFile);

async function verifyContract(contract, address, filepath) {

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

  

}*/
