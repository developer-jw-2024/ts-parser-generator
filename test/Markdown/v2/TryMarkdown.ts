import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity }  from './Language_Function'

import { TestCaseUtils } from './TestCaseUtils'
import { FileUtils } from '../../../src/Utils/FileUtil'


var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)

var testCasesContent = FileUtils.readFromFileSystem(`${__dirname}/TestCases`)
var testCases = TestCaseUtils.getTestCases(testCasesContent)

var continueFlag = true
var result : Array<string> = []
for (var i=0;continueFlag && i<testCases.length;i++) {
    var testCase = testCases[i]
    if (testCase.content.at(-1)!='\n') {
        testCase.content += '\n'
    }
    console.log(testCase.name)
    try {
        markdown.isValid(testCase.content)
    } catch(error) {
        
        markdown.isValid(testCase.content, true)
    }
    if (markdown.getValidationSteps_NoActions()!=testCase.result) {
        console.log(testCase.name)
        result.push(markdown.getValidationSteps_NoActions())
        continueFlag = false
    }
        
}
FileUtils.writeToFileSystem(`${__dirname}/output.txt`, result.join('\n\n'))