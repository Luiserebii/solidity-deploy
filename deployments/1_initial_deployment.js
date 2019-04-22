const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractsPath = path.resolve(__dirname, '../contracts', 'main-contracts');

console.log(contractsPath)

// generate input object using path
//Try to compile one contract, then try to make a general function
   //(parsing the contents for titles, maybe?)

const interfacePath = path.resolve(contractsPath, 'interfaces', 'NumberInterface.sol');

var input = {
  language: 'Solidity',
  sources: {
    'NumberInterface.sol': {
      content: fs.readFileSync(interfacePath, 'utf8')
    }

  }
}

var output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output)

