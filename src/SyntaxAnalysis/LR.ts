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

export class LRSyntaxAnalysis extends SyntaxAnalysis {
    states : Array<LRItemSet> = []

    constructor(tokens : Array<Token>) {
        super(tokens)
        this.argument()

        var numOfGrammerProduction : number = this.indexGrammerProductions.findIndex((gp, i)=>gp.symbol==this.indexOfStartSymbl)
        var lrItem = new LRItem(numOfGrammerProduction, 0)
        var lrItemSet = new LRItemSet([lrItem])
        var lrState2 = this.closure(lrItemSet)
        this.states = []
        this.states.push(lrState2)

        
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
                    this.states.push(destState)
                    destination = this.states.length-1
                }
                road[source] = road[source] || []
                if (road[source][destination]) {
                    throw new Error(`duplicated transfer char for ${source}-${destination}`)
                }
                road[source][destination] = symbol
                console.log(source, this.tokens[symbol].toSimpleString(), destination)
            }
            source++
        }
        
        console.log(this.states.length)
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
        this.startSymbol = newStartSymbol
        this.indexOfStartSymbl = newIndexOfStartSymbol
    }


}
