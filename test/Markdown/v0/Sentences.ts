import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})
// markdown.lrSyntaxAnalysis.showGrammarProductionWithoutFunction()

var content = 
`1. abc
    >dfd`


markdown.isValid(content)
console.log(markdown.getResult())
// console.log(markdown.getResult().toMarkdownHierarchy().join('\n'))

