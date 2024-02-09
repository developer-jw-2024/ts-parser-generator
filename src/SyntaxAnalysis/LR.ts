import { GrammarProduction, IndexGrammarProduction, SyntaxAnalysis, nextGrammarSymbol } from "../SyntaxAnalysis/SyntaxAnalysis";
import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis";
import { intersection, union } from "../Utils/SetUtils"

export class LRItem {
    numOfGrammerProduction : number = -1
    dotPos : number = -1

    constructor(numOfgp : number, dotPos : number) {
        this.numOfGrammerProduction = numOfgp
        this.dotPos = dotPos
    }

    isEqual(other : LRItem) : boolean {
        return this.numOfGrammerProduction == other.numOfGrammerProduction &&
        this.dotPos == other.dotPos
    }
}

export class LRItemSet {
    items : Array<LRItem> = []

    constructor(items : Array<LRItem> = []) {
        this.items = items
    }

    pushItem(item : LRItem) : boolean {
        if (!this.has(item)) {
            this.items.push(item)
            return true
        }
        return false
    }

    isEqual(other : LRItemSet) {
        return this.isSubSetof(other) && other.isSubSetof(this)
    }

    has(item : LRItem) : boolean {
        return this.items.findIndex(i=>i.isEqual(item))>=0
    }

    isSubSetof(other : LRItemSet) : boolean {
        var result : boolean = true
        for (var i=0;result && i<this.items.length;i++) {
            result = other.has(this.items[i])
        }
        return result
    }
}

export enum LRActionType {
    SHIFT,
    REDUCE,
    ACCEPT,
    GOTO,
    ERROR
}

export class LRAction {
    type : LRActionType
    value : number

    constructor(type : LRActionType, value : number) {
        this.type = type
        this.value = value
    }
}

class AnalysisStep {
    stack : string
    symbols : string
    inputs : string
    action : string

    constructor(stack : string,
        symbols : string,
        inputs : string,
        action : string) {
        this.stack = stack
        this.symbols = symbols
        this.inputs = inputs
        this.action = action
    }

    toString() : string {
        return `[ ${this.stack} ]     [ ${this.symbols} ]     [ ${this.inputs} ]     ${this.action}`
    }
}

export class LRSyntaxAnalysis extends SyntaxAnalysis {
    states : Array<LRItemSet> = []
    acceptIndexGrammarProduction : IndexGrammarProduction | null = null
    acceptState : LRItemSet | null = null
    actions : Array<Array<LRAction>> = []
    analysisSteps : Array<AnalysisStep> = []
    initWithTokens(tokens: Token[]): LRSyntaxAnalysis {
        super.initWithTokens(tokens)
        this.argument()
        this.calculateFirst()
        this.calculateFollow()
        this.calculateFirstOfGrammaProductions()
        this.calculateActions()
        return this
    }

