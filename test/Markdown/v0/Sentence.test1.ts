import { LRSyntaxAnalysisRunner } from '../../../src/SyntaxAnalysis/LR'
import { MarkdownLanguageFunctionsEntity } from './Language_Function'

var languageDefinitionPath: string = `${__dirname}/Language.v1.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`
var markdown: LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, MarkdownLanguageFunctionsEntity)

describe('Sentence', () => {
/*
    test('Sentence - 0', () => {
        expect(markdown.isValid(
            `  `
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Spaces:   <T> ]
[ <T> Spaces:   ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 1', () => {
        expect(markdown.isValid(
            `abc`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:abc <T> ]
[ <T> Text:abc ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 2', () => {
        expect(markdown.isValid(
            `I am`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:I Spaces:  Text:am <T> ]
[ <T> Text:I ]     [ Spaces:  Text:am <T> ]
[ <T> Sentence: ]     [ Spaces:  Text:am <T> ]
[ <T> Sentence: Spaces:  ]     [ Text:am <T> ]
[ <T> Sentence: ]     [ Text:am <T> ]
[ <T> Sentence: Text:am ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })
*/
    test('Sentence - 3', () => {
        expect(markdown.isValid(
            `**hello wolrd**`, true
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldTag:** Text:hello Spaces:  Text:wolrd StarBoldTag:** <T> ]
[ <T> StarBoldTag:** ]     [ Text:hello Spaces:  Text:wolrd StarBoldTag:** <T> ]
[ <T> StarBoldTag:** Text:hello ]     [ Spaces:  Text:wolrd StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: ]     [ Spaces:  Text:wolrd StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: Spaces:  ]     [ Text:wolrd StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: ]     [ Text:wolrd StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: Text:wolrd ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: StarBoldTag:** ]     [ <T> ]
[ <T> StarBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 4', () => {
        expect(markdown.isValid(
            `__hello wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineBoldTag:__ Text:hello Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ ]     [ Text:hello Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ Text:hello ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Spaces:  ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Text:wolrd ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ <T> ]
[ <T> UnderlineBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 5', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarItalicTag:* Text:hello Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> StarItalicTag:* ]     [ Text:hello Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> StarItalicTag:* Text:hello ]     [ Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: Spaces:  ]     [ Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: Text:wolrd ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: StarItalicTag:* ]     [ <T> ]
[ <T> StarItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 6', () => {
        expect(markdown.isValid(
            `hello **Toys** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:hello Spaces:  StarBoldTag:** Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Text:hello ]     [ Spaces:  StarBoldTag:** Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  StarBoldTag:** Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ StarBoldTag:** Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ StarBoldTag:** Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarBoldTag:** ]     [ Text:Toys StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarBoldTag:** Text:Toys ]     [ StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: BeginStarBoldText: ]     [ StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> Sentence: BeginStarBoldText: StarBoldTag:** ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarBoldText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: BoldText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ Text:wolrd <T> ]
[ <T> Sentence: ]     [ Text:wolrd <T> ]
[ <T> Sentence: Text:wolrd ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 7', () => {
        expect(markdown.isValid(
            `**hello** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldTag:** Text:hello StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> StarBoldTag:** ]     [ Text:hello StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> StarBoldTag:** Text:hello ]     [ StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> BeginStarBoldText: ]     [ StarBoldTag:** Spaces:  Text:wolrd <T> ]
[ <T> BeginStarBoldText: StarBoldTag:** ]     [ Spaces:  Text:wolrd <T> ]
[ <T> StarBoldText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> BoldText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ Text:wolrd <T> ]
[ <T> Sentence: ]     [ Text:wolrd <T> ]
[ <T> Sentence: Text:wolrd ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 8', () => {
        expect(markdown.isValid(
            `hello **wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:hello Spaces:  StarBoldTag:** Text:wolrd StarBoldTag:** <T> ]
[ <T> Text:hello ]     [ Spaces:  StarBoldTag:** Text:wolrd StarBoldTag:** <T> ]
[ <T> Sentence: ]     [ Spaces:  StarBoldTag:** Text:wolrd StarBoldTag:** <T> ]
[ <T> Sentence: Spaces:  ]     [ StarBoldTag:** Text:wolrd StarBoldTag:** <T> ]
[ <T> Sentence: ]     [ StarBoldTag:** Text:wolrd StarBoldTag:** <T> ]
[ <T> Sentence: StarBoldTag:** ]     [ Text:wolrd StarBoldTag:** <T> ]
[ <T> Sentence: StarBoldTag:** Text:wolrd ]     [ StarBoldTag:** <T> ]
[ <T> Sentence: BeginStarBoldText: ]     [ StarBoldTag:** <T> ]
[ <T> Sentence: BeginStarBoldText: StarBoldTag:** ]     [ <T> ]
[ <T> Sentence: StarBoldText: ]     [ <T> ]
[ <T> Sentence: BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })
/*
    test('Sentence - 9', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarItalicTag:* Text:hello Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> StarItalicTag:* ]     [ Text:hello Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> StarItalicTag:* Text:hello ]     [ Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ Spaces:  Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: Spaces:  ]     [ Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ Text:wolrd StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: Text:wolrd ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: StarItalicTag:* ]     [ <T> ]
[ <T> StarItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 10', () => {
        expect(markdown.isValid(
            `*hello* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarItalicTag:* Text:hello StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> StarItalicTag:* ]     [ Text:hello StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> StarItalicTag:* Text:hello ]     [ StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> BeginStarItalicText: ]     [ StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> BeginStarItalicText: StarItalicTag:* ]     [ Spaces:  Text:wolrd <T> ]
[ <T> StarItalicText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> ItalicText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ Text:wolrd <T> ]
[ <T> Sentence: ]     [ Text:wolrd <T> ]
[ <T> Sentence: Text:wolrd ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 11', () => {
        expect(markdown.isValid(
            `hello *wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:hello Spaces:  StarItalicTag:* Text:wolrd StarItalicTag:* <T> ]
[ <T> Text:hello ]     [ Spaces:  StarItalicTag:* Text:wolrd StarItalicTag:* <T> ]
[ <T> Sentence: ]     [ Spaces:  StarItalicTag:* Text:wolrd StarItalicTag:* <T> ]
[ <T> Sentence: Spaces:  ]     [ StarItalicTag:* Text:wolrd StarItalicTag:* <T> ]
[ <T> Sentence: ]     [ StarItalicTag:* Text:wolrd StarItalicTag:* <T> ]
[ <T> Sentence: StarItalicTag:* ]     [ Text:wolrd StarItalicTag:* <T> ]
[ <T> Sentence: StarItalicTag:* Text:wolrd ]     [ StarItalicTag:* <T> ]
[ <T> Sentence: BeginStarItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> Sentence: BeginStarItalicText: StarItalicTag:* ]     [ <T> ]
[ <T> Sentence: StarItalicText: ]     [ <T> ]
[ <T> Sentence: ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 12', () => {
        expect(markdown.isValid(
            `hello *toys* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ Text:hello Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Text:hello ]     [ Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarItalicTag:* ]     [ Text:toys StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarItalicTag:* Text:toys ]     [ StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: BeginStarItalicText: ]     [ StarItalicTag:* Spaces:  Text:wolrd <T> ]
[ <T> Sentence: BeginStarItalicText: StarItalicTag:* ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: StarItalicText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ItalicText: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: ]     [ Spaces:  Text:wolrd <T> ]
[ <T> Sentence: Spaces:  ]     [ Text:wolrd <T> ]
[ <T> Sentence: ]     [ Text:wolrd <T> ]
[ <T> Sentence: Text:wolrd ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 13', () => {
        expect(markdown.isValid(
            `__hello *toys* wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineBoldTag:__ Text:hello Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ ]     [ Text:hello Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ Text:hello ]     [ Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Spaces:  StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Spaces:  ]     [ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: StarItalicTag:* ]     [ Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: StarItalicTag:* Text:toys ]     [ StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: BeginStarItalicText: ]     [ StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: BeginStarItalicText: StarItalicTag:* ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: StarItalicText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ItalicText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Spaces:  ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Text:wolrd ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ <T> ]
[ <T> UnderlineBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 14', () => {
        expect(markdown.isValid(
            `__*toys* wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineBoldTag:__ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ ]     [ StarItalicTag:* Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarItalicTag:* ]     [ Text:toys StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarItalicTag:* Text:toys ]     [ StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ BeginStarItalicText: ]     [ StarItalicTag:* Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ BeginStarItalicText: StarItalicTag:* ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarItalicText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ ItalicText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Spaces:  Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Spaces:  ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ Text:wolrd UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: Text:wolrd ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ <T> ]
[ <T> UnderlineBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })


    test('Sentence - 15', () => {
        expect(markdown.isValid(
            `*__toys__*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarItalicTag:* UnderlineBoldTag:__ Text:toys UnderlineBoldTag:__ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* ]     [ UnderlineBoldTag:__ Text:toys UnderlineBoldTag:__ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineBoldTag:__ ]     [ Text:toys UnderlineBoldTag:__ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineBoldTag:__ Text:toys ]     [ UnderlineBoldTag:__ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineBoldText: ]     [ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* BoldText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: StarItalicTag:* ]     [ <T> ]
[ <T> StarItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })


    test('Sentence - 16', () => {
        expect(markdown.isValid(
            `_toys_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ ]     [ Text:toys UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ Text:toys ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ <T> ]
[ <T> UnderlineItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 17', () => {
        expect(markdown.isValid(
            `_**toys**_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineItalicTag:_ StarBoldTag:** Text:toys StarBoldTag:** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ ]     [ StarBoldTag:** Text:toys StarBoldTag:** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldTag:** ]     [ Text:toys StarBoldTag:** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldTag:** Text:toys ]     [ StarBoldTag:** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarBoldText: ]     [ StarBoldTag:** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarBoldText: StarBoldTag:** ]     [ UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BoldText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ <T> ]
[ <T> UnderlineItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 18', () => {
        expect(markdown.isValid(
            `**_toys_**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldTag:** UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** ]     [ UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineItalicTag:_ ]     [ Text:toys UnderlineItalicTag:_ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineItalicTag:_ Text:toys ]     [ UnderlineItalicTag:_ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineItalicText: ]     [ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** ItalicText: ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: StarBoldTag:** ]     [ <T> ]
[ <T> StarBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 19', () => {
        expect(markdown.isValid(
            `***toys***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldItalicTag:*** Text:toys StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** ]     [ Text:toys StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** Text:toys ]     [ StarBoldItalicTag:*** <T> ]
[ <T> BeginStarBoldItalicText: ]     [ StarBoldItalicTag:*** <T> ]
[ <T> BeginStarBoldItalicText: StarBoldItalicTag:*** ]     [ <T> ]
[ <T> StarBoldItalicText: ]     [ <T> ]
[ <T> BoldItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 20', () => {
        expect(markdown.isValid(
            `_***toys***_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineItalicTag:_ StarBoldItalicTag:*** Text:toys StarBoldItalicTag:*** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ ]     [ StarBoldItalicTag:*** Text:toys StarBoldItalicTag:*** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldItalicTag:*** ]     [ Text:toys StarBoldItalicTag:*** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldItalicTag:*** Text:toys ]     [ StarBoldItalicTag:*** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarBoldItalicText: ]     [ StarBoldItalicTag:*** UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarBoldItalicText: StarBoldItalicTag:*** ]     [ UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarBoldItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BoldItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ <T> ]
[ <T> UnderlineItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 21', () => {
        expect(markdown.isValid(
            `***_toys_***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldItalicTag:*** UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** ]     [ UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** UnderlineItalicTag:_ ]     [ Text:toys UnderlineItalicTag:_ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** UnderlineItalicTag:_ Text:toys ]     [ UnderlineItalicTag:_ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** UnderlineItalicText: ]     [ StarBoldItalicTag:*** <T> ]
[ <T> StarBoldItalicTag:*** ItalicText: ]     [ StarBoldItalicTag:*** <T> ]
[ <T> BeginStarBoldItalicText: ]     [ StarBoldItalicTag:*** <T> ]
[ <T> BeginStarBoldItalicText: StarBoldItalicTag:*** ]     [ <T> ]
[ <T> StarBoldItalicText: ]     [ <T> ]
[ <T> BoldItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 23', () => {
        expect(markdown.isValid(
            `*_toys_*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarItalicTag:* UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* ]     [ UnderlineItalicTag:_ Text:toys UnderlineItalicTag:_ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineItalicTag:_ ]     [ Text:toys UnderlineItalicTag:_ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineItalicTag:_ Text:toys ]     [ UnderlineItalicTag:_ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ StarItalicTag:* <T> ]
[ <T> StarItalicTag:* UnderlineItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: ]     [ StarItalicTag:* <T> ]
[ <T> BeginStarItalicText: StarItalicTag:* ]     [ <T> ]
[ <T> StarItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 24', () => {
        expect(markdown.isValid(
            `_*toys*_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineItalicTag:_ StarItalicTag:* Text:toys StarItalicTag:* UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ ]     [ StarItalicTag:* Text:toys StarItalicTag:* UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarItalicTag:* ]     [ Text:toys StarItalicTag:* UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarItalicTag:* Text:toys ]     [ StarItalicTag:* UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarItalicText: ]     [ StarItalicTag:* UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ BeginStarItalicText: StarItalicTag:* ]     [ UnderlineItalicTag:_ <T> ]
[ <T> UnderlineItalicTag:_ StarItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: ]     [ UnderlineItalicTag:_ <T> ]
[ <T> BeginUnderlineItalicText: UnderlineItalicTag:_ ]     [ <T> ]
[ <T> UnderlineItalicText: ]     [ <T> ]
[ <T> ItalicText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 25', () => {
        expect(markdown.isValid(
            `**__toys__**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ StarBoldTag:** UnderlineBoldTag:__ Text:toys UnderlineBoldTag:__ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** ]     [ UnderlineBoldTag:__ Text:toys UnderlineBoldTag:__ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineBoldTag:__ ]     [ Text:toys UnderlineBoldTag:__ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineBoldTag:__ Text:toys ]     [ UnderlineBoldTag:__ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ StarBoldTag:** <T> ]
[ <T> StarBoldTag:** UnderlineBoldText: ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: ]     [ StarBoldTag:** <T> ]
[ <T> BeginStarBoldText: StarBoldTag:** ]     [ <T> ]
[ <T> StarBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })

    test('Sentence - 26', () => {
        expect(markdown.isValid(
            `__**toys**__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        expect(markdown.getValidationSteps_NoActions()).toEqual(
`[ <T> ]     [ UnderlineBoldTag:__ StarBoldTag:** Text:toys StarBoldTag:** UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ ]     [ StarBoldTag:** Text:toys StarBoldTag:** UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarBoldTag:** ]     [ Text:toys StarBoldTag:** UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarBoldTag:** Text:toys ]     [ StarBoldTag:** UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ BeginStarBoldText: ]     [ StarBoldTag:** UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ BeginStarBoldText: StarBoldTag:** ]     [ UnderlineBoldTag:__ <T> ]
[ <T> UnderlineBoldTag:__ StarBoldText: ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: ]     [ UnderlineBoldTag:__ <T> ]
[ <T> BeginUnderlineBoldText: UnderlineBoldTag:__ ]     [ <T> ]
[ <T> UnderlineBoldText: ]     [ <T> ]
[ <T> BoldText: ]     [ <T> ]
[ <T> Sentence: ]     [ <T> ]`
        )
    })
*/
})//end


