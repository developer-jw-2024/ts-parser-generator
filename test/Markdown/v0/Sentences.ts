import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import languageFunction from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.v1.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)
markdown.isValid(
    `**hello _toys_ wolrd**`, true
)