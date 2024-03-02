import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function_toMarkdownHierarchy'

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})


describe('Markdown', () => {

    test('markdown - 0', () => {
        expect(markdown.isValid(
`hello`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
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
    Heading`)
    })

    test('markdown - 8', () => {
        expect(markdown.isValid(
`1. First Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
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
        OrderedItem`)
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
        OrderedItem
        OrderedItem`)
    })


    test('markdown - 11', () => {
        expect(markdown.isValid(
`- First Item
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
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
        UnorderedItem`)
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
        UnorderedItem
        UnorderedItem`)
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
            Markdown
                Paragraph
                    Sentence
                    Sentence
        OrderedItem`)
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
            Markdown
                Blockquote
                    Markdown
                        Paragraph
                            Sentence
                            Sentence
        OrderedItem`)
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
            Markdown
                OrderedList
                    OrderedItem
                    OrderedItem
        OrderedItem`)
    })

    
    test('markdown - 25', () => {
        expect(markdown.isValid(
`1. Fruite
    >Red
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Markdown
                MarkdownError`)
    })

    test('markdown - 26', () => {
        expect(markdown.isValid(
`1. Fruite
    1. Apple
        >Red
    2. Banana
2. Animals
`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Markdown
                OrderedList
                    OrderedItem
                        Markdown
                            MarkdownError
                    OrderedItem
        OrderedItem`)
    })
    
    test('markdown - 27', () => {
        expect(markdown.isValid(
`- Fruite
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
        UnorderedItem`)
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
            Markdown
                UnorderedList
                    UnorderedItem
                    UnorderedItem
        UnorderedItem`)
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
    HorizontalRule`)
    })

    test('markdown - 32', () => {
        expect(markdown.isValid(
`This is heading 2
----------`
        )).toEqual(true)

        expect(markdown.getResult().toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
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
    HorizontalRule`)
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
    Heading`)
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
            DefinitionListItem`)
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
            DefinitionListItem
            DefinitionListItem`)
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
            DefinitionListItem
        DefinitionListItemGroup
            DefinitionListItem
            DefinitionListItem`)
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
            DefinitionListItem
    BlankLine
    DescriptionList
        DefinitionListItemGroup
            DefinitionListItem
            DefinitionListItem`)
    })
})


