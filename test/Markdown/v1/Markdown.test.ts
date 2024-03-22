import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()


describe('Markdown', () => {
    
    test('markdown - 0-(-1)', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - 0-(-2)', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - 0', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`hello`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })


    test('markdown - 0-0', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`he*l_l*_o`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    MarkdownError`)
    })


    test('markdown - 0-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
he*l_l*_o`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
    MarkdownError`)
    })


    test('markdown - 0-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
You go home`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })

    test('markdown - 0-3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`I go to school.

You go home`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
    BlankLine
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })


    test('markdown - 1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This is abc`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })


    test('markdown - 2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This *is** abc`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    MarkdownError`)
    })

    test('markdown - 2-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This **is** abc`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
            StarBoldText
                PlainText
                    SimpleText
            PlainText
                Spaces
                SimpleText`)

    })


    test('markdown - 3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
            StarItalicText
                PlainText
                    SimpleText
            PlainText
                Spaces
                SimpleText`)
    })

    test('markdown - 4', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc
This is that.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
            StarItalicText
                PlainText
                    SimpleText
            PlainText
                Spaces
                SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })

    test('markdown - 5', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })


    test('markdown - 6', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })


    test('markdown - 7', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`## hello
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence
            PlainText
                SimpleText`)
    })


    test('markdown - 8', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })

    test('markdown - 9', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 10', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
3. Third Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 11', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- First Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 12', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 13', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
- Third Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 14', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })


    test('markdown - 14-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`>`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })


    test('markdown - 14-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            BlankLine`)
    })


    test('markdown - 14-3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> H`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
                    PlainText
                        SimpleText`)
    })


    test('markdown - 15', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
> This is the second sentence
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })


    test('markdown - 16', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText`)
    })

    test('markdown - 16-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`>>`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })

    test('markdown - 16-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`>> `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    BlankLine`)
    })

    test('markdown - 17', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
>> This is the
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText`)
    })

    test('markdown - 18', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
>> This is the
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Heading
                Sentence
                    PlainText
                        SimpleText
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText`)
    })

    test('markdown - 19', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
> This is the
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Heading
                Sentence
                    PlainText
                        SimpleText
            Blockquote
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
            Paragraph
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 20', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText`)
    })

    test('markdown - 21', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
    Banana
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                        Sentence
                            PlainText
                                SimpleText`)
    })

    test('markdown - 22', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
    Banana
2. Animals
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                        Sentence
                            PlainText
                                SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - 23', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    > Apple
    > Banana
2. Animals
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Blockquote
                        Markdown
                            Paragraph
                                Sentence
                                    PlainText
                                        SimpleText
                                Sentence
                                    PlainText
                                        SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })


    test('markdown - 24', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
    2. Banana
2. Animals
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    OrderedList
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })


    test('markdown - 25', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    > Red
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Blockquote
                        Markdown
                            Paragraph
                                Sentence
                                    PlainText
                                        SimpleText`)
    })

    test('markdown - 26', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
        > Red is my
    2. Banana
2. Animals
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    OrderedList
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
                            ComplementBlock
                                Markdown
                                    Blockquote
                                        Markdown
                                            Paragraph
                                                Sentence
                                                    PlainText
                                                        SimpleText
                                                        Spaces
                                                        SimpleText
                                                        Spaces
                                                        SimpleText
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - 26-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    1. Apple
    > Red is my
    2. Banana
2. Animals
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    OrderedList
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
                    Blockquote
                        Markdown
                            Paragraph
                                Sentence
                                    PlainText
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText
                    OrderedList
                        OrderedItem
                            Sentence
                                PlainText
                                    SimpleText
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - 27', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - 27-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- 
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - 28', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
- Animal
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
        UnorderedItem
            Sentence
                PlainText
                    SimpleText`)
    })


    test('markdown - 29', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
    - Apple
    - Banana
- Animal
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    UnorderedList
                        UnorderedItem
                            Sentence
                                PlainText
                                    SimpleText
                        UnorderedItem
                            Sentence
                                PlainText
                                    SimpleText
        UnorderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - 29-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
    Apple is good
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText`)
    })

    test('markdown - 29-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
    > Apple is good
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Blockquote
                        Markdown
                            Paragraph
                                Sentence
                                    PlainText
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText`)
    })

    test('markdown - 29-3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> - Fruite
>     Apple is good
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            UnorderedList
                UnorderedItem
                    Sentence
                        PlainText
                            SimpleText
                    ComplementBlock
                        Markdown
                            Paragraph
                                Sentence
                                    PlainText
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText`)
    })

    test('markdown - 29-4', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> - Fruite
>     > Apple is good
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            UnorderedList
                UnorderedItem
                    Sentence
                        PlainText
                            SimpleText
                    ComplementBlock
                        Markdown
                            Blockquote
                                Markdown
                                    Paragraph
                                        Sentence
                                            PlainText
                                                SimpleText
                                                Spaces
                                                SimpleText
                                                Spaces
                                                SimpleText`)
    })

    test('markdown - 30', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
"type `nano`."
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
            BacktickText
                PlainText
                    SimpleText
            PlainText
                SimpleText`)
    })


    test('markdown - 30', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
"``Use `code` in your Markdown file.``"
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            DoubleBacktickText
                PlainText
                    SimpleText
                    Spaces
                BacktickText
                    PlainText
                        SimpleText
                PlainText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText`)
    })


    test('markdown - 31', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
"---"
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    HorizontalRule`)
    })

    test('markdown - 32', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2
----------`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })

    test('markdown - 33', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2

----------`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
    BlankLine
    HorizontalRule`)
    })

    test('markdown - 34', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`===========`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown`)
    })


    test('markdown - 35', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading
===========`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })

    test('markdown - 36', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading

===========`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
    BlankLine`)
    })

    test('markdown - 37', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - 38', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Header      | Title       |
| Paragraph   | Text        |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - 38-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`|    Header      | Title       |
| Paragraph   | Text        |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Spaces
                Sentence
                    PlainText
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })


    test('markdown - 39', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description | Num | Checked |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableAlignmentRow
            TableNoAlignment
            TableLeftAlignment
            TableCenterAlignment
            TableRightAlignment
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - 40', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableAlignmentRow
            TableNoAlignment
            TableLeftAlignment
            TableCenterAlignment
            TableRightAlignment
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - 40-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> - First Item
> - Second Item
> - Third Item
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            UnorderedList
                UnorderedItem
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                UnorderedItem
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                UnorderedItem
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText`)
    })

    test('markdown - 41', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })


    test('markdown - 42', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    FencedCodeBlockText`)
    })
    

    test('markdown - 43', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            FencedCodeBlockText`)
    })

    test('markdown - 44', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. coding
    > \`\`\`ABC
    > {
    >   "firstName": "John",
    >   "lastName": "Smith",
    >   "age": 25
    > }
    > \`\`\``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Blockquote
                        Markdown
                            FencedCodeBlockText`)
    })

    

    test('markdown - 45', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. coding
    \`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
    \`\`\``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    FencedCodeBlockText`)
    })

    test('markdown - 46', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 46-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                ComplementBlock
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                            Sentence
                                PlainText
                                    SimpleText`)
    })

    test('markdown - 46-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.
: that are`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                ComplementBlock
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                            Sentence
                                PlainText
                                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 46-3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.
: that are
Second Term
: Those are`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                ComplementBlock
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                            Sentence
                                PlainText
                                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 47', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 48', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.
Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 49', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
    BlankLine
    DefinitionList
        DefinitionItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })


    test('markdown - 50', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText`)
    })

    test('markdown - 51', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText`)
    })

    test('markdown - 52', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [Y] Contact the media
- [ ] Update the website
`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    TaskList
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText
    MarkdownError
    TaskList
        TaskListItem
            Sentence
                PlainText
                    SimpleText
                    Spaces
                    SimpleText
                    Spaces
                    SimpleText`)
    })

    test('markdown - 53', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> First Term
: This is the definition of the first term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            Paragraph
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
    DefinitionList
        DefinitionItem
            DefinitionItemValue
                Sentence
                    PlainText
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText
                        Spaces
                        SimpleText`)
    })

    test('markdown - 54', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`> First Term
> : This is the definition of the first term.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Blockquote
        Markdown
            DefinitionList
                DefinitionItem
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                    DefinitionItemValue
                        Sentence
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText`)
    })

    test('markdown - 55', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. coding
> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
    Blockquote
        Markdown
            FencedCodeBlockText`)
    })


    test('markdown - 56', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText`)
    })

    test('markdown - 57', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
        ComplementBlock
            Markdown
                Paragraph
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText`)
    })

    test('markdown - 58', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    Apple`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    Paragraph
                        Sentence
                            PlainText
                                SimpleText`)
    })

    test('markdown - 59', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    BlankLine`)
    })

    test('markdown - 60', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    
    `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText
            ComplementBlock
                Markdown
                    BlankLine`)
    })

    test('markdown - 61', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
        ComplementBlock
            Markdown
                Paragraph
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                    Sentence
                        BacktickText
                            PlainText
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                                Spaces
                                SimpleText
                BlankLine
                Paragraph
                    Sentence
                        PlainText
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText
                            Spaces
                            SimpleText`)
    })

    test('markdown - 62', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    
    > Add as many paragraphs as you like.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
        ComplementBlock
            Markdown
                Blockquote
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                            Sentence
                                BacktickText
                                    PlainText
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText
                BlankLine
                Blockquote
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText`)
    })

    test('markdown - 63', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    > 
    > Add as many paragraphs as you like.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Footnote
        FootnoteReference
            SimpleText
        Sentence
            PlainText
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
                Spaces
                SimpleText
        ComplementBlock
            Markdown
                Blockquote
                    Markdown
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                            Sentence
                                BacktickText
                                    PlainText
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText
                                        Spaces
                                        SimpleText
                        BlankLine
                        Paragraph
                            Sentence
                                PlainText
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText
                                    Spaces
                                    SimpleText`)
    })

    test('markdown - inputing-0', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
``
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - inputing-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                Cursor`)
    })

    test('markdown - inputing-2', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`#`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })


    test('markdown - inputing-3', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`#▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor`)
    })


    test('markdown - inputing-4', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`# ▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading
        Sentence
            PlainText
                Cursor`)
    })


    test('markdown - inputing-5', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`#▮ `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-6', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`▮# `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-7', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`#▮# `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-8', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`-`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })


    test('markdown - inputing-9', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })


    test('markdown - inputing-10', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`+`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })

    test('markdown - inputing-11', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`+ `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-12', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`-▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor`)
    })


    test('markdown - inputing-13', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`- ▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    Cursor`)
    })


    test('markdown - inputing-14', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`+▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor`)
    })


    test('markdown - inputing-15', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`+ ▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence
                PlainText
                    Cursor`)
    })

    test('markdown - inputing-16', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`+▮ `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-17', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })

    test('markdown - inputing-18', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })

    test('markdown - inputing-19', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-20', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor`)
    })

    test('markdown - inputing-21', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1.▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor`)
    })

    test('markdown - inputing-22', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-23', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. a`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    SimpleText`)
    })

    test('markdown - inputing-24', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1. ▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence
                PlainText
                    Cursor`)
    })

    test('markdown - inputing-25', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1.▮ `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-26', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1▮. `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-27', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`▮1. `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-28', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`▮1.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                Cursor
                SimpleText`)
    })

    test('markdown - inputing-28-1', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`1▮.`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText
                Cursor
                SimpleText`)
    })

    test('markdown - inputing-29', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                Cursor`)
    })

    test('markdown - inputing-30', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`\\*`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Paragraph
        Sentence
            PlainText
                SimpleText`)
    })

    test('markdown - inputing-31', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      `
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    MarkdownError`)
    })

    test('markdown - inputing-32', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - inputing-33', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      |▮`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - inputing-34', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      ▮|`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces`)
    })

    test('markdown - inputing-35', () => {
        expect(markdownSyntaxAnalyzer.toMarkddown(
`| Syntax     ▮ |`
        ).toMarkdownHierarchy().join('\n')).toEqual(
`Markdown
    Table
        TableRow
            TableCell
                Sentence
                    PlainText
                        Spaces
                        SimpleText
                        Spaces
                        Cursor
                        Spaces`)
    })

})


