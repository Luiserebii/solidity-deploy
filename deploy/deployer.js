const deployutil = require('./deploy-util')
const DeployUtil = new deployutil();
const PrettyPrint = require('../styling/pretty-print');
const pp = new PrettyPrint();
const Logger = require('../logging/logger');
const ora = require('ora');

/** Deployer class. Handles all functionality with using web3 and compiled material to deploy! */
class Deployer {

  /**
   * Instantiate a Deployer object.
   * 
   * <b>NOTE: This is not inteded to be called by the user; if you are looking to create a Deployer from web3, please use "static async build" instead!</b>
   *
   * @param {web3_instance} _web3 - Initizalized web3 instance, with provider set
   * @param {object} [_compiled=null] - solc compilation output
   * @param {string[]} [_accounts=null] - Array of accounts
   * @param {Logger.state.ENUM} [_logSetting=Logger.state.NORMAL] - Logger state for deployer to use when running methods.
   */
  //_compiled as an optional param, a way to sort of... hmmm, should be property?
  //NOTE: THIS IS NOT INTENDED TO BE CALLED; ONLY FOR PRIVATE USE. PLEASE USE BUILD INSTEAD!!!
  constructor(_web3, _compiled = null, _accounts = null, _logSetting = Logger.state.NORMAL) {
    this.web3 = _web3;
    this.accounts = _accounts;
    this.compiled = _compiled;
    this.log = new Logger(_logSetting);
  }

  /**
   * Construct a Deployer object. <b>The intended point of entry.</b>
   *
   * @param {web3_instance} _web3 - Initizalized web3 instance, with provider set
   * @param {JSON} [_compiled=null] - solc compilation output. Required for using `async deploy()` function!
   * @param {Logger.state.ENUM} [_logSetting=Logger.state.NORMAL] - Logger state f
or deployer to use when running methods. 
   *
   * @return {Deployer} deployer - a new Deployer object instantiated using the provided parameters.
   */
  static async build(_web3, _compiled = null, _logSetting = Logger.state.NORMAL) {    
    let accounts = await _web3.eth.getAccounts();  
    return new Deployer(_web3, _compiled, accounts, _logSetting);
  }

  /**
   * Deploy a contract by name, by parsing the object's (if not provided) compiled material. Returns the contract deployed as a web3.eth.Contract object (as provided by web3).
   * 
   * @param {string} name - Name of the contract (e.g. Calculator.sol, ERC20.sol)
   * @param {array} [args=[]] - Constructor arguments for the contract
   * @param {object} [sender={ from: this.accounts[0] }] - The send object to be passed along in deployment. By default, it is passed an object declaring the 1st account as the sender.
   * @param {JSON} [compiled=this.compiled] - solc compilation output.
   *
   * @return {web3.eth.Contract} - Contract web3 object of the deployed contract.
   */
  async deploy(name, args = [], sender = { from: this.accounts[0] }, compiled=this.compiled){
    if(!compiled) { throw "No compilation material provided to deployer!"; }
    this.log.print(Logger.state.SUPER, "Accounts:   " + this.accounts + "\n");
    const contractInput = DeployUtil.extractContract(compiled, name);
    this.log.print(Logger.state.MASTER, contractInput);

    let Contract = await this.deployContract(contractInput, args, sender);
    return Contract;
  }

  /**
   * Deploy a contract object [defined internally; see return val of DeployUtil.extractContract].
   * 
   * @param {object} contract - Contract object [constructed internally, NOT web3]
   * @param {array} args - Constructor arguments for the contract
   * @param {object} sendOptions - The send object to be passed along in deployment. 
   * 
   * @return {web3.eth.Contract} - Contract web3 object of the deployed contract.
   */
  async deployContract(contract, args, sendOptions){

    console.log(pp.miniheadline("Deploying " + contract.name + '...'));
    const spinner = ora().start(); 
    spinner.clear();
    let spinnerConf;
    let contractWeb3 = await (new this.web3.eth.Contract(contract.abi)
        .deploy({ "data": contract.bytecode.indexOf('0x') === 0 ? contract.bytecode : '0x' + contract.bytecode, "arguments": args })
        .send(sendOptions)
        .on('receipt', (receipt) => {
          spinner.succeed();
          console.log(pp.arrow("status: " + receipt.status ? "Success!" : "Failed :("));
          console.log(pp.arrow("transaction hash: " + receipt.transactionHash));
          console.log(pp.arrow("contract address: " + receipt.contractAddress));
          console.log(pp.arrow("from: " + receipt.from));
          console.log(pp.arrow("block number: " + receipt.blockNumber));
          console.log(pp.arrow("gas used: " + receipt.gasUsed));
          console.log(pp.miniheadline("\nPausing for 2 confirmations..."));
          spinnerConf = ora().start()
          spinnerConf.clear();

        })
        .on('confirmation', (num, receipt) => {
          console.log("confirmation number: " + num + " (block: " + receipt.blockNumber + ")");
          if(num === 2) {
            if(spinnerConf) spinnerConf.succeed();
            console.log("...");
            console.log("Confirmed!");

            process.exit(0);
            console.log("\n\nExtra confirmations:\n")
            //resolve();

          }
        })
        .on('error', (err) => { console.log(err); spinner.fail(); }));
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
