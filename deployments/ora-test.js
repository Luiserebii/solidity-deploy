const ora = require('ora');

const spinner = ora('Starting deployment...').start();
spinner.clear();
console.log("a")
console.log("b")
console.log("c")
const anal = ora('mini-deploy').start();
anal.clear();
console.log("a")
console.log("b")
console.log("c")
anal.succeed();
spinner.succeed();

const doot = ora('uguu').start();
console.log("f")
console.log("g")
console.log("gfdsgfdsgfd\n\n")
doot.clear();
console.log("h")
console.log("i")
console.log("j")
doot.succeed();

