import { LexicalAnalyzer, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { FileUtils } from "../src/Utils/FileUtil"
import { isSetEqual } from '../src/Utils/SetUtils'

describe('LexicalAnalysis', ()  => {
    
    test('LexicalAnalysis 2', ()=>{
        var DERIVATION = new TokenType('DERIVATION', '\\->', true)
        var GrammarSymbol = new TokenType('GrammarSymbol', "[^ \n\t]+", false)
        var SPACES = new TokenType('SPACES', '[ \t]+', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            DERIVATION,
            SPACES,
            GrammarSymbol,
        ])
        
        expect(isSetEqual(DERIVATION.regularExpression.dfa.terminatedIndexList, [3])).toBe(true)
        expect(DERIVATION.regularExpression.dfa.finiteAutomatonPaths).toEqual([
            {"source": 1, "destination": 2, transferChar:{"transferValue": "-", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": ">", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        expect(isSetEqual(SPACES.regularExpression.dfa.terminatedIndexList, [5,6,7,8])).toBe(true)
        expect(SPACES.regularExpression.dfa.finiteAutomatonPaths).toEqual([
            {"source": 4, "destination": 5, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 6, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

        ])

        expect(isSetEqual(GrammarSymbol.regularExpression.dfa.terminatedIndexList, [10,11])).toBe(true)
        expect(GrammarSymbol.regularExpression.dfa.finiteAutomatonPaths).toEqual([
            {"source": 9, "destination": 10, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},
            {"source": 10, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},
            {"source": 11, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},
        ])

        expect(lexicalAnalyzer.nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "-", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": ">", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 6, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 7, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 10, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},
            {"source": 10, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},
            {"source": 11, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '\n', '\t'], "isAnyCharPath" : false}},

        ])

        var tokens = lexicalAnalyzer.tokenize("A' -> A")
        expect(tokens).toEqual([
            new Token(GrammarSymbol, "A'"),
            new Token(SPACES, " "),
            new Token(DERIVATION, "->"),
            new Token(SPACES, " "),
            new Token(GrammarSymbol, 'A'),
        ])
        
        // console.log(lexicalAnalyzer.dfa.dfaStates)
        // console.log(lexicalAnalyzer.terminatdNodes)
        // console.log(lexicalAnalyzer.dfa.finiteAutomatonPaths)
    })
    


    test('LexicalAnalysis', () => { 
        var lexicalAnalyzer = new LexicalAnalyzer([
            new TokenType('A', 'a', true),
            new TokenType('ABB', 'abb', true),
            new TokenType('AAAABBB', 'a*b+', true),
        ])
        expect(lexicalAnalyzer.startIndex).toEqual(0)
        var tokenTypes = lexicalAnalyzer.tokenTypes

        var dfa = tokenTypes[0].regularExpression.dfa
        expect(dfa.startIndex).toEqual(1)
        expect(dfa.terminatedIndexList).toEqual([2])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 1, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var dfa = tokenTypes[1].regularExpression.dfa
        expect(dfa.startIndex).toEqual(3)
        expect(dfa.terminatedIndexList).toEqual([6])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 3, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var dfa = tokenTypes[2].regularExpression.dfa
        expect(dfa.startIndex).toEqual(7)
        expect(dfa.terminatedIndexList).toEqual([9,10])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 7, "destination": 8, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 9, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 9, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 10, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 10, "destination": 10, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var nfa = lexicalAnalyzer.nfa
        expect(nfa.startIndex).toEqual(0)
        expect(nfa.terminatedIndexList).toEqual([2,6,9,10])
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 7, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 9, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 9, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 10, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 10, "destination": 10, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var dfa = lexicalAnalyzer.dfa
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([1,2,3,5,6])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 6, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

    })

    test('lexicalAnalyzer.tokenize', () => { 
        var ABB = new TokenType('ABB', 'abb', true)
        var AAAABBB = new TokenType('AAAABBB', 'a*b+', true)

        var lexicalAnalyzer = new LexicalAnalyzer([ABB, AAAABBB])
        var tokens = lexicalAnalyzer.tokenize("aabcacabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
            new Token(ABB, "abb"),
        ])
        
        var tokens = lexicalAnalyzer.tokenize("aabcacaabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
            new Token(AAAABBB, "aabb"),
        ])

        var tokens = lexicalAnalyzer.tokenize("aabcaaabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "c"),
            new Token(AAAABBB, "aaabb"),
        ])

        var tokens = lexicalAnalyzer.tokenize("aabcaaa")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "caaa"),
        ])
    })

    test('lexicalAnalyzer.tokenize', () => { 
        var H1 = new TokenType('H1', '#', true)
        var H2 = new TokenType('H2', '##', true)
        var SPACES = new TokenType('SPACES', '" "+', true)
        var PLAINTEXT = new TokenType('PLAINTEXT', '[^# ]+', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            H1,
            H2,
            SPACES,
            PLAINTEXT
        ])
        var tokenTypes = lexicalAnalyzer.tokenTypes
        var dfa = tokenTypes[0].regularExpression.dfa
        expect(dfa.startIndex).toEqual(1)
        expect(dfa.terminatedIndexList).toEqual([2])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 1, "destination": 2, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var dfa = tokenTypes[1].regularExpression.dfa
        expect(dfa.startIndex).toEqual(3)
        expect(dfa.terminatedIndexList).toEqual([5])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 3, "destination": 4, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var dfa = tokenTypes[2].regularExpression.dfa
        expect(dfa.startIndex).toEqual(6)
        expect(dfa.terminatedIndexList).toEqual([7,8])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 6, "destination": 7, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var dfa = tokenTypes[3].regularExpression.dfa
        expect(dfa.startIndex).toEqual(9)
        expect(dfa.terminatedIndexList).toEqual([10, 11])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 9, "destination": 10, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 10, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 11, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
        ])

        var nfa = lexicalAnalyzer.nfa
        expect(nfa.startIndex).toEqual(0)
        expect(nfa.terminatedIndexList).toEqual([2, 5, 7, 8, 10, 11])
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 8, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 10, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 10, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 11, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
        ])

        var dfa = lexicalAnalyzer.dfa
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([1,2,3,4,5,6])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 1, "destination": 4, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 5, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 5, "destination": 5, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
        ])

        var tokens = lexicalAnalyzer.tokenize("# I am (boy).\n")
        expect(tokens).toEqual([
            new Token(H1, "#"),
            new Token(SPACES, " "),
            new Token(PLAINTEXT, "I"),
            new Token(SPACES, " "),
            new Token(PLAINTEXT, "am"),
            new Token(SPACES, " "),
            new Token(PLAINTEXT, "(boy).\n"),
        ])
        // console.log(tokens)
    })

    test('lexicalAnalyzer.tokenize 2', () => { 
        var H1 = new TokenType('H1', '#', true)
        var H2 = new TokenType('H2', '##', true)
        var SPACES = new TokenType('SPACES', '" "+', true)
        var PLAINTEXT = new TokenType('PLAINTEXT', '[^#\\( ]+', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            H1,
            H2,
            SPACES,
            PLAINTEXT
        ])
        var tokens = lexicalAnalyzer.tokenize("# I am (boy).\n")
        expect(tokens).toEqual([
            new Token(H1, "#"),
            new Token(SPACES, " "),
            new Token(PLAINTEXT, "I"),
            new Token(SPACES, " "),
            new Token(PLAINTEXT, "am"),
            new Token(SPACES, " "),
            new Token(TokenType.UNKNOWN_TOKENTYPE, '('),
            new Token(PLAINTEXT, "boy).\n"),
        ])
    })

    test('lexicalAnalyzer.tokenize 3', () => { 
        var H1 = new TokenType('H1', '#', true)
        var H2 = new TokenType('H2', '##', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            H1,
            H2,
        ])
        var tokens = lexicalAnalyzer.tokenize("I am (boy).\n")
        expect(tokens).toEqual([
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'I am (boy).\n'),
        ])
    })

    test('GrammarSymbols', () => { 
        var GrammarSymbol = new TokenType('GrammarSymbol', '[A-C][A-C_]+', false)
        // var DERIVATION = new TokenType('DERIVATION', '\\->')
        expect(GrammarSymbol.regularExpression.dfa.test("A")).toEqual(false)
        expect(GrammarSymbol.regularExpression.dfa.test("AC")).toEqual(true)
        expect(GrammarSymbol.regularExpression.dfa.test("A_")).toEqual(true)
    })
    
    test('GrammarSymbols 1', () => { 
        var GrammarSymbol = new TokenType('GrammarSymbol', '[A][Ad]+', false)
        var Enter = new TokenType('Enter', '\n', true)
        var SPACES = new TokenType('SPACES', '[ \t]+', true)
        var DERIVATION = new TokenType('DERIVATION', '\\->', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            GrammarSymbol,
            Enter,
            SPACES,
            DERIVATION
        ])
        
        var tokens = lexicalAnalyzer.tokenize("A -> A d")
        expect(tokens).toEqual([
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'A'),
            new Token(SPACES, " "),
            new Token(DERIVATION, "->"),
            new Token(SPACES, " "),
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'A'),
            new Token(SPACES, " "),
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'd'),
        ])
        
    })

    test('GrammarSymbols 2', () => { 
        var GrammarSymbol = new TokenType('GrammarSymbol', '[a-cA-C][a-cA-C_]+', false)
        var Enter = new TokenType('Enter', '\n', true)
        var SPACES = new TokenType('SPACES', '[ \t]+', true)
        var DERIVATION = new TokenType('DERIVATION', '\\->', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            GrammarSymbol,
            Enter,
            SPACES,
            DERIVATION
        ])
        
        var tokens = lexicalAnalyzer.tokenize("A -> A d")
        expect(tokens).toEqual([
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'A'),
            new Token(SPACES, " "),
            new Token(DERIVATION, "->"),
            new Token(SPACES, " "),
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'A'),
            new Token(SPACES, " "),
            new Token(TokenType.UNKNOWN_TOKENTYPE, 'd'),
        ])
        
    })

    test('GrammarSymbols 3', () => { 
        var GrammarSymbol = new TokenType('GrammarSymbol', '[a-dA-D][a-dA-D_]*', false)
        var Enter = new TokenType('Enter', '\n', true)
        var SPACES = new TokenType('SPACES', '[ \t]+', true)
        var DERIVATION = new TokenType('DERIVATION', '\\->', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            GrammarSymbol,
            Enter,
            SPACES,
            DERIVATION
        ])
        
        var tokens = lexicalAnalyzer.tokenize("A -> A d")
        expect(tokens).toEqual([
            new Token(GrammarSymbol, 'A'),
            new Token(SPACES, " "),
            new Token(DERIVATION, "->"),
            new Token(SPACES, " "),
            new Token(GrammarSymbol, 'A'),
            new Token(SPACES, " "),
            new Token(GrammarSymbol, 'd'),
        ])
        
    })

    test('GrammarSymbols 4', () => { 
        var GrammarSymbol = new TokenType('GrammarSymbol', "[a-zA-Z][^ \n\t]*", false)
        var Enter = new TokenType('Enter', '\n', true)
        var SPACES = new TokenType('SPACES', '[ \t]+', true)
        var DERIVATION = new TokenType('DERIVATION', '\\->', true)
        var EMPTY = new TokenType('EMPTY', '<EMPTY>', true)

        var lexicalAnalyzer = new LexicalAnalyzer([
            GrammarSymbol,
            Enter,
            SPACES,
            DERIVATION,
            EMPTY
        ])
        
        var tokens = lexicalAnalyzer.tokenize("A' -> <EMPTY>")
        expect(tokens).toEqual([
            new Token(GrammarSymbol, "A'"),
            new Token(SPACES, " "),
            new Token(DERIVATION, "->"),
            new Token(SPACES, " "),
            new Token(EMPTY, '<EMPTY>'),
        ])
        
    })
})