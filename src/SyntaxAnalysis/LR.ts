import { AnalysisStep, AnalysisToken, GrammarProduction, IndexGrammarProduction, LanguageFunctionsEntity, SyntaxAnalyzer, nextGrammarSymbol } from "../SyntaxAnalysis/SyntaxAnalysis";
import { LexicalAnalyzer, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis";
import { intersection, union } from "../Utils/SetUtils"
//import { FileUtils } from "../Utils/FileUtil";
import { isNulllOrUndefinedValue } from "../Utils/Utils";

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

    init(type : LRActionType, value : number) {
        this.type = type
        this.value = value
        return this
    }

    static initFromJSON(jsonObject : Object) : LRAction {
        var object : LRAction = new LRAction()
        object.init(
            jsonObject['type'],
            jsonObject['value']
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            type : this.type,
            value : this.value,
        }
        return jsonObject
    }

    toString() : string {
        if (this.type==LRActionType.SHIFT) {
            return (`Shift ${this.value}`)
        } else if (this.type==LRActionType.REDUCE) {
            return (`Reduce ${this.value}`)
        } else if (this.type==LRActionType.ACCEPT) {
            return (`Accept ${this.value}`)
        } else if (this.type==LRActionType.ERROR) {
            return (`Error ${this.value}`)
        } else if (this.type==LRActionType.GOTO) {
            return (`Goto ${this.value}`)
        }
        return 'Error'

    }

}

export class LRSyntaxAnalyzer extends SyntaxAnalyzer {
    actions : Array<Array<LRAction>> = [] //json
    
    states : Array<LRItemSet> = [] 
    acceptState : LRItemSet | null = null
    acceptIndexGrammarProduction : IndexGrammarProduction | null = null
    analysisSteps : Array<AnalysisStep> = []

    initActions(actions : Array<Array<LRAction>>) {
        this.actions = actions
        return this
    }

    initWithLanguageDefinition(languageDefinition : string) : LRSyntaxAnalyzer {
        var tokens = SyntaxAnalyzer.LanguageDefinitionLexicalAnalyzer.tokenize(languageDefinition)
        return this.initWithTokens(tokens)
    }

    initWithTokens(tokens: Token[]): LRSyntaxAnalyzer {
        if (tokens.length>0) {
            super.initWithTokens(tokens, true)
            this.argument()
            this.calculateFirst()
            this.calculateFollow()
            this.calculateFirstOfGrammaProductions()
            this.calculateActions()    
        }
        return this
    }

    static initFromJSON(jsonObject : Object) : LRSyntaxAnalyzer {
        var object : LRSyntaxAnalyzer = new LRSyntaxAnalyzer()

        var startSymbol : Token = Token.initFromJSON(jsonObject['startSymbol'])
        var indexOfStartSymbl : number = jsonObject['indexOfStartSymbl']
        var tokens : Array<Token> = jsonObject['tokens'].map(tokenJson=>{
            return Token.initFromJSON(tokenJson)
        })
        var actions : Array<Array<LRAction>> = []
        var actionsJson = jsonObject['actions']
        for (var i=0;i<actionsJson.length;i++) {
            actions[i] = actions[i] || []
            var iactionList = actionsJson[i]
            if (!isNulllOrUndefinedValue(iactionList)) {
                for (var j=0;j<iactionList.length;j++) {
                    var actionJson = iactionList[j]
                    actions[i][j] = null
                    if (!isNulllOrUndefinedValue(actionJson)) {
                        actions[i][j] = LRAction.initFromJSON(actionJson)
                    }
                }
            }
        }
        var tokenTypeLexicalAnalyzer : LexicalAnalyzer =  LexicalAnalyzer.initFromJSON(jsonObject['tokenTypeLexicalAnalyzer'])
        var grammerProductions : Array<GrammarProduction> =  jsonObject['grammerProductions'].map(gpJson=>{
            return GrammarProduction.initFromJSON(gpJson)
        })
        var indexGrammerProductions : Array<IndexGrammarProduction> = jsonObject['indexGrammerProductions'].map(igpJson=>{
            return IndexGrammarProduction.initFromJSON(igpJson)
        })
        object.init(
            startSymbol,
            indexOfStartSymbl,
            tokens,
            tokenTypeLexicalAnalyzer,
            grammerProductions,
            indexGrammerProductions
        )
        object.initActions(actions)
        return object
    }

