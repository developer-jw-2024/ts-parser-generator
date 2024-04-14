import { MarkdownSyntaxAnalyzer } from './MarkdownSyntaxAnalyzer'

var markdown: MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().init()


describe('Sentence', () => {

    test('Sentence - 0', () => {
        expect(markdown.isValid(
            `  `
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 1', () => {
        expect(markdown.isValid(
            `abc`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 2', () => {
        expect(markdown.isValid(
            `I am`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())

    })

    test('Sentence - 3', () => {
        expect(markdown.isValid(
            `**hello wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
       
    })

    test('Sentence - 4', () => {
        expect(markdown.isValid(
            `__hello wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 5', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 6', () => {
        expect(markdown.isValid(
            `hello **Toys** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 7', () => {
        expect(markdown.isValid(
            `**hello** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 8', () => {
        expect(markdown.isValid(
            `hello **wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 9', () => {
        expect(markdown.isValid(
            `*hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 10', () => {
        expect(markdown.isValid(
            `*hello* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 11', () => {
        expect(markdown.isValid(
            `hello *wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 12', () => {
        expect(markdown.isValid(
            `hello *toys* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 13', () => {
        expect(markdown.isValid(
            `**hello _toys_ wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 14', () => {
        expect(markdown.isValid(
            `__*toys* wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 15', () => {
        expect(markdown.isValid(
            `*__toys__*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 16', () => {
        expect(markdown.isValid(
            `_toys_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 17', () => {
        expect(markdown.isValid(
            `_**toys**_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 18', () => {
        expect(markdown.isValid(
            `**_toys_**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 19', () => {
        expect(markdown.isValid(
            `***toys***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 20', () => {
        expect(markdown.isValid(
            `_***toys***_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 21', () => {
        expect(markdown.isValid(
            `***_toys_***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 23', () => {
        expect(markdown.isValid(
            `*_toys_*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 24', () => {
        expect(markdown.isValid(
            `_*toys*_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 25', () => {
        expect(markdown.isValid(
            `**__toys__**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 26', () => {
        expect(markdown.isValid(
            `__**toys**__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    ////
    test('Sentence - P0', () => {
        expect(markdown.isValid(
            `  `
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - P1', () => {
        expect(markdown.isValid(
            `abc`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - P2', () => {
        expect(markdown.isValid(
            `I am`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())

    })

    test('Sentence - P3', () => {
        expect(markdown.isValid(
            `This is **hello wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
       
    })

    test('Sentence - P4', () => {
        expect(markdown.isValid(
            `This is __hello wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P5', () => {
        expect(markdown.isValid(
            `This is *hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P6', () => {
        expect(markdown.isValid(
            `This is hello **Toys** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P7', () => {
        expect(markdown.isValid(
            `This is **hello** wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P8', () => {
        expect(markdown.isValid(
            `This is hello **wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P9', () => {
        expect(markdown.isValid(
            `This is *hello wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P10', () => {
        expect(markdown.isValid(
            `This is *hello* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P11', () => {
        expect(markdown.isValid(
            `This is hello *wolrd*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P12', () => {
        expect(markdown.isValid(
            `This is hello *toys* wolrd`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P13', () => {
        expect(markdown.isValid(
            `This is **hello _toys_ wolrd**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P14', () => {
        expect(markdown.isValid(
            `This is __*toys* wolrd__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - P15', () => {
        expect(markdown.isValid(
            `*This is __toys__*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - P16', () => {
        expect(markdown.isValid(
            `This is _toys_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P17', () => {
        expect(markdown.isValid(
            `This is _**toys**_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P18', () => {
        expect(markdown.isValid(
            `This is **_toys_**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P19', () => {
        expect(markdown.isValid(
            `This is ***toys***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P20', () => {
        expect(markdown.isValid(
            `This is _***toys***_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P21', () => {
        expect(markdown.isValid(
            `This is ***_toys_***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P23', () => {
        expect(markdown.isValid(
            `This is *_toys_*`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P24', () => {
        expect(markdown.isValid(
            `This is _*toys*_`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P25', () => {
        expect(markdown.isValid(
            `This is **__toys__**`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - P26', () => {
        expect(markdown.isValid(
            `This is __**toys**__`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 0', () => {
        expect(markdown.isValid(
            `  `
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 1P', () => {
        expect(markdown.isValid(
            `abc  this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
    })

    test('Sentence - 2P', () => {
        expect(markdown.isValid(
            `I am this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())

    })

    test('Sentence - 3P', () => {
        expect(markdown.isValid(
            `**hello wolrd** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
       
    })

    test('Sentence - 4P', () => {
        expect(markdown.isValid(
            `__hello wolrd__ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 5P', () => {
        expect(markdown.isValid(
            `*hello wolrd* this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 6P', () => {
        expect(markdown.isValid(
            `hello **Toys** wolrd this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 7P', () => {
        expect(markdown.isValid(
            `**hello** wolrd this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 8P', () => {
        expect(markdown.isValid(
            `hello **wolrd** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 9P', () => {
        expect(markdown.isValid(
            `*hello wolrd* this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 10P', () => {
        expect(markdown.isValid(
            `*hello* wolrd this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 11P', () => {
        expect(markdown.isValid(
            `hello *wolrd* this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 12P', () => {
        expect(markdown.isValid(
            `hello *toys* wolrd this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 13P', () => {
        expect(markdown.isValid(
            `**hello _toys_ wolrd** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 14P', () => {
        expect(markdown.isValid(
            `__*toys* wolrd__ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 15P', () => {
        expect(markdown.isValid(
            `*__toys__* this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })


    test('Sentence - 16P', () => {
        expect(markdown.isValid(
            `_toys_ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 17P', () => {
        expect(markdown.isValid(
            `_**toys**_ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 18P', () => {
        expect(markdown.isValid(
            `**_toys_** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 19P', () => {
        expect(markdown.isValid(
            `***toys*** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 20P', () => {
        expect(markdown.isValid(
            `_***toys***_ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 21P', () => {
        expect(markdown.isValid(
            `***_toys_*** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 23P', () => {
        expect(markdown.isValid(
            `*_toys_* this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 24P', () => {
        expect(markdown.isValid(
            `_*toys*_ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 25P', () => {
        expect(markdown.isValid(
            `**__toys__** this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 26P', () => {
        expect(markdown.isValid(
            `__**toys**__ this is`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 27', () => {
        expect(markdown.isValid(
            `** **A** **`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 28', () => {
        expect(markdown.isValid(
            `***`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    
    test('Sentence - 29', () => {
        expect(markdown.isValid(
            "``Use `code` in your Markdown file.``"
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 30', () => {
        expect(markdown.isValid(
            "```Use `code` in your Markdown file.```"
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
    
    test('Sentence - 31', () => {
        expect(markdown.isValid(
            `[^Variable]`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 32', () => {
        expect(markdown.isValid(
            `[^Variable]: This is good foot note.`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
    
    test('Sentence - 33', () => {
        expect(markdown.isValid(
            `: This is good foot note.`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 34', () => {
        expect(markdown.isValid(
            `- [ ] This is good foot note.`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 35', () => {
        expect(markdown.isValid(
            `- [x] This is good foot note.`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })

    test('Sentence - 36', () => {
        expect(markdown.isValid(
            `- [x] This :tent: is good.`
        )).toEqual(true)
        // console.log(markdown.getValidationSteps_NoActions())
        
    })
    
})//end


