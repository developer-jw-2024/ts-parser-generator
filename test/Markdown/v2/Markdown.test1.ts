import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity }  from './Language_Function'
import { TestCaseUtils } from './TestCaseUtils'
import { FileUtils } from '../../FileUtil'


var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)

var testCasesContent = FileUtils.readFromFileSystem(`${__dirname}/TestCases`)
var testCases = TestCaseUtils.getTestCases(testCasesContent)

describe('markdown', () => {
    test('markdown', () => {
        for (var i=0;i<testCases.length;i++) {
            var testCase = testCases[i]
            if (testCase.content.at(-1)!='\n') {
                testCase.content += '\n'
            }
            try {
                markdown.isValid(testCase.content)
            } catch(error) {
                markdown.isValid(testCase.content, true)
            }
            expect(markdown.isValid(testCase.content)).toEqual(true)
            if (markdown.getValidationSteps_NoActions()!=testCase.result) {
                console.log(testCase.name)
                console.log(markdown.getValidationSteps_NoActions())
            }
            expect(markdown.getValidationSteps_NoActions()).toEqual(testCase.result)

                
        }
    })
})//end


