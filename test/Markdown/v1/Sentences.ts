
import { Blockquote, Markdown } from "./MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"
import * as html from './HtmlLib'
import { FileUtils } from "../../FileUtil"
import { TimeCounter } from "../../../src/Utils/Utils"
var t : TimeCounter = new TimeCounter()
var content = FileUtils.readFromFileSystem(`${__dirname}/Sentences.txt`)
var lines = content.split('\n')
console.log('Read data: ', t.getTimePeriod())
var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()
console.log('Build Analyzer: ', t.getTimePeriod())
var content = lines[0]



var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(content) as Markdown
var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
console.log(htmlElement.toHtmlString())
console.log('convert to html:  ', t.getTimePeriod())
// console.log(markdown.toMarkdownHierarchy('').join('\n'))

