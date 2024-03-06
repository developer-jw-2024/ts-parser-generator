import { LRSyntaxAnalyzerRunner } from '../../../src/SyntaxAnalysis/LR'
import { Markdown } from './Markdown_Language_Function'

var languageDefinitionPath : string = `${__dirname}/Markdown_Language.txt`
var tokenTypeDefinitionPath : string = `${__dirname}/Markdown_RegExp.txt`
var markdown : LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, Markdown)

describe('markdown', () => {
        test('markdown - 0', () => {
        expect(markdown.isValid(
`
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Enter: <T> ]
[ <T> Enter: ]     [ <T> ]
[ <T> BlankLine: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                )
        })

        test('markdown - 1', () => {
        expect(markdown.isValid("abc\n")).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:abc Enter: <T> ]
[ <T> SimpleText:abc ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 2', () => {
        expect(markdown.isValid("a \n")).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:a Spaces:  Enter: <T> ]
[ <T> SimpleText:a ]     [ Spaces:  Enter: <T> ]
[ <T> Text: ]     [ Spaces:  Enter: <T> ]
[ <T> Text: Spaces:  ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                )
        })
        

        test('markdown - 3', () => {
                expect(markdown.isValid("a**T**\n")).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:a DoubleStar:** SimpleText:T DoubleStar:** Enter: <T> ]
[ <T> SimpleText:a ]     [ DoubleStar:** SimpleText:T DoubleStar:** Enter: <T> ]
[ <T> Text: ]     [ DoubleStar:** SimpleText:T DoubleStar:** Enter: <T> ]
[ <T> Text: DoubleStar:** ]     [ SimpleText:T DoubleStar:** Enter: <T> ]
[ <T> Text: DoubleStar:** SimpleText:T ]     [ DoubleStar:** Enter: <T> ]
[ <T> Text: StartBoldStarText: ]     [ DoubleStar:** Enter: <T> ]
[ <T> Text: StartBoldStarText: DoubleStar:** ]     [ Enter: <T> ]
[ <T> Text: BoldStarText: ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 4', () => {
        expect(markdown.isValid("_a**T**_\n")).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SingleUnderline:_ SimpleText:a DoubleStar:** SimpleText:T DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> SingleUnderline:_ ]     [ SimpleText:a DoubleStar:** SimpleText:T DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> SingleUnderline:_ SimpleText:a ]     [ DoubleStar:** SimpleText:T DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: ]     [ DoubleStar:** SimpleText:T DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: DoubleStar:** ]     [ SimpleText:T DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: DoubleStar:** SimpleText:T ]     [ DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: StartBoldStarText: ]     [ DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: StartBoldStarText: DoubleStar:** ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: BoldStarText: ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> StartItalicUnderlineText: SingleUnderline:_ ]     [ Enter: <T> ]
[ <T> ItalicUnderlineText: ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 5', () => {
        expect(markdown.isValid(
`- One
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:One Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:One Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:One ]     [ Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ <T> ]
[ <T> UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 6', () => {
        expect(markdown.isValid(
`- One
- Two
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:One Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:One Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:One ]     [ Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedListItem: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  ]     [ SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  SimpleText:Two ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 7', () => {
        expect(markdown.isValid(
`- One
    Apple
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:One ]     [ Enter: Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 8', () => {
        expect(markdown.isValid(
`- One
    Apple
- Two
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:One ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  ]     [ SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  SimpleText:Two ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemHypen:-  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 9', () => {
        expect(markdown.isValid(
`* One
    Apple
* Two
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemStar:*  SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  ]     [ SimpleText:One Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  SimpleText:One ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  ]     [ SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  SimpleText:Two ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 10', () => {
        expect(markdown.isValid(
`* One Tow Hree
    Apple
* Two
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemStar:*  SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  ]     [ SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  SimpleText:One ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: Spaces:  ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: SimpleText:Tow ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: Spaces:  ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: SimpleText:Hree ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> ItemStar:*  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  ]     [ SimpleText:Two Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  SimpleText:Two ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 11', () => {
        expect(markdown.isValid(
`* One Tow Hree
    Apple
    Orange
* Two three four
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemStar:*  SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  ]     [ SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  SimpleText:One ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: Spaces:  ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: SimpleText:Tow ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: Spaces:  ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: SimpleText:Hree ]     [ Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemStar:*  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Orange ]     [ Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  ]     [ SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  SimpleText:Two ]     [ Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: Spaces:  ]     [ SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: SimpleText:three ]     [ Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: Spaces:  ]     [ SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: SimpleText:four ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemStar:*  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 12', () => {
        expect(markdown.isValid(
`+ One Tow Hree
    Apple
    Orange
+ Two three four
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemPlus:+  SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  ]     [ SimpleText:One Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  SimpleText:One ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: ]     [ Spaces:  SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: Spaces:  ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: ]     [ SimpleText:Tow Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: SimpleText:Tow ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: ]     [ Spaces:  SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: Spaces:  ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: ]     [ SimpleText:Hree Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: SimpleText:Hree ]     [ Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: ]     [ Enter: Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> ItemPlus:+  Text: Enter: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Apple Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Apple ]     [ Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Orange ]     [ Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  ]     [ SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  SimpleText:Two ]     [ Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: ]     [ Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: Spaces:  ]     [ SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: ]     [ SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: SimpleText:three ]     [ Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: ]     [ Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: Spaces:  ]     [ SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: ]     [ SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: SimpleText:four ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: ItemPlus:+  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: UnorderedListItem: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 13', () => {
        expect(markdown.isValid(
`This is the end of content.
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:This Spaces:  SimpleText:is Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> SimpleText:This ]     [ Spaces:  SimpleText:is Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:is Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:is Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:is Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: SimpleText:is ]     [ Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:the Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: SimpleText:the ]     [ Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: SimpleText:end ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:of Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: SimpleText:of ]     [ Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:content. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:content. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:content. Enter: <T> ]
[ <T> Text: SimpleText:content. ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 14', () => {
        expect(markdown.isValid(
`- list
a
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:list Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:list Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:list ]     [ Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ SimpleText:a Enter: <T> ]
[ <T> UnorderedListItem: ]     [ SimpleText:a Enter: <T> ]
[ <T> UnorderedList: ]     [ SimpleText:a Enter: <T> ]
[ <T> Line: ]     [ SimpleText:a Enter: <T> ]
[ <T> Markdown: ]     [ SimpleText:a Enter: <T> ]
[ <T> Markdown: SimpleText:a ]     [ Enter: <T> ]
[ <T> Markdown: Text: ]     [ Enter: <T> ]
[ <T> Markdown: Text: Enter: ]     [ <T> ]
[ <T> Markdown: TextLine: ]     [ <T> ]
[ <T> Markdown: Paragraph: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 15', () => {
        expect(markdown.isValid(
`- list
    one
    two
a
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:list Enter: Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:list Enter: Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:list ]     [ Enter: Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedListItem: ]     [ Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:one Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:one ]     [ Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:two Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:two ]     [ Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: SimpleText:a Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ SimpleText:a Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ SimpleText:a Enter: <T> ]
[ <T> UnorderedList: ]     [ SimpleText:a Enter: <T> ]
[ <T> Line: ]     [ SimpleText:a Enter: <T> ]
[ <T> Markdown: ]     [ SimpleText:a Enter: <T> ]
[ <T> Markdown: SimpleText:a ]     [ Enter: <T> ]
[ <T> Markdown: Text: ]     [ Enter: <T> ]
[ <T> Markdown: Text: Enter: ]     [ <T> ]
[ <T> Markdown: TextLine: ]     [ <T> ]
[ <T> Markdown: Paragraph: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 15', () => {
        expect(markdown.isValid(
`- this is
end of xxyz.
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:this Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:this Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:this ]     [ Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: Spaces:  ]     [ SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: SimpleText:is ]     [ Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> UnorderedListItem: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> UnorderedList: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Line: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: SimpleText:end ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:of ]     [ Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:xxyz. ]     [ Enter: <T> ]
[ <T> Markdown: Text: ]     [ Enter: <T> ]
[ <T> Markdown: Text: Enter: ]     [ <T> ]
[ <T> Markdown: TextLine: ]     [ <T> ]
[ <T> Markdown: Paragraph: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 16', () => {
        expect(markdown.isValid(
`1. this is
end of xxyz.
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemOrder:1.  SimpleText:this Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  ]     [ SimpleText:this Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  SimpleText:this ]     [ Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Spaces:  SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: Spaces:  ]     [ SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ SimpleText:is Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: SimpleText:is ]     [ Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Enter: SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> ItemOrder:1.  Text: Enter: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> OrderedListItem: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> OrderedList: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Line: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: ]     [ SimpleText:end Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: SimpleText:end ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:of Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:of ]     [ Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:xxyz. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:xxyz. ]     [ Enter: <T> ]
[ <T> Markdown: Text: ]     [ Enter: <T> ]
[ <T> Markdown: Text: Enter: ]     [ <T> ]
[ <T> Markdown: TextLine: ]     [ <T> ]
[ <T> Markdown: Paragraph: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )

    })

    test('markdown - 17', () => {
        expect(markdown.isValid(
`1. this is
    8. fruite
    9. apple
2. that are
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemOrder:1.  SimpleText:this Spaces:  SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  ]     [ SimpleText:this Spaces:  SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  SimpleText:this ]     [ Spaces:  SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Spaces:  SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: Spaces:  ]     [ SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ SimpleText:is Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: SimpleText:is ]     [ Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Enter: Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: Enter: ]     [ Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedListItem: ]     [ Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ]     [ Spaces:     ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ]     [ ItemOrder:8.  SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:8.  ]     [ SimpleText:fruite Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:8.  SimpleText:fruite ]     [ Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:8.  Text: ]     [ Enter: Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:8.  Text: Enter: ]     [ Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: OrderedListItem: ]     [ Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ]     [ Spaces:     ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ]     [ ItemOrder:9.  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:9.  ]     [ SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:9.  SimpleText:apple ]     [ Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:9.  Text: ]     [ Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemOrder:9.  Text: Enter: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: OrderedListItem: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  ]     [ SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  SimpleText:that ]     [ Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: ]     [ Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: Spaces:  ]     [ SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: ]     [ SimpleText:are Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: SimpleText:are ]     [ Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: ]     [ Enter: <T> ]
[ <T> OrderedList: ItemOrder:2.  Text: Enter: ]     [ <T> ]
[ <T> OrderedList: OrderedListItem: ]     [ <T> ]
[ <T> OrderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )

    })

    test('markdown - 18', () => {
        expect(markdown.isValid(
`1. this is
    - fruite
    - apple
2. that are
`
)).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemOrder:1.  SimpleText:this Spaces:  SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  ]     [ SimpleText:this Spaces:  SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  SimpleText:this ]     [ Spaces:  SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Spaces:  SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: Spaces:  ]     [ SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ SimpleText:is Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: SimpleText:is ]     [ Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: ]     [ Enter: Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> ItemOrder:1.  Text: Enter: ]     [ Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedListItem: ]     [ Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: ]     [ Spaces:     ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ]     [ ItemHypen:-  SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemHypen:-  ]     [ SimpleText:fruite Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemHypen:-  SimpleText:fruite ]     [ Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemHypen:-  Text: ]     [ Enter: Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: Spaces:     ItemHypen:-  Text: Enter: ]     [ Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedListItem: ]     [ Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ]     [ Spaces:     ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: Spaces:     ]     [ ItemHypen:-  SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: Spaces:     ItemHypen:-  ]     [ SimpleText:apple Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: Spaces:     ItemHypen:-  SimpleText:apple ]     [ Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: Spaces:     ItemHypen:-  Text: ]     [ Enter: ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: Spaces:     ItemHypen:-  Text: Enter: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: UnorderedListItem: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ]     [ ItemOrder:2.  SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  ]     [ SimpleText:that Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  SimpleText:that ]     [ Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: ]     [ Spaces:  SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: Spaces:  ]     [ SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: ]     [ SimpleText:are Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: SimpleText:are ]     [ Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: ]     [ Enter: <T> ]
[ <T> OrderedList: UnorderedList: ItemOrder:2.  Text: Enter: ]     [ <T> ]
[ <T> OrderedList: UnorderedList: OrderedListItem: ]     [ <T> ]
[ <T> OrderedList: UnorderedList: OrderedList: ]     [ <T> ]
[ <T> OrderedList: UnorderedList: ]     [ <T> ]
[ <T> OrderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )

    })

    test('markdown - 19', () => {
        expect(markdown.isValid(
`> abc
`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SimpleText:abc Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SimpleText:abc Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SimpleText:abc Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SimpleText:abc ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                )
        })

test('markdown - 20', () => {
        expect(markdown.isValid(
`> abc
> d**e**f
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SimpleText:abc Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SimpleText:abc Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SimpleText:abc Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SimpleText:abc ]     [ Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  SimpleText:d ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: DoubleStar:** ]     [ SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: DoubleStar:** SimpleText:e ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: StartBoldStarText: ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: StartBoldStarText: DoubleStar:** ]     [ SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: BoldStarText: ]     [ SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ SimpleText:f Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: SimpleText:f ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                        )
})

test('markdown - 21', () => {
        expect(markdown.isValid(
`- dabc
> d**e**f
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:dabc Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:dabc Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:dabc ]     [ Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedListItem: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Line: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: ]     [ LeftArrow:> Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> ]     [ Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  ]     [ SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  SimpleText:d ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: DoubleStar:** ]     [ SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: DoubleStar:** SimpleText:e ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: StartBoldStarText: ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: StartBoldStarText: DoubleStar:** ]     [ SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: BoldStarText: ]     [ SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: ]     [ SimpleText:f Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: SimpleText:f ]     [ Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Markdown: LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Markdown: BlockquoteLine: ]     [ <T> ]
[ <T> Markdown: Blockquotes: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                        )
                })

test('markdown - 22', () => {
        expect(markdown.isValid(
`- dabc
    > d**e**f
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:dabc Enter: IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:dabc Enter: IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:dabc ]     [ Enter: IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedListItem: ]     [ IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: ]     [ IntentLeftArrow:    > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > ]     [ Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  ]     [ SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  SimpleText:d ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: DoubleStar:** ]     [ SimpleText:e DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: DoubleStar:** SimpleText:e ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: StartBoldStarText: ]     [ DoubleStar:** SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: StartBoldStarText: DoubleStar:** ]     [ SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: BoldStarText: ]     [ SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: ]     [ SimpleText:f Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: SimpleText:f ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:    > Spaces:  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquoteLine: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                        )
                })

test('markdown - 23', () => {
        expect(markdown.isValid(
`- dabc
        > d**e**f
        > this is _A_
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:dabc ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedListItem: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:d DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  SimpleText:d ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ DoubleStar:** SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: DoubleStar:** ]     [ SimpleText:e DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: DoubleStar:** SimpleText:e ]     [ DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: StartBoldStarText: ]     [ DoubleStar:** SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: StartBoldStarText: DoubleStar:** ]     [ SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: BoldStarText: ]     [ SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ SimpleText:f Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: SimpleText:f ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquoteLine: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:this Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  SimpleText:this ]     [ Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ Spaces:  SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: Spaces:  ]     [ SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ SimpleText:is Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: SimpleText:is ]     [ Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ Spaces:  SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: Spaces:  ]     [ SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ SingleUnderline:_ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: SingleUnderline:_ ]     [ SimpleText:A SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: SingleUnderline:_ SimpleText:A ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: StartItalicUnderlineText: ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: StartItalicUnderlineText: SingleUnderline:_ ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ItalicUnderlineText: ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentBlockquoteLine: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 24', () => {
        expect(markdown.isValid(
`- dabc
        > ddef
        ahelo abc
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:dabc ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedListItem: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  SimpleText:ddef ]     [ Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentBlockquoteLine: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         ]     [ SimpleText:ahelo Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         SimpleText:ahelo ]     [ Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ Spaces:  SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: Spaces:  ]     [ SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ SimpleText:abc Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: SimpleText:abc ]     [ Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 25', () => {
        expect(markdown.isValid(
`- dabc
        > ddef
        ahelo abc
        > fruite
        > animal
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ ItemHypen:-  SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> ItemHypen:-  ]     [ SimpleText:dabc Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> ItemHypen:-  SimpleText:dabc ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> ItemHypen:-  Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> ItemHypen:-  Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedListItem: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:ddef Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  SimpleText:ddef ]     [ Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquoteLine: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:         SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         ]     [ SimpleText:ahelo Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         SimpleText:ahelo ]     [ Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ Spaces:  SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: Spaces:  ]     [ SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ SimpleText:abc Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: SimpleText:abc ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: Spaces:         Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:fruite Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  SimpleText:fruite ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquoteLine: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ IntentLeftArrow:        > Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > ]     [ Spaces:  SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  ]     [ SimpleText:animal Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  SimpleText:animal ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: ]     [ Enter: <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentLeftArrow:        > Spaces:  Text: Enter: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquotes: IntentBlockquoteLine: ]     [ <T> ]
[ <T> UnorderedList: IntentBlockquotes: ]     [ <T> ]
[ <T> UnorderedList: AppendListItemContentLine: ]     [ <T> ]
[ <T> UnorderedList: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 26', () => {
        expect(markdown.isValid(
`I am a boy.
You are a girl.
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:I Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> SimpleText:I ]     [ Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:am ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:a Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:a ]     [ Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:boy. Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:boy. ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Enter: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> TextLine: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: SimpleText:You ]     [ Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: Spaces:  ]     [ SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: SimpleText:are ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: Spaces:  ]     [ SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: SimpleText:a ]     [ Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: Spaces:  ]     [ SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: ]     [ SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: Text: SimpleText:girl. ]     [ Enter: <T> ]
[ <T> Paragraph: Text: ]     [ Enter: <T> ]
[ <T> Paragraph: Text: Enter: ]     [ <T> ]
[ <T> Paragraph: TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 27', () => {
        expect(markdown.isValid(
`I am a boy.

You are a girl.
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:I Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> SimpleText:I ]     [ Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:am Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:am ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:a Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:a ]     [ Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:boy. Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: SimpleText:boy. ]     [ Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: ]     [ Enter: Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Text: Enter: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> TextLine: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Paragraph: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Line: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: ]     [ Enter: SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Enter: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: BlankLine: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Line: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: ]     [ SimpleText:You Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: SimpleText:You ]     [ Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:are Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:are ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:a Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:a ]     [ Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ Spaces:  SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: Spaces:  ]     [ SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: ]     [ SimpleText:girl. Enter: <T> ]
[ <T> Markdown: Text: SimpleText:girl. ]     [ Enter: <T> ]
[ <T> Markdown: Text: ]     [ Enter: <T> ]
[ <T> Markdown: Text: Enter: ]     [ <T> ]
[ <T> Markdown: TextLine: ]     [ <T> ]
[ <T> Markdown: Paragraph: ]     [ <T> ]
[ <T> Markdown: Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 28', () => {
        expect(markdown.isValid(
`# hello
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SharpSign:# Spaces:  SimpleText:hello Enter: <T> ]
[ <T> SharpSign:# ]     [ Spaces:  SimpleText:hello Enter: <T> ]
[ <T> HeadingLevel: ]     [ Spaces:  SimpleText:hello Enter: <T> ]
[ <T> HeadingLevel: Spaces:  ]     [ SimpleText:hello Enter: <T> ]
[ <T> HeadingLevel: ]     [ SimpleText:hello Enter: <T> ]
[ <T> HeadingLevel: SimpleText:hello ]     [ Enter: <T> ]
[ <T> HeadingLevel: Text: ]     [ Enter: <T> ]
[ <T> HeadingLevel: ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})


test('markdown - 29', () => {
        expect(markdown.isValid(
`# hello **world**
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SharpSign:# Spaces:  SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> SharpSign:# ]     [ Spaces:  SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: ]     [ Spaces:  SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Spaces:  ]     [ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: ]     [ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: SimpleText:hello ]     [ Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: ]     [ Spaces:  DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: Spaces:  ]     [ DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: ]     [ DoubleStar:** SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: DoubleStar:** ]     [ SimpleText:world DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: DoubleStar:** SimpleText:world ]     [ DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: StartBoldStarText: ]     [ DoubleStar:** Enter: <T> ]
[ <T> HeadingLevel: Text: StartBoldStarText: DoubleStar:** ]     [ Enter: <T> ]
[ <T> HeadingLevel: Text: BoldStarText: ]     [ Enter: <T> ]
[ <T> HeadingLevel: Text: ]     [ Enter: <T> ]
[ <T> HeadingLevel: ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})


test('markdown - 30', () => {
        expect(markdown.isValid(
`#_hello **world**_
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SharpSign:# SingleUnderline:_ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> SharpSign:# ]     [ SingleUnderline:_ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: ]     [ SingleUnderline:_ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: SingleUnderline:_ ]     [ SimpleText:hello Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: SingleUnderline:_ SimpleText:hello ]     [ Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: ]     [ Spaces:  DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: Spaces:  ]     [ DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: ]     [ DoubleStar:** SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: DoubleStar:** ]     [ SimpleText:world DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: DoubleStar:** SimpleText:world ]     [ DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: StartBoldStarText: ]     [ DoubleStar:** SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: StartBoldStarText: DoubleStar:** ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: BoldStarText: ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: ]     [ SingleUnderline:_ Enter: <T> ]
[ <T> HeadingLevel: StartItalicUnderlineText: SingleUnderline:_ ]     [ Enter: <T> ]
[ <T> HeadingLevel: ItalicUnderlineText: ]     [ Enter: <T> ]
[ <T> HeadingLevel: Text: ]     [ Enter: <T> ]
[ <T> HeadingLevel: ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 31', () => {
        expect(markdown.isValid(
`> # hello world
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SharpSign:# ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Spaces:  ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: SimpleText:hello ]     [ Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: Spaces:  ]     [ SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: SimpleText:world ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 32', () => {
        expect(markdown.isValid(
`> # hello world
> the world is greate
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SharpSign:# ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Spaces:  ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: SimpleText:hello ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: Spaces:  ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: SimpleText:world ]     [ Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ SimpleText:the Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  SimpleText:the ]     [ Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Spaces:  SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Spaces:  ]     [ SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ SimpleText:world Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: SimpleText:world ]     [ Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Spaces:  SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Spaces:  ]     [ SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ SimpleText:is Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: SimpleText:is ]     [ Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Spaces:  SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Spaces:  ]     [ SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ SimpleText:greate Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: SimpleText:greate ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 33', () => {
        expect(markdown.isValid(
`> # hello world
> - one
> - two
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SharpSign:# ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Spaces:  ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: SimpleText:hello ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: Spaces:  ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: SimpleText:world ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ ItemHypen:-  SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  ]     [ SimpleText:one Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:one ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  Text: ]     [ Enter: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  Text: Enter: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  UnorderedListItem: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  UnorderedList: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ ItemHypen:-  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  ]     [ SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  SimpleText:two ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemHypen:-  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  UnorderedListItem: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  UnorderedList: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 34', () => {
        expect(markdown.isValid(
`> # hello world
> 1. one
> 2. two
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SharpSign:# Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SharpSign:# ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Spaces:  SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Spaces:  ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ SimpleText:hello Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: SimpleText:hello ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: Spaces:  ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ SimpleText:world Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: SimpleText:world ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: Text: ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  HeadingLevel: ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ ItemOrder:1.  SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:1.  ]     [ SimpleText:one Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:1.  SimpleText:one ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:1.  Text: ]     [ Enter: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:1.  Text: Enter: ]     [ LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  OrderedListItem: ]     [ LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  OrderedList: ]     [ LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ ItemOrder:2.  SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:2.  ]     [ SimpleText:two Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:2.  SimpleText:two ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:2.  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ItemOrder:2.  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  OrderedListItem: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  OrderedList: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 35', () => {
        expect(markdown.isValid(
`> hello
>> world
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SimpleText:hello ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> ]     [ Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  ]     [ SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 36', () => {
        expect(markdown.isValid(
`> hello
>> world
>> war
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SimpleText:hello Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SimpleText:hello ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ LeftArrow:> Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> ]     [ Spaces:  SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  ]     [ SimpleText:world Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  SimpleText:world ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> BlockquoteLine: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: ]     [ LeftArrow:> LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> ]     [ LeftArrow:> Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> LeftArrow:> ]     [ Spaces:  SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  ]     [ SimpleText:war Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  SimpleText:war ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: LeftArrow:> Blockquotes: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: LeftArrow:> Blockquotes: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 37', () => {
        expect(markdown.isValid(
`> hello
> world
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ LeftArrow:> Spaces:  SimpleText:hello Enter: LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> ]     [ Spaces:  SimpleText:hello Enter: LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  ]     [ SimpleText:hello Enter: LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  SimpleText:hello ]     [ Enter: LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: ]     [ Enter: LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> LeftArrow:> Spaces:  Text: Enter: ]     [ LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> BlockquoteLine: ]     [ LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: ]     [ LeftArrow:> Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> ]     [ Spaces:  SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  ]     [ SimpleText:world Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  SimpleText:world ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: ]     [ Enter: <T> ]
[ <T> Blockquotes: LeftArrow:> Spaces:  Text: Enter: ]     [ <T> ]
[ <T> Blockquotes: BlockquoteLine: ]     [ <T> ]
[ <T> Blockquotes: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 38', () => {
        expect(markdown.isValid(
`\`\`
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Backtick:\`\` Enter: <T> ]
[ <T> Backtick:\`\` ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 39', () => {
        expect(markdown.isValid(
`type \`nano\`.
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:type Spaces:  Backtick:\`nano\` SimpleText:. Enter: <T> ]
[ <T> SimpleText:type ]     [ Spaces:  Backtick:\`nano\` SimpleText:. Enter: <T> ]
[ <T> Text: ]     [ Spaces:  Backtick:\`nano\` SimpleText:. Enter: <T> ]
[ <T> Text: Spaces:  ]     [ Backtick:\`nano\` SimpleText:. Enter: <T> ]
[ <T> Text: ]     [ Backtick:\`nano\` SimpleText:. Enter: <T> ]
[ <T> Text: Backtick:\`nano\` ]     [ SimpleText:. Enter: <T> ]
[ <T> Text: ]     [ SimpleText:. Enter: <T> ]
[ <T> Text: SimpleText:. ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

test('markdown - 40', () => {
        expect(markdown.isValid(
`[a](http://google.com)
`
                )).toEqual(true)
                // console.log(markdown.getValidationSteps_NoActions())
                expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Link:[a](http://google.com) Enter: <T> ]
[ <T> Link:[a](http://google.com) ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
[ <T> TextLine: ]     [ <T> ]
[ <T> Paragraph: ]     [ <T> ]
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
)
})

})//end


