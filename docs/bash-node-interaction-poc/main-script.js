const minimist = require('minimist');
const args = minimist(process.argv.slice(2));


//# node output:
//# 
//# Node.js script
//# ===============
//# A: [Value of A passed]
//# B: [Value of B passed]
//# C: [A + B]

let a = args['a'];
let b = args['b'];

printAdd(a, b, a + b);


function printAdd(a, b, c) {
  console.log("Node.js script");
  console.log("===============");
  console.log("A: " + a);
  console.log("B: " + b);
  console.log("C: " + c);
  console.log("");
}


function add(a, b) { 
  return a + b;
}
