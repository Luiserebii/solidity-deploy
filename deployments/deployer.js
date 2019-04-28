


class Deployer {



  async deploy(name, args = [], sender = { from: accounts[0] }){
    console.log("Accounts:   " + accounts + "\n");
    const contractInput = DeployUtil.extractContract(compiled, "Calculator");
    console.log(contractInput);

    let Contract = await deployContract(contractInput, args, sender);
    return Contract;
  }

  async deployContract(contract, args, sendOptions){

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


}



module.exports = Deployer;
