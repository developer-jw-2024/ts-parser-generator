import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysis, LRSyntaxAnalysisRunner } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './SimpleMath_Language_Function'


var languageDefinitionPath = './test/SimpleMath/SimpleMath_Language.txt'
var tokenTypeDefinitionPath = './test/SimpleMath/SimpleMath_RegExp.txt'

var simpleMath : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

var equation = "  3 / (1 - (-1))  "
var flag = simpleMath.isValid(equation)
var a = simpleMath.lrSyntaxAnalysis.analysisSteps.at(-1).symbolTokens.at(-1)
console.log(equation , '=', a.value)

