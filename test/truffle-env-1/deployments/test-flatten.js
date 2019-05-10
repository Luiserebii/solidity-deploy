const TruffleDeploy = require('truffle-deploy');
const config = require('./deploy-config');
const truffleDeploy = new TruffleDeploy.TruffleDeploy(config);

const Logger = TruffleDeploy.logging.Logger; //Actually... perhaps keep this as shorthand
run();


async function run(){

  flattener = truffleDeploy.createFlattener(Logger.state.MASTER);
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);

}

