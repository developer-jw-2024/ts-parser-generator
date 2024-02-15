import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysis } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './Markdown_Language_Function'


var languageDefinition = FileUtils.readFromFileSystem('./test/Markdown/Markdown_Language.txt')
var tokenTypeDefinitionContent = FileUtils.readFromFileSystem('./test/Markdown/Markdown_RegExp.txt')

var lrSyntaxAnalysis = new LRSyntaxAnalysis().initWithLanguageDefinition(languageDefinition)
lrSyntaxAnalysis.setLanguageDefinitionFunctions(languageFunction)
lrSyntaxAnalysis.setTokenTypeDefinition(tokenTypeDefinitionContent)

var markdownContent = FileUtils.readFromFileSystem('./test/Markdown/Markdown_test_1.txt')
if (markdownContent[markdownContent.length-1]!='\n') {
    markdownContent += '\n'
}

var flag = lrSyntaxAnalysis.isValid(markdownContent)

lrSyntaxAnalysis.showValidationSteps()

