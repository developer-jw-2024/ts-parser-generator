import * as ts from "typescript";

/*
var functionInText : string = `
function(a : number, b : number) : number {
    return a + b
}
`
*/
export function convertTextToFunction(functionInText : string) : Function {
    var code = `(function(){ return ${functionInText.trim()}})()`


    let result = ts.transpile(code);
    let runnalbe :any = eval(result);
    return runnalbe
}
