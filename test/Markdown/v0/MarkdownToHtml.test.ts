import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import * as html from './HtmlLib'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'
import { FileUtils } from "../../FileUtil";

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)


var markdown: LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner().init(languageDefinition, tokenTypeDefinition, MarkdownLanguageFunctionsEntity)
markdown.setPreprocessing((v:string):string=>{
    if (v.at(-1)!='\n') return v+'\n'
    return v
})


describe('Markdown', () => {

    test('markdown - 0-(-1)', () => {
        expect(markdown.isValid(
``
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])
        
        
        expect(htmlElement.isEqual(rootElement)).toBe(true)
        
    })


    test('markdown - 0', () => {
        expect(markdown.isValid(
`hello`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`he*l_l*_o`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.ErrorHtmlElement('he*l_l*_o')
        ])

        expect(htmlElement).toEqual(rootElement)
        
    })


    test('markdown - 0-1', () => {
        expect(markdown.isValid(
`I go to school.
he*l_l*_o`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`I go to school.
You go home`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`I go to school.

You go home`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`This is abc`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`This *is** abc`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.ErrorHtmlElement('This *is** abc')
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 3', () => {
        expect(markdown.isValid(
`This *is* abc`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`This *is* abc
This is that.`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
``
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 6', () => {
        expect(markdown.isValid(
`
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.BlankLine()
        ])

        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 7', () => {
        expect(markdown.isValid(
`## hello
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`1. First Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`1. First Item
2. Second Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`1. First Item
2. Second Item
3. Third Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`- First Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`- First Item
- Second Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`- First Item
- Second Item
- Third Item
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> This is a sentence
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`>`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> `
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> H`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> This is a sentence
> This is the second sentence
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`>> This is a sentence
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`>>`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`>> `
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`>> This is a sentence
>> This is the
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> # ONK
>> This is a sentence
>> This is the
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`> # ONK
>> This is a sentence
> This is the
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`1. Fruite
    Apple
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    Apple
    Banana
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    Apple
    Banana
2. Animals
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    > Apple
    > Banana
2. Animals
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    1. Apple
    2. Banana
2. Animals
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    > Red
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    1. Apple
        > Red is my
    2. Banana
2. Animals
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
                    new html.OrderedList().initChildren([
                        new html.OrderedItem(new html.Sentence().initChildren([
                            new html.PlainText().initChildren([
                                new html.Text('Apple')
                            ])
                        ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`1. Fruite
    1. Apple
    > Red is my
    2. Banana
2. Animals
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.OrderedList().initChildren([
                new html.OrderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
`- Fruite
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`- 
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem()
            ])
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 28', () => {
        expect(markdown.isValid(
`- Fruite
- Animal
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`- Fruite
    - Apple
    - Banana
- Animal
`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.UnorderedList().initChildren([
                new html.UnorderedItem(new html.Sentence().initChildren([
                    new html.PlainText().initChildren([
                        new html.Text('Fruite')
                    ])
                ])).init('complement', new html.HtmlRoot().initChildren([
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
        expect(markdown.isValid(
"type `nano`."
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
"``Use `code` in your Markdown file.``"
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
"---"
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot().initChildren([
            new html.HorizontalRule('---')
        ])
        expect(htmlElement).toEqual(rootElement)
    })

    test('markdown - 32', () => {
        expect(markdown.isValid(
`This is heading 2
----------`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`This is heading 2

----------`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`===========`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
        var rootElement : html.HtmlElement = new html.HtmlRoot()
        expect(htmlElement).toEqual(rootElement)
    })


    test('markdown - 35', () => {
        expect(markdown.isValid(
`This is the first level heading
===========`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`This is the first level heading

===========`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`| Syntax      | Description |`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`|    Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`| Syntax      | Description | Num | Checked |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
        expect(markdown.isValid(
`| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )).toEqual(true)

        var htmlElement : html.HtmlElement = markdown.getResult().toHtml() as html.HtmlElement
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
/*
    

    test('markdown - 41', () => {
        expect(markdown.isValid(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
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

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    BlankLine`)
    })

    test('markdown - inputing-1', () => {
        expect(markdown.isValid(
`▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-2', () => {
        expect(markdown.isValid(
`#`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-3', () => {
        expect(markdown.isValid(
`#▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-4', () => {
        expect(markdown.isValid(
`# ▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Heading
        Sentence`)
    })

    test('markdown - inputing-5', () => {
        expect(markdown.isValid(
`#▮ `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-6', () => {
        expect(markdown.isValid(
`▮# `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-7', () => {
        expect(markdown.isValid(
`#▮# `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Heading`)
    })


    test('markdown - inputing-8', () => {
        expect(markdown.isValid(
`-`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-9', () => {
        expect(markdown.isValid(
`- `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })


    test('markdown - inputing-10', () => {
        expect(markdown.isValid(
`+`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-11', () => {
        expect(markdown.isValid(
`+ `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-12', () => {
        expect(markdown.isValid(
`-▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-13', () => {
        expect(markdown.isValid(
`- ▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })


    test('markdown - inputing-14', () => {
        expect(markdown.isValid(
`+▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })


    test('markdown - inputing-15', () => {
        expect(markdown.isValid(
`+ ▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    UnorderedList
        UnorderedItem
            Sentence`)
    })

    test('markdown - inputing-16', () => {
        expect(markdown.isValid(
`+▮ `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    UnorderedList
        UnorderedItem`)
    })

    test('markdown - inputing-17', () => {
        expect(markdown.isValid(
`1`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-18', () => {
        expect(markdown.isValid(
`1.`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-19', () => {
        expect(markdown.isValid(
`1. `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-20', () => {
        expect(markdown.isValid(
`1▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-21', () => {
        expect(markdown.isValid(
`1.▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-22', () => {
        expect(markdown.isValid(
`1. `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-23', () => {
        expect(markdown.isValid(
`1. a`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence`)
    })

    test('markdown - inputing-24', () => {
        expect(markdown.isValid(
`1. ▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem
            Sentence`)
    })

    test('markdown - inputing-25', () => {
        expect(markdown.isValid(
`1.▮ `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-26', () => {
        expect(markdown.isValid(
`1▮. `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-27', () => {
        expect(markdown.isValid(
`▮1. `
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    OrderedList
        OrderedItem`)
    })

    test('markdown - inputing-28', () => {
        expect(markdown.isValid(
`▮1.`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-29', () => {
        expect(markdown.isValid(
`▮`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-30', () => {
        expect(markdown.isValid(
`\\*`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Paragraph
        Sentence`)
    })

    test('markdown - inputing-31', () => {
        expect(markdown.isValid(
`| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`
        )).toEqual(true)

        expect(markdown.getResult().toHtml()).toEqual(
`Markdown
    Table
        TableRow
        TableRow`)
    })
*/
})


