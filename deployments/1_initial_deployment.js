const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util')

const solcutil = require('./solc_util');
const SolcUtil = new solcutil();

const contracts = path.resolve(__dirname, '../contracts', 'main-contracts');
console.log("ROOT: " + contracts);

console.log("GENERATING INPUT...");
let generatedInput = SolcUtil.generateSolcInput(contracts);
console.log(util.inspect(generatedInput))

console.log("COMPILING...");
let output = solc.compile(JSON.stringify(generatedInput));

console.log("OUTPUT: ");
console.log(JSON.parse(output));


