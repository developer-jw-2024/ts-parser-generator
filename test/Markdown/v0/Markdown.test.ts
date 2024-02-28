import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})
describe('Markdown', () => {

    test('markdown - 0', () => {
        expect(markdown.isValid(
`|abc`
        )).toEqual(true)
        console.log(markdown.getResult())
        // console.log(markdown.getResult().toHierarchy().join('\n'))
        // console.log(markdown.getValidationSteps_NoActions())
    })

})//end


