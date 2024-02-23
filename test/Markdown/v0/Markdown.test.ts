import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import languageFunction from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

describe('Markdown', () => {

    test('markdown - 0', () => {
        expect(markdown.isValid(
`abc`
        )).toEqual(true)
        console.log(markdown.getResult())
        // console.log(markdown.getValidationSteps_NoActions())
    })

})//end


