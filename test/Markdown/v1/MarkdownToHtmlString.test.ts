import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().init()

import * as html from './HtmlLib'
import { Markdown } from "./MarkdownLib"

//var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
describe('Markdown', () => {

    test('markdown - 0-(-1)', () => {
        
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual('<br/>')
        
    })


    test('markdown - 0-(-2)', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual('<br/>')
        
    })

    test('markdown - 0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`hello`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        
        expect(htmlElement.toHtmlString()).toEqual(
`<p>hello</p>`
        )
    })


    test('markdown - 0-0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`he*l_l*_o`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`he*l_l*_o`
        )
        
    })

    test('markdown - 0-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
he*l_l*_o`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>I go to school.</p>
he*l_l*_o`
        )
        
    })


    test('markdown - 0-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
You go home`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>I go to school.<br/>You go home</p>`
        )
    })

    test('markdown - 0-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.

You go home`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>I go to school.</p>
<br/>
<p>You go home</p>`
        )
        
    })

    test('markdown - 1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>This is abc</p>`
        )
        
    })


    test('markdown - 2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is** abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`This *is** abc`
        )
    })


    test('markdown - 3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>This <em>is</em> abc</p>`)
    })


    test('markdown - 4', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc
This is that.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>This <em>is</em> abc<br/>This is that.</p>`)

    })


    test('markdown - 5', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<br/>`)

    })


    test('markdown - 6', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<br/>`)
    })


    test('markdown - 7', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`## hello
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h2>hello</h2>`)
    })


    test('markdown - 8', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>First Item</li>
</ol>`)
    })


    test('markdown - 9', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>First Item</li>
    <li>Second Item</li>
</ol>`)
    
    })


    test('markdown - 10', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
3. Third Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ol>`)
    })


    test('markdown - 11', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>First Item</li>
</ul>`            
        )

    })


    test('markdown - 12', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>First Item</li>
    <li>Second Item</li>
</ul>`            
        )
    })


    test('markdown - 13', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
- Third Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ul>`            
        )
    })


    test('markdown - 14', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <p>This is a sentence</p>
</div>`
        )
    })


    test('markdown - 14-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>&gt;</p>`
        )
    })


    test('markdown - 14-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <br/>
</div>`
        )
    })


    test('markdown - 14-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> H`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <p>H</p>
</div>`
        )
    })


    test('markdown - 15', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
> This is the second sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <p>This is a sentence<br/>This is the second sentence</p>
</div>`
        )
    })


    test('markdown - 16', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <div class="blockquote">
        <p>This is a sentence</p>
    </div>
</div>`
        )
    })


    test('markdown - 16-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>>`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>&gt;&gt;</p>`
        )
    })


    test('markdown - 16-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <div class="blockquote">
        <br/>
    </div>
</div>`
        )
    })


    test('markdown - 17', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
>> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <div class="blockquote">
        <p>This is a sentence<br/>This is the</p>
    </div>
</div>`
        )
    })


    test('markdown - 18', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
>> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <h1>ONK</h1>
    <div class="blockquote">
        <p>This is a sentence<br/>This is the</p>
    </div>
</div>`
        )
    })

    test('markdown - 19', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <h1>ONK</h1>
    <div class="blockquote">
        <p>This is a sentence</p>
    </div>
    <p>This is the</p>
</div>`
        )
    })

    test('markdown - 20', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <p>Apple</p>
    </li>
</ol>` 
        )

    })

    test('markdown - 21', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
    Banana
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <p>Apple<br/>Banana</p>
    </li>
</ol>` 
        )
    })

    test('markdown - 22', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
    Banana
2. Animals
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <p>Apple<br/>Banana</p>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 23', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    > Apple
    > Banana
2. Animals
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <div class="blockquote">
            <p>Apple<br/>Banana</p>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 24', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
    2. Banana
2. Animals
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <ol>
            <li>Apple</li>
            <li>Banana</li>
        </ol>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })


    test('markdown - 25', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    > Red
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <div class="blockquote">
            <p>Red</p>
        </div>
    </li>
</ol>` 
        )
    })

    test('markdown - 26', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
        > Red is my
    2. Banana
2. Animals
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <ol>
            <li>Apple
                <div class="blockquote">
                    <p>Red is my</p>
                </div>
            </li>
            <li>Banana</li>
        </ol>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 26-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
    > Red is my
    2. Banana
2. Animals
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>Fruite
        <ol>
            <li>Apple</li>
        </ol>
        <div class="blockquote">
            <p>Red is my</p>
        </div>
        <ol>
            <li>Banana</li>
        </ol>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })


    test('markdown - 27', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>Fruite</li>
</ul>` 
        )
    })

    test('markdown - 27-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- 
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li></li>
</ul>` 
        )
    })

    test('markdown - 28', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
- Animal
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>Fruite</li>
    <li>Animal</li>
</ul>` 
        )
    })


    test('markdown - 29', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
    - Apple
    - Banana
- Animal
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>Fruite
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Animal</li>
</ul>` 
        )
    })

    test('markdown - 30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"type `nano`."
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>type \`nano\`.</p>` 
        )
    })

    test('markdown - 30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"``Use `code` in your Markdown file.``"
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>\`\`Use \`code\` in your Markdown file.\`\`</p>` 
        )
    })


    test('markdown - 31', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"---"
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<hr>` 
        )
    })

    test('markdown - 32', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2
----------`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h2>This is heading 2</h2>` 
        )
    })

    test('markdown - 33', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2

----------`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>This is heading 2</p>
<br/>
<hr>` 
        )
        
    })

    test('markdown - 34', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`===========`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`` 
        )
    })


    test('markdown - 35', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading
===========`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h1>This is the first level heading</h1>` 
        )
    })

    test('markdown - 36', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading

===========`
        )
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>This is the first level heading</p>
<br/>` 
        )
        
    })

    test('markdown - 37', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Syntax</td>
            <td>Description</td>
        </tr>
    </tbody>
</table>` 
        )
        
    })

    test('markdown - 38', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    test('markdown - 38-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`|    Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })


    test('markdown - 39', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description | Num | Checked |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th class="TableCellAlignLeft">Description</th>
            <th class="TableCellAlignCenter">Num</th>
            <th class="TableCellAlignRight">Checked</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Header</td>
            <td class="TableCellAlignLeft">Title</td>
            <td class="TableCellAlignCenter">3</td>
            <td class="TableCellAlignRight">true</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td class="TableCellAlignLeft">Text</td>
            <td class="TableCellAlignCenter">8</td>
            <td class="TableCellAlignRight">false</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    test('markdown - 40', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td class="TableCellAlignLeft">Title</td>
            <td class="TableCellAlignCenter">3</td>
            <td class="TableCellAlignRight">true</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td class="TableCellAlignLeft">Text</td>
            <td class="TableCellAlignCenter">8</td>
            <td class="TableCellAlignRight">false</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    
    test('markdown - 41', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Syntax</td>
            <td>Description</td>
        </tr>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })


    test('markdown - 42', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`\`\`\`
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
\`\`\``
        )
        
    })
    

    test('markdown - 43', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    \`\`\`
    {
      &quot;firstName&quot;: &quot;John&quot;,
      &quot;lastName&quot;: &quot;Smith&quot;,
      &quot;age&quot;: 25
    }
    \`\`\`
</div>`
        )      
    })


    test('markdown - 44', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. coding
    > \`\`\`
    > {
    >   "firstName": "John",
    >   "lastName": "Smith",
    >   "age": 25
    > }
    > \`\`\``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>coding
        <div class="blockquote">
            \`\`\`
            {
              &quot;firstName&quot;: &quot;John&quot;,
              &quot;lastName&quot;: &quot;Smith&quot;,
              &quot;age&quot;: 25
            }
            \`\`\`
        </div>
    </li>
</ol>`)
    })


    test('markdown - 45', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. coding
    \`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
    \`\`\``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>coding
        \`\`\`
        {
            &quot;firstName&quot;: &quot;John&quot;,
            &quot;lastName&quot;: &quot;Smith&quot;,
            &quot;age&quot;: 25
        }
        \`\`\`
    </li>
</ol>`)
    })

    test('markdown - 46', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
        )
    })
    

    test('markdown - 46-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.`
        )
        
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <p>That are<br/>Bee.</p>
    </dd>
