console.log("Hello");
setTimeout(()=>console.log("World"),2000);

for(let i=1;i<=5;i++){setTimeout(()=>console.log(i),i*1000);}

console.log("Loading...");
setTimeout(()=>console.log("Done"),3000);

function msg(m,d){setTimeout(()=>console.log(m),d);}
msg("Hi",1000);