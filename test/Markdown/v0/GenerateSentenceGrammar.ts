import { FileUtils } from "../../../src/Utils/FileUtil"

var tags = 
`
starBoldTag 
underlineBoldTag
starItalicTag 
underlineItalicTag
starBoldItalicTag 
underlineBoldItalicTag
strikethroughTag
highlightTag
subscriptTag
superscriptTag
doubleBacktickTag
backtickTag
fencedCodeBlockTag
`.split('\n').map(t=>t.trim()).filter(t=>t.length>0)

var result = 
`


`
var beginSymbols = tags.map(t=>'Begin'+t.at(0).toUpperCase()+t.substring(1, t.length-3)+'Text')
var no_text = tags.map(t=>'NO_'+t.at(0).toUpperCase()+t.substring(1, t.length-3)+'Text_Match_emphasis')
var typeSymbols = tags.map(t=>t.at(0).toUpperCase()+t.substring(1, t.length-3)+'Text')
var texts = tags.map((s,i)=>{
    return [
        `${beginSymbols[i]} -> ${tags[i]} ${no_text[i]}`,
        `${beginSymbols[i]} -> ${beginSymbols[i]} ${no_text[i]}`,
        `${typeSymbols[i]} -> ${beginSymbols[i]} ${tags[i]}`,
    ].join('\n')
}).join('\n\n')

result += `${texts}\n\n`

var no_Match_emphasis = tags.map((x, i)=>{
    return [`${no_text[i]} -> PlainText`].concat(
        tags.map((s,j)=>{
            if (i!=j) return `${no_text[i]} -> ${typeSymbols[j]}`
            return undefined
        }).filter(t=>t)
    ).join('\n')
}).join('\n\n')

result += `${no_Match_emphasis}\n\n`


var Match_emphasis = [`Match_emphasis -> PlainText`].concat(
    tags.map((s,j)=>{
        return `Match_emphasis -> ${typeSymbols[j]}`
    }).filter(t=>t)
).join('\n')

result += `${Match_emphasis}\n`


result += '\n\n\n'+tags.map((t,i)=>{

    var className = t.at(0).toUpperCase()+t.substring(1, t.length-3)+'Text'
    var variableName = t.substring(0, t.length-3)+'Text'

    var startGrammarProduction = `${beginSymbols[i]} -> ${tags[i]} ${no_text[i]}`
    var startGPFunctionName = startGrammarProduction.replace(new RegExp(' -> ', 'g'), '__').replace(new RegExp(' ', 'g'), '_')
    var startGPFunctionDef = [
        `@GrammarProductionFunction(\`${startGrammarProduction}\`)`,
        `${startGPFunctionName}(argv : Array<AnalysisToken>) {`,
        `    var ${variableName} : ${className} = new ${className}()`,
        `    ${variableName}.addChild(argv[1].value)`,
        `    return ${variableName}`,
        `}`
    ].join('\n')

    var appendGrammarProduction = `${beginSymbols[i]} -> ${beginSymbols[i]} ${no_text[i]}`
    var appendGPFunctionName = appendGrammarProduction.replace(new RegExp(' -> ', 'g'), '__').replace(new RegExp(' ', 'g'), '_')
    var appendGPFunctionDef = [
        `@GrammarProductionFunction(\`${appendGrammarProduction}\`)`,
        `${appendGPFunctionName}(argv : Array<AnalysisToken>) {`,
        `    var ${variableName} : ${className} = argv[0].value`,
        `    ${variableName}.addChild(argv[1].value)`,
        `    return ${variableName}`,
        `}`
    ].join('\n')

    var endGrammarProduction = `${typeSymbols[i]} -> ${beginSymbols[i]} ${tags[i]}`
    var endGPFunctionName = endGrammarProduction.replace(new RegExp(' -> ', 'g'), '__').replace(new RegExp(' ', 'g'), '_')
    var endGPFunctionDef = [
        `@GrammarProductionFunction(\`${endGrammarProduction}\`)`,
        `${endGPFunctionName}(argv : Array<AnalysisToken>) {`,
        `    return argv[0].value`,
        `}`
    ].join('\n')

    console.log([
        startGPFunctionDef,
        appendGPFunctionDef,
        endGPFunctionDef
    ].join('\n'))
    return [
        startGPFunctionDef,
        appendGPFunctionDef,
        endGPFunctionDef
    ].join('\n\n')
}).join('\n\n')

result += '\n' +
    [
        `@GrammarProductionFunction(\``,
        no_Match_emphasis.split('\n').map(s=>`    ${s}`).join('\n'),
        Match_emphasis.split('\n').map(s=>`    ${s}`).join('\n'),
        `\`)`,
        `passValueFunc(argv : Array<AnalysisToken>) {`,
        `    return argv[0].value`,
        `} `
    ].join('\n')



FileUtils.writeToFileSystem(`${__dirname}/GenerateLanguage.txt`, result)
// console.log(tag)
// console.log('Begin'+tag.substring(0, tag.length-3)+'Text')
// console.log('NO_'+tag.substring(0, tag.length-3)+'Text_Match_emphasis')
// console.log(tag.substring(0, tag.length-3)+'Text')