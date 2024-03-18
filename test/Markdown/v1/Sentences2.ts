
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

var content = 
`1. coding
    \`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
    \`\`\`
    The Aboeve ...`



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content, true) as Markdown

console.log(markdown.toMarkdownHierarchy('', true).join('\n'))

