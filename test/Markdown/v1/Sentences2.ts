
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

var content = 
`\\*`



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content, true) as Markdown

console.log(markdown.toMarkdownHierarchy('').join('\n'))

console.log(`[${content}]`)