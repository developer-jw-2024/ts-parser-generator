import { start } from 'repl'
import { FiniteAutomatonPath, TransferChar, DFAState } from './NFA'

export class DFA {
    starIndex : number
    terminatedIndexList : Array<number>
    finiteAutomatonPaths : Array<FiniteAutomatonPath>
    dfaStates : Array<DFAState>
    constructor(starIndex : number, 
        terminatedIndexList : Array<number>, 
        finiteAutomatonPaths : Array<FiniteAutomatonPath>,
        dfaStates : Array<DFAState>) {
        this.starIndex = starIndex
        this.terminatedIndexList = terminatedIndexList
        this.finiteAutomatonPaths = finiteAutomatonPaths
        this.dfaStates = dfaStates
    }

    test(value : string) : boolean {
        var cursor : number = this.starIndex
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
        this.starIndex += delta
        this.terminatedIndexList = this.terminatedIndexList.map(x=>x+delta)
        this.finiteAutomatonPaths.forEach(path=>{
            path.source+=delta
            path.destination+=delta
        })
    }
}