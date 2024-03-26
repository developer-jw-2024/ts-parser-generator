import { TimeCounter } from "../../src/Utils/Utils"
import { LinearEquationSyntaxAnalyzer } from "./LinearEquationSyntaxAnalyzer"

var t : TimeCounter = new TimeCounter()
//var content = FileUtils.readFromFileSystem(`${__dirname}/Sentences.txt`)
//var lines = content.split('\n')
//console.log('Read data: ', t.getTimePeriod())
var linearEquationSyntaxAnalyzer : LinearEquationSyntaxAnalyzer = new LinearEquationSyntaxAnalyzer()
console.log('Build Analyzer: ', t.getTimePeriod())
//var content = lines[0]



console.log(linearEquationSyntaxAnalyzer.isValid(
`1x-(-2)y=-3`, true))
console.log('convert to html:  ', t.getTimePeriod())
// console.log(markdown.toMarkdownHierarchy('').join('\n'))

