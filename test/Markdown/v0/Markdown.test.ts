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

    /*
    test('markdown - 25', () => {
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
                    OrderedItem
        OrderedItem`)
    })
    */
})


