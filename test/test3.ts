
import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { RegularExpression } from "../index"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1LexicalAnalysis } from "../src/LexicalAnalyzer/LL1"

var PLUS = new TokenType('PLUS', '\\+', true)
var STAR = new TokenType('STAR', '\\*', true)
var ID = new TokenType('ID', 'id', true)
var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

var ll1LexicalAnalysis = new LexicalAnalysis([
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


var value = FileUtils.readFromFileSystem('./test/LL1_Test1.txt')
var tokens = ll1LexicalAnalysis.toTokens(value)
var ll1 = new LL1LexicalAnalysis(tokens)



var languageLexicalAnalysis = new LexicalAnalysis([
    PLUS,
    STAR,
    ID,
    OPENBRACKET,
    CLOSEBRACKET
])


ll1.isValid(languageLexicalAnalysis, "id+id*id")
