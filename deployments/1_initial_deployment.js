const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util')

const solcutil = require('./solc_util');
const SolcUtil = new solcutil();

const contracts = path.resolve(__dirname, '../contracts', 'main-contracts');
console.log("ROOT: " + contracts);

console.log("GENERATING INPUT...");
let generatedInput = SolcUtil.generateSolcInput(contracts);
console.log(util.inspect(generatedInput))

console.log("COMPILING...");
let output = solc.compile(JSON.stringify(generatedInput));

console.log("OUTPUT: ");
console.log(JSON.parse(output));

//const contracts = path.resolve(__dirname, '../contracts', 'main-contracts');
//let output = solc.compile(JSON.stringify(SolcUtil.generateSolcInput(contracts)))

//////////////////////////////////////////////////////

//DEPLOYMENT:

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

//const compiled = compile()
//const NumberContract = extractContract(compiled, contractName);
//  this returned object contains name, interface, and bytecode


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
