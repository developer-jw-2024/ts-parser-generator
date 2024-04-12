import { LexicalAnalyzer, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree, RegularExpression } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalyzer } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalyzer } from "../src/SyntaxAnalysis/LL1"
import { DFA } from "../src/LexicalAnalyzer/DFA"


describe('JSON', () => {
    test('Char TransferChar', () => {
        var a = new TransferChar().init('a', false, false, null, false)
        var json = a.convertToJSON()
        var b = TransferChar.initFromJSON(json)
        expect(a).toEqual(b)
    })

    test('Empty TransferChar', () => {
        var a = new TransferChar().init(null, true, false, null, false)
        var json = a.convertToJSON()
        var b = TransferChar.initFromJSON(json)
        expect(a).toEqual(b)
    })

    test('Negative TransferChar', () => {
        var a = new TransferChar().init(null, false, true, ['a', 'b', 'c'], false)
        var json = a.convertToJSON()
        var b = TransferChar.initFromJSON(json)
        expect(a).toEqual(b)
    })

    test('any char TransferChar', () => {
        var a = new TransferChar().init(null, false, false, null, true)
        var json = a.convertToJSON()
        var b = TransferChar.initFromJSON(json)
        expect(a).toEqual(b)
    })
    FiniteAutomatonPath

    test('FiniteAutomatonPath', () => {
        var a = new FiniteAutomatonPath().init(1, 2, new TransferChar().init(null, false, false, null, true))
        var json = a.convertToJSON()
        var b = FiniteAutomatonPath.initFromJSON(json)
        expect(a).toEqual(b)
    })

    test('DAF', () => {
        var regularExpression = new RegularExpression().initWtihRegularExpression("a*b+")
        var a = regularExpression.dfa
        var json = a.convertToJSON()
        expect(json).toEqual({
            startIndex : 0,
            terminatedIndexList: [2, 3],
            finiteAutomatonPaths: [
                {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
                {"source": 0, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
                {"source": 1, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
                {"source": 1, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
                {"source": 2, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
                {"source": 3, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            ]
        })
        var b = DFA.initFromJSON(json)
        expect(b.test('aaa')).toBe(false)
        expect(b.test('aaab')).toBe(true)
        expect(b.test('b')).toBe(true)
        expect(b.test('aaabb')).toBe(true)
    })

    test('RegularExpression', () => {
        var a = new RegularExpression().initWtihRegularExpression("a*b+")
        var json = a.convertToJSON()
        
        var b = RegularExpression.initFromJSON(json)
        expect(b.test('aaa')).toBe(false)
        expect(b.test('aaab')).toBe(true)
        expect(b.test('b')).toBe(true)
        expect(b.test('aaabb')).toBe(true)
    })

    
    test('TokenType', () => {
        var a = new TokenType().init('AAAABBB', 'a*b+', true)
        var json = a.convertToJSON()
        
        var b = TokenType.initFromJSON(json)
        expect(b.regularExpression.test('aaa')).toBe(false)
        expect(b.regularExpression.test('aaab')).toBe(true)
        expect(b.regularExpression.test('b')).toBe(true)
        expect(b.regularExpression.test('aaabb')).toBe(true)
    })

    test('LexicalAnalyzer', () => { 
        var GrammarSymbol = new TokenType().init('GrammarSymbol', "[a-zA-Z][^ \n\t]*", false)
        var Enter = new TokenType().init('Enter', '\n', true)
        var SPACES = new TokenType().init('SPACES', '[ \t]+', true)
        var DERIVATION = new TokenType().init('DERIVATION', '\\->', true)
        var EMPTY = new TokenType().init('EMPTY', '<EMPTY>', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            GrammarSymbol,
            Enter,
            SPACES,
            DERIVATION,
            EMPTY
        ])
        
        var tokens = lexicalAnalyzer.tokenize("A' -> <EMPTY>")
        expect(tokens).toEqual([
            new Token().init(GrammarSymbol, "A'"),
            new Token().init(SPACES, " "),
            new Token().init(DERIVATION, "->"),
            new Token().init(SPACES, " "),
            new Token().init(EMPTY, '<EMPTY>'),
        ])
        
        var json = lexicalAnalyzer.convertToJSON()
        var lexicalAnalyzerObj = LexicalAnalyzer.initFromJSON(json)
        var tokens2 = lexicalAnalyzerObj.tokenize("A' -> <EMPTY>")

        expect(tokens2).toEqual([
            Token.initFromJSON(new Token().init(GrammarSymbol, "A'").convertToJSON()),
            Token.initFromJSON(new Token().init(SPACES, " ").convertToJSON()),
            Token.initFromJSON(new Token().init(DERIVATION, "->").convertToJSON()),
            Token.initFromJSON(new Token().init(SPACES, " ").convertToJSON()),
            Token.initFromJSON(new Token().init(EMPTY, '<EMPTY>').convertToJSON()),
        ])

    })
})