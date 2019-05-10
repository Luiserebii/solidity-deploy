const TruffleDeploy = require('truffle-deploy');
const util = require('util')
console.log(util.inspect(TruffleDeploy));
const Flattener = TruffleDeploy.compile.Flattener;
const Logger = TruffleDeploy.logging.Logger;

run();


async function run(){

  flattener = new Flattener(Logger.state.MASTER);
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);

}

