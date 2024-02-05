import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { RegularExpression } from "../index"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalysis } from "../src/SyntaxAnalysis/LL1"
import { LRSyntaxAnalysis } from "../src/SyntaxAnalysis/LR"


describe('Lr', () => {
    test('LR 1', () => {
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            PLUS, STAR, ID, 
            OPENBRACKET, CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var lrSyntaxAnalysis = new LRSyntaxAnalysis(tokens)
        // lrSyntaxAnalysis.states
        // console.log(lrSyntaxAnalysis.grammerProductions.map(gp=>gp.toString()).join('\n'))
    })
})