    isValid(lexicalAnalysis : LexicalAnalysis, inputString : string) {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var inputTokens : Array<Token> = lexicalAnalysis.toTokens(inputString)
        inputTokens.push(Token.TERMINATED_TOKEN)
        var input : Array<number> = inputTokens.map(t=>this.getIndexOfToken(t))
        var stack : Array<number> = [0]
        var symbols : Array<number> = [indexOfTerminatedToken]

        this.analysisSteps = []

        var i : number = 0
        var flag : boolean | null = null
        
        var a : number = input[i]
        var s : number = stack[stack.length-1]
    
        while (flag==null) {
            a = input[i]
            s = stack[stack.length-1]
            var action : LRAction = this.actions[s][a]    

            var inputs : Array<string> = []
            for (var j=i;j<inputTokens.length;j++) {
                inputs.push(inputTokens[j].toSimpleString())
            }

            // console.log(`[ ${stack.join(' ')} ]   [ ${symbols.map(s=>this.tokens[s].toSimpleString()).join(' ')} ]   [ ${inputs.join(' ')} ]   ${this.toActionString(action)}`)
            var step = new AnalysisStep(
                stack.join(' '),
                symbols.map(s=>{
                    if (this.tokens[s].isEqual(Token.EMPTY_TOKEN)) return '<E>'
                    if (this.tokens[s].isEqual(Token.TERMINATED_TOKEN)) return '<T>'
                    return this.tokens[s].toSimpleString()
                }).join(' '),
                inputTokens.slice(i).map(s=>{
                    if (s.isEqual(Token.EMPTY_TOKEN)) return '<E>'
                    if (s.isEqual(Token.TERMINATED_TOKEN)) return '<T>'
                    return s.toSimpleString()
                }).join(' '),
                this.toActionString(action)
            )
            this.analysisSteps.push(step)

            if (action.type==LRActionType.SHIFT) {
                stack.push(action.value)
                symbols.push(a)
                i++
            } else if (action.type==LRActionType.REDUCE) {
                var igp = action.value
                var gp = this.indexGrammerProductions[igp]
                var len = gp.factors.length
                symbols = symbols.slice(0, symbols.length-len)
                stack = stack.slice(0, stack.length-len)
                var t : number = stack[stack.length-1]
                var symbol : number = gp.symbol
                var gotoAction : LRAction = this.actions[t][symbol]
                if (gotoAction.type==LRActionType.GOTO) {
                    stack.push(gotoAction.value)
                    symbols.push(symbol)
                } else {
                    throw new Error('Parse Error')
                }
                // break
            } else if (action.type==LRActionType.ACCEPT) {
                flag = true
            } else {
                throw new Error(this.toActionString(action))
                // console.log('error', action)
            }
        }
        return flag
    }

    toActionString(action : LRAction) : string {
        if (action.type==LRActionType.SHIFT) {
            return `Shift ${action.value}`
        }
        if (action.type==LRActionType.REDUCE) {
            return `Reduce ${this.grammerProductions[action.value].toSimpleString()}`
        }
        if (action.type==LRActionType.ACCEPT) {
            return `Accept`
        }
        return 'ERROR'
    }

    calculateActions() {
        var numOfGrammerProduction : number = this.indexGrammerProductions.findIndex((gp, i)=>gp.symbol==this.indexOfStartSymbl)
        var lrItem = new LRItem(numOfGrammerProduction, 0)
        var lrItemSet = new LRItemSet([lrItem])
        var lrState2 = this.closure(lrItemSet)
        this.states = []
        this.states.push(lrState2)

        this.actions = []
       
        
        var road : Array<Array<number>> = []
        var source : number = 0
        while (source<this.states.length) {
            var sourceState = this.states[source]
            var symbols = this.getSymbolsAfterDot(sourceState)
            for (var i=0;i<symbols.length;i++) {
                var symbol : number = symbols[i]
                var destState = this.goto(sourceState, symbol)
                var destination : number = this.states.findIndex(s=>s.isEqual(destState))
                if (destination==-1) {
                    if (this.acceptState.isEqual(destState)) {
                        road[source] = road[source] || []
                        if (road[source][destination]) {
                            throw new Error(`duplicated transfer char for ${source}-${destination}`)
                        }
                        road[source][destination] = symbol
                        // console.log(source, this.tokens[symbol].toSimpleString(), destination)
                        if (this.tokens[symbol].type.isTerminal) {
                            this.actions[source] = this.actions[source] || []
                            this.actions[source][symbol] = new LRAction(LRActionType.ACCEPT, destination)
                            // console.log(source, this.tokens[symbol].toSimpleString(), 'ACCEPT', destination)
                        }    
                    } else {
                        this.states.push(destState)
                        destination = this.states.length-1    

                        for (var j=0;j<destState.items.length;j++) {
                            var item = destState.items[j]
                            var igp = this.indexGrammerProductions[item.numOfGrammerProduction]
                            if (igp.factors.length==item.dotPos) {
                                var follows = this.follow[igp.symbol]
                                for (var k=0;k<follows.length;k++) {
                                    this.actions[destination] = this.actions[destination] || []
                                    this.actions[destination][follows[k]] = new LRAction(LRActionType.REDUCE, item.numOfGrammerProduction)
                                    // console.log(destination, this.tokens[follows[k]].toSimpleString(), 'REDUCE', item.numOfGrammerProduction+1, this.grammerProductions[item.numOfGrammerProduction].toSimpleString())
                                }
                            }
                        }
    
                    }
                    // console.log(this.showLRItemSet(destState), this.acceptState.isEqual(destState))
                }
                if (destination!=-1) {
                    road[source] = road[source] || []
                    if (road[source][destination]) {
                        throw new Error(`duplicated transfer char for ${source}-${destination}`)
                    }
                    road[source][destination] = symbol
                    this.actions[source] = this.actions[source] || []
                    // console.log(source, this.tokens[symbol].toSimpleString(), destination)
                    if (this.tokens[symbol].type.isTerminal) {
                        this.actions[source][symbol] = new LRAction(LRActionType.SHIFT, destination)
                        // console.log(source, this.tokens[symbol].toSimpleString(), 'Shift', destination)
                    } else {
                        this.actions[source][symbol] = new LRAction(LRActionType.GOTO, destination)
                        // console.log(source, this.tokens[symbol].toSimpleString(), 'GOTO', destination)
                    }

            
                }
            }
            source++
        }
    }

