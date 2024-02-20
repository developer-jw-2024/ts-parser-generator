import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import languageFunction from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

describe('Markdown', () => {

    test('markdown - 0', () => {
        expect(markdown.isValid(
`*abc*  
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('markdown - 1', () => {
        expect(markdown.isValid(
`-*abc*  
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('markdown - 2', () => {
        expect(markdown.isValid(
`- *abc*  
- A**B**c
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('markdown - 3', () => {
        expect(markdown.isValid(
`1.This is a school 
2.The Apple
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })
})//end


