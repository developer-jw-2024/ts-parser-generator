import { toRegularExpressionChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'

describe('NFA', ()  => {
    test('NFA', () => { 
        try {
            var value = ''
            var chars = toRegularExpressionChars(value)
            var tree = buildRegularExpressionTree(chars)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toBe('Syntax Error');
        }

        try {
            var value = '\\'
            var chars = toRegularExpressionChars(value)
            var tree = buildRegularExpressionTree(chars)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toBe('Syntax Error');
        }
        
        try {
            var value = '-'
            var chars = toRegularExpressionChars(value)
            var tree = buildRegularExpressionTree(chars)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toBe('Syntax Error: -');
        }

        var value = 'a'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = '<>'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
       
        var value = '\\-'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "-", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var enterText = FileUtils.readFromFileSystem('./test/Enter.txt')
        var value = enterText[0]+enterText[1]
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\n", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = enterText[3]
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\n", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var tabText = FileUtils.readFromFileSystem('./test/Tab.txt')
        var value = tabText[0]+tabText[1]
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\t", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        
        var value = '\t'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\t", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = '\\\\'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": "\\", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = '.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}}
        ])

        var value = 'ab'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])
        
        var value = '((ab))'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
        ])

        var value = 'abc'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        
        var value = 'a|b'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'ab|c'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
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
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
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
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
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
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
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

        var value = '[ab]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[^a-c]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b', 'c'], "isAnyCharPath" : false}},
        ])
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(false)

        var value = '[^\\[\\^]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['[','^'], "isAnyCharPath" : false}},
        ])
        expect((new TransferChar("^", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(false)
        expect((new TransferChar("[", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(false)
        expect((new TransferChar("a", false, false , null, false).canPass(nfa.finiteAutomatonPaths[0].transferChar))).toBe(true)

        var value = 'a*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '\\a*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[\\a]*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[\\\\]*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": '\\', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a?'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a*b+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 2, "destination": 5, transferChar:{"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 7, transferChar:{"transferValue": 'b', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 6, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

        ])

        var value = '"a"*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[ \t]+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 7, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 10, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 10, "destination": 8, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 11, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 11, "destination": 12, transferChar:{"transferValue": '\t', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 12, "destination": 8, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 7, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '[A-C][A-C_]+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": 'A', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 5, "destination": 6, transferChar:{"transferValue": 'B', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 6, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 0, "destination": 7, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 7, "destination": 8, transferChar:{"transferValue": 'C', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 8, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 2, "destination": 10, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 10, "destination": 11, transferChar:{"transferValue": 'A', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 11, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 2, "destination": 12, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 12, "destination": 13, transferChar:{"transferValue": 'B', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 13, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 2, "destination": 14, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 14, "destination": 15, transferChar:{"transferValue": 'C', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 15, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 2, "destination": 16, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 16, "destination": 17, transferChar:{"transferValue": '_', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 17, "destination": 9, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 9, "destination": 18, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 9, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 18, "destination": 20, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 20, "destination": 21, transferChar:{"transferValue": 'A', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 21, "destination": 19, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 18, "destination": 22, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 22, "destination": 23, transferChar:{"transferValue": 'B', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 23, "destination": 19, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 18, "destination": 24, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 24, "destination": 25, transferChar:{"transferValue": 'C', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 25, "destination": 19, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 18, "destination": 26, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 26, "destination": 27, transferChar:{"transferValue": '_', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 27, "destination": 19, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

            {"source": 19, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 19, "destination": 18, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

        ])

        var value = '" "*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '"\\a"*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 4, transferChar:{"transferValue": '\\', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '(\\a)*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": 'a', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '(\\\\)*'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 0, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": '\\', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = '" "+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": " ", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": ' ', "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])


        var value = '[^ #]+'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(nfa.finiteAutomatonPaths).toEqual([
            {"source": 0, "destination": 2, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [" ", "#"], "isAnyCharPath" : false}},
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 2, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 3, "destination": 4, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [" ", "#"], "isAnyCharPath" : false}},
            {"source": 4, "destination": 1, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": true, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])

        var value = 'a|.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
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
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(isSetEqual(nfa.epsilonClosure([0]), [0])).toBe(true)

        var value = 'a?'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        expect(isSetEqual(nfa.epsilonClosure([0]), [0, 1, 2])).toBe(true)


        var value = 'a|b'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar : {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar : {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath" : false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath" : false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = 'a|[^b]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar: {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar: {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b', 'a'], "isAnyCharPath" : false},
        ])

        var value = 'a|[^ab]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar: {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
        ])

        var value = '[^ab]|a'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '[^ab]|[^bc]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['b', 'c'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b', 'c'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "c", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = 'a|.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false,"isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false,"isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
        ])

        var value = '.|a'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
        ])

        var value = '[^a]|.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false,"isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false,"isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '[^ab]|.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])
        
        var value = '.|[^a]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '.|[^ab]'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a', 'b'], "isAnyCharPath" : false},
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var value = '.|.'
        var chars = toRegularExpressionChars(value)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        var startEpsilonClosure = nfa.epsilonClosure([0])
        expect(isSetEqual(startEpsilonClosure, [0, 2, 4])).toBe(true)
        var nonEmptyPaths = nfa.findNonEmptyFiniteAutomatonPaths(startEpsilonClosure)
        expect(nonEmptyPaths).toEqual([
            {"source": 2, "destination": 3, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
            {"source": 4, "destination": 5, transferChar:{"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true}},
        ])
        var transferChars = nfa.getTransferCharsWithFiniteAutomatonPaths(nonEmptyPaths)
        expect(transferChars).toEqual([
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : true},
        ])

        var transferChars = nfa.getTransferChars([
            new TransferChar("a", false, false, null, false),
            new TransferChar("b", false, false, null, false),
        ])
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
        ])

        var transferChars = nfa.getTransferChars([
            new TransferChar("a", false, false, null, false),
            new TransferChar(null, false, true, ['a'], false),
        ])
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": ['a'], "isAnyCharPath" : false},
        ])

        var transferChars = nfa.getTransferChars([
            new TransferChar("a", false, false, null, false),
            new TransferChar(null, false, true, [' '], false),
        ])
        
        expect(transferChars).toEqual([
            {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
            {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', 'a'], "isAnyCharPath" : false},
        ])

    })
})
