import { AnalysisToken, GrammarProductionFunction, LanguageFunctionsEntity } from "../../../src/SyntaxAnalysis/SyntaxAnalysis";

export class MarkdownLanguageFunctionsEntity extends LanguageFunctionsEntity {
    
    @GrammarProductionFunction(`Markdown -> WholeMarkdownLine`)
    Markdown__WholeMarkdownLine(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Markdown -> MarkdownLine`)
    Markdown__MarkdownLine(argv : Array<AnalysisToken>) {
        var markdown : Markdown = new Markdown()
        markdown.addSegment(argv[0].value)
        return markdown
    }

    @GrammarProductionFunction(`Markdown -> WholeMarkdownLine MarkdownLine`)
    AppendMarkdown__MarkdownLine(argv : Array<AnalysisToken>) {
        var markdown : Markdown = argv[0].value
        markdown.addSegment(argv[1].value)
        return markdown
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> MarkdownLine Enter`)
    WholeMarkdownLine__MarkdownLine_Enter(argv : Array<AnalysisToken>) {
        var markdown : Markdown = new Markdown()
        markdown.addSegment(argv[0].value)
        return markdown
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine MarkdownLine Enter`)
    AppendWholeMarkdownLine__MarkdownLine_Enter(argv : Array<AnalysisToken>) {
        var markdown : Markdown = argv[0].value
        markdown.addSegment(argv[1].value)
        return markdown
    }
    /*
    TableRow -> VerticalBar MarkdownLine VerticalBar
    TableRow -> TableRow MarkdownLine VerticalBar
    MarkdownLine -> TableRow

    TableAlignmentRow -> VerticalBar dahes3 VerticalBar
    TableAlignmentRow -> VerticalBar ColumnLeftAlignment VerticalBar
    TableAlignmentRow -> VerticalBar ColumnRightAlignment VerticalBar
    TableAlignmentRow -> VerticalBar ColumnCenterAlignment VerticalBar
    TableAlignmentRow -> TableAlignmentRow dahes3 VerticalBar
    TableAlignmentRow -> TableAlignmentRow ColumnLeftAlignment VerticalBar
    TableAlignmentRow -> TableAlignmentRow ColumnRightAlignment VerticalBar
    TableAlignmentRow -> TableAlignmentRow ColumnCenterAlignment VerticalBar
    MarkdownLine -> TableAlignmentRow

    TaskListItem -> CheckedBox Spaces MarkdownLine
    TaskListItem -> UncheckedBox Spaces MarkdownLine
    MarkdownLine -> TaskListItem

    DefinitionListItem -> ColonSign Spaces MarkdownLine
    MarkdownLine -> DefinitionListItem

    Footnote -> FootnoteReference ColonSign Spaces MarkdownLine
    MarkdownLine -> Footnote

    HorizontalRule -> StarBoldItalicTag
    HorizontalRule -> UnderlineBoldItalicTag
    HorizontalRule -> underscores
    HorizontalRule -> dahes3
    HorizontalRule -> asterisks4
    MarkdownLine -> HorizontalRule

    Blockquote -> LeftArrow MarkdownLine
    MarkdownLine -> Blockquote

    Complement -> Spaces MarkdownLine
    MarkdownLine -> Complement

    Heading -> SharpSign MarkdownLine
    MarkdownLine -> Heading

    OrderedItem -> OrderedItemTag Sentence
    MarkdownLine -> OrderedItem

    UnorderedItem -> UnorderedItemTag Sentence
    MarkdownLine -> UnorderedItem

    */
    @GrammarProductionFunction('Sentence -> Match_emphasis')
    Sentence__Match_emphasis(argv : Array<AnalysisToken>) {
        var sentence : Sentence = new Sentence()
        sentence.addSegment(argv[0].value)
        return sentence
    }
    @GrammarProductionFunction('Sentence -> Sentence Match_emphasis')
    AppendSentence__Match_emphasis(argv : Array<AnalysisToken>) {
        var sentence : Sentence = argv[0].value
        sentence.addSegment(argv[1].value)
        return sentence
    }
    @GrammarProductionFunction('MarkdownLine -> Sentence')
    MarkdownLine__Sentence(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`
        PlainText -> SimpleText
        PlainText -> Spaces
        PlainText -> Link
        PlainText -> URLAddress
        PlainText -> EmailAddress
        PlainText -> Image
        PlainText -> Emoji
        PlainText -> FootnoteReference
    `)
    PlainText__SimpleText(argv : Array<AnalysisToken>) {
        var plainText = new PlainText()
        plainText.addSegment(argv[0].value)
        return plainText
    }

    @GrammarProductionFunction(`
        PlainText -> PlainText SimpleText
        PlainText -> PlainText Spaces
        PlainText -> PlainText Link
        PlainText -> PlainText URLAddress
        PlainText -> PlainText EmailAddress
        PlainText -> PlainText Image
        PlainText -> PlainText Emoji
        PlainText -> PlainText FootnoteReference
    `)
    AppendPlainText__SimpleText(argv : Array<AnalysisToken>) {
        var plainText = argv[0].value
        plainText.addSegment(argv[1].value)
        return plainText
    }
    /*


    FootnoteReference -> OpenSquareBracketWithCaret SimpleText CloseSquareBracket

    Link -> OpenSquareBracket Sentence CloseSquareBracket OpenParentheses URL CloseParentheses
    Link -> OpenSquareBracket Sentence CloseSquareBracket OpenParentheses URL Spaces DoubleQuotationMarkText CloseParentheses
    Image -> ExclamationMarkOpenSquareBracket Sentence CloseSquareBracket OpenParentheses URL Spaces DoubleQuotationMarkText CloseParentheses










    */
   
    @GrammarProductionFunction(`BeginStarBoldText -> StarBoldTag NO_StarBoldText_Match_emphasis`)
    BeginStarBoldText__StarBoldTag_NO_StarBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = new BoldText()
        boldText.addSegment(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`BeginStarBoldText -> BeginStarBoldText NO_StarBoldText_Match_emphasis`)
    BeginStarBoldText__BeginStarBoldText_NO_StarBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = argv[0].value
        boldText.addSegment(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`StarBoldText -> BeginStarBoldText StarBoldTag`)
    StarBoldText__BeginStarBoldText_StarBoldTag(argv : Array<AnalysisToken>) {
        var boldText : BoldText = argv[0].value
        return boldText
    }

    /*
    BeginUnderlineBoldText -> UnderlineBoldTag NO_UnderlineBoldText_Match_emphasis
    BeginUnderlineBoldText -> BeginUnderlineBoldText NO_UnderlineBoldText_Match_emphasis
    UnderlineBoldText -> BeginUnderlineBoldText UnderlineBoldTag

    BeginStarItalicText -> StarItalicTag NO_StarItalicText_Match_emphasis
    BeginStarItalicText -> BeginStarItalicText NO_StarItalicText_Match_emphasis
    StarItalicText -> BeginStarItalicText StarItalicTag

    BeginUnderlineItalicText -> UnderlineItalicTag NO_UnderlineItalicText_Match_emphasis
    BeginUnderlineItalicText -> BeginUnderlineItalicText NO_UnderlineItalicText_Match_emphasis
    UnderlineItalicText -> BeginUnderlineItalicText UnderlineItalicTag

    BeginStarBoldItalicText -> StarBoldItalicTag NO_StarBoldItalicText_Match_emphasis
    BeginStarBoldItalicText -> BeginStarBoldItalicText NO_StarBoldItalicText_Match_emphasis
    StarBoldItalicText -> BeginStarBoldItalicText StarBoldItalicTag

    BeginUnderlineBoldItalicText -> UnderlineBoldItalicTag NO_UnderlineBoldItalicText_Match_emphasis
    BeginUnderlineBoldItalicText -> BeginUnderlineBoldItalicText NO_UnderlineBoldItalicText_Match_emphasis
    UnderlineBoldItalicText -> BeginUnderlineBoldItalicText UnderlineBoldItalicTag

    BeginStrikethroughText -> StrikethroughTag NO_StrikethroughText_Match_emphasis
    BeginStrikethroughText -> BeginStrikethroughText NO_StrikethroughText_Match_emphasis
    StrikethroughText -> BeginStrikethroughText StrikethroughTag

    BeginHighlightText -> HighlightTag NO_HighlightText_Match_emphasis
    BeginHighlightText -> BeginHighlightText NO_HighlightText_Match_emphasis
    HighlightText -> BeginHighlightText HighlightTag

    BeginSubscriptText -> SubscriptTag NO_SubscriptText_Match_emphasis
    BeginSubscriptText -> BeginSubscriptText NO_SubscriptText_Match_emphasis
    SubscriptText -> BeginSubscriptText SubscriptTag

    BeginSuperscriptText -> SuperscriptTag NO_SuperscriptText_Match_emphasis
    BeginSuperscriptText -> BeginSuperscriptText NO_SuperscriptText_Match_emphasis
    SuperscriptText -> BeginSuperscriptText SuperscriptTag

    BeginDoubleBacktickText -> DoubleBacktickTag NO_DoubleBacktickText_Match_emphasis
    BeginDoubleBacktickText -> BeginDoubleBacktickText NO_DoubleBacktickText_Match_emphasis
    DoubleBacktickText -> BeginDoubleBacktickText DoubleBacktickTag

    BeginBacktickText -> BacktickTag NO_BacktickText_Match_emphasis
    BeginBacktickText -> BeginBacktickText NO_BacktickText_Match_emphasis
    BacktickText -> BeginBacktickText BacktickTag
    */


    @GrammarProductionFunction(`BeginFencedCodeBlockText -> FencedCodeBlockTag NO_FencedCodeBlockText_Match_emphasis`)
    BeginFencedCodeBlockText(argv : Array<AnalysisToken>) {
        var fencedCodeBlockText : FencedCodeBlockText = new FencedCodeBlockText()
        fencedCodeBlockText.addSegment(argv[1].value)
        return fencedCodeBlockText
    }
    @GrammarProductionFunction(`BeginFencedCodeBlockText -> BeginFencedCodeBlockText NO_FencedCodeBlockText_Match_emphasis`)
    AppendBeginFencedCodeBlockText(argv : Array<AnalysisToken>) {
        var fencedCodeBlockText : FencedCodeBlockText = argv[0].value
        fencedCodeBlockText.addSegment(argv[1].value)
        return fencedCodeBlockText
    }
    @GrammarProductionFunction(`FencedCodeBlockText -> BeginFencedCodeBlockText FencedCodeBlockTag`)
    FencedCodeBlockText(argv : Array<AnalysisToken>) {
        var fencedCodeBlockText : FencedCodeBlockText = argv[0].value
        fencedCodeBlockText.addSegment(argv[1].value)
        return fencedCodeBlockText
    }



   
    
    @GrammarProductionFunction(`
        NO_StarBoldText_Match_emphasis -> PlainText
        NO_StarBoldText_Match_emphasis -> UnderlineBoldText
        NO_StarBoldText_Match_emphasis -> StarItalicText
        NO_StarBoldText_Match_emphasis -> UnderlineItalicText
        NO_StarBoldText_Match_emphasis -> StarBoldItalicText
        NO_StarBoldText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarBoldText_Match_emphasis -> StrikethroughText
        NO_StarBoldText_Match_emphasis -> HighlightText
        NO_StarBoldText_Match_emphasis -> SubscriptText
        NO_StarBoldText_Match_emphasis -> SuperscriptText
        NO_StarBoldText_Match_emphasis -> DoubleBacktickText
        NO_StarBoldText_Match_emphasis -> BacktickText
        NO_StarBoldText_Match_emphasis -> FencedCodeBlockText

        NO_UnderlineBoldText_Match_emphasis -> PlainText
        NO_UnderlineBoldText_Match_emphasis -> StarBoldText
        NO_UnderlineBoldText_Match_emphasis -> StarItalicText
        NO_UnderlineBoldText_Match_emphasis -> UnderlineItalicText
        NO_UnderlineBoldText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineBoldText_Match_emphasis -> UnderlineBoldItalicText
        NO_UnderlineBoldText_Match_emphasis -> StrikethroughText
        NO_UnderlineBoldText_Match_emphasis -> HighlightText
        NO_UnderlineBoldText_Match_emphasis -> SubscriptText
        NO_UnderlineBoldText_Match_emphasis -> SuperscriptText
        NO_UnderlineBoldText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineBoldText_Match_emphasis -> BacktickText
        NO_UnderlineBoldText_Match_emphasis -> FencedCodeBlockText

        NO_StarItalicText_Match_emphasis -> PlainText
        NO_StarItalicText_Match_emphasis -> StarBoldText
        NO_StarItalicText_Match_emphasis -> UnderlineBoldText
        NO_StarItalicText_Match_emphasis -> UnderlineItalicText
        NO_StarItalicText_Match_emphasis -> StarBoldItalicText
        NO_StarItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarItalicText_Match_emphasis -> StrikethroughText
        NO_StarItalicText_Match_emphasis -> HighlightText
        NO_StarItalicText_Match_emphasis -> SubscriptText
        NO_StarItalicText_Match_emphasis -> SuperscriptText
        NO_StarItalicText_Match_emphasis -> DoubleBacktickText
        NO_StarItalicText_Match_emphasis -> BacktickText
        NO_StarItalicText_Match_emphasis -> FencedCodeBlockText

        NO_UnderlineItalicText_Match_emphasis -> PlainText
        NO_UnderlineItalicText_Match_emphasis -> StarBoldText
        NO_UnderlineItalicText_Match_emphasis -> UnderlineBoldText
        NO_UnderlineItalicText_Match_emphasis -> StarItalicText
        NO_UnderlineItalicText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_UnderlineItalicText_Match_emphasis -> StrikethroughText
        NO_UnderlineItalicText_Match_emphasis -> HighlightText
        NO_UnderlineItalicText_Match_emphasis -> SubscriptText
        NO_UnderlineItalicText_Match_emphasis -> SuperscriptText
        NO_UnderlineItalicText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineItalicText_Match_emphasis -> BacktickText
        NO_UnderlineItalicText_Match_emphasis -> FencedCodeBlockText

        NO_StarBoldItalicText_Match_emphasis -> PlainText
        NO_StarBoldItalicText_Match_emphasis -> StarBoldText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineBoldText
        NO_StarBoldItalicText_Match_emphasis -> StarItalicText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineItalicText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarBoldItalicText_Match_emphasis -> StrikethroughText
        NO_StarBoldItalicText_Match_emphasis -> HighlightText
        NO_StarBoldItalicText_Match_emphasis -> SubscriptText
        NO_StarBoldItalicText_Match_emphasis -> SuperscriptText
        NO_StarBoldItalicText_Match_emphasis -> DoubleBacktickText
        NO_StarBoldItalicText_Match_emphasis -> BacktickText
        NO_StarBoldItalicText_Match_emphasis -> FencedCodeBlockText

        NO_UnderlineBoldItalicText_Match_emphasis -> PlainText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarBoldText
        NO_UnderlineBoldItalicText_Match_emphasis -> UnderlineBoldText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> UnderlineItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> StrikethroughText
        NO_UnderlineBoldItalicText_Match_emphasis -> HighlightText
        NO_UnderlineBoldItalicText_Match_emphasis -> SubscriptText
        NO_UnderlineBoldItalicText_Match_emphasis -> SuperscriptText
        NO_UnderlineBoldItalicText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineBoldItalicText_Match_emphasis -> BacktickText
        NO_UnderlineBoldItalicText_Match_emphasis -> FencedCodeBlockText

        NO_StrikethroughText_Match_emphasis -> PlainText
        NO_StrikethroughText_Match_emphasis -> StarBoldText
        NO_StrikethroughText_Match_emphasis -> UnderlineBoldText
        NO_StrikethroughText_Match_emphasis -> StarItalicText
        NO_StrikethroughText_Match_emphasis -> UnderlineItalicText
        NO_StrikethroughText_Match_emphasis -> StarBoldItalicText
        NO_StrikethroughText_Match_emphasis -> UnderlineBoldItalicText
        NO_StrikethroughText_Match_emphasis -> HighlightText
        NO_StrikethroughText_Match_emphasis -> SubscriptText
        NO_StrikethroughText_Match_emphasis -> SuperscriptText
        NO_StrikethroughText_Match_emphasis -> DoubleBacktickText
        NO_StrikethroughText_Match_emphasis -> BacktickText
        NO_StrikethroughText_Match_emphasis -> FencedCodeBlockText

        NO_HighlightText_Match_emphasis -> PlainText
        NO_HighlightText_Match_emphasis -> StarBoldText
        NO_HighlightText_Match_emphasis -> UnderlineBoldText
        NO_HighlightText_Match_emphasis -> StarItalicText
        NO_HighlightText_Match_emphasis -> UnderlineItalicText
        NO_HighlightText_Match_emphasis -> StarBoldItalicText
        NO_HighlightText_Match_emphasis -> UnderlineBoldItalicText
        NO_HighlightText_Match_emphasis -> StrikethroughText
        NO_HighlightText_Match_emphasis -> SubscriptText
        NO_HighlightText_Match_emphasis -> SuperscriptText
        NO_HighlightText_Match_emphasis -> DoubleBacktickText
        NO_HighlightText_Match_emphasis -> BacktickText
        NO_HighlightText_Match_emphasis -> FencedCodeBlockText

        NO_SubscriptText_Match_emphasis -> PlainText
        NO_SubscriptText_Match_emphasis -> StarBoldText
        NO_SubscriptText_Match_emphasis -> UnderlineBoldText
        NO_SubscriptText_Match_emphasis -> StarItalicText
        NO_SubscriptText_Match_emphasis -> UnderlineItalicText
        NO_SubscriptText_Match_emphasis -> StarBoldItalicText
        NO_SubscriptText_Match_emphasis -> UnderlineBoldItalicText
        NO_SubscriptText_Match_emphasis -> StrikethroughText
        NO_SubscriptText_Match_emphasis -> HighlightText
        NO_SubscriptText_Match_emphasis -> SuperscriptText
        NO_SubscriptText_Match_emphasis -> DoubleBacktickText
        NO_SubscriptText_Match_emphasis -> BacktickText
        NO_SubscriptText_Match_emphasis -> FencedCodeBlockText

        NO_SuperscriptText_Match_emphasis -> PlainText
        NO_SuperscriptText_Match_emphasis -> StarBoldText
        NO_SuperscriptText_Match_emphasis -> UnderlineBoldText
        NO_SuperscriptText_Match_emphasis -> StarItalicText
        NO_SuperscriptText_Match_emphasis -> UnderlineItalicText
        NO_SuperscriptText_Match_emphasis -> StarBoldItalicText
        NO_SuperscriptText_Match_emphasis -> UnderlineBoldItalicText
        NO_SuperscriptText_Match_emphasis -> StrikethroughText
        NO_SuperscriptText_Match_emphasis -> HighlightText
        NO_SuperscriptText_Match_emphasis -> SubscriptText
        NO_SuperscriptText_Match_emphasis -> DoubleBacktickText
        NO_SuperscriptText_Match_emphasis -> BacktickText
        NO_SuperscriptText_Match_emphasis -> FencedCodeBlockText

        NO_DoubleBacktickText_Match_emphasis -> PlainText
        NO_DoubleBacktickText_Match_emphasis -> StarBoldText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineBoldText
        NO_DoubleBacktickText_Match_emphasis -> StarItalicText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineItalicText
        NO_DoubleBacktickText_Match_emphasis -> StarBoldItalicText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineBoldItalicText
        NO_DoubleBacktickText_Match_emphasis -> StrikethroughText
        NO_DoubleBacktickText_Match_emphasis -> HighlightText
        NO_DoubleBacktickText_Match_emphasis -> SubscriptText
        NO_DoubleBacktickText_Match_emphasis -> SuperscriptText
        NO_DoubleBacktickText_Match_emphasis -> BacktickText
        NO_DoubleBacktickText_Match_emphasis -> FencedCodeBlockText

        NO_BacktickText_Match_emphasis -> PlainText
        NO_BacktickText_Match_emphasis -> StarBoldText
        NO_BacktickText_Match_emphasis -> UnderlineBoldText
        NO_BacktickText_Match_emphasis -> StarItalicText
        NO_BacktickText_Match_emphasis -> UnderlineItalicText
        NO_BacktickText_Match_emphasis -> StarBoldItalicText
        NO_BacktickText_Match_emphasis -> UnderlineBoldItalicText
        NO_BacktickText_Match_emphasis -> StrikethroughText
        NO_BacktickText_Match_emphasis -> HighlightText
        NO_BacktickText_Match_emphasis -> SubscriptText
        NO_BacktickText_Match_emphasis -> SuperscriptText
        NO_BacktickText_Match_emphasis -> DoubleBacktickText
        NO_BacktickText_Match_emphasis -> FencedCodeBlockText

        NO_FencedCodeBlockText_Match_emphasis -> PlainText
        NO_FencedCodeBlockText_Match_emphasis -> StarBoldText
        NO_FencedCodeBlockText_Match_emphasis -> UnderlineBoldText
        NO_FencedCodeBlockText_Match_emphasis -> StarItalicText
        NO_FencedCodeBlockText_Match_emphasis -> UnderlineItalicText
        NO_FencedCodeBlockText_Match_emphasis -> StarBoldItalicText
        NO_FencedCodeBlockText_Match_emphasis -> UnderlineBoldItalicText
        NO_FencedCodeBlockText_Match_emphasis -> StrikethroughText
        NO_FencedCodeBlockText_Match_emphasis -> HighlightText
        NO_FencedCodeBlockText_Match_emphasis -> SubscriptText
        NO_FencedCodeBlockText_Match_emphasis -> SuperscriptText
        NO_FencedCodeBlockText_Match_emphasis -> DoubleBacktickText
        NO_FencedCodeBlockText_Match_emphasis -> BacktickText
        Match_emphasis -> PlainText
        Match_emphasis -> StarBoldText
        Match_emphasis -> UnderlineBoldText
        Match_emphasis -> StarItalicText
        Match_emphasis -> UnderlineItalicText
        Match_emphasis -> StarBoldItalicText
        Match_emphasis -> UnderlineBoldItalicText
        Match_emphasis -> StrikethroughText
        Match_emphasis -> HighlightText
        Match_emphasis -> SubscriptText
        Match_emphasis -> SuperscriptText
        Match_emphasis -> DoubleBacktickText
        Match_emphasis -> BacktickText
        Match_emphasis -> FencedCodeBlockText
    `)
    Match_emphasis__PlainText(argv : Array<AnalysisToken>) {
        return argv[0].value
    }
}

export class SymbolEntity {
    segments : Array<any>

    constructor() {
        this.segments = []
    }

    addSegment(segment : any) {
        this.segments.push(segment)
    }

    toHierarchy(intent : string = '') {
        var subIntent = `${intent}     `
        var resultArray =  this.segments.map(segment=>{
            if (segment instanceof SymbolEntity) {
                return segment.toHierarchy(subIntent)
            } else {
                return [`${subIntent}${segment}`]
            }
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }
}

export class PlainText extends SymbolEntity {
}

export class Sentence extends SymbolEntity {
}

export class FencedCodeBlockText extends SymbolEntity {
}

export class Markdown extends SymbolEntity {
}

export class BoldText extends SymbolEntity {}