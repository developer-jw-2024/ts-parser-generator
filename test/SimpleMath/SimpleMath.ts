import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysis } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './SimpleMath_Language_Function'


var languageDefinition = FileUtils.readFromFileSystem('./test/SimpleMath/SimpleMath_Language.txt')
var tokenTypeDefinitionContent = FileUtils.readFromFileSystem('./test/SimpleMath/SimpleMath_RegExp.txt')

var lrSyntaxAnalysis = new LRSyntaxAnalysis().initWithLanguageDefinition(languageDefinition)
lrSyntaxAnalysis.setLanguageDefinitionFunctions(languageFunction)
lrSyntaxAnalysis.setTokenTypeDefinition(tokenTypeDefinitionContent)

var flag = lrSyntaxAnalysis.isValid("  3 / (1 - (-1))  ")

lrSyntaxAnalysis.showValidationSteps()

