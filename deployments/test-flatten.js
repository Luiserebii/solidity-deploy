const Flattener = require('./compile/flattener.js');
const Logger = require('./logging/logger.js')

run();


async function run(){

  flattener = new Flattener(Logger.state.MASTER);
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true);

}

