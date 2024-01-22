import { DFA } from './DFA'
import { RegularExpression } from './RegularExpression'
import { FiniteAutomatonPath, NFA } from './NFA'
import { TransferChar } from './NFA'
import { intersection } from '../Utils/SetUtils'
export class LexicalAnalysis {
    startIndex : number
    regularExpressions : Array<{name : string, regularExpressionValue : string, regularExpression : RegularExpression}>
    nfa : NFA
    dfa : DFA
    terminatdNodes : Map<number, {name : string, regularExpressionValue : string, regularExpression : RegularExpression} | null>

    constructor(tokens : Array<{name : string, regularExpressionValue : string}>) {
        this.startIndex = 0
        var numOfNodes = 1

        var nfa_startIndex : number = this.startIndex
        var nfa_terminatedIndexList : Array<number> = []
        var nfa_finiteAutomatonPaths : Array<FiniteAutomatonPath> = []

        this.regularExpressions = []
        for (var i=0;i<tokens.length;i++) {
            var token = tokens[i]
            var regularExpression = new RegularExpression(token.regularExpressionValue)
            this.regularExpressions.push({
                name : token.name,
                regularExpressionValue : token.regularExpressionValue,
                regularExpression : regularExpression
            })
            regularExpression.dfa.deltaNodeNumber(numOfNodes)
            // console.log(regularExpression.dfa.finiteAutomatonPaths)
            numOfNodes+=regularExpression.dfa.getNumberOfNodes()
            nfa_terminatedIndexList = nfa_terminatedIndexList.concat(regularExpression.dfa.terminatedIndexList)
            nfa_finiteAutomatonPaths.push(new FiniteAutomatonPath(nfa_startIndex, regularExpression.dfa.startIndex, new TransferChar(null, true)))
            nfa_finiteAutomatonPaths = nfa_finiteAutomatonPaths.concat(regularExpression.dfa.finiteAutomatonPaths)
        }

        this.nfa = new NFA()
        this.nfa.initWith(nfa_startIndex, nfa_terminatedIndexList, nfa_finiteAutomatonPaths)
        var dfa = this.nfa.toDFA()
        var that = this
        var terminatdNodes = new Map<number, {name : string, regularExpressionValue : string, regularExpression : RegularExpression} | null>()
        dfa.terminatedIndexList.forEach((terminatedIndex)=>{
            terminatdNodes[terminatedIndex] = null
            // console.log(terminatedIndex, dfa.dfaStates[terminatedIndex].states)
            that.regularExpressions.forEach((regularExpress)=>{
                if (terminatdNodes[terminatedIndex]==null && intersection(regularExpress.regularExpression.dfa.terminatedIndexList,dfa.dfaStates[terminatedIndex].states).length>0) {
                    terminatdNodes[terminatedIndex] = regularExpress
                }
            })
        })

        // console.log(terminatdNodes)
        this.dfa = dfa
        this.terminatdNodes = terminatdNodes
    }
}

/**
A a
ABB abb
AAABBB a*b+
 */