import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
// import { MarkdownLanguageFunctionsEntity } from './Language_Function_toMarkdownHierarchy'
import { FileUtils } from "../../../src/Utils/FileUtil";
var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)

var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner().init(languageDefinition, tokenTypeDefinition, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})
markdown.lrSyntaxAnalyzer.showGrammarProductionWithoutFunction()

var content = 
`he*l_`


markdown.isValid(content, true)
console.log(markdown.getResult())
console.log(markdown.getResult().toMarkdownHierarchy().join('\n'))

