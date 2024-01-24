import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"

describe('LexicalAnalysis', ()  => {
    test('LexicalAnalysis', () => { 
        var lexicalAnalysis = new LexicalAnalysis([
            new TokenType('A', 'a'),
            new TokenType('ABB', 'abb'),
            new TokenType('AAAABBB', 'a*b+'),
        ])
        expect(lexicalAnalysis.startIndex).toEqual(0)
        var tokenTypes = lexicalAnalysis.tokenTypes

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

        var nfa = lexicalAnalysis.nfa
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

        var dfa = lexicalAnalysis.dfa
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

    test('LexicalAnalysis.toTokens', () => { 
        var ABB = new TokenType('ABB', 'abb')
        var AAAABBB = new TokenType('AAAABBB', 'a*b+')

        var lexicalAnalysis = new LexicalAnalysis([ABB, AAAABBB])
        var tokens = lexicalAnalysis.toTokens("aabcacabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
            new Token(ABB, "abb"),
        ])
        
        var tokens = lexicalAnalysis.toTokens("aabcacaabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
            new Token(AAAABBB, "aabb"),
        ])

        var tokens = lexicalAnalysis.toTokens("aabcaaabb")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "c"),
            new Token(AAAABBB, "aaabb"),
        ])

        var tokens = lexicalAnalysis.toTokens("aabcaaa")
        expect(tokens).toEqual([
            new Token(AAAABBB, "aab"),
            new Token(TokenType.UNKNOWN_TOKENTYPE, "caaa"),
        ])
    })

    test('LexicalAnalysis.toTokens', () => { 
        var H1 = new TokenType('H1', '#')
        var H2 = new TokenType('H2', '##')
        var SPACES = new TokenType('SPACES', '" "+')
        var PLAINTEXT = new TokenType('PLAINTEXT', '[^# ]+')

        var lexicalAnalysis = new LexicalAnalysis([
            H1,
            H2,
            SPACES,
            PLAINTEXT
        ])
        var tokenTypes = lexicalAnalysis.tokenTypes
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

        var nfa = lexicalAnalysis.nfa
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

        var dfa = lexicalAnalysis.dfa
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([1,2,3,4,5,6])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 0, "destination": 3, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 4, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 3, "destination": 6, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['#', ' '], "isAnyCharPath" : false}},
            {"source": 6, "destination": 6, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var tokens = lexicalAnalysis.toTokens("# I am (boy).\n")
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
})