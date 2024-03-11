import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
// import { MarkdownLanguageFunctionsEntity } from './Language_Function_toMarkdownHierarchy'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})
markdown.lrSyntaxAnalyzer.showGrammarProductionWithoutFunction()

var content = 
`+ `


markdown.isValid(content, true)
console.log(markdown.getResult())
console.log(markdown.getResult().toMarkdownHierarchy().join('\n'))

