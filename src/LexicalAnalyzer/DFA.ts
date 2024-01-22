import { start } from 'repl'
import { FiniteAutomatonPath, TransferChar, DFAState, NFA } from './NFA'

export class DFA {
    startIndex : number
    terminatedIndexList : Array<number>
    finiteAutomatonPaths : Array<FiniteAutomatonPath>
    dfaStates : Array<DFAState>
    nfa : NFA

    constructor(startIndex : number, 
        terminatedIndexList : Array<number>, 
        finiteAutomatonPaths : Array<FiniteAutomatonPath>,
        dfaStates : Array<DFAState>, 
        nfa : NFA) {
        this.startIndex = startIndex
        this.terminatedIndexList = terminatedIndexList
        this.finiteAutomatonPaths = finiteAutomatonPaths
        this.dfaStates = dfaStates
        this.nfa = nfa
    }

    getNumberOfNodes() {
        return this.dfaStates.length
    }

    test(value : string) : boolean {
        var cursor : number = this.startIndex
        for (var i=0;cursor>=0 && i<value.length;i++) {
            var transferChar: TransferChar= new TransferChar(value[i], false, false, null, false)
            cursor = this.move(cursor, transferChar)
        }
        return cursor>=0 && this.terminatedIndexList.indexOf(cursor)>=0
    }

    move(sourceIndex : number, transferChar: TransferChar) : number {
        for (var i=0;i<this.finiteAutomatonPaths.length;i++) {
            var path = this.finiteAutomatonPaths[i]
            if (path.source==sourceIndex && transferChar.canPass(path.transferChar)) {
                return path.destination
            }
        }
        return -1
    }

    deltaNodeNumber(delta : number) {
        this.startIndex += delta
        this.terminatedIndexList = this.terminatedIndexList.map(x=>x+delta)
        this.finiteAutomatonPaths.forEach(path=>{
            path.source+=delta
            path.destination+=delta
        })
    }
}