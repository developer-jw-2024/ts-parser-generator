
export class RegularExpressionSymbol {
    static BackSlash = '\\'
    static DoubleQuotes = '"'
    static Dot = '.'
    static Comma = ','
    static Caret = '^'
    static Dollar = '$'
    static Hyphen = '-'
    static OpenCaretSquareBracket = '[^'
    static OpenSquareBracket = '['
    static CloseSquareBracket = ']'
    static Star = '*'
    static Plus = '+'
    static QuestionMark = '?'
    static OpenCurlyBracket = '{'
    static CloseCurlyBracket = '}'
    static OpenRoundBracket = '('
    static CloseRoundBracket = ')'
    static VerticalBar = '|'

    static AllSymbols = [
        RegularExpressionSymbol.BackSlash,
        RegularExpressionSymbol.DoubleQuotes,
        RegularExpressionSymbol.Dot,
        RegularExpressionSymbol.Comma,
        RegularExpressionSymbol.Caret,
        RegularExpressionSymbol.Dollar,
        RegularExpressionSymbol.Hyphen,
        RegularExpressionSymbol.OpenCaretSquareBracket,
        RegularExpressionSymbol.OpenSquareBracket,
        RegularExpressionSymbol.CloseSquareBracket,
        RegularExpressionSymbol.Star,
        RegularExpressionSymbol.Plus,
        RegularExpressionSymbol.QuestionMark,
        RegularExpressionSymbol.OpenCurlyBracket,
        RegularExpressionSymbol.CloseCurlyBracket,
        RegularExpressionSymbol.OpenRoundBracket,
        RegularExpressionSymbol.CloseRoundBracket,
        RegularExpressionSymbol.VerticalBar
    ]
    
    static isRegularExpressionSymbol(char : string) {
        return RegularExpressionSymbol.AllSymbols.indexOf(char)>=0
    }
}


export enum RegularExpressionCharType {
    BackSlash = "BackSlash",
    DoubleQuotes = "DoubleQuotes",
    Dot = "Dot",
    Caret = "Caret",
    Hyphen = "Hyphen",
    OpenCaretSquareBracket = "OpenCaretSquareBracket",
    OpenSquareBracket = "OpenSquareBracket",
    CloseSquareBracket = "CloseSquareBracket",
    OpenRoundBracket = "OpenRoundBracket",
    CloseRoundBracket = "CloseRoundBracket",
    OpenCurlyBracket = "OpenCurlyBracket",
    CloseCurlyBracket = "CloseCurlyBracket",
    Not ="Not",
    Star = "Star",
    Plus = "Plus",
    QuestionMark = "QuestionMark",
    VerticalBar = "VerticalBar",
    Unknown = "Unknown",
    NormalChar = "NormalChar",
    EndOfaLine = "EndOfaLine",

}
