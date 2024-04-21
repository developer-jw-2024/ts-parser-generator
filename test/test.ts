import { regexp } from "../src";
import { RegularExpression, toContentChars, toRegularExpressionChars } from "../src/LexicalAnalyzer/RegularExpression";
import { FileUtils } from "./FileUtil";

var content = FileUtils.readFromFileSystem(`${__dirname}/test`)
var lines = content.split('\n')
console.log(toRegularExpressionChars(lines[0]))
var regExp : RegularExpression = new RegularExpression(lines[0])
var faps = regExp.dfa.finiteAutomatonPaths
for (var i=0;i<faps.length;i++) {
    console.log(i, faps[i].toString())
}
var chars : Array<string> = toContentChars(lines[1])
console.log(chars)
for (var i=0;i<chars.length;i++) {
    console.log(i, chars[i])
}
console.log(regExp.test(lines[1]))