import s from '../index'
const c = async (code: any)=>{
const inp = require('../input');
const out = require('../output');
const Hlp = require('../helpers')
const { spawn } = require('child_process');
const fs = require('fs');
  let filename = 'cfile.c'

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

let cod = await mstr(code);
// Write the C code to the file
fs.writeFileSync('./files/' + filename, cod, {flag: 'w'}, (err: any) => {
  if (err) throw err;
  console.log(`C code written to ${filename}`);
});

const h = new Hlp();

const gccProcess = spawn('gcc', ['-o', './files/output_file', './files/' + filename], {stdio: ['pipe', 'inherit']});

gccProcess.on('close', async (code: any) => {
  if (code === 0) {
    
    // If compilation succeeds, execute the program
    const programProcess = spawn('./files/output_file');

    let inputCount = 0;
s(programProcess)
    // programProcess.stdout.on('data', async (data:  any) => {
    //   await h.sleep(1000)
    //   let dat = data.toString()
    //     await out(dat)
    //   await inp(programProcess);

    // });
// }

// process.stdout.on('error', function( err : any) {
//     if (err.code == "EPIPE") {
//         process.exit(0);
//     }
// });
    
    // Listen for stderr data
programProcess.stderr.on('data', (data: any) => {
  console.error(`stderr: ${data}`);
});


    programProcess.on('close', async (code : any) => {
      console.log('program terminated')      
      programProcess.stdin.end();
     // process.exit();
      console.log(programProcess.getMaxListeners());
      // process.stdin.end()


// const eventNames = programProcess.eventNames();
// for (const eventName of eventNames) {
//   const count = programProcess.listenerCount(eventName);
//   console.log(`Number of listeners for event ${eventName}: ${count}`);
// }
      
      await h.sleep(200)
      programProcess.removeAllListeners();
      console.log(programProcess.getMaxListeners());


//       for (const eventName of eventNames) {
//   const count = programProcess.listenerCount(eventName);
//   console.log(`Number of listeners for event ${eventName}: ${count}`);
// }
    })
    
    programProcess.on('error', (err: any) => {
      // Handle the error here
      console.error("err" + err);
    });

    programProcess.on('exit', (code: any)=> {
      // console.log(code)
       // process.exit();
    })
  } else {
    // If compilation fails, handle the error here
    console.error('Compilation failed');
  }
});

}

module.exports = c;

function replaceString(str: any) {
  if (str.includes('-1a\n')) {
    str = str.replace(/-1a\n/g, "yo");
    return str;
  }
  return false;
}

async function mstr(inputString : any) {
  // Replace all occurrences of '\n' with '\\n'
  // inputString = inputString.replace(/\n/g, '\\n');
// const regex = /printf\s*\(([^)]*)\)\s*;\s*(?!(.*\n)*.*fflush\s*\(\s*stdout\s*\)\s*;\s*\n)/g;
// const subst = 'printf($1);\n\tfflush(stdout);\n';

const regex = /printf\s*\(([^)]*)\)\s*;\s*(?!(.*\n)*.*(\/\/.*)?(printf\s*\(([^)]*)\)\s*;)?\s*fflush\s*\(\s*stdout\s*\)\s*;\s*\n)/g;
const subst = 'printf($1);\n\tfflush(stdout);\n';

  
inputString = inputString.replace(regex, subst);
inputString = await nton(inputString);
  // Replace all occurrences of 'scanf(any text)' with 'printf("-1a\\n");\n\tfflush(stdout);\n\tscanf(any text which is in previous scanf)'


const scanfRegex = /(?<!\/\/\s*)scanf\(([^)]+)\)/g;
inputString = inputString.replace(scanfRegex, `printf("-1a\\n");\n\tfflush(stdout);\n\tscanf($1)`);
  return inputString;
}

async function nton(inputCode: any) {
  // Regular expression to match double-quoted strings
  const stringRegex = /"([^"\\]|\\.)*"/g;

  // Replace newline characters with \\n within each matched string
  const outputCode = inputCode.replace(stringRegex, function(match: any) {
    return match.replace(/\n/g, '\\n');
  });

  return outputCode;
}