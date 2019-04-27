const Flattener = require('./flatten.js');


run();


async function run(){

  flattener = new Flattener();
  flattener.flattenAndCompile('../contracts/main-contracts/Number.sol', true, true);

}

