import * as ts from "typescript";

var functionText = `
function(a : number, b : number) : number {
    return a + b
}
`
var code = `(function(){ return ${functionText.trim()}})()
`


let result = ts.transpile(code);
let runnalbe :any = eval(result);
console.log(runnalbe)