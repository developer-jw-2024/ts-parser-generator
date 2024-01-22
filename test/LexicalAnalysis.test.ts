import { LexicalAnalysis } from "../src/LexicalAnalyzer/LexicalAnalysis"

describe('LexicalAnalysis', ()  => {
    test('LexicalAnalysis', () => { 
        var lexicalAnalysis = new LexicalAnalysis([
            { name : 'A', regularExpressionValue: 'a'},
            { name : 'ABB', regularExpressionValue: 'abb'},
            { name : 'AAAABBB', regularExpressionValue: 'a*b+'}
        ])
        expect(lexicalAnalysis.startIndex).toEqual(0)
        var regularExpressions = lexicalAnalysis.regularExpressions

        var dfa = regularExpressions[0].regularExpression.dfa
        expect(dfa.startIndex).toEqual(1)
        expect(dfa.terminatedIndexList).toEqual([2])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 1, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var dfa = regularExpressions[1].regularExpression.dfa
        expect(dfa.startIndex).toEqual(3)
        expect(dfa.terminatedIndexList).toEqual([6])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 3, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var dfa = regularExpressions[2].regularExpression.dfa
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
})