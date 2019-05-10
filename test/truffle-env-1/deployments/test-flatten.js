const TruffleDeploy = require('truffle-deploy');
const config = require('./deploy-config');
const truffleDeploy = new TruffleDeploy.TruffleDeploy(config);
const util = require('util')
console.log('=========================', util.inspect(truffleDeploy.config))


const Logger = TruffleDeploy.logging.Logger;
run();


async function run(){

  flattener = truffleDeploy.createFlattener(Logger.state.MASTER);
  console.log('/===========/////===============/', truffleDeploy.config, '----=--0-0-', flattener.options)
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);

}