    convertToJSON() : Object {
        var jsonObject = super.convertToJSON()
        var actionsJson = []
        for (var i=0;i<this.actions.length;i++) {
            actionsJson[i] = actionsJson[i] || []
            var iactionList = this.actions[i]
            if (!isNulllOrUndefinedValue(iactionList)) {
                for (var j=0;j<iactionList.length;j++) {
                    var action = iactionList[j]
                    actionsJson[i][j] = null
                    if (!isNulllOrUndefinedValue(action)) {
                        actionsJson[i][j] = action.convertToJSON()
                    }
                }
            }
        }
        jsonObject['actions'] = actionsJson
        return jsonObject
    }

    toTokens(inputString : string) : Array<Token> {
        return this.toTokensWithTokenTypeLexicalAnalyzer(inputString)
    }

    toTokensWithTokenTypeLexicalAnalyzer(inputString : string) : Array<Token> {
        // var inputTokens : Array<Token> = tokenTypeLexicalAnalyzer.tokenize(inputString)
        var inputTokens : Array<Token> = this.tokenTypeLexicalAnalyzer.tokenize(inputString)
        inputTokens.push(Token.TERMINATED_TOKEN)
        inputTokens = inputTokens.map(it=>{
            if (it.type.isEqual(TokenType.UNKNOWN_TOKENTYPE)) {
                return new Token().init(TokenType.ERROR_TOKENTYPE, it.value)
            }
            return it
        })
        return inputTokens
    }

    private convertAnalysisTokenListToString(symbolTokens : Array<AnalysisToken>) {
        var symbolTokenString = symbolTokens.map(t=>{
            var typename = (t.token.type.name=='GrammarSymbol')?(t.token.value):(t.token.type.name)
            var value = ''
            if (t.value) {
                if (t.value.replace) {
                    value = t.value.replace(new RegExp('\n', 'g'), '\\n').replace(new RegExp('\t', 'g'), '\\t')
                } else {
                    value = t.value
                }
            }
            return `<${typename}, ${value}>(${t.indexOfToken})`
        }).join(' ')
        return symbolTokenString
    }

