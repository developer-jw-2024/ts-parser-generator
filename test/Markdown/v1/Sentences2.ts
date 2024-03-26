
import { TimeCounter } from "../../../src/Utils/Utils"
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var t : TimeCounter = new TimeCounter()
var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()
console.log('1: ', t.getTimePeriod())
var content = 
`\\\\\\*`



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content) as Markdown
console.log('1: ', t.getTimePeriod())
console.log(markdown.toMarkdownHierarchy('').join('\n'))
console.log('1: ', t.getTimePeriod())

