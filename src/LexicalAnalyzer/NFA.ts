import { intersection, isSetEqual, isSuperSetOf, minus, union } from '../Utils/SetUtils'
import { DFA } from './DFA'
import { RegularExpressionTree, RegularExpressionTreeOperation } from './RegularExpression'


export class NFA {
    maxIndex : number
    tree : RegularExpressionTree
    startIndex : number
    terminatedIndexList : Array<number> = []
    finiteAutomatonPaths : Array<FiniteAutomatonPath> = []

    constructor(){
    }

    initWith(startIndex : number, terminatedIndexList : Array<number>, finiteAutomatonPaths : Array<FiniteAutomatonPath>) {
        this.startIndex = startIndex
        this.terminatedIndexList = terminatedIndexList
        this.finiteAutomatonPaths = finiteAutomatonPaths
    }

    initWithRegularExpressionTree(tree : RegularExpressionTree) {
        if (tree==null) {
            throw new Error(`tree can not be null`)
        }
        this.tree = tree
        this.convert()
    }

    convert() {
        this.maxIndex = 1
        this.finiteAutomatonPaths = []
        this.startIndex = 0
        this.terminatedIndexList = [1]
        this.convertRegularExpressionTreeToNFA(this.tree, 0, 1)
    }

    convertRegularExpressionTreeToNFA(tree : RegularExpressionTree, startIndex : number, endIndex: number) : void {
        if (tree.operation==RegularExpressionTreeOperation.CHAR) {
            this.setPath(startIndex, endIndex, tree.actualChars[0])
        } else if (tree.operation==RegularExpressionTreeOperation.AND) {
            var subStartIndex = startIndex
            var i = 0
            for (;i<tree.subtrees.length-1;i++) {
                var subEndIndex = ++this.maxIndex
                this.convertRegularExpressionTreeToNFA(tree.subtrees[i], subStartIndex, subEndIndex)
                subStartIndex = subEndIndex
            }
            if (i<tree.subtrees.length) {
                var subEndIndex = endIndex
                this.convertRegularExpressionTreeToNFA(tree.subtrees[i], subStartIndex, subEndIndex)
            }
        } else if (tree.operation==RegularExpressionTreeOperation.OR) {
            for (var i=0;i<tree.subtrees.length;i++) {
                var subStartIndex = ++this.maxIndex
                var subEndIndex = ++this.maxIndex
                this.setEmptyPath(startIndex, subStartIndex)
                this.convertRegularExpressionTreeToNFA(tree.subtrees[i], subStartIndex, subEndIndex)
                this.setEmptyPath(subEndIndex, endIndex)
            }
        } else if (tree.operation==RegularExpressionTreeOperation.STAR) {
            var subStartIndex = ++this.maxIndex
            var subEndIndex = ++this.maxIndex
            this.setEmptyPath(startIndex, subStartIndex)
            this.setEmptyPath(startIndex, endIndex)
            this.convertRegularExpressionTreeToNFA(tree.subtrees[0], subStartIndex, subEndIndex)
            this.setEmptyPath(subEndIndex, endIndex)
            this.setEmptyPath(subEndIndex, subStartIndex)
        } else if (tree.operation==RegularExpressionTreeOperation.PLUS) {
            var midStartIndex = ++this.maxIndex
            this.convertRegularExpressionTreeToNFA(tree.subtrees[0], startIndex, midStartIndex)
            var subStartIndex = ++this.maxIndex
            var subEndIndex = ++this.maxIndex
            this.setEmptyPath(midStartIndex, subStartIndex)
            this.setEmptyPath(midStartIndex, endIndex)
            this.convertRegularExpressionTreeToNFA(tree.subtrees[0], subStartIndex, subEndIndex)
            this.setEmptyPath(subEndIndex, endIndex)
            this.setEmptyPath(subEndIndex, subStartIndex)
        } else if (tree.operation==RegularExpressionTreeOperation.QUESTION) {
            var subStartIndex = ++this.maxIndex
            var subEndIndex = ++this.maxIndex
            this.setEmptyPath(startIndex, subStartIndex)
            this.convertRegularExpressionTreeToNFA(tree.subtrees[0], subStartIndex, subEndIndex)
            this.setEmptyPath(subEndIndex, endIndex)
            this.setEmptyPath(startIndex, endIndex)
        } else if (tree.operation==RegularExpressionTreeOperation.NOT) {
            this.setNegativePath(startIndex, endIndex, tree.actualChars)
        } else if (tree.operation==RegularExpressionTreeOperation.ANYCHAR) {
            this.setAnyCharPath(startIndex, endIndex)
        } else {
            throw new Error('can not build regular expression tree')
        }
    }

