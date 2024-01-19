import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual } from '../src/Utils/SetUtils'
describe('NFA', ()  => {
    test('NFA', () => { 
        try {
            var value = ''
            var chars = toChars(value)
            var tree = buildRegularExpressionTree(chars)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toBe('Syntax Error');
        }

        try {
            var value = '\\'
            var chars = toChars(value)
            var tree = buildRegularExpressionTree(chars)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toBe('Syntax Error');
        }
        
        var value = 'a'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = '.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}}
        ])

        var value = 'ab'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        
        var value = '((ab))'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = 'abc'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        
        var value = 'a|b'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'ab|c'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a|b|c'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(false)
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[1].transferChar))).toBe(true)
        expect((new TransferChar("b", false, false , null, false).canPass(nfa.finiteAutomatonPaths[1].transferChar))).toBe(false)


        var value = '(((a)|b|c))'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[a-c]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])


        var value = '[^a-c]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b', 'c'], "isAnyCharPath" : false}},
        ])
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(false)

        var value = 'a*'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a?'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a|.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[1].transferChar))).toBe(true)
        expect((new TransferChar("b", false, false , null, false).canPass(nfa.finiteAutomatonPaths[4].transferChar))).toBe(true)

        expect(nfa.findFiniteAutomatonPaths(2, new TransferChar("a", false, false , null, false))).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        expect(nfa.epsilonClosure([0])).toEqual([0, 2, 4])
        expect(nfa.findNonEmptyFiniteAutomatonPaths([0,2,4])).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},

        ])
    });

    test('NFA.epsilonClosure', () => { 
        var value = 'a'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(isSetEqual(nfa.epsilonClosure([0]), [0])).toBe(true)

        var value = 'a?'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        expect(isSetEqual(nfa.epsilonClosure([0]), [0, 1, 2])).toBe(true)


        var value = 'a|b'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar : {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar : {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath" : false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath" : false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = 'a|[^b]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar: {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar: {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b', 'a'], "isAnyCharPath" : false},
        ])

        var value = 'a|[^ab]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar: {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
        ])

        var value = '[^ab]|a'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '[^ab]|[^bc]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b', 'c'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b', 'c'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = 'a|.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false,"isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false,"isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
        ])

        var value = '.|a'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
        ])

        var value = '[^a]|.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false,"isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false,"isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '[^ab]|.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])
        
        var value = '.|[^a]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '.|[^ab]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '.|.'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferChars(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true},
        ])
    })
})
