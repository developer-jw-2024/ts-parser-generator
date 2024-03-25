import { RegularExpression } from "../src/LexicalAnalyzer/RegularExpression";
import { FileUtils } from "../src/Utils/FileUtil";

var content = FileUtils.readFromFileSystem(`${__dirname}/test`)
var lines = content.split('\n')
var regExp : RegularExpression = new RegularExpression(lines[0])
console.log(regExp.test(lines[1]))