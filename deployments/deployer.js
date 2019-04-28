const deployutil = require('./deploy_util')
const DeployUtil = new deployutil();
const PrettyPrint = require('./pretty-print');
const pp = new PrettyPrint();

class Deployer {

  //_compiled as an optional param, a way to sort of... hmmm, should be property?
  //NOTE: THIS IS NOT INTENDED TO BE CALLED; ONLY FOR PRIVATE USE. PLEASE USE BUILD INSTEAD!!!
  constructor(_web3, _compiled = null, _accounts = null) {
    this.web3 = _web3;
    this.accounts = _accounts;
    this.compiled = _compiled;
  }

  //Not quite our builder pattern; here, we simply provide an alternate constructor
  //Funny that a Deployer can return more deployers, but ehhh, ok
  static async build(_web3, _compiled = null) {    
    let accounts = await _web3.eth.getAccounts();  
    return new Deployer(_web3, _compiled, accounts);
  }

  async deploy(name, args = [], sender = { from: this.accounts[0] }, compiled=this.compiled){
    if(!compiled) { throw "No compilation material provided to deployer!"; }
    console.log("Accounts:   " + this.accounts + "\n");
    const contractInput = DeployUtil.extractContract(compiled, "Calculator");
    console.log(contractInput);

    let Contract = await this.deployContract(contractInput, args, sender);
    return Contract;
  }

  async deployContract(contract, args, sendOptions){

    console.log(pp.miniheadline("Deploying " + contract.name));
    let contractWeb3 = await (new this.web3.eth.Contract(contract.abi)
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
            process.exit(0);
            console.log("\n\nExtra confirmations:\n")
            //resolve();
          }
        })
        .on('error', (err) => { console.log(err); }));
    return contractWeb3;
  }


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





module.exports = Deployer;
