import { RegularExpression } from "../index"
import { LexicalAnalysis, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"

var H1 = new TokenType('H1', '#')
var H2 = new TokenType('H2', '##')
var SPACES = new TokenType('SPACES', '" "+')
var PLAINTEXT = new TokenType('PLAINTEXT', '[^ #\\()]+')

var lexicalAnalysis = new LexicalAnalysis([
    H1,
    H2,
    SPACES,
    PLAINTEXT
])
var tokens = lexicalAnalysis.toTokens("boy.")
// expect(tokens).toEqual([
//     new Token(AAAABBB, "aab"),
//     new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
//     new Token(ABB, "abb"),
// ])
// console.log(tokens)

