import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysisRunner } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './SimpleParsing_Language_Function'



var languageDefinitionPath : string = './test/SimpleParsing/SimpleParsing_Language.txt'
var tokenTypeDefinitionPath : string = './test/SimpleParsing/SimpleParsing_RegExp.txt'
var simpleParsing : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

var content = FileUtils.readFromFileSystem('./test/SimpleParsing/content.txt')
simpleParsing.isValid(content)
var item = simpleParsing.lrSyntaxAnalysis.analysisSteps.at(-1).symbolTokens.at(-1).value
// item = item.children[2]
console.log(item.toLabel())
console.log(item.toRelation())
// console.log(itemList.toContent())
// var tokens = simpleParsing.lrSyntaxAnalysis.toTokens(content)
// tokens.filter(t=>t.type.name=='ThirdLevel').forEach(t=>{
//     console.log(t.type.name, t.value.trim())
// })



