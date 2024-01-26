import { RegularExpression } from "../index"
import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"


var PLUS = new TokenType('PLUS', '\\+', true)
var STAR = new TokenType('STAR', '\\*', true)
var ID = new TokenType('ID', 'id', true)
var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
var CLOSEBRACKET = new TokenType('OPENBRACKET', '\\)', true)

var lexicalAnalysis = new LexicalAnalysis([
    PLUS,
    STAR,
    ID,
    OPENBRACKET,
    CLOSEBRACKET,
    TokenType.EMPTY_TOKENTYPE,
    SyntaxAnalysis.DERIVATION,
    SyntaxAnalysis.ENTER,
    SyntaxAnalysis.SPACES,
    SyntaxAnalysis.GrammarSymbol
])

var value = FileUtils.readFromFileSystem('./test/GrammarProductions.txt')
var tokens = lexicalAnalysis.toTokens(value)
var syntaxAnalysis = new SyntaxAnalysis(tokens)
console.log(syntaxAnalysis.isLL1())
// console.log(syntaxAnalysis.grammerProductions)
