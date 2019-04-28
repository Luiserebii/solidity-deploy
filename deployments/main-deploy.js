/////////////////////////////////////////////////////

//DEPLOYMENT:

const Compiler = require('./compile');
const compiler = new Compiler();
const defaultConfig = require('./default_config')
//const deployutil = require('./deploy_util')
//const DeployUtil = new deployutil();
//const PrettyPrint = require('./pretty-print');
//const pp = new PrettyPrint();
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
//let accounts;
const Deployer = require('./deployer');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
 
//Sample 
/*
 * main-deploy.js -- 
 */

let compiled;


const Stage = {
  CALCULATOR: 1
}

//===========|MAIN|============//
run();
//=============================//


async function run() {
  //accounts = await web3.eth.getAccounts();
  compiled = config.root ? compiler.compile(config.root) : compiler.compile(defaultConfig.root);
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
/*
async function deploy(name, args = [], sender = { from: accounts[0] }){
  console.log("Accounts:   " + accounts + "\n");
  const contractInput = DeployUtil.extractContract(compiled, "Calculator");
  console.log(contractInput);

  let Contract = await deployContract(contractInput, args, sender);
  return Contract;
}

async function deployContract(contract, args, sendOptions){
 
  console.log(pp.miniheadline("Deploying " + contract.name));
  let contractWeb3 = await (new web3.eth.Contract(contract.abi)
      .deploy({ "data": contract.bytecode.indexOf('0x') === 0 ? contract.bytecode : '0x' + contract.bytecode, "args": args })
      .send(sendOptions)
      .on('receipt', (receipt) => {
        console.log(pp.arrow("status: " + receipt.status ? "Success!" : "Failed :("));
        console.log(pp.arrow("transaction hash: " + receipt.transactionHash));
        console.log(pp.arrow("contract address: " + receipt.contractAddress));
        console.log(pp.arrow("from: " + receipt.from));
        console.log(pp.arrow("block number: " + receipt.blockNumber));
        console.log(pp.arrow("gas used: " + receipt.gasUsed));
        console.log(pp.miniheadline("\nPausing for 2 confirmations..."));
        
      })
      .on('confirmation', (num, receipt) => {
        console.log("confirmation number: " + num + " (block: " + receipt.blockNumber + ")");
        if(num === 2) {
          console.log("...");
          console.log("Confirmed!");
          console.log("\n\nExtra confirmations:\n")
          //resolve();
        }
      })
      .on('error', (err) => { console.log(err); }));
  return contractWeb3;
}
*/
//Deployment logic:

//Takes a Contract object, parameters, and an optional object to pass to send
//contract, args = [], sendobj = {}
//
//NumberContract = await new web3.eth.Contract(JSON.parse(contract.interface))
//    .deploy({data: '0x' + contract.bytecode, args: []})
//    .send(sendobj)

//deploy function, takes a contract object (name, interface, bytecode)
//  Print intro headline
//   Deploy, await receipt
//  Print receipt info
//  Listen for confirmations (likely through .then())
//   follow up
//   etc., etc.


//Print functions (returns a string, which is then printed):
//
// for "> "
// for headlines (adding ==== below as well)
// for mini-headlines (adding ---- below as well)

/*

Print: "Starting deployment..." 
Print: as many '=' chars as above line

Print: "Addresses:"
Print array of addresses


//For each contract:
Print: "Deploying 'CONTRACTNAME'"
Print: as many '-' chars as above line

Print:
"> transaction hash: "   
"> contract address: "
"> account: "
"> balance: "
//Other details...

Print: "Pausing for 2 confirmations..."
Print: as many '-' as above line
"> confirmation number: [NUMBER] (block: [BLOCKNUMBER])"

Print: "Summary"
Print: as many '=' chars as above line
"> Total deployments: [NUMBER]"
*/



//NOTE: ON CONTRACT CLASS:
// class Contract()
//   internal var raw
// get interface()
// get bytecode()


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
