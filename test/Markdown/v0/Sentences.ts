import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import languageFunction from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)
markdown.isValid(
`[![beautiful](https://img.com/1234 "Good")](http://travel.com "Travel")
`, true
)