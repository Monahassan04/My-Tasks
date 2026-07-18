console.log("Start");
console.log("Middle");
console.log("End");

function a(){console.log("1");b();}
function b(){console.log("2");}
a();

let x = 5 + 3;
console.log(x);
let y = x * 2;
console.log(y);

function add(a,b){return a+b;}
function mul(a,b){return a*b;}
console.log(mul(add(2,3),4));