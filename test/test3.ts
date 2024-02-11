//import * as ts from "typescript";

import { convertTextToFunction } from "../src/Utils/JWUtils"

var functionText = `
function(a : number, b : number) : number {
    return a + b
}
`

var abc : Function =  convertTextToFunction(functionText)
console.log(abc(5,3))


