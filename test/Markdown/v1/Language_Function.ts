import { AnalysisToken, ErrorEntity, GrammarProductionFunction, LanguageFunctionsEntity, SymbolEntity, ValueSymbolEntity } from "../../../src/SyntaxAnalysis/SyntaxAnalysis";
import { isNulllOrUndefinedValue, isTypeOf } from "../../../src/Utils/Utils";
import { DollarSignText, DoubleDollarSignText, BacktickText, BlankLine, BlockquoteLine, BoldText, Complement, Cursor, DashesRule, DefinitionItemValue, DoubleBacktickText, EmailAddress, Emoji, EqualsRule, FencedCodeBlockText, Footnote, FootnoteReference, Heading, HighlightText, HorizontalRule, Image, ItalicText, Link, Markdown, MarkdownError, MarkdownLines, OrderedItem, PlainText, Sentence, SimpleText, Spaces, StarBoldItalicText, StarBoldText, StarItalicText, StrikethroughText, SubscriptText, SuperscriptText, TableAlignmentRow, TableCell, TableCenterAlignment, TableColumnAlignment, TableLeftAlignment, TableNoAlignment, TableRightAlignment, TableRow, TaskListItem, URLAddress, UnderlineBoldItalicText, UnderlineBoldText, UnderlineItalicText, UnorderedItem } from "./MarkdownLib";
// import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer";

