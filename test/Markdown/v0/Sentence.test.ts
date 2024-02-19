import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import languageFunction from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.v1.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

describe('Sentence', () => {
/*
    test('Sentence - 0', () => {
        expect(markdown.isValid(
            `  `
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 1', () => {
        expect(markdown.isValid(
            `abc`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 2', () => {
        expect(markdown.isValid(
            `I am`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())

    })

    test('Sentence - 3', () => {
        expect(markdown.isValid(
            `**hello wolrd**`, true
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
       
    })

    test('Sentence - 4', () => {
        expect(markdown.isValid(
            `__hello wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 5', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 6', () => {
        expect(markdown.isValid(
            `hello **Toys** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 7', () => {
        expect(markdown.isValid(
            `**hello** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 8', () => {
        expect(markdown.isValid(
            `hello **wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 9', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 10', () => {
        expect(markdown.isValid(
            `*hello* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 11', () => {
        expect(markdown.isValid(
            `hello *wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 12', () => {
        expect(markdown.isValid(
            `hello *toys* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
*/
    test('Sentence - 13', () => {
        expect(markdown.isValid(
            `**hello _toys_ wolrd**`, true
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
/*
    test('Sentence - 14', () => {
        expect(markdown.isValid(
            `__*toys* wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 15', () => {
        expect(markdown.isValid(
            `*__toys__*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 16', () => {
        expect(markdown.isValid(
            `_toys_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 17', () => {
        expect(markdown.isValid(
            `_**toys**_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 18', () => {
        expect(markdown.isValid(
            `**_toys_**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 19', () => {
        expect(markdown.isValid(
            `***toys***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 20', () => {
        expect(markdown.isValid(
            `_***toys***_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 21', () => {
        expect(markdown.isValid(
            `***_toys_***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 23', () => {
        expect(markdown.isValid(
            `*_toys_*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 24', () => {
        expect(markdown.isValid(
            `_*toys*_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 25', () => {
        expect(markdown.isValid(
            `**__toys__**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 26', () => {
        expect(markdown.isValid(
            `__**toys**__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
*/
})//end


