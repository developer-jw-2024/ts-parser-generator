import { FileUtils } from '../../src/Utils/FileUtil'
import { Markdown } from './Markdown'


var languageDefinitionPath : string = './test/Markdown/Markdown_Language.txt'
var tokenTypeDefinitionPath : string = './test/Markdown/Markdown_RegExp.txt'
var markdown : Markdown = new Markdown(languageDefinitionPath, tokenTypeDefinitionPath)

describe('markdown', () => {
    test('markdown - 1', () => {
        expect(markdown.isValid("abc")).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ SimpleText:abc Enter: <T> ]
[ <T> SimpleText:abc ]     [ Enter: <T> ]
[ <T> Text: ]     [ Enter: <T> ]
[ <T> Text: Enter: ]     [ <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ ItemHypen:-  SimpleText:Two Enter: <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Enter: <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Orange Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Orange ]     [ Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ ItemStar:*  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
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
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: ]     [ Spaces:     SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     ]     [ SimpleText:Orange Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     SimpleText:Orange ]     [ Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: ]     [ Enter: ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: Spaces:     Text: Enter: ]     [ ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
[ <T> UnorderedList: UnorderedListItemContentLine: ]     [ ItemPlus:+  SimpleText:Two Spaces:  SimpleText:three Spaces:  SimpleText:four Enter: <T> ]
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
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })

    test('markdown - 14', () => {
        expect(markdown.isValid(
`- list
a`, true
)).toEqual(true)
        console.log(markdown.getValidationSteps_NoActions())
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
[ <T> Line: ]     [ <T> ]
[ <T> Markdown: ]     [ <T> ]`
        )
    })
})