export class MarkdownLanguageFunctionsEntity extends LanguageFunctionsEntity {
    @GrammarProductionFunction(
        `
        Markdown -> WholeMarkdownLine
        `
    )
    Markdown__WholeMarkdownLine(argv : Array<AnalysisToken>) {
        
        var markdownLines : MarkdownLines = argv[0].value
        var markdown : Markdown = markdownLines.merge()
        return markdown
        // return argv[0].value
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> MarkdownLine enter`)
    WholeMarkdownLine__MarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = new MarkdownLines()
        lines.addChild(argv[0].value)
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine MarkdownLine enter`)
    WholeMarkdownLine__WholeMarkdownLine_MarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = argv[0].value
        lines.addChild(argv[1].value)
        return lines
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> <ERROR> enter`)
    WholeMarkdownLine__ERROR_enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = new MarkdownLines()
        lines.addChild(new MarkdownError(argv[0].value))
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine <ERROR> enter`)
    WholeMarkdownLine__WholeMarkdownLine_ERROR_enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = argv[0].value
        lines.addChild(new MarkdownError(argv[1].value))
        return lines
    }

    @GrammarProductionFunction(`WholeMarkdownLine -> enter`)
    WholeMarkdownLine__enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = new MarkdownLines()
        lines.addChild(new BlankLine(argv[0].value))
        return lines
    }
    @GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine enter`)
    WholeMarkdownLine__WholeMarkdownLine_enter(argv : Array<AnalysisToken>) {
        var lines : MarkdownLines = argv[0].value
        lines.addChild(new BlankLine(argv[1].value))
        return lines
    }

    @GrammarProductionFunction(`MarkdownLine -> <ERROR>`)
    MarkdownLine__ERROR(argv : Array<AnalysisToken>) {
        return new MarkdownError(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> fencedCodeBlockTag`)
    MarkdownLine__fencedCodeBlockTag(argv : Array<AnalysisToken>) {
        return new FencedCodeBlockText(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> doubleDollarSign`)
    MarkdownLine__doubleDollarSign(argv : Array<AnalysisToken>) {
        return new DoubleDollarSignText(argv[0].value.substring(2, argv[0].value.length-2))
    }

    @GrammarProductionFunction(`TableRow -> verticalBar`)
    TableRow__verticalBar(argv : Array<AnalysisToken>) {
        var tableRow : TableRow = new TableRow()
        return tableRow
    }
    @GrammarProductionFunction(`TableRowWithCell -> TableRow Sentence`)
    TableRowWithCell__TableRow_Sentence(argv : Array<AnalysisToken>) {
        var tableRow : TableRow = argv[0].value
        var tableCell : TableCell = new TableCell(tableRow)
        tableCell.addChild(argv[1].value)
        tableRow.addChild(tableCell)
        return tableCell
    }
    @GrammarProductionFunction(`TableRowWithCell -> TableRow intent`)
    TableRowWithCell__TableRow_intent(argv : Array<AnalysisToken>) {
        var tableRow : TableRow = argv[0].value
        var tableCell : TableCell = new TableCell(tableRow)
        tableCell.addChild(new Spaces(argv[1].value))
        tableRow.addChild(tableCell)
        return tableCell
    }

    @GrammarProductionFunction(`TableRowWithCell -> TableRowWithCell Sentence`)
    TableRowWithCell__TableRowWithCell_Sentence(argv : Array<AnalysisToken>) {
        var tableCell : TableCell = argv[0].value as TableCell

        tableCell.addChild(argv[1].value)
        return tableCell
    }

    @GrammarProductionFunction(`TableRowWithCell -> TableRowWithCell intent`)
    TableRowWithCell__TableRowWithCell_intent(argv : Array<AnalysisToken>) {
        var tableCell : TableCell = argv[0].value as TableCell

        tableCell.addChild(new Spaces(argv[1].value))
        return tableCell
    }

    @GrammarProductionFunction(`TableRow -> TableRowWithCell verticalBar`)
    TableRow__TableRowWithCell_verticalBar(argv : Array<AnalysisToken>) {
        var tableCell : TableCell = argv[0].value as TableCell
        
        var tableRow : TableRow = tableCell.getTableRow()
        return tableRow
    }

    // @GrammarProductionFunction(`TableRow -> TableRow intent verticalBar`)
    // TableRow__TableRow_intent_verticalBar(argv : Array<AnalysisToken>) {
    //     var tableRow : TableRow = argv[0].value
    //     tableRow.addChild(argv[1].value)
    //     return tableRow
    // }
    // @GrammarProductionFunction(`TableRow -> TableRow verticalBar`)
    // TableRow_TableRow_verticalBar(argv : Array<AnalysisToken>) {
    //     var tableRow : TableRow = argv[0].value
    //     tableRow.addChild("")
    //     return tableRow
    // }
    @GrammarProductionFunction(`MarkdownLine -> TableRow`)
    MarkdownLine__TableRow(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`TableColumnAlignment -> dashes3WithSpaces`)
    TableColumnAlignment__dashes3WithSpaces(argv : Array<AnalysisToken>) {
        var tableColumnAlignment : TableNoAlignment = new TableNoAlignment(argv[0].value)
        return tableColumnAlignment
        // var tableColumnAlignment : TableColumnAlignment = new TableColumnAlignment(new TableNoAlignment(argv[0].value))
        // return tableColumnAlignment
    }

    @GrammarProductionFunction(`TableColumnAlignment -> columnLeftAlignment`)
    TableColumnAlignment__columnLeftAlignment(argv : Array<AnalysisToken>) {
        var tableColumnAlignment : TableLeftAlignment = new TableLeftAlignment(argv[0].value)
        return tableColumnAlignment
        // var tableColumnAlignment : TableColumnAlignment = new TableColumnAlignment(new TableLeftAlignment(argv[0].value))
        // return tableColumnAlignment
    }
    @GrammarProductionFunction(`TableColumnAlignment -> columnRightAlignment`)
    TableColumnAlignment__columnRightAlignment(argv : Array<AnalysisToken>) {
        var tableColumnAlignment : TableRightAlignment = new TableRightAlignment(argv[0].value)
        return tableColumnAlignment
        // var tableColumnAlignment : TableColumnAlignment = new TableColumnAlignment(new TableRightAlignment(argv[0].value))
        // return tableColumnAlignment
    }
    @GrammarProductionFunction(`TableColumnAlignment -> columnCenterAlignment`)
    TableColumnAlignment__columnCenterAlignment(argv : Array<AnalysisToken>) {
        var tableColumnAlignment : TableCenterAlignment = new TableCenterAlignment(argv[0].value)
        return tableColumnAlignment
        // var tableColumnAlignment : TableColumnAlignment = new TableColumnAlignment(new TableCenterAlignment(argv[0].value))
        // return tableColumnAlignment
    }
    @GrammarProductionFunction(`TableAlignmentRow -> verticalBar TableColumnAlignment verticalBar`)
    TableAlignmentRow__verticalBar_TableColumnAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = new TableAlignmentRow()
        tableAlignmentRow.addChild(argv[1].value)
        return tableAlignmentRow
    }
    @GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow TableColumnAlignment verticalBar`)
    TableAlignmentRow__TableAlignmentRow_columnLeftAlignment_verticalBar(argv : Array<AnalysisToken>) {
        var tableAlignmentRow : TableAlignmentRow = argv[0].value
        tableAlignmentRow.addChild(argv[1].value)
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

    @GrammarProductionFunction(`DefinitionItemValue -> colonSign spaces MarkdownLine`)
    DefinitionItemValue__colonSign_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        return new DefinitionItemValue(argv[2].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> DefinitionItemValue`)
    MarkdownLine__DefinitionItemValue(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Footnote -> FootnoteReference colonSign spaces MarkdownLine`)
    Footnote__FootnoteReference_colonSign_spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        var footNote : Footnote = new Footnote(argv[0].value, argv[3].value)
        return footNote
    }
    @GrammarProductionFunction(`MarkdownLine -> Footnote`)
    MarkdownLine__Footnote(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`EqualsRule -> equals3`)
    EqualsRule__equals3(argv : Array<AnalysisToken>) {
        return new EqualsRule(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> EqualsRule`)
    MarkdownLine__EqualsRule(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`DashesRule -> dashes3`)
    DashesRule__dashes3(argv : Array<AnalysisToken>) {
        return new DashesRule(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> DashesRule`)
    MarkdownLine__DashesRule(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`
        HorizontalRule -> StarBoldItalicTag
        HorizontalRule -> UnderlineBoldItalicTag
        HorizontalRule -> underscores
        HorizontalRule -> asterisks4
    `)
    toHorizontalRule(argv : Array<AnalysisToken>) {
        return new HorizontalRule(argv[0].value)
    }

    @GrammarProductionFunction(`MarkdownLine -> HorizontalRule`)
    MarkdownLine__HorizontalRule(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`BlockquoteLine -> blockquoteBiggerSignLine`)
    Blockquote__blockquoteBiggerSign_MarkdownLine(argv : Array<AnalysisToken>) {
        var result : BlockquoteLine = new BlockquoteLine(argv[0].value)
        return result
    }

    @GrammarProductionFunction(`MarkdownLine -> BlockquoteLine`)
    MarkdownLine__Blockquote(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Complement -> intent MarkdownLine`)
    Complement__spaces_MarkdownLine(argv : Array<AnalysisToken>) {
        // var len = argv[0].value.length/4
        var complement : Complement = new Complement(argv[0].value, argv[1].value)
        // for (var i=0;i<len-1;i++) {
        //     complement = new Complement(complement)
        // }
        return complement
    }

    @GrammarProductionFunction(`Complement -> intent`)
    Complement__intent(argv : Array<AnalysisToken>) {
        // var len = argv[0].value.length/4
        var complement : Complement = new Complement(argv[0].value, null)
        // for (var i=0;i<len-1;i++) {
        //     complement = new Complement(complement)
        // }
        return complement
    }

    @GrammarProductionFunction(`MarkdownLine -> Complement`)
    MarkdownLine__Complement(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`Heading -> headingSharpSign MarkdownLine`)
    Heading__headingSharpSign_MarkdownLine(argv : Array<AnalysisToken>) {
        return new Heading(argv[0].value.trim().length, argv[1].value)
    }

    @GrammarProductionFunction(`Heading -> headingSharpSign`)
    Heading__headingSharpSign(argv : Array<AnalysisToken>) {
        return new Heading(argv[0].value.trim().length,  null)
    }

    @GrammarProductionFunction(`Heading -> headingSharpSignWithCursor MarkdownLine`)
    Heading__headingSharpSignWithCursor_MarkdownLine(argv : Array<AnalysisToken>) {
        return new Heading(argv[0].value.trim().length-1, argv[1].value)
    }

    @GrammarProductionFunction(`Heading -> headingSharpSignWithCursor`)
    Heading__headingSharpSignWithCursor(argv : Array<AnalysisToken>) {
        return new Heading(argv[0].value.trim().length-1, null)
    }

    @GrammarProductionFunction(`MarkdownLine -> Heading`)
    MarkdownLine__Heading(argv : Array<AnalysisToken>) {
        return argv[0].value
    }


    @GrammarProductionFunction(`OrderedItem -> orderedItemTag Sentence`)
    OrderedItem__orderedItemTag_Sentence(argv : Array<AnalysisToken>) {
        var orderedItem : OrderedItem = new OrderedItem(argv[0].value, argv[1].value)
        return orderedItem
    }
    @GrammarProductionFunction(`OrderedItem -> orderedItemTag`)
    OrderedItem__orderedItemTag(argv : Array<AnalysisToken>) {
        var orderedItem : OrderedItem = new OrderedItem(argv[0].value, null)
        return orderedItem
    }
    @GrammarProductionFunction(`OrderedItem -> orderedItemTagWithCursor Sentence`)
    OrderedItem__orderedItemTagWithCursor_Sentence(argv : Array<AnalysisToken>) {
        var orderedItem : OrderedItem = new OrderedItem(argv[0].value, argv[1].value)
        return orderedItem
    }
    @GrammarProductionFunction(`OrderedItem -> orderedItemTagWithCursor`)
    OrderedItem__orderedItemTagWithCursor(argv : Array<AnalysisToken>) {
        var orderedItem : OrderedItem = new OrderedItem(argv[0].value, null)
        return orderedItem
    }
    @GrammarProductionFunction(`MarkdownLine -> OrderedItem`)
    MarkdownLine__OrderedItem(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`UnorderedItem -> unorderedItemTag Sentence`)
    UnorderedItem__unorderedItemTag_Sentence(argv : Array<AnalysisToken>) {
        var unorderedItem : UnorderedItem = new UnorderedItem(argv[0].value, argv[1].value)
        return unorderedItem
    }
    @GrammarProductionFunction(`UnorderedItem -> unorderedItemTag`)
    UnorderedItem__unorderedItemTag(argv : Array<AnalysisToken>) {
        var unorderedItem : UnorderedItem = new UnorderedItem(argv[0].value, null)
        return unorderedItem
    }

    @GrammarProductionFunction(`UnorderedItem -> unorderedItemTagWithCursor Sentence`)
    UnorderedItem__unorderedItemTagWithCursor_Sentence(argv : Array<AnalysisToken>) {
        var unorderedItem : UnorderedItem = new UnorderedItem(argv[0].value, argv[1].value)
        return unorderedItem
    }
    @GrammarProductionFunction(`UnorderedItem -> unorderedItemTagWithCursor`)
    UnorderedItem__unorderedItemTagWithCursor(argv : Array<AnalysisToken>) {
        var unorderedItem : UnorderedItem = new UnorderedItem(argv[0].value, null)
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

    @GrammarProductionFunction(`PlainText -> cursor`)
    PlainText__cursor(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new Cursor())
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> sharpSign`)
    PlainText__sharpSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new SimpleText(argv[0].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> leftArrow`)
    PlainText__leftArrow(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new SimpleText(argv[0].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> dashSign`)
    PlainText__dashSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new SimpleText(argv[0].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> plusSign`)
    PlainText__plusSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new SimpleText(argv[0].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> dollarSignTag`)
    PlainText__dollarSignTag(argv : Array<AnalysisToken>) {
        var plainText : PlainText = new PlainText()
        plainText.addChild(new DollarSignText(argv[0].value.substring(1, argv[0].value.length-1)))
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

    @GrammarProductionFunction(`PlainText -> PlainText intent`)
    PlainText__PlainText_intent(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new Spaces(argv[1].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText cursor`)
    PlainText__PlainText_cursor(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new Cursor())
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText sharpSign`)
    PlainText__PlainText_sharpSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new SimpleText(argv[1].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText leftArrow`)
    PlainText__PlainText_leftArrow(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new SimpleText(argv[1].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText dashSign`)
    PlainText__PlainText_dashSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new SimpleText(argv[1].value))
        return plainText
    }
    
    @GrammarProductionFunction(`PlainText -> PlainText plusSign`)
    PlainText__PlainText_plusSign(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        plainText.addChild(new SimpleText(argv[1].value))
        return plainText
    }

    @GrammarProductionFunction(`PlainText -> PlainText dollarSignTag`)
    PlainText__PlainText_dollarSignTag(argv : Array<AnalysisToken>) {
        var plainText : PlainText = argv[0].value
        var dollarSignText : DollarSignText = new DollarSignText(argv[1].value.substring(1, argv[1].value.length-1))
        plainText.addChild(dollarSignText)
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
        var starBoldText : StarBoldText = new StarBoldText()
        starBoldText.addChild(argv[1].value)
        return starBoldText
    }

    @GrammarProductionFunction(`BeginStarBoldText -> BeginStarBoldText NO_StarBoldText_Match_emphasis`)
    BeginStarBoldText__BeginStarBoldText_NO_StarBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var starBoldText : StarBoldText = argv[0].value
        starBoldText.addChild(argv[1].value)
        return starBoldText
    }

    @GrammarProductionFunction(`StarBoldText -> BeginStarBoldText starBoldTag`)
    StarBoldText__BeginStarBoldText_starBoldTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginUnderlineBoldText -> underlineBoldTag NO_UnderlineBoldText_Match_emphasis`)
    BeginUnderlineBoldText__underlineBoldTag_NO_UnderlineBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineBoldText : UnderlineBoldText = new UnderlineBoldText()
        underlineBoldText.addChild(argv[1].value)
        return underlineBoldText
    }

    @GrammarProductionFunction(`BeginUnderlineBoldText -> BeginUnderlineBoldText NO_UnderlineBoldText_Match_emphasis`)
    BeginUnderlineBoldText__BeginUnderlineBoldText_NO_UnderlineBoldText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineBoldText : UnderlineBoldText = argv[0].value
        underlineBoldText.addChild(argv[1].value)
        return underlineBoldText
    }

    @GrammarProductionFunction(`UnderlineBoldText -> BeginUnderlineBoldText underlineBoldTag`)
    UnderlineBoldText__BeginUnderlineBoldText_underlineBoldTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginStarItalicText -> starItalicTag NO_StarItalicText_Match_emphasis`)
    BeginStarItalicText__starItalicTag_NO_StarItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var starItalicText : StarItalicText = new StarItalicText()
        starItalicText.addChild(argv[1].value)
        return starItalicText
    }

    @GrammarProductionFunction(`BeginStarItalicText -> BeginStarItalicText NO_StarItalicText_Match_emphasis`)
    BeginStarItalicText__BeginStarItalicText_NO_StarItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var starItalicText : StarItalicText = argv[0].value
        starItalicText.addChild(argv[1].value)
        return starItalicText
    }

    @GrammarProductionFunction(`StarItalicText -> BeginStarItalicText starItalicTag`)
    StarItalicText__BeginStarItalicText_starItalicTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginUnderlineItalicText -> underlineItalicTag NO_UnderlineItalicText_Match_emphasis`)
    BeginUnderlineItalicText__underlineItalicTag_NO_UnderlineItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineItalicText : UnderlineItalicText = new UnderlineItalicText()
        underlineItalicText.addChild(argv[1].value)
        return underlineItalicText
    }

    @GrammarProductionFunction(`BeginUnderlineItalicText -> BeginUnderlineItalicText NO_UnderlineItalicText_Match_emphasis`)
    BeginUnderlineItalicText__BeginUnderlineItalicText_NO_UnderlineItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineItalicText : UnderlineItalicText = argv[0].value
        underlineItalicText.addChild(argv[1].value)
        return underlineItalicText
    }

    @GrammarProductionFunction(`UnderlineItalicText -> BeginUnderlineItalicText underlineItalicTag`)
    UnderlineItalicText__BeginUnderlineItalicText_underlineItalicTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginStarBoldItalicText -> starBoldItalicTag NO_StarBoldItalicText_Match_emphasis`)
    BeginStarBoldItalicText__starBoldItalicTag_NO_StarBoldItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var starBoldItalicText : StarBoldItalicText = new StarBoldItalicText()
        starBoldItalicText.addChild(argv[1].value)
        return starBoldItalicText
    }

    @GrammarProductionFunction(`BeginStarBoldItalicText -> BeginStarBoldItalicText NO_StarBoldItalicText_Match_emphasis`)
    BeginStarBoldItalicText__BeginStarBoldItalicText_NO_StarBoldItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var starBoldItalicText : StarBoldItalicText = argv[0].value
        starBoldItalicText.addChild(argv[1].value)
        return starBoldItalicText
    }

    @GrammarProductionFunction(`StarBoldItalicText -> BeginStarBoldItalicText starBoldItalicTag`)
    StarBoldItalicText__BeginStarBoldItalicText_starBoldItalicTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginUnderlineBoldItalicText -> underlineBoldItalicTag NO_UnderlineBoldItalicText_Match_emphasis`)
    BeginUnderlineBoldItalicText__underlineBoldItalicTag_NO_UnderlineBoldItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineBoldItalicText : UnderlineBoldItalicText = new UnderlineBoldItalicText()
        underlineBoldItalicText.addChild(argv[1].value)
        return underlineBoldItalicText
    }

    @GrammarProductionFunction(`BeginUnderlineBoldItalicText -> BeginUnderlineBoldItalicText NO_UnderlineBoldItalicText_Match_emphasis`)
    BeginUnderlineBoldItalicText__BeginUnderlineBoldItalicText_NO_UnderlineBoldItalicText_Match_emphasis(argv : Array<AnalysisToken>) {
        var underlineBoldItalicText : UnderlineBoldItalicText = argv[0].value
        underlineBoldItalicText.addChild(argv[1].value)
        return underlineBoldItalicText
    }

    @GrammarProductionFunction(`UnderlineBoldItalicText -> BeginUnderlineBoldItalicText underlineBoldItalicTag`)
    UnderlineBoldItalicText__BeginUnderlineBoldItalicText_underlineBoldItalicTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginStrikethroughText -> strikethroughTag NO_StrikethroughText_Match_emphasis`)
    BeginStrikethroughText__strikethroughTag_NO_StrikethroughText_Match_emphasis(argv : Array<AnalysisToken>) {
        var strikethroughText : StrikethroughText = new StrikethroughText()
        strikethroughText.addChild(argv[1].value)
        return strikethroughText
    }

    @GrammarProductionFunction(`BeginStrikethroughText -> BeginStrikethroughText NO_StrikethroughText_Match_emphasis`)
    BeginStrikethroughText__BeginStrikethroughText_NO_StrikethroughText_Match_emphasis(argv : Array<AnalysisToken>) {
        var strikethroughText : StrikethroughText = argv[0].value
        strikethroughText.addChild(argv[1].value)
        return strikethroughText
    }

    @GrammarProductionFunction(`StrikethroughText -> BeginStrikethroughText strikethroughTag`)
    StrikethroughText__BeginStrikethroughText_strikethroughTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginHighlightText -> highlightTag NO_HighlightText_Match_emphasis`)
    BeginHighlightText__highlightTag_NO_HighlightText_Match_emphasis(argv : Array<AnalysisToken>) {
        var highlightText : HighlightText = new HighlightText()
        highlightText.addChild(argv[1].value)
        return highlightText
    }

    @GrammarProductionFunction(`BeginHighlightText -> BeginHighlightText NO_HighlightText_Match_emphasis`)
    BeginHighlightText__BeginHighlightText_NO_HighlightText_Match_emphasis(argv : Array<AnalysisToken>) {
        var highlightText : HighlightText = argv[0].value
        highlightText.addChild(argv[1].value)
        return highlightText
    }

    @GrammarProductionFunction(`HighlightText -> BeginHighlightText highlightTag`)
    HighlightText__BeginHighlightText_highlightTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginSubscriptText -> subscriptTag NO_SubscriptText_Match_emphasis`)
    BeginSubscriptText__subscriptTag_NO_SubscriptText_Match_emphasis(argv : Array<AnalysisToken>) {
        var subscriptText : SubscriptText = new SubscriptText()
        subscriptText.addChild(argv[1].value)
        return subscriptText
    }

    @GrammarProductionFunction(`BeginSubscriptText -> BeginSubscriptText NO_SubscriptText_Match_emphasis`)
    BeginSubscriptText__BeginSubscriptText_NO_SubscriptText_Match_emphasis(argv : Array<AnalysisToken>) {
        var subscriptText : SubscriptText = argv[0].value
        subscriptText.addChild(argv[1].value)
        return subscriptText
    }

    @GrammarProductionFunction(`SubscriptText -> BeginSubscriptText subscriptTag`)
    SubscriptText__BeginSubscriptText_subscriptTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginSuperscriptText -> superscriptTag NO_SuperscriptText_Match_emphasis`)
    BeginSuperscriptText__superscriptTag_NO_SuperscriptText_Match_emphasis(argv : Array<AnalysisToken>) {
        var superscriptText : SuperscriptText = new SuperscriptText()
        superscriptText.addChild(argv[1].value)
        return superscriptText
    }

    @GrammarProductionFunction(`BeginSuperscriptText -> BeginSuperscriptText NO_SuperscriptText_Match_emphasis`)
    BeginSuperscriptText__BeginSuperscriptText_NO_SuperscriptText_Match_emphasis(argv : Array<AnalysisToken>) {
        var superscriptText : SuperscriptText = argv[0].value
        superscriptText.addChild(argv[1].value)
        return superscriptText
    }

    @GrammarProductionFunction(`SuperscriptText -> BeginSuperscriptText superscriptTag`)
    SuperscriptText__BeginSuperscriptText_superscriptTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginDoubleBacktickText -> doubleBacktickTag NO_DoubleBacktickText_Match_emphasis`)
    BeginDoubleBacktickText__doubleBacktickTag_NO_DoubleBacktickText_Match_emphasis(argv : Array<AnalysisToken>) {
        var doubleBacktickText : DoubleBacktickText = new DoubleBacktickText()
        doubleBacktickText.addChild(argv[1].value)
        return doubleBacktickText
    }

    @GrammarProductionFunction(`BeginDoubleBacktickText -> BeginDoubleBacktickText NO_DoubleBacktickText_Match_emphasis`)
    BeginDoubleBacktickText__BeginDoubleBacktickText_NO_DoubleBacktickText_Match_emphasis(argv : Array<AnalysisToken>) {
        var doubleBacktickText : DoubleBacktickText = argv[0].value
        doubleBacktickText.addChild(argv[1].value)
        return doubleBacktickText
    }

    @GrammarProductionFunction(`DoubleBacktickText -> BeginDoubleBacktickText doubleBacktickTag`)
    DoubleBacktickText__BeginDoubleBacktickText_doubleBacktickTag(argv : Array<AnalysisToken>) {
        return argv[0].value
    }

    @GrammarProductionFunction(`BeginBacktickText -> backtickTag NO_BacktickText_Match_emphasis`)
    BeginBacktickText__backtickTag_NO_BacktickText_Match_emphasis(argv : Array<AnalysisToken>) {
        var backtickText : BacktickText = new BacktickText()
        backtickText.setBeginTag(argv[0].value)
        backtickText.addChild(argv[1].value)
        return backtickText
    }

    @GrammarProductionFunction(`BeginBacktickText -> BeginBacktickText NO_BacktickText_Match_emphasis`)
    BeginBacktickText__BeginBacktickText_NO_BacktickText_Match_emphasis(argv : Array<AnalysisToken>) {
        var backtickText : BacktickText = argv[0].value
        backtickText.addChild(argv[1].value)
        return backtickText
    }

    @GrammarProductionFunction(`BacktickText -> BeginBacktickText backtickTag`)
    BacktickText__BeginBacktickText_backtickTag(argv : Array<AnalysisToken>) {
        var backtickText : BacktickText = argv[0].value
        backtickText.setEndTag(argv[1].value)
        return argv[0].value
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
    `)
    passValueFunc(argv : Array<AnalysisToken>) {
        return argv[0].value
    } 
}

