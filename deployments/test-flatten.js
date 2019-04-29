const Flattener = require('./compile/flatten.js');


run();


async function run(){

  flattener = new Flattener();
  await flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true, true);

}