    isValidWithTokenTypeLexicalAnalyzer(inputString : string, debug : boolean = false) : boolean {
        
        var clazz  = this.languageFunctionsEntityClass
        var languageFunctionsEntityObject : LanguageFunctionsEntity | null
        if (clazz) {
            languageFunctionsEntityObject = new clazz()
        }
        

        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfErrorToken = this.getIndexOfToken(Token.ERROR_TOKEN)
        var indexOfUnknownToken = this.getIndexOfToken(Token.UNKNOWN_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var inputTokens : Array<Token> = this.toTokensWithTokenTypeLexicalAnalyzer(inputString)
        var input : Array<number> = inputTokens.map(t=>this.getIndexOfToken(t))
        var stack : Array<number> = [0]
        var symbols : Array<number> = [indexOfTerminatedToken]
        var symbolTokens : Array<AnalysisToken> = [
            new AnalysisToken(indexOfTerminatedToken, Token.TERMINATED_TOKEN, null, [])
        ]

        // console.log('indexOfUnknownToken:', indexOfUnknownToken)
        // console.log(this.tokens)
        // console.log(this.grammerProductions.length, this.indexGrammerProductions.length)
        if (debug) {
            this.showFollow()
            console.log(this.grammerProductions.map(gp=>gp.toString()).join('\n'))
            console.log(this.indexGrammerProductions.map(igp=>igp.toString()).join('\n'))    
        }
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
    
        if (debug) {
            console.log(inputTokens.map(t=>t.toString()).join(' '))
            console.log(input)
        }

        while (flag==null) {
            a = input[i]
            inputToken = inputTokens[i]
            s = stack[stack.length-1]
            var action : LRAction = this.actions[s][a]   

            if (debug) {
                var symbolTokenString = this.convertAnalysisTokenListToString(symbolTokens)
                var inputTokenLeft = []
                for (var l=i;l<inputTokens.length;l++) {
                    inputTokenLeft.push(inputTokens[l].toString()+`(${this.getIndexOfToken(inputTokens[l])})`)
                }
                // console.log(inputTokens)
                console.log(`0 ==>[ ${stack.join(' ')} ]   [ ${symbolTokenString} ]   [ ${inputTokenLeft.join(' ')} ]   `, action?action.toString():action, '\n')
            }

            
            // if (debug) console.log(s, inputTokens[i], action)
            // if (debug) console.log(step.toString())

            var isMergeErrorhandled : boolean = false
            if (action==null || action==undefined) {
                if (symbolTokens.at(-1).token.type.isEqual(TokenType.ERROR_TOKENTYPE)) { 
                    
                    symbolTokens.at(-1).value += inputToken.value
                    i++
                    isMergeErrorhandled = true
                } else {
                    var errorToken : Token = new Token().init(TokenType.ERROR_TOKENTYPE, '')
                    a = indexOfErrorToken
                    
                    action  = this.actions[s][a]
                    while (isNulllOrUndefinedValue(action)) {
                        if (debug) console.log('there is no action for ', s, a)
                        symbols.pop()
                        var lastSymbolToken : AnalysisToken = symbolTokens.pop()
                        var lastStack = stack.pop()
                        s = stack[stack.length-1]
                        // console.log('===>', lastSymbolToken, "|", typeof(errorToken.value), "]")
                        var lastSymbolTokenValue : string = lastSymbolToken.getRawData()
                        errorToken.value = lastSymbolTokenValue + errorToken.value
                        action  = this.actions[s][a]
                        if (debug) {
                            console.log('pop for error', lastSymbolToken.token.toString(), lastStack)
                            console.log('current action', s, a, action, (isNulllOrUndefinedValue(action)?"":action.toString()))
                            if (action) {
                                console.log(this.showLRItemSet(this.states[4]))
                            }    
                        }
                    }
                    inputToken = errorToken
                    
                }
                //throw new Error(`There is no action for state [${s}] with token ${inputToken}(${a})`)
            } 

            if (isNulllOrUndefinedValue(action)) {
                if (!isMergeErrorhandled) {
                    throw new Error(`There is no action for state [${s}] with token ${inputToken}(${a})`)
                }
            } else {
                // console.log('AnalysisStep:', inputTokens[i])
                var step : AnalysisStep = this.createAnalysisStep(inputTokens, stack, symbols, symbolTokens, i, action)
                this.analysisSteps.push(step)
                if (action.type==LRActionType.SHIFT) {
                    if (inputToken.type.isEqual(TokenType.TERMINATED_TOKENTYPE)) {
                        console.log('error terminated:', s, a, action)
                        throw new Error('error terminated')
                    } else {
                        // console.log(inputToken==inputTokens[i])
                        stack.push(action.value)
                        symbols.push(a)
                        symbolTokens.push(new AnalysisToken(a, inputToken, inputToken.value, []))
                        if (inputToken==inputTokens[i]) i++    
                    }
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
                        var result = null
                        var func : Function | null = null
                        if (!isNulllOrUndefinedValue(languageFunctionsEntityObject) && 
                            !isNulllOrUndefinedValue(this.grammerProductionFunctionNames) && 
                            !isNulllOrUndefinedValue(this.grammerProductionFunctionNames[igp])) {
                            var gpStr : string | null = this.grammerProductionFunctionNames[igp]
                            if (!isNulllOrUndefinedValue(gpStr)) {
                                func = languageFunctionsEntityObject[gpStr]
                            }
    
                        }
                        if (isNulllOrUndefinedValue(func)) {
                            // result = parameters.map(p=>p.value).join('')
                        } else {
                            result = func(parameters)
                            var originalContent = parameters.map(x=>{
                                var value = x.value
                                if (x.value.getOriginalContent) {
                                    value = x.value.getOriginalContent()
                                }
                                return value
                            }).join('')
                            if (result.setOriginalContent) {
                                result.setOriginalContent(originalContent)
                            }
                        }
                        if (debug) {
                            console.log(this.grammerProductions[igp].toSimpleString(), '===>', '\n')
                            // console.log(this.grammerProductions[igp].toSimpleString(), '===>', result, '\n')
                        }
                        symbolTokens.push(new AnalysisToken(symbol, this.tokens[symbol], result, parameters))
                    } else {
                        throw new Error('Parse Error')
                    }
                    // break
                } else if (action.type==LRActionType.GOTO) {
                    stack.push(action.value)
                    symbols.push(a)
                    symbolTokens.push(new AnalysisToken(a, inputToken, inputToken.value, []))
                } else if (action.type==LRActionType.ACCEPT) {
                    flag = true
                } else {
                    throw new Error(this.toActionString(action))
                    // console.log('error', action)
                }
            }
        }
        return flag
    }