</dl>`
        )
    })


    test('markdown - 46-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.
: that are`
        )
        
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <p>That are<br/>Bee.</p>
    </dd>
    <dd>that are</dd>
</dl>`
        )
    })

    test('markdown - 46-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.
: that are
Second Term
: Those are`
        )
        
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <p>That are<br/>Bee.</p>
    </dd>
    <dd>that are</dd>
    <dt>Second Term</dt>
    <dd>Those are</dd>
</dl>`
        )
    })

    test('markdown - 47', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })


    test('markdown - 48', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.
Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })

    test('markdown - 49', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>
<br/>
<dl>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })

    test('markdown - 50', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
</div>`
        )
    })

    test('markdown - 51', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
    <input type="checkbox">
    <label>Update the website</label>
    <input type="checkbox">
    <label>Contact the media</label>
</div>`
        )
    })

    test('markdown - 52', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [Y] Contact the media
- [ ] Update the website
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
</div>
- [Y] Contact the media
<div class="taskList">
    <input type="checkbox">
    <label>Update the website</label>
</div>`
        )
    })

    test('markdown - 53', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> First Term
: This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <p>First Term</p>
</div>
<dl>
    <dt></dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
        )
        
    })

    test('markdown - 54', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> First Term
> : This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div class="blockquote">
    <dl>
        <dt>First Term</dt>
        <dd>This is the definition of the first term.</dd>
    </dl>
</div>`
        )
    })


    test('markdown - 55', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. coding
> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>coding</li>
</ol>
<div class="blockquote">
    \`\`\`
    {
      &quot;firstName&quot;: &quot;John&quot;,
      &quot;lastName&quot;: &quot;Smith&quot;,
      &quot;age&quot;: 25
    }
    \`\`\`
</div>`
        )
    })


    test('markdown - 56-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`Here's a simple footnote,[^1] and here's a longer one.[^bignote]`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>Here&apos;s a simple footnote,<sup><a href="#fn:1" class="footnote" rel="footnote">1</a></sup> and here&apos;s a longer one.<sup><a href="#fn:bignote" class="footnote" rel="footnote">bignote</a></sup></p>`
        )
    })

    test('markdown - 56', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div><span id="fn:Variable">Variable</span>This is good foot note.</div>`
        )
    })


    test('markdown - 57', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div><span id="fn:Variable">Variable</span>This is good foot note.
    <p>Indent paragraphs to include them in the footnote.</p>
</div>`
        )
    })


    test('markdown - 58', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    Apple`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>hello
        <p>Apple</p>
    </li>
</ol>`
        )
    })


    test('markdown - 59', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>hello
        <br/>
    </li>
</ol>`
        )
    })


    test('markdown - 60', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    
    `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>hello
        <br/>
    </li>
</ol>`
        )

    })

    test('markdown - 61', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div><span id="fn:Variable">Variable</span>This is good foot note.
    <p>Indent paragraphs to include them in the footnote.<br/>\`{ my code }\`</p>
    <br/>
    <p>Add as many paragraphs as you like.</p>
</div>`
        )
    })


    test('markdown - 62', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    
    > Add as many paragraphs as you like.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div><span id="fn:Variable">Variable</span>This is good foot note.
    <div class="blockquote">
        <p>Indent paragraphs to include them in the footnote.<br/>\`{ my code }\`</p>
    </div>
    <br/>
    <div class="blockquote">
        <p>Add as many paragraphs as you like.</p>
    </div>
</div>`
        )
    })


    test('markdown - 63', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    > 
    > Add as many paragraphs as you like.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<div><span id="fn:Variable">Variable</span>This is good foot note.
    <div class="blockquote">
        <p>Indent paragraphs to include them in the footnote.<br/>\`{ my code }\`</p>
        <br/>
        <p>Add as many paragraphs as you like.</p>
    </div>
</div>`
        )
    })


    test('markdown - inputing-0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<br/>`
        )
    })


    test('markdown - inputing-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p><span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>#</p>`
        )
    })


    test('markdown - inputing-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>#<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-4', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`# ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h1><span class="cursor">|</span></h1>`
        )
    })


    test('markdown - inputing-5', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h1></h1>`
        )
    })


    test('markdown - inputing-6', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮# `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h1></h1>`
        )
    })


    test('markdown - inputing-7', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮# `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<h2></h2>`
        )
    })


    test('markdown - inputing-8', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`-`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>-</p>`
        )
    })


    test('markdown - inputing-9', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })


    test('markdown - inputing-10', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>+</p>`
        )
    })


    test('markdown - inputing-11', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })


    test('markdown - inputing-12', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`-▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>-<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-13', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li><span class="cursor">|</span></li>
</ul>`
        )
    })


    test('markdown - inputing-14', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>+<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-15', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li><span class="cursor">|</span></li>
</ul>`
        )
    })

    test('markdown - inputing-16', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })

    test('markdown - inputing-16-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ + ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`+ + ▮`
        )
    })

    test('markdown - inputing-16-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ hello`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>hello</li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ +`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>+</li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ +▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ul>
    <li>+<span class="cursor">|</span></li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ + ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`+ + ▮`
        )
    })

    test('markdown - inputing-17', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>1</p>`
        )
    })

    test('markdown - inputing-18', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>1.</p>`
        )
    })

    test('markdown - inputing-19', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-20', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>1<span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-21', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>1.<span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-22', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-23', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. a`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li>a</li>
</ol>`
        )
    })

    test('markdown - inputing-24', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li><span class="cursor">|</span></li>
</ol>`
        )
    })

    test('markdown - inputing-25', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-26', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1▮. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-27', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-28', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮1.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p><span class="cursor">|</span>1.</p>`
        )
    })

    test('markdown - inputing-29', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p><span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`\\*`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>*</p>`
        )
    })

    test('markdown - inputing-30-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`\\\\*`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`\\*`
        )
    })

    test('markdown - inputing-31', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`\\\\\\*`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        expect(htmlElement.toHtmlString()).toEqual(
`<p>\\*</p>`
        )
    })
})


