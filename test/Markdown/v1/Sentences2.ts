import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

var content = 
`> hello I afd
> fafa
1. Fruite
    > Apple
    > Banana
2. Animals`


// console.log(markdownSyntaxAnalyzer.toMarkddown(content))
console.log(markdownSyntaxAnalyzer.toMarkddown(content).toMarkdownHierarchy().join('\n'))