    isValid(inputString : string, debug : boolean = false) : boolean {
        return this.isValidWithTokenTypeLexicalAnalyzer(inputString, debug)
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
            symbolTokens.map(st=>st.copy()),
            i,
            inputTokens,
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
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfErrorToken = this.getIndexOfToken(Token.ERROR_TOKEN)
        var indexOfUnknownToken = this.getIndexOfToken(Token.UNKNOWN_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var numOfGrammerProduction : number = this.indexGrammerProductions.findIndex((gp, i)=>gp.symbol==this.indexOfStartSymbl)
        var lrItem = new LRItem(numOfGrammerProduction, 0)
        var lrItemSet = new LRItemSet([lrItem])
        var lrState2 = this.closure(lrItemSet)
        this.states = []
        this.states.push(lrState2)

        this.actions = []
        
        var errors = []
        
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
                            this.actions[source][symbol] = new LRAction().init(LRActionType.ACCEPT, destination)
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
                                        errors.push({
                                            state : destination,
                                            follow : follows[k],
                                            followToken : this.tokens[follows[k]],
                                            action : this.actions[destination][follows[k]],
                                            lrItemSet : this.showLRItemSet(this.states[destination]),
                                            errorMessage : `duplicated action for ${destination}-${follows[k]}(${this.tokens[follows[k]]})`
                                        })
                                        // console.log(this.actions[destination][follows[k]])
                                        // console.log(this.showLRItemSet(this.states[destination]))
                                        // throw new Error(`duplicated action for ${destination}-${follows[k]}(${this.tokens[follows[k]]})`)
                                    } 
                                    this.actions[destination][follows[k]] = new LRAction().init(LRActionType.REDUCE, item.numOfGrammerProduction)
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
                        this.actions[source][symbol] = new LRAction().init(LRActionType.SHIFT, destination)
                        if (symbol==indexOfTerminatedToken) {
                            errors.push({
                                state : source,
                                follow : symbol,
                                followToken : this.tokens[symbol],
                                action : this.actions[source][symbol],
                                lrItemSet : this.showLRItemSet(this.states[source]),
                                errorMessage : `There should not be have shift for ${destination}-${symbol}(${this.tokens[symbol]})`
                            })
                        }
                    } else {
                        this.actions[source][symbol] = new LRAction().init(LRActionType.GOTO, destination)
                    }

            
                }
            }
            source++
        }
        
        this.saveAsMermaidHtml(road)

        if (errors) {
            for (var i=0;i<errors.length;i++) {
                console.log(errors[i].action)
                console.log(errors[i].lrItemSet)
                console.error(`duplicated action for ${errors[i].state}-${errors[i].follow}(${errors[i].followToken})`)
                if (i==errors.length-1) throw new Error(`duplicated action for ${errors[i].state}-${errors[i].follow}(${errors[i].followToken})`)

            }
        }
    }

    saveAsMermaidHtml(road : Array<Array<number>>) {
        // console.log(road.length)
        var stateListContent = this.states.map((state, no)=>{
            return `State${no}[[State${no}`+'\n'+this.showLRItemSet(state).join('\n').replace('<TERMINATED>', '_TERMINATED_')+']]'
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
        graph TB
        ${stateListContent.replace(new RegExp('<ERROR>', 'g'), '\\ERROR/')}
        </pre>
        <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        mermaid.initialize({ startOnLoad: true });
        </script>
        </body>
        </html>`
        //FileUtils.writeToFileSystem("./Mermaid.html", stateListContent)
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
        var newStartSymbol = new Token().init(this.startSymbol.type, arugmentedTokenName)
        this.tokens.push(newStartSymbol)
        this.grammerProductions.push(new GrammarProduction().initWithTokens(newStartSymbol, [this.startSymbol, Token.TERMINATED_TOKEN]))
        this.indexGrammerProductions.push(new IndexGrammarProduction().init(newIndexOfStartSymbol, [this.indexOfStartSymbl, this.getIndexOfToken(Token.TERMINATED_TOKEN)]))
        this.indexGrammerProductionFlags.push(true)
        this.acceptIndexGrammarProduction = new IndexGrammarProduction().init(newIndexOfStartSymbol, [this.indexOfStartSymbl])
        this.acceptState = new LRItemSet([new LRItem(this.indexGrammerProductions.length-1, 2)])
        this.startSymbol = newStartSymbol
        this.indexOfStartSymbl = newIndexOfStartSymbol
    }


}

export class LRSyntaxAnalyzerRunner {

    lrSyntaxAnalyzer : LRSyntaxAnalyzer
    preProcessingFunc : ((string) => string)|null = null

    init(
        languageDefinition : string, 
        tokenTypeDefinition : string, 
        languageFunctionsEntityClass : typeof LanguageFunctionsEntity) {
            
        //var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
        //var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)
        
        this.lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithLanguageDefinition(languageDefinition)
        this.lrSyntaxAnalyzer.setLanguageFunctionsEntityClass(languageFunctionsEntityClass)
        this.lrSyntaxAnalyzer.setTokenTypeDefinition(tokenTypeDefinition)                
        return this
    }

    initWithLRSyntaxAnalyzer(lrSyntaxAnalyzer : LRSyntaxAnalyzer) {
        this.lrSyntaxAnalyzer = lrSyntaxAnalyzer
        return this
    }
    setLanguageFunctionsEntityClass(languageFunctionsEntityClass : typeof LanguageFunctionsEntity) {
        this.lrSyntaxAnalyzer.setLanguageFunctionsEntityClass(languageFunctionsEntityClass)
    }

    static initFromJSON(jsonObject : Object) : LRSyntaxAnalyzerRunner {
        var object : LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner()
        var lrSyntaxAnalyzer : LRSyntaxAnalyzer = LRSyntaxAnalyzer.initFromJSON(jsonObject['lrSyntaxAnalyzer'])

        object.initWithLRSyntaxAnalyzer(
            lrSyntaxAnalyzer
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            lrSyntaxAnalyzer : this.lrSyntaxAnalyzer.convertToJSON()
        }
        return jsonObject
    }

    getResult() : any {
        var lastSymbolToken : AnalysisToken = this.lrSyntaxAnalyzer.analysisSteps.at(-1).symbolTokens.at(-1)
        return lastSymbolToken.value
    }

    setPreprocessing(preProcessingFunc : (string) => string) {
        this.preProcessingFunc = preProcessingFunc
    }

    isValid(markdownContent : string, debug : boolean = false) : boolean {
        var preProcessingContent : string = markdownContent
        if (!isNulllOrUndefinedValue(this.preProcessingFunc)) {
            preProcessingContent = this.preProcessingFunc(markdownContent)
        }
        var flag = this.lrSyntaxAnalyzer.isValid(preProcessingContent, debug)
        return flag
    }

    getLastValidationStep() : AnalysisStep {
        return this.lrSyntaxAnalyzer.analysisSteps[this.lrSyntaxAnalyzer.analysisSteps.length-1]
    }

    getValidationSteps() : string {
        return this.lrSyntaxAnalyzer.getValidationSteps()
    }

    getValidationSteps_NoActions() : string {
        return this.lrSyntaxAnalyzer.getValidationSteps_NoActions()
    }
}