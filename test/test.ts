import { RegularExpression } from "../index"
import { LexicalAnalysis, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'

var nfa = new NFA()

var one = new TransferChar(null, false, false, null, true)
var two = new TransferChar(null, false, false, null, true)
var three = new TransferChar(null, false, true, [' ', '\t', '\n'], false)
var p1 = new FiniteAutomatonPath(2, 3, one)
var p2 = new FiniteAutomatonPath(4, 5, two)
console.log(nfa.getTransferCharsWithFiniteAutomatonPaths([p1, p2]))
// console.log(nfa.getDistinctTransferChars(one, two))

//{"source": 2, "destination": 3, transferChar : {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},
// {"source": 4, "destination": 5, transferChar : {"transferValue": "b", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}},

// console.log(one.toString())
// console.log(two.toString())
// console.log(nfa.getDistinctTransferChars(one, two))
// var transferChars = nfa.getTransferChars([one, two])
// console.log(transferChars)

// expect(transferChars).toEqual([
//     {"transferValue": "a", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false},
//     {"transferValue": null, "isEmptyPath": false, "isNegativePath": true, "negativeTransferValues": [' ', 'a'], "isAnyCharPath" : false},
// ])

// console.log(lexicalAnalysis.dfa.dfaStates)
// console.log(lexicalAnalysis.terminatdNodes)


// expect(nfa.finiteAutomatonPaths).toEqual([
//     {"source": 0, "destination": 1, transferChar:{"transferValue": "-", "isEmptyPath": false, "isNegativePath": false, "negativeTransferValues": null, "isAnyCharPath" : false}}
// ])
// var H1 = new TokenType('H1', '#')
// var H2 = new TokenType('H2', '##')
// var SPACES = new TokenType('SPACES', '" "+')
// var PLAINTEXT = new TokenType('PLAINTEXT', '[^ #\\()]+')

// var lexicalAnalysis = new LexicalAnalysis([
//     H1,
//     H2,
//     SPACES,
//     PLAINTEXT
// ])
// var tokens = lexicalAnalysis.toTokens("boy.")
// expect(tokens).toEqual([
//     new Token(AAAABBB, "aab"),
//     new Token(TokenType.UNKNOWN_TOKENTYPE, "cac"),
//     new Token(ABB, "abb"),
// ])
// console.log(tokens)