    setPath(source : number, destination : number, value : string) : void {
        if (this.hasDuplicatedPath(source, destination)) {
            throw new Error(`There is already a path from [${source}] to [${destination}]`)
        }
        this.finiteAutomatonPaths.push(new FiniteAutomatonPath(source, destination, new TransferChar(value)))
    }

    setEmptyPath(source : number, destination : number) : void {
        if (this.hasDuplicatedPath(source, destination)) {
            throw new Error(`There is already a path from [${source}] to [${destination}]`)
        }
        this.finiteAutomatonPaths.push(new FiniteAutomatonPath(source, destination, new TransferChar(null, true)))
    }

    setAnyCharPath(source : number, destination : number) : void {
        if (this.hasDuplicatedPath(source, destination)) {
            throw new Error(`There is already a path from [${source}] to [${destination}]`)
        }
        this.finiteAutomatonPaths.push(new FiniteAutomatonPath(source, destination, new TransferChar(null, false, false, null, true)))
    }

    setNegativePath(source : number, destination : number, negativeTransferValues : Array<string>) : void {
        if (this.hasDuplicatedPath(source, destination)) {
            throw new Error(`There is already a path from [${source}] to [${destination}]`)
        }
        this.finiteAutomatonPaths.push(new FiniteAutomatonPath(source, destination, new TransferChar(null, false, true, negativeTransferValues)))
    }

    hasDuplicatedPath(fromIndex : number, toIndex : number) : boolean {
        return this.finiteAutomatonPaths.filter(path=>{
            return path.source == fromIndex && path.destination == toIndex
        }).length > 0
    }

    epsilonClosure(states : Array<number>) : Array<number> {
        var result : Array<number> = states.map(x=>x)
        var i = 0
        while (i<result.length) {
            var source = result[i]
            var paths = this.findEmptyFiniteAutomatonPaths(source)
            paths.forEach(path=>{
                if (result.indexOf(path.destination)==-1) result.push(path.destination)
            })
            i++
        }
        return result
    }

    move(states : Array<number>, transferChar : TransferChar) : Array<number> {
        var result : Array<number> = []
        for (var i=0;i<states.length;i++) {
            var source = states[i]
            var paths = this.findFiniteAutomatonPaths(source, transferChar)
            paths.forEach(path=>{
                if (result.indexOf(path.destination)==-1) {
                    result.push(path.destination)
                }
            })
        }
        return result
    }

    findFiniteAutomatonPaths(source : number, transferChar : TransferChar) : Array<FiniteAutomatonPath> {
        return this.finiteAutomatonPaths.filter(path=>path.source==source && transferChar.canPass(path.transferChar))
    }

    findEmptyFiniteAutomatonPaths(source : number) : Array<FiniteAutomatonPath> {
        return this.finiteAutomatonPaths.filter(path=>path.source==source && path.transferChar.isEmptyTransferPath())
    }

    findNonEmptyFiniteAutomatonPaths(sources : Array<number>) : Array<FiniteAutomatonPath> {
        var result : Array<FiniteAutomatonPath> = []
        for (var i=0;i<sources.length;i++) {
            var source = sources[i]
            var paths = this.finiteAutomatonPaths.filter(path=>path.source==source && !path.transferChar.isEmptyTransferPath())
            paths.forEach(path=>{
                if (result.filter(p=>p.isEqual(path)).length==0) {
                    result.push(path)
                }
            })
        }
        return result
    }

    getTransferChars(paths : Array<FiniteAutomatonPath>) : Array<TransferChar> {
        var result : Array<TransferChar> = []
        if (paths.length>0) {
            var path : FiniteAutomatonPath= paths[0]
            result.push(path.transferChar)
        }
        for (var i=0;i<paths.length;i++) {
            var path = paths[i]
            var newTransferChar : TransferChar = path.transferChar
            var newResult : Array<TransferChar> = []
            for (var j=0;j<result.length;j++) {
                var oldTransferChar = result[j]
                var transferChars = this.getDistinctTransferChars(oldTransferChar, newTransferChar)
                for (var k=0;k<transferChars.length;k++) {
                    var generateTransferChar = transferChars[k]
                    if (newResult.filter(e=>e.isEqual(generateTransferChar)).length==0) {
                        newResult.push(generateTransferChar)
                    }
                }
            }
            result = newResult
        }
        return result
    }

