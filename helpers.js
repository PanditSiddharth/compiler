class Hlp {
constructor(){
  
}
sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 input(question) {
  return new Promise((resolve) => {
   this.readline.question(question, resolve);
  });
}
}
module.exports = Hlp;