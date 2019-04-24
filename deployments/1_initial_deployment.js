/////////////////////////////////////////////////////

//DEPLOYMENT:

const compile = require('./compile');
const defaultConfig = require('./default_config')
const deployutil = require('./deploy_util')
const DeployUtil = new deployutil();
const PrettyPrint = require('./pretty-print');
const pp = new PrettyPrint();

const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const config = require('../deploy-config');

const provider = new HDWalletProvider(
   config.mnemonic, 
   `https://rinkeby.infura.io/v3/${config.infuraKey}`
   //0,
   //10
);

const web3 = new Web3(provider);
const accounts = await web3.eth.getAccounts();
const compiled = config.root ? compile(config.root) : compile(defaultConfig.root);


const CalculatorContractInput = DeployUtil.extractContract(compiled, "Calculator");
console.log(CalculatorContractInput);
//  this returned object contains name, raw, abi, and bytecode

/*console.log(pp.mainheadline("Hello! Main Headline"))
console.log(pp.miniheadline("hi, I'm a miniheadline"))
console.log(pp.arrow("list item 1"))
*/

let CalculatorContract = await deployContract(CalculatorContractInput, [], { from: accounts[0] });


async function deployContract(contract, args, sendOptions){
  
  console.log(pp.miniheadline("Deploying " + contract.name));
  let contract = await new web3.eth.Contract(contract.abi)
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
        if(num === 2) {
          resolve();
        }
        console.log("confirmation number: " + num + " (block: " + receipt.blockNumber + ")");
      })
      .on('error', (err) => { console.log(err); });
      
  return contract;
  
}

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
