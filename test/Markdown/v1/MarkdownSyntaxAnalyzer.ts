import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
import { Blockquote, Markdown } from './MarkdownLib'

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

    private convdertToMarkdown(content : string, debug : boolean = false) : Markdown | null {
        if (this.lrSyntaxAnalyzerRunner.isValid(content, debug)) {
            var markdown : Markdown = this.lrSyntaxAnalyzerRunner.getResult() as Markdown
            return markdown
        }
        return null
    }

    toMarkddown(content : string, debug : boolean = false) : Markdown | null {
        var markdown : Markdown = this.convdertToMarkdown(content, debug) as Markdown

        var unhandledBlockquotes : Array<Blockquote> = markdown.getUnhandledBlockquotes()
        while (unhandledBlockquotes.length>0) {
            for (var i=0;i<unhandledBlockquotes.length;i++) {
                var unhandledBlockquote : Blockquote = unhandledBlockquotes[i]
                var content : string = unhandledBlockquote.getContent()
                var blockquoteMarkdown : Markdown =  this.convdertToMarkdown(content, debug)
                unhandledBlockquote.getMarkdownElements().push(blockquoteMarkdown)
                unhandledBlockquote.isHandledFlag = true
            }
            unhandledBlockquotes = markdown.getUnhandledBlockquotes()
        }
        return markdown
    }
}