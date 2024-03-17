import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
import { Markdown } from './MarkdownLib'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

export class MarkdownSyntaxAnalyzer {
    lrSyntaxAnalyzerRunner: LRSyntaxAnalyzerRunner

    constructor() {
        this.lrSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
        this.lrSyntaxAnalyzerRunner.setPreprocessing((v:string):string=>{
            if (v.at(-1)!='\n') return v+'\n'
            return v
        })
    }

    toMarkddown(content : string) : Markdown | null {
        if (this.lrSyntaxAnalyzerRunner.isValid(content)) {
            return this.lrSyntaxAnalyzerRunner.getResult() as Markdown
        }
        return null
    }
}