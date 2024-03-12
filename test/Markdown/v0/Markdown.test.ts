import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})


describe('Markdown', () => {

    test('markdown - 0-(-1)', () => {
        expect(markdown.isValid(
``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - 0', () => {
        expect(markdown.isValid(
`hello`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - 0-0', () => {
        expect(markdown.isValid(
`he*l_l*_o`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    MarkdownError`)
    })

    test('markdown - 0-1', () => {
        expect(markdown.isValid(
`I go to school.
he*l_l*_o`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
    MarkdownError`)
    })

    test('markdown - 0-2', () => {
        expect(markdown.isValid(
`I go to school.
You go home`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
        Sentence`)
    })

    test('markdown - 0-3', () => {
        expect(markdown.isValid(
`I go to school.

You go home`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
    BlankLine
    Paragraph
        Sentence`)
    })


    test('markdown - 1', () => {
        expect(markdown.isValid(
`This is abc`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - 2', () => {
        expect(markdown.isValid(
`This *is** abc`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    MarkdownError`)
    })

    test('markdown - 3', () => {
        expect(markdown.isValid(
`This *is* abc`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - 4', () => {
        expect(markdown.isValid(
`This *is* abc
This is that.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
        Sentence`)
    })

    test('markdown - 5', () => {
        expect(markdown.isValid(
``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })


    test('markdown - 6', () => {
        expect(markdown.isValid(
`
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })


    test('markdown - 7', () => {
        expect(markdown.isValid(
`## hello
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence`)
    })

    test('markdown - 8', () => {
        expect(markdown.isValid(
`1. First Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence`)
    })

    test('markdown - 9', () => {
        expect(markdown.isValid(
`1. First Item
2. Second Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
        OrderedItem
            Sentence`)
    })

    test('markdown - 10', () => {
        expect(markdown.isValid(
`1. First Item
2. Second Item
3. Third Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
        OrderedItem
            Sentence
        OrderedItem
            Sentence`)
    })


    test('markdown - 11', () => {
        expect(markdown.isValid(
`- First Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })

    test('markdown - 12', () => {
        expect(markdown.isValid(
`- First Item
- Second Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
        UnorderedItem
            Sentence`)
    })

    test('markdown - 13', () => {
        expect(markdown.isValid(
`- First Item
- Second Item
- Third Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
        UnorderedItem
            Sentence
        UnorderedItem
            Sentence`)
    })


    test('markdown - 14', () => {
        expect(markdown.isValid(
`> This is a sentence
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence`)
    })

    test('markdown - 14-1', () => {
        expect(markdown.isValid(
`>`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - 14-2', () => {
        expect(markdown.isValid(
`> `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            BlankLine`)
    })

    test('markdown - 14-3', () => {
        expect(markdown.isValid(
`> H`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence`)
    })

    test('markdown - 15', () => {
        expect(markdown.isValid(
`> This is a sentence
> This is the second sentence
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
                Sentence`)
    })


    test('markdown - 16', () => {
        expect(markdown.isValid(
`>> This is a sentence
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence`)
    })

    test('markdown - 16-1', () => {
        expect(markdown.isValid(
`>>`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - 16-2', () => {
        expect(markdown.isValid(
`>> `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    BlankLine`)
    })

    test('markdown - 17', () => {
        expect(markdown.isValid(
`>> This is a sentence
>> This is the
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                        Sentence`)
    })

    test('markdown - 18', () => {
        expect(markdown.isValid(
`> # ONK
>> This is a sentence
>> This is the
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Heading
                Sentence
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                        Sentence`)
    })

    test('markdown - 19', () => {
        expect(markdown.isValid(
`> # ONK
>> This is a sentence
> This is the
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Heading
                Sentence
            Blockquote
                Markdown
                    Paragraph
                        Sentence
            Paragraph
                Sentence`)
    })

    test('markdown - 20', () => {
        expect(markdown.isValid(
`1. Fruite
    Apple
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Paragraph
                    Sentence`)
    })

    test('markdown - 21', () => {
        expect(markdown.isValid(
`1. Fruite
    Apple
    Banana
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Paragraph
                    Sentence
                    Sentence`)
    })

    test('markdown - 22', () => {
        expect(markdown.isValid(
`1. Fruite
    Apple
    Banana
2. Animals
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Paragraph
                    Sentence
                    Sentence
        OrderedItem
            Sentence`)
    })

    test('markdown - 23', () => {
        expect(markdown.isValid(
`1. Fruite
    > Apple
    > Banana
2. Animals
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Blockquote
                    Markdown
                        Paragraph
                            Sentence
                            Sentence
        OrderedItem
            Sentence`)
    })

    test('markdown - 24', () => {
        expect(markdown.isValid(
`1. Fruite
    1. Apple
    2. Banana
2. Animals
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                OrderedList
                    OrderedItem
                        Sentence
                    OrderedItem
                        Sentence
        OrderedItem
            Sentence`)
    })

    
    test('markdown - 25', () => {
        expect(markdown.isValid(
`1. Fruite
    > Red
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Blockquote
                    Markdown
                        Paragraph
                            Sentence`)
    })

    test('markdown - 26', () => {
        expect(markdown.isValid(
`1. Fruite
    1. Apple
        > Red
    2. Banana
2. Animals
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                OrderedList
                    OrderedItem
                        Sentence
                        Markdown
                            Blockquote
                                Markdown
                                    Paragraph
                                        Sentence
                    OrderedItem
                        Sentence
        OrderedItem
            Sentence`)
    })
    
    test('markdown - 27', () => {
        expect(markdown.isValid(
`- Fruite
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })

    test('markdown - 27-1', () => {
        expect(markdown.isValid(
`- 
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - 28', () => {
        expect(markdown.isValid(
`- Fruite
- Animal
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
        UnorderedItem
            Sentence`)
    })


    test('markdown - 29', () => {
        expect(markdown.isValid(
`- Fruite
    - Apple
    - Banana
- Animal
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
            Markdown
                UnorderedList
                    UnorderedItem
                        Sentence
                    UnorderedItem
                        Sentence
        UnorderedItem
            Sentence`)
    })

    test('markdown - 30', () => {
        expect(markdown.isValid(
"type `nano`."
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - 30', () => {
        expect(markdown.isValid(
"``Use `code` in your Markdown file.``"
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - 31', () => {
        expect(markdown.isValid(
"---"
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    HorizontalRule
        ---`)
    })

    test('markdown - 32', () => {
        expect(markdown.isValid(
`This is heading 2
----------`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence`)
    })

    test('markdown - 33', () => {
        expect(markdown.isValid(
`This is heading 2

----------`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
    BlankLine
    HorizontalRule
        ----------`)
    })

    test('markdown - 34', () => {
        expect(markdown.isValid(
`===========`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown`)
    })


    test('markdown - 35', () => {
        expect(markdown.isValid(
`This is the first level heading
===========`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence`)
    })

    test('markdown - 36', () => {
        expect(markdown.isValid(
`This is the first level heading

===========`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
    BlankLine`)
    })

    test('markdown - 37', () => {
        expect(markdown.isValid(
`| Syntax      | Description |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow`)
    })

    test('markdown - 38', () => {
        expect(markdown.isValid(
`| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
        TableRow`)
    })

    test('markdown - 38-1', () => {
        expect(markdown.isValid(
`|    Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
        TableRow`)
    })


    test('markdown - 39', () => {
        expect(markdown.isValid(
`| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
        TableRow`)
    })

    test('markdown - 40', () => {
        expect(markdown.isValid(
`| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
        TableRow`)
    })

    test('markdown - 41', () => {
        expect(markdown.isValid(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
        TableRow
        TableRow`)
    })


    test('markdown - 42', () => {
        expect(markdown.isValid(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    FencedCodeBlockText`)
    })
    

    test('markdown - 43', () => {
        expect(markdown.isValid(
`> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            FencedCodeBlockText`)
    })

    test('markdown - 44', () => {
        expect(markdown.isValid(
`1. coding
    > \`\`\`
    > {
    >   "firstName": "John",
    >   "lastName": "Smith",
    >   "age": 25
    > }
    > \`\`\``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Blockquote
                    Markdown
                        FencedCodeBlockText`)
    })

    test('markdown - 45', () => {
        expect(markdown.isValid(
`1. coding
    \`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
    \`\`\``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                FencedCodeBlockText`)
    })

    test('markdown - 46', () => {
        expect(markdown.isValid(
`First Term
: This is the definition of the first term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DescriptionList
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence`)
    })

    test('markdown - 47', () => {
        expect(markdown.isValid(
`Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DescriptionList
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence
            DefinitionListItem
                Sentence`)
    })

    test('markdown - 48', () => {
        expect(markdown.isValid(
`First Term
: This is the definition of the first term.
Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DescriptionList
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence
            DefinitionListItem
                Sentence`)
    })

    test('markdown - 49', () => {
        expect(markdown.isValid(
`First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DescriptionList
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence
    BlankLine
    DescriptionList
        DefinitionListItemGroup
            Sentence
            DefinitionListItem
                Sentence
            DefinitionListItem
                Sentence`)
    })

    test('markdown - 50', () => {
        expect(markdown.isValid(
`- [x] Write the press release`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence`)
    })

    test('markdown - 51', () => {
        expect(markdown.isValid(
`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence
        TaskListItem
            Sentence
        TaskListItem
            Sentence`)
    })

    test('markdown - 52', () => {
        expect(markdown.isValid(
`- [x] Write the press release
- [Y] Contact the media
- [ ] Update the website
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence
    MarkdownError
    TaskList
        TaskListItem
            Sentence`)
    })

    test('markdown - 53', () => {
        expect(markdown.isValid(
`> First Term
: This is the definition of the first term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
    DescriptionList
        DefinitionListItemGroup
            DefinitionListItem
                Sentence`)
    })

    test('markdown - 54', () => {
        expect(markdown.isValid(
`> First Term
> : This is the definition of the first term.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            DescriptionList
                DefinitionListItemGroup
                    Sentence
                    DefinitionListItem
                        Sentence`)
    })

    test('markdown - 55', () => {
        expect(markdown.isValid(
`1. coding
> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
    Blockquote
        Markdown
            FencedCodeBlockText`)
    })

    
    test('markdown - 56', () => {
        expect(markdown.isValid(
`[^Variable]: This is good foot note.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence`)
    })

    test('markdown - 57', () => {
        expect(markdown.isValid(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
        Markdown
            Paragraph
                Sentence`)
    })

    test('markdown - 58', () => {
        expect(markdown.isValid(
`1. hello
    Apple`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                Paragraph
                    Sentence`)
    })

    test('markdown - 59', () => {
        expect(markdown.isValid(
`1. hello
    `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                BlankLine`)
    })

    test('markdown - 60', () => {
        expect(markdown.isValid(
`1. hello
    
    `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
            Markdown
                BlankLine
                BlankLine`)
    })

    test('markdown - 61', () => {
        expect(markdown.isValid(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
        Markdown
            Paragraph
                Sentence
                Sentence
            BlankLine
            Paragraph
                Sentence`)
    })

    test('markdown - 62', () => {
        expect(markdown.isValid(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    
    > Add as many paragraphs as you like.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                        Sentence
            BlankLine
            Blockquote
                Markdown
                    Paragraph
                        Sentence`)
    })

    test('markdown - 63', () => {
        expect(markdown.isValid(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    > 
    > Add as many paragraphs as you like.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                        Sentence
                    BlankLine
                    Paragraph
                        Sentence`)
    })

    test('markdown - inputing-0', () => {
        expect(markdown.isValid(
``
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - inputing-1', () => {
        expect(markdown.isValid(
`▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-2', () => {
        expect(markdown.isValid(
`#`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-3', () => {
        expect(markdown.isValid(
`#▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-4', () => {
        expect(markdown.isValid(
`# ▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence`)
    })

    test('markdown - inputing-5', () => {
        expect(markdown.isValid(
`#▮ `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-6', () => {
        expect(markdown.isValid(
`▮# `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-7', () => {
        expect(markdown.isValid(
`#▮# `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-8', () => {
        expect(markdown.isValid(
`-`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-9', () => {
        expect(markdown.isValid(
`- `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })


    test('markdown - inputing-10', () => {
        expect(markdown.isValid(
`+`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-11', () => {
        expect(markdown.isValid(
`+ `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-12', () => {
        expect(markdown.isValid(
`-▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-13', () => {
        expect(markdown.isValid(
`- ▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })


    test('markdown - inputing-14', () => {
        expect(markdown.isValid(
`+▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-15', () => {
        expect(markdown.isValid(
`+ ▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })

    test('markdown - inputing-16', () => {
        expect(markdown.isValid(
`+▮ `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-17', () => {
        expect(markdown.isValid(
`1`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-18', () => {
        expect(markdown.isValid(
`1.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-19', () => {
        expect(markdown.isValid(
`1. `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-20', () => {
        expect(markdown.isValid(
`1▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-21', () => {
        expect(markdown.isValid(
`1.▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-22', () => {
        expect(markdown.isValid(
`1. `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-23', () => {
        expect(markdown.isValid(
`1. a`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence`)
    })

    test('markdown - inputing-24', () => {
        expect(markdown.isValid(
`1. ▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence`)
    })

    test('markdown - inputing-25', () => {
        expect(markdown.isValid(
`1.▮ `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-26', () => {
        expect(markdown.isValid(
`1▮. `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-27', () => {
        expect(markdown.isValid(
`▮1. `
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-28', () => {
        expect(markdown.isValid(
`▮1.`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-29', () => {
        expect(markdown.isValid(
`▮`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-30', () => {
        expect(markdown.isValid(
`\\*`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

})


