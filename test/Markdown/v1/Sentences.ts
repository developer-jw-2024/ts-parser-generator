
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"
import * as html from './HtmlLib'
import { FileUtils } from "../../../src/Utils/FileUtil"

var content = FileUtils.readFromFileSystem(`${__dirname}/Sentences.txt`)
var lines = content.split('\n')

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

var content = lines[0]



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content) as Markdown
var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
console.log(htmlElement.toHtmlString())
// console.log(markdown.toMarkdownHierarchy('').join('\n'))

