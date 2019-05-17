const SolidityDeploy = require('solidity-deploy');
const config = require('./deploy-config');
const solidityDeploy = new SolidityDeploy.SolidityDeploy(config);

const Logger = SolidityDeploy.logging.Logger; //Actually... perhaps keep this as shorthand
run();


async function run(){

  flattener = solidityDeploy.createFlattener(Logger.state.MASTER);
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);

}

