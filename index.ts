let c = require('./compilers/c');
let cpp = require('./compilers/cpp');
let js = require('./compilers/js');
// let py = require('./compilers/py');
const express = require('express');
const app = express();
const port = 80;
import { Scenes, session, Telegraf } from "telegraf";
require('dotenv').config()
// Handler factories
const { enter, leave } = Scenes.Stage;
// app.use(express.json());
// app.get('/', (req: any, res: any)=> {
//   res.send('yo')
// })
  
let cod = `
#include <stdio.h>
int main(){
  int r;
  printf("Jay Shree Ganesha\n");

  for (int i = 0; i < 3; i++) {
  scanf("%d", &r);
  // scanf("%d", &r);
  }
  return 0;
}
`
// let code = cod
let ok = false;
let cb: any = null;
let sendingData = null;
let writeData: any = null;
let s = async (cbb: any) => {
cbb.stdout.on('data', async (data:  any) => {
      // await h.sleep(1000)
     cb = data.toString()
        // await out(dat)
      console.log(cb)
if (cb.includes('-1a\n')) {
  sendingData = cb
 let inter = setInterval(()=>{
  if(writeData){
      console.log("yes" + cb)
    cbb.stdin.write(writeData + '\n');
    writeData = null;
    clearInterval(inter)
  }
}, 1000)
  
} else if(cb{
  sendingData = cb
}

      // await inp(programProcess);

    });
}
export default s;

module.exports = app
// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

// Greeter scene
const codeScene = new Scenes.BaseScene<Scenes.SceneContext>("code");
codeScene.enter(ctx => ctx.reply("Enter code"));
// codeScene.leave(ctx => ctx.reply("Bye"));
// codeScene.hears("hi", enter<Scenes.SceneContext>("greeter"));
codeScene.on("message", async (ctx: any, next: any)=> {
  let code = ctx.message.text
  let compiler = 'c'

  if(compiler == 'c'){
  c(code)
} else if(compiler == 'cpp'){
  cpp(code)
}
 else if(compiler == 'js'){
  js(code)
} else if(compiler == 'py'){
   // py(code)
}
  await next()
});
codeScene.on("message", enter<Scenes.SceneContext>("res"));

// Echo scene
const echoScene = new Scenes.BaseScene<Scenes.SceneContext>("res");
echoScene.enter(async (ctx: any) => {
let inter = setInterval( async ()=>{
  if(cb){
    if (cb.includes('-1a\n')) {
    let str = cb.replace(/-1a\n/g, "");
      if (str != "") {
        await ctx.reply(str)
      }
      // writeData = ctx.message.text
    } else {
        ctx.reply(cb)

    }
    clearInterval(inter)
    cb = null;
    ok = true
  }
}, 100)
});

echoScene.on("message", (ctx: any)=>{
      writeData = ctx.message.text
  let inter = setInterval(async ()=>{
  if(cb){
    if (cb.includes('-1a\n')) {
    let str = cb.replace(/-1a\n/g, "");
      if (str != "") {
        ctx.reply(str)
      }
    } else {
        ctx.reply(cb)
    }
  }
    clearInterval(inter)
    ok = true;
    cb = null;
}, 100)
});

echoScene.leave(ctx => ctx.reply("exiting echo scene"));
echoScene.command("back", leave<any>());
echoScene.on("text", ctx => ctx.reply(ctx.message.text));
echoScene.on("message", ctx => ctx.reply("Only text messages please"));

const bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN as any);

const stage = new Scenes.Stage<Scenes.SceneContext>([codeScene, echoScene], {
	ttl: 10,
});
bot.use(session());
bot.use(stage.middleware());
bot.command("code", ctx => ctx.scene.enter("code"));
bot.command("res", ctx => ctx.scene.enter("res"));
bot.on("message", ctx => ctx.reply("Try /code or /greeter"));

bot.launch();