import { FileUtils } from '../../src/Utils/FileUtil'
import { Markdown } from './Markdown'


var languageDefinitionPath : string = './test/Markdown/Markdown_Language.txt'
var tokenTypeDefinitionPath : string = './test/Markdown/Markdown_RegExp.txt'
var markdown : Markdown = new Markdown(languageDefinitionPath, tokenTypeDefinitionPath)

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
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
                )
        })

        test('markdown - 1', () => {
        expect(markdown.isValid("abc")).toEqual(true)
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
        expect(markdown.isValid("a ")).toEqual(true)
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
                expect(markdown.isValid("a**T**")).toEqual(true)
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
        expect(markdown.isValid("_a**T**_")).toEqual(true)
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
`- One`
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
- Two`
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
    Apple`
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
- Two`
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
* Two`
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
* Two`
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
* Two three four`
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
+ Two three four`
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
`This is the end of content.`
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
a`
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
a`
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
end of xxyz.`
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
end of xxyz.`
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
2. that are`
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
2. that are`
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
`> abc`
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
> d**e**f`
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
> d**e**f`
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
    > d**e**f`
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
        > this is _A_`
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
        ahelo abc`
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
        > animal`
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

})//end


