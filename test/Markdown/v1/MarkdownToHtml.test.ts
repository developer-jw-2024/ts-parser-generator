import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"

var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()

import * as html from './HtmlLib'
import { Markdown } from "./MarkdownLib"

//var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
describe('Markdown', () => {

    test('markdown - 0-(-1)', () => {
        
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])
        
        expect(htmlElement.isEqual(rootElement)).toBe(true)
        
    })

    test('markdown - 0-(-2)', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])
        
        expect(htmlElement.isEqual(rootElement)).toBe(true)
        
    })


    test('markdown - 0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`hello`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text("hello")
                    ])
                ])
            ])
        ])

        
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 0-0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`he*l_l*_o`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.ErrorHtmlElement('he*l_l*_o')
        ])

        expect(htmlElement).toEqual(rootElement)
        
    })


    test('markdown - 0-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
he*l_l*_o`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('I'),
                        new html.Spaces(' '),
                        new html.Text('go'),
                        new html.Spaces(' '),
                        new html.Text('to'),
                        new html.Spaces(' '),
                        new html.Text('school.'),                        
                    ])
                ])
            ]),
            new html.ErrorHtmlElement('he*l_l*_o')
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 0-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.
You go home`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('I'),
                        new html.Spaces(' '),
                        new html.Text('go'),
                        new html.Spaces(' '),
                        new html.Text('to'),
                        new html.Spaces(' '),
                        new html.Text('school.'),                        
                    ])
                ]),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('You'),
                        new html.Spaces(' '),
                        new html.Text('go'),
                        new html.Spaces(' '),
                        new html.Text('home'),                        
                    ])
                ])
            ]),
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 0-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`I go to school.

You go home`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('I'),
                        new html.Spaces(' '),
                        new html.Text('go'),
                        new html.Spaces(' '),
                        new html.Text('to'),
                        new html.Spaces(' '),
                        new html.Text('school.'),                        
                    ])
                ]),
            ]),
            new html.BlankLine(),
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('You'),
                        new html.Spaces(' '),
                        new html.Text('go'),
                        new html.Spaces(' '),
                        new html.Text('home'),                        
                    ])
                ])
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
        
    })


    test('markdown - 1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('abc'),                      
                    ])
                ]),
            ]),
        ])

        expect(htmlElement).toEqual(rootElement)
        
    })


    test('markdown - 2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is** abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.ErrorHtmlElement('This *is** abc')
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                    ]),
                    new html.ItalicText().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('is')
                        ])
                    ]),
                    new html.PlainText().initChildren([
                        new html.Spaces(' '),
                        new html.Text('abc'),
                    ]),
                ])
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 4', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This *is* abc
This is that.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                    ]),
                    new html.ItalicText().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('is')
                        ])
                    ]),
                    new html.PlainText().initChildren([
                        new html.Spaces(' '),
                        new html.Text('abc'),
                    ]),
                ]),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('that.'),
                    ])
                ])
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 5', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 6', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 7', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`## hello
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(2, new html.Sentence().initChildren([
                new html.PlainText().initChildren([
                    new html.Text('hello')
                ])            
            ]))
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 8', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 9', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 10', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. First Item
2. Second Item
3. Third Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Third'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 11', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)

    })


    test('markdown - 12', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ])),
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 13', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- First Item
- Second Item
- Third Item
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ])),
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
                ,
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Third'),
                        new html.Spaces(' '),
                        new html.Text('Item'),
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 14', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('This'),
                                new html.Spaces(' '),
                                new html.Text('is'),
                                new html.Spaces(' '),
                                new html.Text('a'),
                                new html.Spaces(' '),
                                new html.Text('sentence'),
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 14-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('>'),
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 14-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.BlankLine()
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 14-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> H`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('H')
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 15', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> This is a sentence
> This is the second sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('This'),
                                new html.Spaces(' '),
                                new html.Text('is'),
                                new html.Spaces(' '),
                                new html.Text('a'),
                                new html.Spaces(' '),
                                new html.Text('sentence'),
                            ])
                        ]),
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('This'),
                                new html.Spaces(' '),
                                new html.Text('is'),
                                new html.Spaces(' '),
                                new html.Text('the'),
                                new html.Spaces(' '),
                                new html.Text('second'),
                                new html.Spaces(' '),
                                new html.Text('sentence'),
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 16', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('a'),
                                        new html.Spaces(' '),
                                        new html.Text('sentence'),
                                    ])
                                ]),
                                
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 16-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>>`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('>>')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 16-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.BlankLine()
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 17', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`>> This is a sentence
>> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('a'),
                                        new html.Spaces(' '),
                                        new html.Text('sentence'),    
                                    ])
                                ]),
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('the'),
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 18', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
>> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Heading(1, new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('ONK')
                        ])
                    ])),
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('a'),
                                        new html.Spaces(' '),
                                        new html.Text('sentence'),    
                                    ])
                                ]),
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('the'),
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 19', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> # ONK
>> This is a sentence
> This is the
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Heading(1, new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('ONK')
                        ])
                    ])),
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('This'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('a'),
                                        new html.Spaces(' '),
                                        new html.Text('sentence'),    
                                    ])
                                ])
                            ])
                        ])
                    ]),
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('This'),
                                new html.Spaces(' '),
                                new html.Text('is'),
                                new html.Spaces(' '),
                                new html.Text('the'),
                            ])
                        ])
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 20', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 21', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    Apple
    Banana
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ]),
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ])
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ]),
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ])
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animals')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('Apple')
                                    ])
                                ]),
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('Banana')
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animals')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.OrderedList().initChildren([
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])),
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ]))
                    ])
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animals')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 25', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. Fruite
    > Red
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('Red')
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])),
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.OrderedList().initChildren([
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])).init('complementBlock', new html.HtmlRoot().initChildren([
                            new html.Blockquote().initChildren([
                                new html.HtmlRoot().initChildren([
                                    new html.Paragraph().initChildren([
                                        new html.Sentence().initChildren([
                                            new html.PlainText().initChildren([
                                                new html.Text('Red'),
                                                new html.Spaces(' '),
                                                new html.Text('is'),
                                                new html.Spaces(' '),
                                                new html.Text('my'),
                                            ])    
                                        ])
                                    ])
                                ])
                            ])
                        ])),
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ]))
                    ])
                    
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animals')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.OrderedList().initChildren([
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ]))
                    ]),
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.Paragraph().initChildren([
                                new html.Sentence().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('Red'),
                                        new html.Spaces(' '),
                                        new html.Text('is'),
                                        new html.Spaces(' '),
                                        new html.Text('my'),
                                    ])    
                                ])
                            ])
                        ])
                    ]),
                    new html.OrderedList().initChildren([
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ]))
                    ]),
                    
                ])),
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animals')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 27', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 27-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- 
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 28', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- Fruite
- Animal
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])),
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animal')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.UnorderedList().initChildren([
                        new html.UnorderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])),
                        new html.UnorderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Banana')
                            ])
                        ]))
                    ])
                ])),
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Animal')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"type `nano`."
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('type'),
                        new html.Spaces(' ')
                    ]),
                    new html.BacktickText().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('nano')
                        ])
                    ]),
                    new html.PlainText().initChildren([
                        new html.Text('.'),
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"``Use `code` in your Markdown file.``"
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.DoubleBacktickText().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('Use'),
                            new html.Spaces(' ')
                        ]),
                        new html.BacktickText().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('code')
                            ])
                        ]),
                        new html.PlainText().initChildren([
                            new html.Spaces(' '),
                            new html.Text('in'),
                            new html.Spaces(' '),
                            new html.Text('your'),
                            new html.Spaces(' '),
                            new html.Text('Markdown'),
                            new html.Spaces(' '),
                            new html.Text('file.'),
                        ]),
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 31', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
"---"
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.HorizontalRule('---')
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 32', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2
----------`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(2, new html.Sentence().initChildren([
                new html.PlainText().initChildren([
                    new html.Text('This'),
                    new html.Spaces(' '),
                    new html.Text('is'),
                    new html.Spaces(' '),
                    new html.Text('heading'),
                    new html.Spaces(' '),
                    new html.Text('2'),
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 33', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is heading 2

----------`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('heading'),
                        new html.Spaces(' '),
                        new html.Text('2'),
                    ])
                ])
            ]),
            new html.BlankLine(),
            new html.HorizontalRule('----------')
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 34', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`===========`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot()
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 35', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading
===========`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(1, new html.Sentence().initChildren([
                new html.PlainText().initChildren([
                    new html.Text('This'),
                    new html.Spaces(' '),
                    new html.Text('is'),
                    new html.Spaces(' '),
                    new html.Text('the'),
                    new html.Spaces(' '),
                    new html.Text('first'),
                    new html.Spaces(' '),
                    new html.Text('level'),
                    new html.Spaces(' '),
                    new html.Text('heading'),
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 36', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`This is the first level heading

