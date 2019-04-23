const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util')

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

let ranArr = findSolInDir(contractsPath);
console.log(ranArr);


/*for(var i = 0; i < ranArr.length; i++) {
  console.log(toSolcFilename(ranArr[i]));
}*/


















//This needs to be improved by using some sort of "node.js path equivalent"
function toSolcFilename(filepath) {
  let maindir = "contracts";
  let index = filepath.indexOf(maindir);
  if(index === -1) {
    throw "Error - no main contract directory found within filepath";
  }
  return filepath.substring(index + maindir.length + 1);
}

function findSolInDir(root) {
  return findExtInDir(root, ".sol");
}

function findExtInDir(root, ext) {
  let condition = (filename) => {
    return (filename.slice(ext.length * -1) === ext);
  } 
  return findFilesInDir(root, condition);
}


//Takes a root filepath, and a condition function
//Condition function is expected to take a filename and return a bool; i.e., something like:
// public bool isSol(filename){} (pseudo-code syntax)

function findFilesInDir(root, condition){
  var results = [];

  if(!fs.existsSync(root)){
    console.log("No directory found", root);
    return;
  }

  var files = fs.readdirSync(root);

  for(var i = 0; i < files.length; i++){
    var filename = path.join(root, files[i]);
    var stat = fs.lstatSync(filename);

    if(stat.isDirectory()){
      results = results.concat(findFilesInDir(filename, condition)); //recurse
    } else if(condition(filename)) {
//      console.log('-- found: ', filename);
      results.push(filename);
    }
  }
  return results;
}

//Generate input object, assuming Solidity as language, from filepath of sources
function generateSolcInput(root) {
  let input = { language: 'Solidity', sources: {} };
 
  //parse through all the paths
  let files = findSolInDir(root);

  //For each .sol file found,
  //  (Grab contents of contract)
  //  (Grab base filename, which should end in .sol)
  //  Find contract name (assume we only have 1 potential contract name to parse) 
  //Finally, define input.sources.[name of contract] = {contents: [contentsofcontract]}
  for(var i = 0; i < files.length; i++) {
    let code = fs.readFileSync(files[i]);
    let base = toSolcFilename(files[i]);
    input.sources[base] = { contents: code };
  }

  //return input
  return input;  

}


