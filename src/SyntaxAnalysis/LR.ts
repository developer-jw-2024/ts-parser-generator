import { GrammarProduction, IndexGrammarProduction, SyntaxAnalysis, nextGrammarSymbol } from "../SyntaxAnalysis/SyntaxAnalysis";
import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis";
import { intersection, union } from "../Utils/SetUtils"
import { FileUtils } from "../Utils/FileUtil";

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

export class AnalysisToken {
    indexOfToken : number
    token : Token
    value : any 
    children : Array<AnalysisToken> = []

    constructor(indexOfToken : number, token : Token, value : any, children : Array<AnalysisToken>) {
        this.indexOfToken = indexOfToken
        this.token = token
        this.value = value
        this.children = children
    }

    toSimpleString() : string | null {
        if (this.value==null) return ''
        var result = ''
        for (var i=0;i<this.value.length;i++) {
            if (this.value[i]=='\n') {
                result += ''
            } else if (this.value[i]=='\t') {
                result += ''
            } else {
                result += this.value[i]
            }
        }
        return result
    }
}

export class AnalysisStep {
    stack : string
    symbols : string
    symbolTokens : Array<AnalysisToken>
    inputs : string
    action : string

    constructor(stack : string,
        symbols : string,
        symbolTokens : Array<AnalysisToken>,
        inputs : string,
        action : string) {
        this.stack = stack
        this.symbols = symbols
        this.symbolTokens = symbolTokens
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

    // inputTokens

    initWithLanguageDefinition(languageDefinition : string) : LRSyntaxAnalysis {
        var tokens = this.lexicalAnalysis.toTokens(languageDefinition)
        return this.initWithTokens(tokens)
    }

    initWithTokens(tokens: Token[]): LRSyntaxAnalysis {
        super.initWithTokens(tokens)
        this.argument()
        this.calculateFirst()
        this.calculateFollow()
        this.calculateFirstOfGrammaProductions()
        this.calculateActions()
        return this
    }

    isValidWithTokenTypeLexicalAnalysis(tokenTypeLexicalAnalysis : LexicalAnalysis, inputString : string, debug : boolean = false) : boolean {
        
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var inputTokens : Array<Token> = tokenTypeLexicalAnalysis.toTokens(inputString)
        inputTokens.push(Token.TERMINATED_TOKEN)
        var input : Array<number> = inputTokens.map(t=>this.getIndexOfToken(t))
        var stack : Array<number> = [0]
        var symbols : Array<number> = [indexOfTerminatedToken]
        var symbolTokens : Array<AnalysisToken> = [
            new AnalysisToken(indexOfTerminatedToken, Token.TERMINATED_TOKEN, null, [])
        ]

        // console.log(inputTokens.length, input.length)
        // inputTokens.forEach((it, i)=>{
        //     console.log(it.toSimpleString(), ':', input[i])
        // })
        this.analysisSteps = []

        var i : number = 0
        var flag : boolean | null = null
        
        var a : number = input[i]
        var inputToken : Token = inputTokens[i]
        var s : number = stack[stack.length-1]
    
        if (debug) console.log(inputTokens)

        while (flag==null) {
            a = input[i]
            inputToken = inputTokens[i]
            s = stack[stack.length-1]
            var action : LRAction = this.actions[s][a]    

            if (debug) console.log(`==>[ ${stack.join(' ')} ]   [ ${symbols.map(s=>this.tokens[s].toSimpleString()).join(' ')} ]   [ ${inputTokens.slice(i).join(' ')} ]   `, action)
            
            // if (debug) console.log(s, inputTokens[i], action)
            var step : AnalysisStep = this.createAnalysisStep(inputTokens, stack, symbols, symbolTokens, i, action)
            this.analysisSteps.push(step)
            // if (debug) console.log(step.toString())

            if (action.type==LRActionType.SHIFT) {
                stack.push(action.value)
                symbols.push(a)
                symbolTokens.push(new AnalysisToken(a, inputToken, inputToken.value, []))
                i++
            } else if (action.type==LRActionType.REDUCE) {
                var igp = action.value
                var gp = this.indexGrammerProductions[igp]
                var len = gp.factors.length
                // console.log(symbols.slice(symbols.length-len), symbolTokens.slice(symbols.length-len))
                var parameters = symbolTokens.slice(symbols.length-len)
                symbols = symbols.slice(0, symbols.length-len)
                symbolTokens = symbolTokens.slice(0, symbolTokens.length-len)
                stack = stack.slice(0, stack.length-len)
                var topState : number = stack[stack.length-1]
                var symbol : number = gp.symbol
                var gotoAction : LRAction = this.actions[topState][symbol]

                if (gotoAction.type==LRActionType.GOTO) {
                    stack.push(gotoAction.value)
                    symbols.push(symbol)
                    // console.log(this.grammerProductions[igp].toString())
                    var result = null
                    if (this.grammerProductionFunctions && this.grammerProductionFunctions[igp]) {
                        result = this.grammerProductionFunctions[igp](parameters)
                    }
                    symbolTokens.push(new AnalysisToken(symbol, this.tokens[symbol], result, parameters))
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

    isValid(inputString : string, debug : boolean = false) : boolean {
        return this.isValidWithTokenTypeLexicalAnalysis(this.tokenTypeLexicalAnalysis, inputString, debug)
    }

    createAnalysisStep(
        inputTokens : Array<Token>,
        stack : Array<number>, 
        symbols : Array<number>,
        symbolTokens : Array<AnalysisToken>,
        i : number, //nonProcessIndex
        action : LRAction
    ) : AnalysisStep {
        // console.log('---------')
        // console.log(inputTokens)
        var inputs : Array<string> = []
        for (var j=i;j<inputTokens.length;j++) {
            inputs.push(inputTokens[j].toSimpleString())
        }

        
        // console.log(`[ ${stack.join(' ')} ]   [ ${symbols.map(s=>this.tokens[s].toSimpleString()).join(' ')} ]   [ ${inputs.join(' ')} ]   ${this.toActionString(action)}`)
        var step = new AnalysisStep(
            stack.join(' '),
            symbols.map((s, si)=>{
                if (this.tokens[s].isEqual(Token.EMPTY_TOKEN)) return '<E>'
                if (this.tokens[s].isEqual(Token.TERMINATED_TOKEN)) return '<T>'
                return this.tokens[s].value+`:${symbolTokens[si].toSimpleString()}`
            }).join(' '),
            symbolTokens,
            inputTokens.slice(i).map(s=>{
                if (s.isEqual(Token.EMPTY_TOKEN)) return '<E>'
                if (s.isEqual(Token.TERMINATED_TOKEN)) return '<T>'
                return s.type.name+':'+s.toSimpleString()
            }).join(' '),
            this.toActionString(action)
        )
        return step
    }
    
    getValidationSteps() : string {
        function appendToFixLen(value : string, len : number) : string {
            return value + new Array(len-value.length).fill(0).map(t=>' ').join('')
        }
        
        var columnLens : Array<number> = this.analysisSteps.map(s=>{
            return [s.stack.length, s.symbols.length, s.inputs.length, s.action.length]
        }).reduce((pre, value)=>{
            return pre.map((p, i)=> Math.max(pre[i], value[i]))
        }, [0, 0, 0, 0])
        columnLens = columnLens.map((v)=>v+10)

        // console.log(this.tokens.map((t,i)=>`${i}: ${t.toSimpleString()}`))
        return this.analysisSteps.map(s=>{
                return [appendToFixLen(`[ ${s.stack} ]`, columnLens[0]),
                        appendToFixLen(`[ ${s.symbols} ]`, columnLens[1]),
                        appendToFixLen(`[ ${s.inputs} ]`, columnLens[2]),
                        `[ ${s.action} ]`].join('')
            }).join('\n')
        
    }

    getValidationSteps_NoActions() : string {
        function appendToFixLen(value : string, len : number) : string {
            return value + new Array(len-value.length).fill(0).map(t=>' ').join('')
        }
        
        var columnLens : Array<number> = this.analysisSteps.map(s=>{
            return [s.stack.length, s.symbols.length, s.inputs.length, s.action.length]
        }).reduce((pre, value)=>{
            return pre.map((p, i)=> Math.max(pre[i], value[i]))
        }, [0, 0, 0, 0])
        columnLens = columnLens.map((v)=>v+10)

        // console.log(this.tokens.map((t,i)=>`${i}: ${t.toSimpleString()}`))
        return this.analysisSteps.map(s=>{
                return [`[ ${s.symbols} ]`,
                        '     ',
                        `[ ${s.inputs} ]`].join('')
            }).join('\n')
        
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
                        if (this.tokens[symbol].type.isTerminal) {
                            this.actions[source] = this.actions[source] || []
                            this.actions[source][symbol] = new LRAction(LRActionType.ACCEPT, destination)
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
                                    if (this.actions[destination][follows[k]]) {
                                        console.log(this.actions[destination][follows[k]])
                                        console.log(this.showLRItemSet(this.states[destination]))
                                        throw new Error(`duplicated action for ${destination}-${follows[k]}(${this.tokens[follows[k]]})`)
                                    } 
                                    this.actions[destination][follows[k]] = new LRAction(LRActionType.REDUCE, item.numOfGrammerProduction)
                                }
                            }
                        }
    
                    }
                }
                if (destination!=-1) {
                    road[source] = road[source] || []
                    if (road[source][destination]) {
                        throw new Error(`duplicated transfer char for ${source}-${destination}`)
                    }
                    road[source][destination] = symbol
                    this.actions[source] = this.actions[source] || []
                    if (this.tokens[symbol].type.isTerminal) {
                        this.actions[source][symbol] = new LRAction(LRActionType.SHIFT, destination)
                    } else {
                        this.actions[source][symbol] = new LRAction(LRActionType.GOTO, destination)
                    }

            
                }
            }
            source++
        }
        // console.log(road.length)
        var stateListContent = this.states.map((state, no)=>{
            return `State${no}[[`+this.showLRItemSet(state).join('\n').replace('<TERMINATED>', '_TERMINATED_')+']]'
        }).join('\n')

        var routes : Array<string> = []
        for (var i=0;i<road.length;i++) {
            for (var j=0;road[i] && j<road[i].length;j++) {
                if (road[i][j]) {
                    routes.push(`State${i}-->|${this.tokens[road[i][j]].toSimpleString()}|State${j}`)
                }
            }
        }
        stateListContent += '\n'+routes.join('\n')
        stateListContent = 
        `<html>
        <body>
        <pre class="mermaid">
        ${stateListContent}
        </pre>
        <script type="module">
      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: true });
    </script>
  </body>
</html>`
        FileUtils.writeToFileSystem("./Mermaid.html", stateListContent)
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
