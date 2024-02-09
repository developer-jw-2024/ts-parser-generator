import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree, RegularExpression } from '../src/LexicalAnalyzer/RegularExpression'
import { NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { DFA } from '../src/LexicalAnalyzer/DFA'
import { isSetEqual } from '../src/Utils/SetUtils'
describe('DFA', ()  => {
    test('DFA', () => { 
        var value = 'a'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([1])
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        expect(dfa.getNumberOfNodes()).toEqual(2)

        var value = '[^a]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([1])
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false}}
        ])
        expect(dfa.getNumberOfNodes()).toEqual(2)

        var value = 'ab'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([2])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        expect(dfa.getNumberOfNodes()).toEqual(3)

        var value = '"a+"'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(dfa.terminatedIndexList).toEqual([2])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "+", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        dfa.deltaNodeNumber(1)
        expect(dfa.startIndex).toEqual(1)
        expect(dfa.terminatedIndexList).toEqual([3])
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 1, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "+", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        expect(dfa.getNumberOfNodes()).toEqual(3)


        var value = 'a|b'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1,2])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        expect(dfa.getNumberOfNodes()).toEqual(3)

        var value = 'a?'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [0,1])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        dfa.deltaNodeNumber(3)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 3, "destination": 4, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        expect(dfa.getNumberOfNodes()).toEqual(2)

        var value = 'a*'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [0,1])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[\\\\]*'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [0,1])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\\", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 1, transferChar:{"transferValue": "\\", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1,2])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a*b+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [2,3])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '(a|b)*c'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1])).toBe(true)

        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '#'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '##'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [2])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": "#", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '" "+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1,2])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 2, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])



        var value = '[^ #]+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1,2])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '#'], "isAnyCharPath" : false}},
            {"source": 1, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '#'], "isAnyCharPath" : false}},
            {"source": 2, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', '#'], "isAnyCharPath" : false}},
        ])

        var value = '[ \t]+'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var dfa = nfa.toDFA()
        expect(dfa.startIndex).toEqual(0)
        expect(isSetEqual(dfa.terminatedIndexList, [1,2,3,4])).toBe(true)
        expect(dfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 3, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 1, "destination": 4, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 4, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 3, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 4, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

        ])
    })

    test('RegularExpression', ()=>{
        var regExp : RegularExpression = new RegularExpression('"a+"')
        expect(regExp.test("a")).toBe(false)
        expect(regExp.test("a+")).toBe(true)

        var regExp : RegularExpression = new RegularExpression('[1-3]')
        expect(regExp.test("1")).toBe(true)
        expect(regExp.test("2")).toBe(true)
        expect(regExp.test("3")).toBe(true)
        expect(regExp.test("0")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('[^1-3]')
        expect(regExp.test("1")).toBe(false)
        expect(regExp.test("2")).toBe(false)
        expect(regExp.test("3")).toBe(false)
        expect(regExp.test("0")).toBe(true)

        var regExp : RegularExpression = new RegularExpression('[1-9][0-9]*|0')
        expect(regExp.test("1")).toBe(true)
        expect(regExp.test("2")).toBe(true)
        expect(regExp.test("3")).toBe(true)
        expect(regExp.test("0")).toBe(true)
        expect(regExp.test("10")).toBe(true)

        var regExp : RegularExpression = new RegularExpression('[\\\\]*')
        expect(regExp.test("\\")).toBe(true)
        expect(regExp.test("2")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('(a|b)*c')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(false)
        expect(regExp.test("2")).toBe(false)
        expect(regExp.test("c")).toBe(true)
        expect(regExp.test("cc")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('((a|b)*c)|((a|b)*d)')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(false)
        expect(regExp.test("2")).toBe(false)
        expect(regExp.test("c")).toBe(true)
        expect(regExp.test("cc")).toBe(false)
        expect(regExp.test("abababababac")).toBe(true)
        expect(regExp.test("abababababaabbbabd")).toBe(true)

        var regExp : RegularExpression = new RegularExpression('[^ #]')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(true)
        expect(regExp.test("(")).toBe(true)
        expect(regExp.test("#")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('[^*]')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(true)
        expect(regExp.test("(")).toBe(true)
        expect(regExp.test("#")).toBe(true)
        expect(regExp.test("*")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('[^\\*]')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(true)
        expect(regExp.test("(")).toBe(true)
        expect(regExp.test("#")).toBe(true)
        expect(regExp.test("*")).toBe(false)

        var regExp : RegularExpression = new RegularExpression('"**"')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(false)
        expect(regExp.test("(")).toBe(false)
        expect(regExp.test("#")).toBe(false)
        expect(regExp.test("*")).toBe(false)
        expect(regExp.test("*")).toBe(false)
        expect(regExp.test("**")).toBe(true)

        var regExp : RegularExpression = new RegularExpression('[^ #\\(]')
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(true)
        expect(regExp.test("(")).toBe(false)
        expect(regExp.test(" ")).toBe(false)
        expect(regExp.test("#")).toBe(false)

        var regExp : RegularExpression = new RegularExpression("[']")
        expect(regExp.test("\\")).toBe(false)
        expect(regExp.test("\\\\")).toBe(false)
        expect(regExp.test("(")).toBe(false)
        expect(regExp.test("'")).toBe(true)
        
    })
})
