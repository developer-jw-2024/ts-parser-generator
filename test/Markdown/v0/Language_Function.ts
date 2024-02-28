import { AnalysisToken, ErrorEntity, GrammarProductionFunction, LanguageFunctionsEntity, SymbolEntity, ValueSymbolEntity } from "../../../src/SyntaxAnalysis/SyntaxAnalysis";

export class MarkdownLanguageFunctionsEntity extends LanguageFunctionsEntity {
    @GrammarProductionFunction(
        `
        Markdown -> WholeMarkdownLine
        `
    )
    Markdown__WholeMarkdownLine(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> MarkdownLine enter`)
    WholeMarkdownLine__MarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = new WholeMarkdownLines()
        lines.addChild(argv[0].value)
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine MarkdownLine enter`)
    WholeMarkdownLine__WholeMarkdownLine_MarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = argv[0].value
        lines.addChild(argv[1].value)
        return lines
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> <ERROR> enter`)
    WholeMarkdownLine__ERROR_enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = new WholeMarkdownLines()
        lines.addChild(new ErrorEntity(argv[0].value))
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine <ERROR> enter`)
    WholeMarkdownLine__WholeMarkdownLine_ERROR_enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = argv[0].value
        lines.addChild(new ErrorEntity(argv[1].value))
        return lines
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> enter`)
    WholeMarkdownLine__enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = new WholeMarkdownLines()
        lines.addChild(new BlankLine())
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine enter`)
    WholeMarkdownLine__WholeMarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : WholeMarkdownLines = argv[0].value
        lines.addChild(new BlankLine())
        return lines
    }


    @GrammarProductionFunction(`TableRow -> verticalBar MarkdownLine verticalBar`)
    TableRow__verticalBar_MarkdownLine_verticalBar(argv : Array<AnalysisToken>) {
        var tableRow : TableRow = new TableRow()
        tableRow.addChild(argv[1].value)
        return tableRow
    }
    @GrammarProductionFunction(`TableRow -> TableRow MarkdownLine verticalBar`)
    TableRow__TableRow_MarkdownLine_verticalBar(argv : Array<AnalysisToken>) {
        var tableRow : TableRow = argv[0].value
        tableRow.addChild(argv[1].value)
        return tableRow
    }
    @GrammarProductionFunction(`MarkdownLine -> TableRow`)
    MarkdownLine__TableRow(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`TableAlignmentRow -> verticalBar dahes3 verticalBar`)
    TableAlignmentRow__verticalBar_dahes3_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = new TableAlignmentRow()
        tableAlignmentRow.addChild(new TableNoAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> verticalBar columnLeftAlignment verticalBar`)
    TableAlignmentRow__verticalBar_columnLeftAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = new TableAlignmentRow()
        tableAlignmentRow.addChild(new TableLeftAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> verticalBar columnRightAlignment verticalBar`)
    TableAlignmentRow__verticalBar_columnRightAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = new TableAlignmentRow()
        tableAlignmentRow.addChild(new TableRightAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> verticalBar columnCenterAlignment verticalBar`)
    TableAlignmentRow__verticalBar_columnCenterAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = new TableAlignmentRow()
        tableAlignmentRow.addChild(new TableCenterAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow dahes3 verticalBar`)
    TableAlignmentRow__TableAlignmentRow_dahes3_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = argv[0].value
        tableAlignmentRow.addChild(new TableNoAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow columnLeftAlignment verticalBar`)
    TableAlignmentRow__TableAlignmentRow_columnLeftAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = argv[0].value
        tableAlignmentRow.addChild(new TableLeftAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow columnRightAlignment verticalBar`)
    TableAlignmentRow__TableAlignmentRow_columnRightAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = argv[0].value
        tableAlignmentRow.addChild(new TableRightAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow columnCenterAlignment verticalBar`)
    TableAlignmentRow__TableAlignmentRow_columnCenterAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = argv[0].value
        tableAlignmentRow.addChild(new TableCenterAlignment(argv[1].value))
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`MarkdownLine -> TableAlignmentRow`)
    MarkdownLine__TableAlignmentRow(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`TaskListItem -> checkedBox spaces MarkdownLine`)
    TaskListItem__checkedBox_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        return new TaskListItem(true, argv[2].value)
    }
    @GrammarProductionFunction(`TaskListItem -> uncheckedBox spaces MarkdownLine`)
    TaskListItem__uncheckedBox_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        return new TaskListItem(false, argv[2].value)
    }
    @GrammarProductionFunction(`MarkdownLine -> TaskListItem`)
    MarkdownLine__TaskListItem(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`DefinitionListItem -> colonSign spaces MarkdownLine`)
    DefinitionListItem__colonSign_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        return new DefinitionListItem(argv[2].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> DefinitionListItem`)
    MarkdownLine__DefinitionListItem(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Footnote -> FootnoteReference colonSign spaces MarkdownLine`)
    Footnote__FootnoteReference_colonSign_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        var footNote : Footnote = new Footnote(argv[0].value)
        footNote.addChild(argv[3].value)
        return footNote
    }
    @GrammarProductionFunction(`MarkdownLine -> Footnote`)
    MarkdownLine__Footnote(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`
        HorizontalRule -> StarBoldItalicTag
        HorizontalRule -> UnderlineBoldItalicTag
        HorizontalRule -> underscores
        HorizontalRule -> dahes3
        HorizontalRule -> asterisks4
    `)
    toHorizontalRule(argv : Array<AnalysisToken>) {
        return new HorizontalRule(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> HorizontalRule`)
    MarkdownLine__HorizontalRule(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`Blockquote -> leftArrow MarkdownLine`)
    Blockquote__leftArrow_MarkdownLine(argv : Array<AnalysisToken>) {
        return new Blockquote(argv[1].value)
    }
    @GrammarProductionFunction(`MarkdownLine -> Blockquote`)
    MarkdownLine__Blockquote(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Complement -> spaces MarkdownLine`)
    Complement__spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        return new Complement(argv[1].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> Complement`)
    MarkdownLine__Complement(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Heading -> sharpSign MarkdownLine`)
    Heading__sharpSign_MarkdownLine(argv : Array<AnalysisToken>) {
        return new Heading(argv[1].value)
    }
    @GrammarProductionFunction(`MarkdownLine -> Heading`)
    MarkdownLine__Heading(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`OrderedItem -> orderedItemTag Sentence`)
    OrderedItem__orderedItemTag_Sentence(argv : Array<AnalysisToken>) {
        var orderedItem : OrderedItem = new OrderedItem(argv[1].value)
        return orderedItem
    }
    @GrammarProductionFunction(`MarkdownLine -> OrderedItem`)
    MarkdownLine__OrderedItem(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`UnorderedItem -> unorderedItemTag Sentence`)
    UnorderedItem__unorderedItemTag_Sentence(argv : Array<AnalysisToken>) {
        var unorderedItem : UnorderedItem = new UnorderedItem(argv[1].value)
        return unorderedItem
    }
    @GrammarProductionFunction(`MarkdownLine -> UnorderedItem`)
    MarkdownLine__UnorderedItem(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Sentence -> Match_emphasis`)
    Sentence__Match_emphasis(argv : Array<AnalysisToken>) {
        var sentence : Sentence = new Sentence()
        sentence.addChild(argv[0].value)
        return sentence
    }
    @GrammarProductionFunction(`Sentence -> Sentence Match_emphasis`)
    Sentence__Sentence_Match_emphasis(argv : Array<AnalysisToken>) {
        var sentence : Sentence = argv[0].value
        sentence.addChild(argv[1].value)
        return sentence
    }
    @GrammarProductionFunction(`MarkdownLine -> Sentence`)
    MarkdownLine__Sentence(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`PlainText -> simpleText`)
    PlainText__simpleText(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new SimpleText(argv[0].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> spaces`)
    PlainText__spaces(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new Spaces(argv[0].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> Link`)
    PlainText__Link(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(argv[0].value)
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> urlAddress`)
    PlainText__urlAddress(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new URLAddress(argv[0].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> emailAddress`)
    PlainText__emailAddress(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new EmailAddress(argv[0].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> Image`)
    PlainText__Image(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(argv[0].value)
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> emoji`)
    PlainText__emoji(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new Emoji(argv[0].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> FootnoteReference`)
    PlainText__FootnoteReference(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(argv[0].value)
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText simpleText`)
    PlainText__PlainText_simpleText(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new SimpleText(argv[1].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText spaces`)
    PlainText__PlainText_spaces(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new Spaces(argv[1].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText Link`)
    PlainText__PlainText_Link(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(argv[1].value)
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText urlAddress`)
    PlainText__PlainText_urlAddress(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new URLAddress(argv[1].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText emailAddress`)
    PlainText__PlainText_emailAddress(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new EmailAddress(argv[1].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText Image`)
    PlainText__PlainText_Image(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(argv[1].value)
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText emoji`)
    PlainText__PlainText_emoji(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new Emoji(argv[1].value))
        return plainText
    }
    @GrammarProductionFunction(`PlainText -> PlainText FootnoteReference`)
    PlainText__PlainText_FootnoteReference(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(argv[1].value)
        return plainText
    }

    @GrammarProductionFunction(`FootnoteReference -> openSquareBracketWithCaret simpleText closeSquareBracket`)
    FootnoteReference__openSquareBracketWithCaret_simpleText_closeSquareBracket(argv : Array<AnalysisToken>) {
        return new FootnoteReference(new SimpleText(argv[1].value))
    }

    @GrammarProductionFunction(`Link -> openSquareBracket Sentence closeSquareBracket openParentheses url closeParentheses`)
    Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_closeParentheses(argv : Array<AnalysisToken>) {
        return new Link(argv[1].value, argv[4].value)
    }
    @GrammarProductionFunction(`Link -> openSquareBracket Sentence closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses`)
    Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses(argv : Array<AnalysisToken>) {
        return new Link(argv[1].value, argv[4].value, argv[6].value)
    }
    @GrammarProductionFunction(`Image -> exclamationMarkOpenSquareBracket Sentence closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses`)
    Image__exclamationMarkOpenSquareBracket_Sentence_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses(argv : Array<AnalysisToken>) {
        return new Image(argv[1].value, argv[4].value, argv[6].value)
    }











    
    @GrammarProductionFunction(`BeginStarBoldText -> starBoldTag NO_StarBoldText_Match_emphasis`)
    BeginStarBoldText__starBoldTag_NO_StarBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = new BoldText()
        boldText.addChild(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`BeginStarBoldText -> BeginStarBoldText NO_StarBoldText_Match_emphasis`)
    BeginStarBoldText__BeginStarBoldText_NO_StarBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = argv[0].value
        boldText.addChild(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`StarBoldText -> BeginStarBoldText starBoldTag`)
    StarBoldText__BeginStarBoldText_starBoldTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginUnderlineBoldText -> underlineBoldTag NO_UnderlineBoldText_Match_emphasis`)
    BeginUnderlineBoldText__underlineBoldTag_NO_UnderlineBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = new BoldText()
        boldText.addChild(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`BeginUnderlineBoldText -> BeginUnderlineBoldText NO_UnderlineBoldText_Match_emphasis`)
    BeginUnderlineBoldText__BeginUnderlineBoldText_NO_UnderlineBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var boldText : BoldText = argv[0].value
        boldText.addChild(argv[1].value)
        return boldText
    }
    @GrammarProductionFunction(`UnderlineBoldText -> BeginUnderlineBoldText underlineBoldTag`)
    UnderlineBoldText__BeginUnderlineBoldText_underlineBoldTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    /*


BeginStarItalicText -> starItalicTag NO_StarItalicText_Match_emphasis
BeginStarItalicText -> BeginStarItalicText NO_StarItalicText_Match_emphasis
StarItalicText -> BeginStarItalicText starItalicTag

BeginUnderlineItalicText -> underlineItalicTag NO_UnderlineItalicText_Match_emphasis
BeginUnderlineItalicText -> BeginUnderlineItalicText NO_UnderlineItalicText_Match_emphasis
UnderlineItalicText -> BeginUnderlineItalicText underlineItalicTag

BeginStarBoldItalicText -> starBoldItalicTag NO_StarBoldItalicText_Match_emphasis
BeginStarBoldItalicText -> BeginStarBoldItalicText NO_StarBoldItalicText_Match_emphasis
StarBoldItalicText -> BeginStarBoldItalicText starBoldItalicTag

BeginUnderlineBoldItalicText -> underlineBoldItalicTag NO_UnderlineBoldItalicText_Match_emphasis
BeginUnderlineBoldItalicText -> BeginUnderlineBoldItalicText NO_UnderlineBoldItalicText_Match_emphasis
UnderlineBoldItalicText -> BeginUnderlineBoldItalicText underlineBoldItalicTag

BeginStrikethroughText -> strikethroughTag NO_StrikethroughText_Match_emphasis
BeginStrikethroughText -> BeginStrikethroughText NO_StrikethroughText_Match_emphasis
StrikethroughText -> BeginStrikethroughText strikethroughTag

BeginHighlightText -> highlightTag NO_HighlightText_Match_emphasis
BeginHighlightText -> BeginHighlightText NO_HighlightText_Match_emphasis
HighlightText -> BeginHighlightText highlightTag

BeginSubscriptText -> subscriptTag NO_SubscriptText_Match_emphasis
BeginSubscriptText -> BeginSubscriptText NO_SubscriptText_Match_emphasis
SubscriptText -> BeginSubscriptText subscriptTag

BeginSuperscriptText -> superscriptTag NO_SuperscriptText_Match_emphasis
BeginSuperscriptText -> BeginSuperscriptText NO_SuperscriptText_Match_emphasis
SuperscriptText -> BeginSuperscriptText superscriptTag

BeginDoubleBacktickText -> doubleBacktickTag NO_DoubleBacktickText_Match_emphasis
BeginDoubleBacktickText -> BeginDoubleBacktickText NO_DoubleBacktickText_Match_emphasis
DoubleBacktickText -> BeginDoubleBacktickText doubleBacktickTag

BeginBacktickText -> backtickTag NO_BacktickText_Match_emphasis
BeginBacktickText -> BeginBacktickText NO_BacktickText_Match_emphasis
BacktickText -> BeginBacktickText backtickTag

BeginFencedCodeBlockText -> fencedCodeBlockTag NO_FencedCodeBlockText_Match_emphasis
BeginFencedCodeBlockText -> BeginFencedCodeBlockText NO_FencedCodeBlockText_Match_emphasis
FencedCodeBlockText -> BeginFencedCodeBlockText fencedCodeBlockTag
*/
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
    passValueFunc(argv : Array<AnalysisToken>) {
        return argv[0].value
    }
}

export class WholeMarkdownLines extends SymbolEntity {}

export class BlankLine extends SymbolEntity {}

export class TableRow extends SymbolEntity {}
export class TableAlignmentRow extends SymbolEntity {}
export class TableNoAlignment extends ValueSymbolEntity {}
export class TableLeftAlignment extends ValueSymbolEntity {}
export class TableRightAlignment extends ValueSymbolEntity {}
export class TableCenterAlignment extends ValueSymbolEntity {}
export class TaskListItem extends SymbolEntity {
    checked : boolean
    value : any

    constructor(checked : boolean, value : any) {
        super()
        this.checked = checked
        this.value = value
    }

    isChecked() {
        return this.checked
    }

    getValue() {
        return this.value
    }
}

export class DefinitionListItem extends ValueSymbolEntity {}

export class PlainText extends SymbolEntity {}

export class Sentence extends SymbolEntity {}

export class FencedCodeBlockText extends SymbolEntity {}

export class Markdown extends SymbolEntity {}

export class BoldText extends SymbolEntity {}

export class SimpleText extends ValueSymbolEntity {}

export class Spaces extends ValueSymbolEntity {}

export class Footnote extends ValueSymbolEntity {}
export class URLAddress extends ValueSymbolEntity {}
export class EmailAddress extends ValueSymbolEntity {}
export class Emoji extends ValueSymbolEntity {}

export class FootnoteReference extends ValueSymbolEntity {}
export class HorizontalRule extends ValueSymbolEntity {}
export class Blockquote extends ValueSymbolEntity {}
export class Complement extends ValueSymbolEntity {}
export class Heading extends ValueSymbolEntity {}
export class OrderedItem extends ValueSymbolEntity {}
export class UnorderedItem extends ValueSymbolEntity {}

export class Image extends SymbolEntity {
    alt : any
    url : any
    title : any

    constructor(alt : any, url : any, title : any=null) {
        super()
        this.alt = alt
        this.url = url
        this.title = title
    }

    getTitle() {
        return this.title
    }

    getAlt() {
        return this.alt
    }
}

export class Link extends SymbolEntity {
    alt : any
    url : any
    title : any

    constructor(alt : any, url : any, title : any=null) {
        super()
        this.alt = alt
        this.url = url
        this.title = title
    }

    getTitle() {
        return this.title
    }

    getAlt() {
        return this.alt
    }
}
