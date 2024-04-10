import { start } from 'repl'
import { FiniteAutomatonPath, TransferChar, DFAState, NFA } from './NFA'
import { toContentChars } from './RegularExpression'

export class DFA {
    startIndex : number
    terminatedIndexList : Array<number>
    finiteAutomatonPaths : Array<FiniteAutomatonPath>
    dfaStates : Array<DFAState>
    nfa : NFA

    init(startIndex : number, 
        terminatedIndexList : Array<number>, 
        finiteAutomatonPaths : Array<FiniteAutomatonPath>,
        dfaStates : Array<DFAState>, 
        nfa : NFA) {
        this.startIndex = startIndex
        this.terminatedIndexList = terminatedIndexList
        this.finiteAutomatonPaths = finiteAutomatonPaths
        this.dfaStates = dfaStates
        this.nfa = nfa
        return this
    }

    static initFromJSON(jsonObject : Object) : DFA {
        var object : DFA = new DFA()
        object.init(
            jsonObject['startIndex'],
            jsonObject['terminatedIndexList'],
            jsonObject['finiteAutomatonPaths'].map(pathJSON=>FiniteAutomatonPath.initFromJSON(pathJSON)),
            null,
            null
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            startIndex : this.startIndex,
            terminatedIndexList : this.terminatedIndexList,
            finiteAutomatonPaths : this.finiteAutomatonPaths.map(path=>path.convertToJSON())
        }
        return jsonObject
    }

    getNumberOfNodes() {
        return this.dfaStates.length
    }

    test(value : string) : boolean {
        var cursor : number = this.startIndex
        var chars : Array<string> = toContentChars(value)
        for (var i=0;cursor>=0 && i<chars.length;i++) {
            var transferChar: TransferChar= new TransferChar().init(chars[i], false, false, null, false)
            cursor = this.move(cursor, transferChar)
        }
        return cursor>=0 && this.terminatedIndexList.indexOf(cursor)>=0
    }

    move(sourceIndex : number, transferChar: TransferChar) : number {
        // console.log('>>>>>>>> >>> sourceIndex: ', sourceIndex)
        for (var i=0;i<this.finiteAutomatonPaths.length;i++) {
            var path = this.finiteAutomatonPaths[i]
            // if (sourceIndex==0) console.log(">>>>>>>>   ", i, path, transferChar, path.transferChar, transferChar.canPass(path.transferChar))
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