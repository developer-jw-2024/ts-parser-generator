import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { FileUtils } from '../../../src/Utils/FileUtil'
import languageFunction from './Language_Function'
import { TestCaseUtils } from './TestCaseUtils'

var languageDefinitionPath : string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath : string = `${__dirname}/RegExp.txt`
var markdown : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

var testCasesContent = FileUtils.readFromFileSystem(`${__dirname}/TestCases`)
var testCases = TestCaseUtils.getTestCases(testCasesContent)
var continueFlag : boolean = true
for (var i=0;i<testCases.length;i++) {
    var testCase = testCases[i]
    if (testCase.content.at(-1)!='\n') {
        testCase.content += '\n'
    }
    markdown.isValid(testCase.content)
    if (markdown.getValidationSteps_NoActions()==testCase.result) {
        console.log(testCase.name, '   OK')
    } else {
        console.log(testCase.name, 'Error')
        console.log(markdown.getValidationSteps_NoActions())
    }
}


