import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
import { Blockquote, ComplementBlock, Markdown } from './MarkdownLib'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

export class MarkdownSyntaxAnalyzer {
    lrSyntaxAnalyzerRunner: LRSyntaxAnalyzerRunner

    init() {
        this.lrSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner().init(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
        this.lrSyntaxAnalyzerRunner.setPreprocessing((v:string):string=>{
            if (v.at(-1)!='\n') return v+'\n'
            return v
        })
        return this
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
        var unhandledComplementBlocks : Array<ComplementBlock> = markdown.getUnhandledComplementBlocks()
        // console.log(unhandledBlockquotes.length, unhandledComplementBlocks.length)
        while (unhandledBlockquotes.length>0 || unhandledComplementBlocks.length>0) {
            for (var i=0;i<unhandledBlockquotes.length;i++) {
                var unhandledBlockquote : Blockquote = unhandledBlockquotes[i]
                var content : string = unhandledBlockquote.getContent()
                
                var blockquoteMarkdown : Markdown =  this.convdertToMarkdown(content, debug)
                unhandledBlockquote.getMarkdownElements().push(blockquoteMarkdown)
                unhandledBlockquote.isHandledFlag = true
            }
            // console.log(unhandledComplementBlocks)
            for (var i=0;i<unhandledComplementBlocks.length;i++) {
                var unhandledComplementBlock : ComplementBlock = unhandledComplementBlocks[i]
                
                var content : string = unhandledComplementBlock.getContent()
                var lines = content.split('\n').map(l=>l.substring(4))
                content = lines.join('\n')
                // console.log(i)
                // console.log(`[${content}]`)
                // console.log(lines.map(l=>`[${l}]`).join('\n'))
                var complementMarkdown : Markdown =  this.convdertToMarkdown(content, debug)
                unhandledComplementBlock.getMarkdownElements().push(complementMarkdown)
                unhandledComplementBlock.isHandledFlag = true
            }
            unhandledBlockquotes = markdown.getUnhandledBlockquotes()
            unhandledComplementBlocks = markdown.getUnhandledComplementBlocks()
            // console.log(unhandledBlockquotes.length, unhandledComplementBlocks.length)
        }
        return markdown
    }
}