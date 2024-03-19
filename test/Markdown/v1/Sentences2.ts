
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

var content = 
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content) as Markdown

console.log(markdown.toMarkdownHierarchy('').join('\n'))