    getDistinctTransferChars(oldTransferChar : TransferChar, newTransferChar : TransferChar) : Array<TransferChar> {
        if ( oldTransferChar.isPositiveTransferPath() && newTransferChar.isPositiveTransferPath()) {
            return [oldTransferChar, newTransferChar]
        } else if ( oldTransferChar.isPositiveTransferPath() && newTransferChar.isNegativeTransferPath()) {
            return [oldTransferChar, new TransferChar(null, false, true, union(newTransferChar.negativeTransferValues, [oldTransferChar.transferValue]), false)]
        } else if ( oldTransferChar.isNegativeTransferPath() && newTransferChar.isPositiveTransferPath()) {
            return [new TransferChar(null, false, true, union(oldTransferChar.negativeTransferValues, [newTransferChar.transferValue]), false),
            newTransferChar]
        } else if ( oldTransferChar.isNegativeTransferPath() && newTransferChar.isNegativeTransferPath()) {
            var negativeTransferValues = union(oldTransferChar.negativeTransferValues, newTransferChar.negativeTransferValues)
            var sameChars = intersection(oldTransferChar.negativeTransferValues, newTransferChar.negativeTransferValues)
            var differChars = minus(negativeTransferValues, sameChars)
            var result : Array<TransferChar> = [
                new TransferChar(null, false, true, negativeTransferValues, false)
            ]
            for (var i=0;i<differChars.length;i++) {
                result.push(new TransferChar(differChars[i], false, false, null, false))
            }
            return result
        } else if ( oldTransferChar.isWildcardTransferPath() && newTransferChar.isPositiveTransferPath()) {
            return [
                newTransferChar, 
                new TransferChar(null, false, true, [newTransferChar.transferValue], false)
            ]
        } else if ( oldTransferChar.isPositiveTransferPath() && newTransferChar.isWildcardTransferPath()) {
            return [
                oldTransferChar, 
                new TransferChar(null, false, true, [oldTransferChar.transferValue], false)
            ]
        } else if ( oldTransferChar.isWildcardTransferPath() && newTransferChar.isNegativeTransferPath()) {
            var result : Array<TransferChar> = [
                newTransferChar
            ]
            var negativeTransferValues = newTransferChar.negativeTransferValues
            for (var i=0;i<negativeTransferValues.length;i++) {
                result.push(new TransferChar(negativeTransferValues[i], false, false, null, false))
            }
            return result
        } else if ( oldTransferChar.isNegativeTransferPath() && newTransferChar.isWildcardTransferPath()) {
            var result : Array<TransferChar> = [
                oldTransferChar
            ]
            var negativeTransferValues = oldTransferChar.negativeTransferValues
            for (var i=0;i<negativeTransferValues.length;i++) {
                result.push(new TransferChar(negativeTransferValues[i], false, false, null, false))
            }
            return result
        } else if ( oldTransferChar.isWildcardTransferPath() && newTransferChar.isWildcardTransferPath()) {
            return [oldTransferChar]
        }
    }

    toDFA() {
        var dfaTerminatedIndexList : Array<number> = []
        var dfaStates : Array<DFAState> = [new DFAState(this.epsilonClosure([0]))]
        var finiteAutomatonPaths : Array<FiniteAutomatonPath> = []
        if (intersection(dfaStates[0].states, this.terminatedIndexList).length>0) {
            dfaTerminatedIndexList.push(0)
        }
        var i = 0
        while (i<dfaStates.length) {
            var currentState = dfaStates[i]
            // console.log(i, currentState)
            var paths : Array<FiniteAutomatonPath> = this.findNonEmptyFiniteAutomatonPaths(currentState.states)
            var transferChars : Array<TransferChar> = this.getTransferChars(paths)
            for (var j=0;j<transferChars.length;j++) {
                var transferChar = transferChars[j]
                var destinationNodes = this.move(currentState.states, transferChar)
                // console.log('\t', i, j, currentState.states, transferChar, destinationNodes)
                var destinationState = new DFAState(this.epsilonClosure(destinationNodes))
                var destIndex = dfaStates.findIndex(ele=>ele.isEqual(destinationState))
                if (destIndex==-1) {
                    dfaStates.push(destinationState)
                    destIndex = dfaStates.length - 1
                    // console.log('destinationState: ', destinationState.states)
                    if (intersection(destinationState.states, this.terminatedIndexList).length>0) {
                        dfaTerminatedIndexList.push(destIndex)
                    }
                }
                // console.log(i, destIndex, transferChar)
                finiteAutomatonPaths.push(new FiniteAutomatonPath(i, destIndex, transferChar))
            }
            i++
        }
        return new DFA(0, dfaTerminatedIndexList, finiteAutomatonPaths, dfaStates, this)
    }
}

export class DFAState {
    states : Array<number>
    constructor(states : Array<number>) {
        this.states = states
    }

    isEqual(other : DFAState) {
        return isSetEqual(this.states, other.states)
    }
}

export class TransferChar {
    transferValue : string | null
    isEmptyPath : boolean = false
    isNegativePath : boolean = false
    negativeTransferValues : Array<string> | null = null
    isAnyCharPath : boolean = false

