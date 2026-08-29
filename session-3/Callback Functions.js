function greet(n,cb){console.log("Hello "+n);cb();}
greet("John",()=>console.log("Done"));

function calc(a,b,fn){return fn(a,b);}
console.log(calc(5,3,(a,b)=>a+b));
console.log(calc(5,3,(a,b)=>a*b));

function load(cb){console.log("Loading...");setTimeout(()=>{console.log("Loaded");cb();},2000);}
load(()=>console.log("Process"));

function login(u,p,cb){if(u==="admin"&&p==="123"){console.log("Login OK");cb();}else{console.log("Fail");}}
login("admin","123",()=>console.log("Dashboard"));