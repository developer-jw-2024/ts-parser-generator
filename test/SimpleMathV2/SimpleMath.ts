import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysis, LRSyntaxAnalysisRunner } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './SimpleMath_Language_Function'


var languageDefinitionPath = `${__dirname}/SimpleMath_Language.txt`
var tokenTypeDefinitionPath = `${__dirname}/SimpleMath_RegExp.txt`

var simpleMath : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

var equation = "1+"
var flag = simpleMath.isValid(equation, true)
var a = simpleMath.lrSyntaxAnalysis.analysisSteps.at(-1).symbolTokens.at(-1)
console.log(equation , '=', a.value)