    constructor(
        transferValue : string | null = null, 
        isEmptyPath : boolean = false,
        isNegativePath : boolean = false, 
        negativeTransferValues : Array<string> = null,  
        isAnyCharPath : boolean = false) {
        this.transferValue = transferValue
        this.isEmptyPath = isEmptyPath
        this.isNegativePath = isNegativePath
        this.negativeTransferValues = negativeTransferValues
        this.isAnyCharPath = isAnyCharPath
    }

    isEmptyTransferPath() {
        return this.isEmptyPath
    }

    isPositiveTransferPath() {
        return !this.isNegativePath && !this.isAnyCharPath
    }

    isNegativeTransferPath() {
        return this.isNegativePath && !this.isAnyCharPath
    }

    isWildcardTransferPath() {
        return !this.isNegativePath && this.isAnyCharPath
    }
    

    isEqual(other : TransferChar) : boolean {
        if (this.isEmptyPath!=other.isEmptyPath) return false
        if (this.transferValue==null && other.transferValue!=null) return false
        if (this.transferValue!=null && other.transferValue==null) return false
        if (this.transferValue!=null && other.transferValue!=null && 
            this.transferValue!=other.transferValue) return false
        if (this.isNegativePath!=other.isNegativePath) return false
        if (this.isAnyCharPath!=other.isAnyCharPath) return false
        if (this.negativeTransferValues==null && other.negativeTransferValues!=null) return false
        if (this.negativeTransferValues!=null && other.negativeTransferValues==null) return false
        if (this.negativeTransferValues!=null && other.negativeTransferValues!=null) {
            if (!isSetEqual(this.negativeTransferValues, other.negativeTransferValues)) return false
        }

        return true
    }

    canPass(other : TransferChar) : boolean {
        if (this.isEmptyTransferPath()!=other.isEmptyTransferPath()) {
            return false
        }
        if (this.isEmptyTransferPath() && other.isEmptyTransferPath()) {
            return true
        }
        if (this.isPositiveTransferPath()) {
            if (other.isPositiveTransferPath()) {
                return this.transferValue==other.transferValue
            } else if (other.isNegativeTransferPath()) {
                return other.negativeTransferValues.indexOf(this.transferValue)==-1
            } else if (other.isWildcardTransferPath()) {
                return true
            }
        } else if (this.isNegativeTransferPath()) {
            if (other.isPositiveTransferPath()) {
                return false
            } else if (other.isNegativeTransferPath()) {
                return isSuperSetOf(this.negativeTransferValues, other.negativeTransferValues)
            } else if (other.isWildcardTransferPath()) {
                return true
            }
        } else if (this.isWildcardTransferPath()) {
            if (other.isPositiveTransferPath()) {
                return false
            } else if (other.isNegativeTransferPath()) {
                return false
            } else if (other.isWildcardTransferPath()) {
                return true
            }

        }


        return false
    }
}
export class FiniteAutomatonPath {
    source : number
    destination : number
    transferChar : TransferChar
    // transferValue : string | null
    // isEmptyPath : boolean = false
    // isNegativePath : boolean = false
    // negativeTransferValues : Array<string> | null = null
    // isAnyCharPath : boolean = false
    constructor(
        source : number, 
        destination : number, 
        transferChar : TransferChar
        // transferValue : string | null = null, 
        // isEmptyPath : boolean = false, 
        // isNegativePath : boolean = false, 
        // negativeTransferValues : Array<string> = null,  
        // isAnyCharPath : boolean = false
        ) {
        this.source = source
        this.destination = destination
        this.transferChar = transferChar
        // this.transferChar = new TransferChar(transferValue, isEmptyPath, isNegativePath, negativeTransferValues, isAnyCharPath)
        // this.transferValue = transferValue
        // this.isEmptyPath = isEmptyPath
        // this.isNegativePath = isNegativePath
        // this.negativeTransferValues = negativeTransferValues
        // this.isAnyCharPath = isAnyCharPath
    }

    isEqual(other : FiniteAutomatonPath) : boolean {
        if (this.source!=other.source) return false
        if (this.destination!=other.destination) return false
        return this.transferChar.isEqual(other.transferChar)
        /*
        if (this.isEmptyPath!=other.isEmptyPath) return false
        if (this.transferValue==null && other.transferValue!=null) return false
        if (this.transferValue!=null && other.transferValue==null) return false
        if (this.transferValue!=null && other.transferValue!=null && 
            this.transferValue!=other.transferValue) return false
        if (this.isNegativePath!=other.isNegativePath) return false
        if (this.isAnyCharPath!=other.isAnyCharPath) return false
        if (this.negativeTransferValues==null && other.negativeTransferValues!=null) return false
        if (this.negativeTransferValues!=null && other.negativeTransferValues==null) return false
        if (this.negativeTransferValues!=null && other.negativeTransferValues!=null) {
            if (!isSetEqual(this.negativeTransferValues, other.negativeTransferValues)) return false
        }

        return true
        */

    }
    
}

