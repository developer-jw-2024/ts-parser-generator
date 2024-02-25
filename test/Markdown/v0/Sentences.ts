import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)

markdown.isValid(
    `|abc`, true
            )