===========`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('first'),
                        new html.Spaces(' '),
                        new html.Text('level'),
                        new html.Spaces(' '),
                        new html.Text('heading'),
                    ])
                ])
            ]),
            new html.BlankLine()
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 37', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table().initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Syntax'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Description'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 38', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table().initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Header'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Title'),
                                new html.Spaces('       ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Paragraph'),
                                new html.Spaces('   ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Text'),
                                new html.Spaces('        ')
                            ])
                        ])
                    ]),
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 38-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`|    Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table().initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Spaces('    '),
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Header'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Title'),
                                new html.Spaces('       ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Paragraph'),
                                new html.Spaces('   ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Text'),
                                new html.Spaces('        ')
                            ])
                        ])
                    ]),
                ]),

            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 39', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description | Num | Checked |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table(new html.TableRow().initChildren([
                new html.TableCell().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Spaces(' '),
                            new html.Text('Syntax'),
                            new html.Spaces('      ')
                        ])
                    ])
                ]),
                new html.TableCell().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Spaces(' '),
                            new html.Text('Description'),
                            new html.Spaces(' ')
                        ])
                    ])
                ]),
                new html.TableCell().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Spaces(' '),
                            new html.Text('Num'),
                            new html.Spaces(' ')
                        ])
                    ])
                ]),
                new html.TableCell().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Spaces(' '),
                            new html.Text('Checked'),
                            new html.Spaces(' ')
                        ])
                    ])
                ]),
            ]), new html.TableAlignmentRow().initChildren([
                new html.TableNoAlignment(' ----------- '),
                new html.TableLeftAlignment(' :----------- '),
                new html.TableCenterAlignment(' :-----------: '),
                new html.TableRightAlignment(' -----------: '),
            ])).initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Header'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Title'),
                                new html.Spaces('       ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('3'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('true'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Paragraph'),
                                new html.Spaces('   ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Text'),
                                new html.Spaces('        ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('8'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('false'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ]),

            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 40', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table(null, new html.TableAlignmentRow().initChildren([
                new html.TableNoAlignment(' ----------- '),
                new html.TableLeftAlignment(' :----------- '),
                new html.TableCenterAlignment(' :-----------: '),
                new html.TableRightAlignment(' -----------: '),
            ])).initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Header'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Title'),
                                new html.Spaces('       ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('3'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('true'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Paragraph'),
                                new html.Spaces('   ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Text'),
                                new html.Spaces('        ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('8'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('false'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ]),

            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    

    test('markdown - 41', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Table(null, null).initChildren([
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Syntax'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Description'),
                                new html.Spaces(' ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Header'),
                                new html.Spaces('      ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Title'),
                                new html.Spaces('       ')
                            ])
                        ])
                    ]),
                ]),
                new html.TableRow().initChildren([
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Paragraph'),
                                new html.Spaces('   ')
                            ])
                        ])
                    ]),
                    new html.TableCell().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Spaces(' '),
                                new html.Text('Text'),
                                new html.Spaces('        ')
                            ])
                        ])
                    ]),
                ]),
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.FencedCodeBlockText(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``)
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.FencedCodeBlockText(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``)
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('coding')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Blockquote().initChildren([
                        new html.HtmlRoot().initChildren([
                            new html.FencedCodeBlockText(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``)
                        ])
                    ])
                ])),
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('coding')
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.FencedCodeBlockText(
`\`\`\`
{
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
}
\`\`\``)
                    ])
                ),
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 46', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('first'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })
    

    test('markdown - 46-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`First Term
: This is
    That are
    Bee.`
        )
        
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                        ])
                    ])).init('complementBlock', new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('That'),
                                    new html.Spaces(' '),
                                    new html.Text('are')
                                ])
                            ]),
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Bee.'),
                                ])
                            ])
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                        ])
                    ])).init('complementBlock', new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('That'),
                                    new html.Spaces(' '),
                                    new html.Text('are')
                                ])
                            ]),
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Bee.'),
                                ])
                            ])
                        ])
                    ])),
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('that'),
                            new html.Spaces(' '),
                            new html.Text('are'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                        ])
                    ])).init('complementBlock', new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('That'),
                                    new html.Spaces(' '),
                                    new html.Text('are')
                                ])
                            ]),
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Bee.'),
                                ])
                            ])
                        ])
                    ])),
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('that'),
                            new html.Spaces(' '),
                            new html.Text('are'),
                        ])
                    ]))
                ]),
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('Those'),
                            new html.Spaces(' '),
                            new html.Text('are'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 47', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('one'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('another'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('first'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                ]),
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('one'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('another'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('First'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('first'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                ]),
            ]),
            new html.BlankLine(),
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Second'),
                        new html.Spaces(' '),
                        new html.Text('Term')
                    ])
                ])).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('one'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('another'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('second'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ]))
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 50', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.TaskList().initChildren([
                new html.TaskListItem(true, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Write'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('press'),
                        new html.Spaces(' '),
                        new html.Text('release'),
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 51', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.TaskList().initChildren([
                new html.TaskListItem(true, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Write'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('press'),
                        new html.Spaces(' '),
                        new html.Text('release'),
                    ])
                ])),
                new html.TaskListItem(false, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Update'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('website'),
                    ])
                ])),
                new html.TaskListItem(false, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Contact'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('media'),
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 52', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- [x] Write the press release
- [Y] Contact the media
- [ ] Update the website
`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.TaskList().initChildren([
                new html.TaskListItem(true, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Write'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('press'),
                        new html.Spaces(' '),
                        new html.Text('release'),
                    ])
                ])),
            ]),
            new html.ErrorHtmlElement('- [Y] Contact the media'),
            new html.TaskList().initChildren([
                new html.TaskListItem(false, new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Update'),
                        new html.Spaces(' '),
                        new html.Text('the'),
                        new html.Spaces(' '),
                        new html.Text('website'),
                    ])
                ])),
            ]),
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 53', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> First Term
: This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('First'),
                                new html.Spaces(' '),
                                new html.Text('Term')
                            ])
                        ])
                    ])
                ]),
            ]),
            new html.DefinitionList().initChildren([
                new html.DefinitionItem(null).initChildren([
                    new html.DefinitionItemValue(new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('This'),
                            new html.Spaces(' '),
                            new html.Text('is'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('definition'),
                            new html.Spaces(' '),
                            new html.Text('of'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('first'),
                            new html.Spaces(' '),
                            new html.Text('term.'),
                        ])
                    ])),
                ]),
            ]),
            
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 54', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`> First Term
> : This is the definition of the first term.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([

                    new html.DefinitionList().initChildren([
                        new html.DefinitionItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('First'),
                                new html.Spaces(' '),
                                new html.Text('Term')
                            ])
                        ])).initChildren([
                            new html.DefinitionItemValue(new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('This'),
                                    new html.Spaces(' '),
                                    new html.Text('is'),
                                    new html.Spaces(' '),
                                    new html.Text('the'),
                                    new html.Spaces(' '),
                                    new html.Text('definition'),
                                    new html.Spaces(' '),
                                    new html.Text('of'),
                                    new html.Spaces(' '),
                                    new html.Text('the'),
                                    new html.Spaces(' '),
                                    new html.Text('first'),
                                    new html.Spaces(' '),
                                    new html.Text('term.'),
                                ])
                            ])),
                        ]),
                    ]),

                ]),
            ]),

            
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('coding')
                    ])
                ]))
            ]),
            new html.Blockquote().initChildren([
                new html.HtmlRoot().initChildren([
                    new html.FencedCodeBlockText(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``)
                ]),
            ]),

            
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 56', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Footnote(
                new html.FootnoteReference(new html.Text('Variable')),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('good'),
                        new html.Spaces(' '),
                        new html.Text('foot'),
                        new html.Spaces(' '),
                        new html.Text('note.'),
                    ])
                ])
            )
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 57', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Footnote(
                new html.FootnoteReference(new html.Text('Variable')),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('good'),
                        new html.Spaces(' '),
                        new html.Text('foot'),
                        new html.Spaces(' '),
                        new html.Text('note.'),
                    ])
                ])
            ).init('complementBlock', new html.HtmlRoot().initChildren([
                new html.Paragraph().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('Indent'),
                            new html.Spaces(' '),
                            new html.Text('paragraphs'),
                            new html.Spaces(' '),
                            new html.Text('to'),
                            new html.Spaces(' '),
                            new html.Text('include'),
                            new html.Spaces(' '),
                            new html.Text('them'),
                            new html.Spaces(' '),
                            new html.Text('in'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('footnote.'),
                        ])
                    ])
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 58', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    Apple`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('hello'),
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.Paragraph().initChildren([
                        new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 59', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('hello'),
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.BlankLine()
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 60', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. hello
    
    `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('hello'),
                    ])
                ])).init('complementBlock', new html.HtmlRoot().initChildren([
                    new html.BlankLine()
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)

    })

    test('markdown - 61', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Footnote(
                new html.FootnoteReference(new html.Text('Variable')),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('good'),
                        new html.Spaces(' '),
                        new html.Text('foot'),
                        new html.Spaces(' '),
                        new html.Text('note.'),
                    ])
                ])
            ).init('complementBlock', new html.HtmlRoot().initChildren([
                new html.Paragraph().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('Indent'),
                            new html.Spaces(' '),
                            new html.Text('paragraphs'),
                            new html.Spaces(' '),
                            new html.Text('to'),
                            new html.Spaces(' '),
                            new html.Text('include'),
                            new html.Spaces(' '),
                            new html.Text('them'),
                            new html.Spaces(' '),
                            new html.Text('in'),
                            new html.Spaces(' '),
                            new html.Text('the'),
                            new html.Spaces(' '),
                            new html.Text('footnote.'),
                        ])
                    ]),
                    new html.Sentence().initChildren([
                        new html.BacktickText().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('{'),
                                new html.Spaces(' '),
                                new html.Text('my'),
                                new html.Spaces(' '),
                                new html.Text('code'),
                                new html.Spaces(' '),
                                new html.Text('}'),
                            ])
                        ])
                    ]),
                ]),
                new html.BlankLine(),
                new html.Paragraph().initChildren([
                    new html.Sentence().initChildren([
                        new html.PlainText().initChildren([
                            new html.Text('Add'),
                            new html.Spaces(' '),
                            new html.Text('as'),
                            new html.Spaces(' '),
                            new html.Text('many'),
                            new html.Spaces(' '),
                            new html.Text('paragraphs'),
                            new html.Spaces(' '),
                            new html.Text('as'),
                            new html.Spaces(' '),
                            new html.Text('you'),
                            new html.Spaces(' '),
                            new html.Text('like.'),
                        ])
                    ]),
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 62', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    
    > Add as many paragraphs as you like.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Footnote(
                new html.FootnoteReference(new html.Text('Variable')),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('good'),
                        new html.Spaces(' '),
                        new html.Text('foot'),
                        new html.Spaces(' '),
                        new html.Text('note.'),
                    ])
                ])
            ).init('complementBlock', new html.HtmlRoot().initChildren([
                new html.Blockquote().initChildren([
                    new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Indent'),
                                    new html.Spaces(' '),
                                    new html.Text('paragraphs'),
                                    new html.Spaces(' '),
                                    new html.Text('to'),
                                    new html.Spaces(' '),
                                    new html.Text('include'),
                                    new html.Spaces(' '),
                                    new html.Text('them'),
                                    new html.Spaces(' '),
                                    new html.Text('in'),
                                    new html.Spaces(' '),
                                    new html.Text('the'),
                                    new html.Spaces(' '),
                                    new html.Text('footnote.'),
                                ])
                            ]),
                            new html.Sentence().initChildren([
                                new html.BacktickText().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('{'),
                                        new html.Spaces(' '),
                                        new html.Text('my'),
                                        new html.Spaces(' '),
                                        new html.Text('code'),
                                        new html.Spaces(' '),
                                        new html.Text('}'),
                                    ])
                                ])
                            ]),
                        ]),
                    ])
                ]),
                new html.BlankLine(),
                new html.Blockquote().initChildren([
                    new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Add'),
                                    new html.Spaces(' '),
                                    new html.Text('as'),
                                    new html.Spaces(' '),
                                    new html.Text('many'),
                                    new html.Spaces(' '),
                                    new html.Text('paragraphs'),
                                    new html.Spaces(' '),
                                    new html.Text('as'),
                                    new html.Spaces(' '),
                                    new html.Text('you'),
                                    new html.Spaces(' '),
                                    new html.Text('like.'),
                                ])
                            ]),
                        ])
                    ])
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
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
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Footnote(
                new html.FootnoteReference(new html.Text('Variable')),
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('This'),
                        new html.Spaces(' '),
                        new html.Text('is'),
                        new html.Spaces(' '),
                        new html.Text('good'),
                        new html.Spaces(' '),
                        new html.Text('foot'),
                        new html.Spaces(' '),
                        new html.Text('note.'),
                    ])
                ])
            ).init('complementBlock', new html.HtmlRoot().initChildren([
                new html.Blockquote().initChildren([
                    new html.HtmlRoot().initChildren([
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Indent'),
                                    new html.Spaces(' '),
                                    new html.Text('paragraphs'),
                                    new html.Spaces(' '),
                                    new html.Text('to'),
                                    new html.Spaces(' '),
                                    new html.Text('include'),
                                    new html.Spaces(' '),
                                    new html.Text('them'),
                                    new html.Spaces(' '),
                                    new html.Text('in'),
                                    new html.Spaces(' '),
                                    new html.Text('the'),
                                    new html.Spaces(' '),
                                    new html.Text('footnote.'),
                                ])
                            ]),
                            new html.Sentence().initChildren([
                                new html.BacktickText().initChildren([
                                    new html.PlainText().initChildren([
                                        new html.Text('{'),
                                        new html.Spaces(' '),
                                        new html.Text('my'),
                                        new html.Spaces(' '),
                                        new html.Text('code'),
                                        new html.Spaces(' '),
                                        new html.Text('}'),
                                    ])
                                ])
                            ]),
                        ]),
                        new html.BlankLine(),
                        new html.Paragraph().initChildren([
                            new html.Sentence().initChildren([
                                new html.PlainText().initChildren([
                                    new html.Text('Add'),
                                    new html.Spaces(' '),
                                    new html.Text('as'),
                                    new html.Spaces(' '),
                                    new html.Text('many'),
                                    new html.Spaces(' '),
                                    new html.Text('paragraphs'),
                                    new html.Spaces(' '),
                                    new html.Text('as'),
                                    new html.Spaces(' '),
                                    new html.Text('you'),
                                    new html.Spaces(' '),
                                    new html.Text('like.'),
                                ])
                            ]),
                        ])
                    ])
                ]),
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-0', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
``
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-1', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-2', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('#')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-3', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('#'),
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-4', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`# ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(1, new html.Sentence().initChildren([
                new html.PlainText().initChildren([
                    new html.Cursor()
                ])
            ]))
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-5', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(1, null)
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-6', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮# `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(1, null)
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-7', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`#▮# `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Heading(2, null)
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-8', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`-`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('-')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-9', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-10', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('+')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-11', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-12', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`-▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('-'),
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-13', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`- ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor()
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-14', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('+'),
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - inputing-15', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+ ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor()
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-16', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`+▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-17', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('1')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-18', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('1.')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-19', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-20', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('1'),
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-21', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('1.'),
                        new html.Cursor()
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-22', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-23', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. a`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('a')
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-24', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1. ▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor()
                    ])
                ]))
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-25', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1.▮ `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-26', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`1▮. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-27', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮1. `
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(null)
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-28', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮1.`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor(),
                        new html.Text('1.')
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-29', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`▮`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Cursor(),
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - inputing-30', () => {
        var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(
`\\*`
        )

        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.Paragraph().initChildren([
                new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('\\*'),
                    ])
                ])
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    
})