    showLRItemSet(lrItemSet : LRItemSet) {
        return lrItemSet.items.map(item=>this.grammerProductions[item.numOfGrammerProduction].toSimpleStringWithDot(item.dotPos))
    }

    showLRItem(lrItem : LRItem) : string {
        var gp : GrammarProduction = this.grammerProductions[lrItem.numOfGrammerProduction]
        return gp.toSimpleStringWithDot(lrItem.dotPos)
    }

    goto(lrItemSet : LRItemSet, transferSymbol : number ) : LRItemSet {
        var newLRItemSet : LRItemSet = new LRItemSet([])
        for (var i = 0;i<lrItemSet.items.length;i++) {
            var item = lrItemSet.items[i]

            if (this.getSymbolAfterDot(item)==transferSymbol) {
                newLRItemSet.pushItem(new LRItem(item.numOfGrammerProduction, item.dotPos+1))
            }
        }

        return this.closure(newLRItemSet)
    }

    closure(lrItemSet : LRItemSet) : LRItemSet {
        var i = 0
        while (i<lrItemSet.items.length) {
            var symbol = this.getSymbolAfterDot(lrItemSet.items[i])
            if (symbol!=-1) {
                for (var j=0;j<this.indexGrammerProductions.length;j++) {
                    if (this.indexGrammerProductions[j].symbol==symbol) {
                        lrItemSet.pushItem(new LRItem(j, 0))
                    }
                }
            }
            i++
        }
        return lrItemSet
    }


    getSymbolAfterDot(item : LRItem) : number {
        var factors = this.indexGrammerProductions[item.numOfGrammerProduction].factors
        return item.dotPos>=factors.length?-1:factors[item.dotPos]
    }

    getSymbolsAfterDot(lrItemSet : LRItemSet) : Array<number> {
        var result : Array<number> = []
        for (var i=0;i<lrItemSet.items.length;i++) {
            var item : LRItem = lrItemSet.items[i]
            var symbol = this.getSymbolAfterDot(item)
            if (symbol>=0 && result.indexOf(symbol)==-1) {
                result.push(symbol)
            }
        }
        return result
    }

    argument() {
        var tokenName : string = this.startSymbol.value
        var arugmentedTokenName = nextGrammarSymbol(tokenName, this.tokens)    
        var newIndexOfStartSymbol = this.tokens.length
        var newStartSymbol = new Token(this.startSymbol.type, arugmentedTokenName)
        this.tokens.push(newStartSymbol)
        this.grammerProductions.push(new GrammarProduction(newStartSymbol, [this.startSymbol, Token.TERMINATED_TOKEN]))
        this.indexGrammerProductions.push(new IndexGrammarProduction(newIndexOfStartSymbol, [this.indexOfStartSymbl, this.getIndexOfToken(Token.TERMINATED_TOKEN)]))
        this.indexGrammerProductionFlags.push(true)
        this.acceptIndexGrammarProduction = new IndexGrammarProduction(newIndexOfStartSymbol, [this.indexOfStartSymbl])
        this.acceptState = new LRItemSet([new LRItem(this.indexGrammerProductions.length-1, 2)])
        this.startSymbol = newStartSymbol
        this.indexOfStartSymbl = newIndexOfStartSymbol
    }


}
