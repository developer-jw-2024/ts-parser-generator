import { LexicalAnalyzer, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis"
import { initCharBlocks, toRegularExpressionChars } from "../LexicalAnalyzer/RegularExpression"
import { isListEqual } from "../Utils/ArrayListUtils"
import { isSetEqual } from "../Utils/SetUtils"

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

    getRawData() : string {
        if (this.token.type.isTerminal) {
            return this.token.value
        } else {
            return this.children.map(child=>{
                return child.getRawData()
            }).join('')
        }
    }

    copy() {
        return new AnalysisToken(this.indexOfToken, this.token, this.value, this.children)
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
    i : number //nonProcessIndex
    inputTokens : Array<Token>
    inputs : string
    action : string

    constructor(stack : string,
        symbols : string,
        symbolTokens : Array<AnalysisToken>,
        i : number, //nonProcessIndex
        inputTokens : Array<Token>,
        inputs : string,
        action : string) {
        this.stack = stack
        this.symbols = symbols
        this.symbolTokens = symbolTokens
        this.i = i
        this.inputTokens = inputTokens
        this.inputs = inputs
        this.action = action
    }

    toString() : string {
        return `[ ${this.stack} ]     [ ${this.symbols} ]     [ ${this.inputs} ]     ${this.action}`
    }
}

export class SymbolEntity {
    children : Array<any>
    originalContent : string

    constructor() {
        this.children = []
        this.originalContent = 'not set'
    }

    setOriginalContent(originalContent : string) {
        this.originalContent = originalContent
    }

    getOriginalContent() {
        return this.originalContent
    }

    addChild(child : any) {
        this.children.push(child)
    }

    toHierarchy(intent : string = '') {
        var subIntent = `${intent}     `
        var resultArray =  this.children.map(segment=>{
            if (segment.toHierarchy) {
                return segment.toHierarchy(subIntent)
            } else {
                return [`${subIntent}${segment}`]
            }
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    getRawValue() : string {
        var result =  this.children.map(segment=>{
            if (segment instanceof SymbolEntity) {
                return segment.getRawValue()
            } else {
                return segment
            }
        }).join('')
        return result
    }

    getClass() : any {
        return (this as object).constructor
    }
    
}
export class ValueSymbolEntity extends SymbolEntity {
    value : any

    constructor(value : any) {
        super()
        this.value = value
    }

    getValue() {
        return this.value
    }
}
export class ErrorEntity extends ValueSymbolEntity {}

export function GrammarProductionFunction(gpstring: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var clazz = target.constructor
        if (clazz.grammarProductionStringList==null || clazz.grammarProductionStringList==undefined) {
            clazz.grammarProductionStringList = new Array<string>
        }

        var gps = gpstring.split('\n').map(s=>s.trim()).filter(s=>s.length>0)
        const originalMethod = descriptor.value;
        gps.forEach(gp=>{
            if (clazz.prototype[gp]) {
                throw new Error(`${gp} is already have function`)
            }
            clazz.prototype[gp] = originalMethod
            clazz.grammarProductionStringList.push(gp)    
        })
    };
}

export class LanguageFunctionsEntity {
    runFunction(gps : string, args : Array<AnalysisToken> = []) : any {
        if (this[gps]) {
            return this[gps](args)
        } else {
            throw new Error(`There is no this function for grammar production [${gps}]`)
        }
    }
   
    static getGrammarProductionStringList() : Array<string> | null {
        var result : Array<string> = this['grammarProductionStringList']
        return (result==null || result==undefined)?[]:result
    }
}

export function nextGrammarSymbolByName(tokenName: string) : string {
    
    var i = tokenName.length-1
    while (tokenName[i]>='0' && tokenName[i]<='9' && i>=0) {
        i--
    }

    var num : string = tokenName.substring(i+1, tokenName.length)
    num = num.trim()
    if (num.length==0) num ="0"
    var n = parseInt(num)+1
    return tokenName.substring(0, i+1)+n
}

export function nextGrammarSymbol(tokenName: string, tokens : Array<Token>) : string {
    
    var newTokenName : string = nextGrammarSymbolByName(tokenName)  
    while (isValueInTokens(newTokenName, tokens)) {
        newTokenName = nextGrammarSymbolByName(newTokenName)
    }
    return newTokenName
}

export function isValueInTokens(value : string, tokens : Array<Token>) : boolean {
    return tokens.filter(t=>t.value==value).length>0
}

export class GrammarProduction {
    symbol : Token
    factors : Array<Token> = []

    initWithTokens(symbol : Token, factors : Array<Token>) {
        this.symbol = symbol
        this.factors = factors
        return this
    }

    static initFromJSON(jsonObject : Object) : GrammarProduction {
        var object : GrammarProduction = new GrammarProduction()
        object.initWithTokens(
            Token.initFromJSON(jsonObject['symbol']),
            jsonObject['factors'].map(factorJSON=>{
                return Token.initFromJSON(factorJSON)
            }),
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            symbol : this.symbol.convertToJSON(),
            factors : this.factors.map(factor=>factor.convertToJSON()),
        }
        return jsonObject
    }

    toString() {
        return `${this.symbol.toString()} -> ${this.factors.map(t=>t.toString()).join(' ')}`
    }

    toSimpleString() {
        return `${this.symbol.toSimpleString()} -> ${this.factors.map(t=>t.toSimpleString()).join(' ')}`
    }

    toSimpleStringWithDot(dotPos : number) {
        return `${this.symbol.toSimpleString()} -> ${this.factors.map((t, i, array)=>{
            if (i==dotPos) {
                return '⏺ '+t.toSimpleString()
            } else if (i==array.length-1 && dotPos==array.length) {
                return t.toSimpleString()+' ⏺'
            } 
            return t.toSimpleString()
        }).join(' ')}`
    }
}

export class IndexGrammarProduction {
    symbol : number
    factors : Array<number> = []

    init(symbol : number, factors : Array<number>) {
        this.symbol = symbol
        this.factors = factors
        return this
    }

    static initFromJSON(jsonObject : Object) : IndexGrammarProduction {
        var object : IndexGrammarProduction = new IndexGrammarProduction()
        object.init(
            jsonObject['symbol'],
            jsonObject['factors']
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            symbol : this.symbol,
            factors : this.factors
        }
        return jsonObject
    }

    isEqual(other : IndexGrammarProduction) {
        return this.symbol==other.symbol && isListEqual(this.factors, other.factors)
    }

    copy() : IndexGrammarProduction {
        return new IndexGrammarProduction().init(this.symbol, this.factors)
    }

    toString() {
        return `${this.symbol} -> ${this.factors.join(' ')}`
    }
}


export class SyntaxAnalyzer {
    
    static DERIVATION = new TokenType().init('DERIVATION', '\\->', true)
    static ENTER = new TokenType().init('ENTER', '\n', true)
    static SPACES = new TokenType().init('SPACES', '[ \t]+', true)
    static GrammarSymbol = new TokenType().init('GrammarSymbol', "[^ \n\t]+",false)
    static TerminatedGrammarSymbol = new TokenType().init('GrammarSymbol', "[^ \n\t]+",true)

    static DERIVATION_TOKEN = new Token().init(SyntaxAnalyzer.DERIVATION, '->')

    static LanguageDefinitionLexicalAnalyzer : LexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
        TokenType.ERROR_TOKENTYPE,
        TokenType.EMPTY_TOKENTYPE,
        SyntaxAnalyzer.DERIVATION,
        SyntaxAnalyzer.ENTER,
        SyntaxAnalyzer.SPACES,
        SyntaxAnalyzer.GrammarSymbol
    ])

    startSymbol : Token | null = null //json
    indexOfStartSymbl : number | null = null //json
    tokens : Array<Token> =  [] //json

    grammerProductions : Array<GrammarProduction>
    indexGrammerProductions : Array<IndexGrammarProduction>
    indexGrammerProductionFlags : Array<boolean>
    grammerProductionFunctionNames : Array<string>
    languageFunctionsEntityClass : typeof LanguageFunctionsEntity

    first : Array<Array<number>> = new Array<Array<number>>()
    follow : Array<Array<number>> = new Array<Array<number>>()
    
    firstOfGrammaProduction : Array<Array<number>> = new Array<Array<number>>()

    tokenTypeLexicalAnalyzer : LexicalAnalyzer | null = null
    
    init( 
        startSymbol : Token, 
        indexOfStartSymbl : number, 
        tokens : Array<Token>, 
        tokenTypeLexicalAnalyzer : LexicalAnalyzer , 
        grammerProductions : Array<GrammarProduction>,
        indexGrammerProductions : Array<IndexGrammarProduction>) {

        this.startSymbol = startSymbol
        this.indexOfStartSymbl = indexOfStartSymbl
        this.tokens = tokens
        this.tokenTypeLexicalAnalyzer = tokenTypeLexicalAnalyzer
        this.grammerProductions = grammerProductions
        this.indexGrammerProductions = indexGrammerProductions
        return this
    }
    
    initWithLanguageDefinition(languageDefinition : string) : SyntaxAnalyzer {
        var tokens = SyntaxAnalyzer.LanguageDefinitionLexicalAnalyzer.tokenize(languageDefinition)
        this.initWithTokens(tokens)
        return this
    }

    initWithTokens(tokens : Array<Token>, withErrorTokenFlag : boolean = false) : SyntaxAnalyzer {
        var list : Array<Token> = tokens.filter(t=>!t.type.isEqual(SyntaxAnalyzer.SPACES))
        this.tokens = [
            Token.TERMINATED_TOKEN, 
            Token.EMPTY_TOKEN,
            Token.ERROR_TOKEN,
            Token.UNKNOWN_TOKEN 
        ]
        // if (withErrorTokenFlag) {
        //     this.tokens.push(Token.ERROR_TOKEN)
        //     this.tokens.push(Token.UNKNOWN_TOKEN)
        // }
        

        for (var i=0;i<list.length;i++) {
            if (!list[i].type.isEqual(SyntaxAnalyzer.DERIVATION) && 
                !list[i].type.isEqual(SyntaxAnalyzer.ENTER) && this.tokens.findIndex(t=>t.isEqual(list[i]))==-1) {
                this.tokens.push(list[i])
            }
        }

        var tokenGroups = SyntaxAnalyzer.split(list, new Token().init(SyntaxAnalyzer.ENTER, '\n'))
        this.grammerProductions = this.toGrammarProductions(tokenGroups, SyntaxAnalyzer.DERIVATION_TOKEN)

        // this.grammerProductions.forEach(gp=>{
        //     console.log(gp.toString())
        // })
        this.indexGrammerProductions = new Array<IndexGrammarProduction>()
        this.indexGrammerProductionFlags = new Array<boolean>()

        var nonTerminalSymbols : Array<number> = []
        for (var i=0;i<this.grammerProductions.length;i++) {
            var gp = this.grammerProductions[i]
            var igp = this.toIndexGrammarProduction(gp)
            this.indexGrammerProductions.push(igp)
            this.indexGrammerProductionFlags.push(true)
            if (nonTerminalSymbols.indexOf(igp.symbol)==-1) nonTerminalSymbols.push(igp.symbol)
        }

        this.startSymbol = this.grammerProductions[0].symbol
        this.indexOfStartSymbl = this.indexGrammerProductions[0].symbol    

        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            var factors = this.indexGrammerProductions[i].factors
            for (var j=0;j<factors.length;j++) {
                var indexOfToken = factors[j]
                if (this.tokens[indexOfToken].type.isEqual(SyntaxAnalyzer.GrammarSymbol) &&
                 nonTerminalSymbols.indexOf(factors[j])==-1
                ) {
                    this.tokens[indexOfToken].type = SyntaxAnalyzer.TerminatedGrammarSymbol
                }
            }
        }
        return this
    }

    setLanguageFunctionsEntityClass(languageFunctionsEntityClass : typeof LanguageFunctionsEntity) {
        // console.log(languageDefinitionFunctions)
        this.languageFunctionsEntityClass = languageFunctionsEntityClass
        this.grammerProductionFunctionNames = []
        var gpExpList = languageFunctionsEntityClass['getGrammarProductionStringList']()
        gpExpList.forEach((gpString, index)=>{
            var indexOfgp : number = this.getTheNoInGrammarProductionList(gpString)
            // console.log(gpString, index)
            if (index==-1) {
                throw new Error(`Can not find grammar production ${gpString}`)
            }
            this.grammerProductionFunctionNames[indexOfgp] = gpString
        }) 
    }

    static initFromJSON(jsonObject : Object) : SyntaxAnalyzer {
        var object : SyntaxAnalyzer = new SyntaxAnalyzer()
        var startSymbol : Token = Token.initFromJSON(jsonObject['startSymbol'])
        var indexOfStartSymbl : number = jsonObject['indexOfStartSymbl']
        var tokens : Array<Token> = jsonObject['tokens'].map(tokenJson=>{
            return Token.initFromJSON(tokenJson)
        })
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
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            startSymbol : this.startSymbol.convertToJSON(),
            indexOfStartSymbl : this.indexOfStartSymbl,
            tokens : this.tokens.map(t=>t.convertToJSON()),
            tokenTypeLexicalAnalyzer : this.tokenTypeLexicalAnalyzer?this.tokenTypeLexicalAnalyzer.convertToJSON():null,
            grammerProductions : this.grammerProductions.map(gp=>gp.convertToJSON()),
            indexGrammerProductions : this.indexGrammerProductions.map(igp=>igp.convertToJSON())
        }
        return jsonObject
    }

    showGrammarProductionWithoutFunction() {
        this.grammerProductions.forEach((f, i)=>{
            if (!!!this.grammerProductionFunctionNames[i]) {
                console.log(i, this.grammerProductions[i].toSimpleString())
            }
        })
    }

    setTokenTypeDefinition(tokenTypeDefinitionContent) {
        var tokenTypes : Array<TokenType> = tokenTypeDefinitionContent.split('\n').filter(t=>t.trim().length>0).map(line=>{
            var words = this.splitBySpace(line)
            var name = words[0]
            var reg = words[1]
            name = name.trim()
            reg = reg.trim()
            var skipChar : string |  null = words.length>=3?words[2]:null

            if (skipChar==null) {
                return new TokenType().init(name, reg, true)
            } else {
                // console.log(name, reg, `[${skipChar}]`)
                return new TokenType().init(name, reg, true, skipChar)
            }
        })
        this.setTokenTypeLexicalAnalyzer(new LexicalAnalyzer().initWithTokenTypes(tokenTypes))
    }

    splitBySpace(value : string ) : Array<string> {
        var chars = toRegularExpressionChars(value)
        var charblocks = initCharBlocks(chars)
        var words = []
        var word = ''
        var i = 0
        while (i<chars.length) {
            var range = charblocks[i]
            if (range.left==range.right && chars[range.left]==' ') {
                if (word.length>0) {
                    words.push(word)
                }
                word = ''
            } else {
                for (var j=range.left;j<=range.right;j++) {
                    word += chars[j]
                }
            }
            i = range.right + 1
        }
        if (word.length>0) {
            words.push(word)
            word = ''
        }
        return words
    } 

    setTokenTypeLexicalAnalyzer(tokenTypeLexicalAnalyzer : LexicalAnalyzer) {
        this.tokenTypeLexicalAnalyzer = tokenTypeLexicalAnalyzer
    }

    getTheNoInGrammarProductionList(grammarProductionStringExpression : string) : number {
        var igp = this.convertToIndexGrammarProduction(grammarProductionStringExpression)
        return this.indexGrammerProductions.findIndex(e=>e.isEqual(igp))
    }

    convertToIndexGrammarProduction(grammarProductionStringExpression : string) : IndexGrammarProduction {
        var gpTokens = SyntaxAnalyzer.LanguageDefinitionLexicalAnalyzer.tokenize(grammarProductionStringExpression).filter(t=>!t.type.isEqual(SyntaxAnalyzer.SPACES))
        var gp = this.toGrammarProduction(gpTokens, SyntaxAnalyzer.DERIVATION_TOKEN)
        var igp = this.toIndexGrammarProduction(gp)
        return igp
    }

    getIndexOfToken(token : Token) : number {
        var result = this.tokens.findIndex(e=>e.isEqual(token))
        if (result>=0) return result
        result = this.getIndexOfTokenByTokenName(token)
        // console.log(token, result)
        return result
    }

    getIndexOfTokenByTokenName(token : Token) : number {
        // if (token.type==TokenType.UNKNOWN_TOKENTYPE) {
        //     console.log('***', this.tokens.findIndex(e=>e.value==token.type.name))
        //     this.tokens.forEach(t=>{
        //         console.log(t.value, token.type.name, t.value==token.type.name)
        //     })
        // }
        return this.tokens.findIndex(e=>e.value==token.type.name)
    }

    toIndexGrammarProduction(gp : GrammarProduction) :IndexGrammarProduction {
        var indexOfToken = this.getIndexOfToken(gp.symbol)
        var indexArrayOfFactors = gp.factors.map(e=>this.getIndexOfToken(e))
        return new IndexGrammarProduction().init(indexOfToken, indexArrayOfFactors)
    }

    toGrammarProduction(list : Array<Token>, derivationToken : Token) : GrammarProduction | null {
        if (list.length==0) return null
        if (list[0].value.startsWith('//')) return null
        // console.log(list)
        if (!list[1].isEqual(derivationToken)) {
            // console.log(list)
            throw new Error('Grammer Production Error!')
        }
        var token : Token = list[0]
        var factors : Array<Token> = list.slice(2, list.length)
        return new GrammarProduction().initWithTokens(token, factors)
    }
    
    toGrammarProductions(list : Array<Array<Token>>, derivationToken : Token) : Array<GrammarProduction> {
        var result : Array<GrammarProduction> = list.map(tokenList=>this.toGrammarProduction(tokenList, derivationToken)).filter(gp=>gp!=null)
        return result
    }
    
    static split(originalList : Array<Token>, splitter : Token) : Array<Array<Token>> {
        var result : Array<Array<Token>> = []
        var subList : Array<Token> = []
        for (var i=0;i<originalList.length;i++) {
            var ele : Token = originalList[i]
            
            if (ele.isEqual(splitter)) {
                if (subList.length>0) {
                    result.push(subList)
                    subList =[]
                }
            } else {
                subList.push(ele)
            }
        }
        if (subList.length>0) {
            result.push(subList)
        }
        return result
    }

    isInIndexGrammarProductionList(newIGP : IndexGrammarProduction) : boolean {
        return this.indexGrammerProductions.filter(e=>{
            // console.log(e, newIGP, e.isEqual(newIGP))
            return e.isEqual(newIGP)
        }).length>0
    }

    
    eliminateLeftRecursion() {

        for (var i=0;i<this.tokens.length;i++) {
            if (!this.tokens[i].type.isTerminal) {
                for (var j=0;j<i;j++) {
                    if (!this.tokens[j].type.isTerminal) {
                        this.replaceGrammerProduction(i, j)
                    }
                }    
            }
            
            this.eliminateTheImmediateLeftRecursion(i)
        }
        
        this.removeFalseGrammerProductions()
        
    }

    removeFalseGrammerProductions() {
        var cupgp : Array<GrammarProduction> =[]
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            if (this.indexGrammerProductionFlags[i]) {
                var tokenOfSymbol : Token = this.tokens[this.indexGrammerProductions[i].symbol]
                var factors : Array<Token> = this.indexGrammerProductions[i].factors.map(f=>this.tokens[f])
    
                cupgp.push(new GrammarProduction().initWithTokens(tokenOfSymbol, factors))    
            }
        }
        this.grammerProductions = cupgp
        
        var cup : Array<IndexGrammarProduction> = []
        var flagCup : Array<boolean> =[]
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            if (this.indexGrammerProductionFlags[i]) {
                cup.push(this.indexGrammerProductions[i])
                flagCup.push(true)
            }
        }
        this.indexGrammerProductions = cup
        this.indexGrammerProductionFlags = flagCup

    }

    replaceGrammerProduction(i : number, j :number) {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        //Ai -> Aj xyz  X   --- k
        //Aj -> abc         --- l
        //Ai -> abc xyz
        var len = this.indexGrammerProductions.length
        for (var k=0;k<len;k++) {
            var kgp = this.indexGrammerProductions[k]
            var originalLen = this.indexGrammerProductions.length
            if (this.indexGrammerProductionFlags[k] && kgp.symbol==i && kgp.factors[0]==j) {
                for (var l=0;l<len;l++) {
                    var lgp = this.indexGrammerProductions[l]
                    if (this.indexGrammerProductionFlags[l] && lgp.symbol==j) {
                        var symbol = kgp.symbol
                        var factors = lgp.factors.concat(kgp.factors.slice(1))
                        while (factors.length>1 && factors[0]==indexOfEmptyToken) factors = factors.slice(1)
                        while (factors.length>1 && factors[factors.length-1]==indexOfEmptyToken) factors = factors.slice(0, factors.length-1)
                        var newIndexGrammerProduction = new IndexGrammarProduction().init(symbol, factors)
                        if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
                            // console.log('new ', newIndexGrammerProduction)
                            this.indexGrammerProductions.push(newIndexGrammerProduction)
                            this.indexGrammerProductionFlags.push(true)
                        }
                    }
                }
            }
            if (this.indexGrammerProductions.length>originalLen) {
                // console.log('delete ',k, this.indexGrammerProductions[k])
                this.indexGrammerProductionFlags[k] = false
            }
        }
        
    }

    eliminateTheImmediateLeftRecursion(indexOfToken : number) {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var len = this.indexGrammerProductions.length
        var newTokenName : string | null = null
        var newTokenNameIndex : number = -1
        var immediateLeftRecursionCount : number = 0
        var nonImmediateLeftRecursionCount : number = 0
        // console.log('eliminateTheImmediateLeftRecursion', indexOfToken)
        // console.log(this.indexGrammerProductionFlags)
        // console.log(this.indexGrammerProductions)
        for (var i=0;i<len;i++) {
            var gp = this.indexGrammerProductions[i]
            if (this.indexGrammerProductionFlags[i] && gp.symbol==indexOfToken && gp.factors[0]==indexOfToken) {
                if (newTokenName==null) {
                    var tokenName : string = this.tokens[indexOfToken].value
                    newTokenName = nextGrammarSymbol(tokenName, this.tokens)    
                }
                // console.log('immediate', indexOfToken, gp)
                immediateLeftRecursionCount++
            } else if (this.indexGrammerProductionFlags[i] && gp.symbol==indexOfToken && gp.factors[0]!=indexOfToken) {
                nonImmediateLeftRecursionCount++
                // console.log('non immediate', indexOfToken, gp)
            }
        }
        // console.log(this.tokens[indexOfToken], immediateLeftRecursionCount, nonImmediateLeftRecursionCount)
        if (immediateLeftRecursionCount>0 && nonImmediateLeftRecursionCount==0) {
            throw new Error('Can not eliminate the immediate left recursion')
        }
        if (newTokenName==null) return 
        newTokenNameIndex = this.tokens.length
        this.tokens.push(new Token().init(this.tokens[indexOfToken].type, newTokenName))

        // if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
        //     this.indexGrammerProductions.push(newIndexGrammerProduction)
        //     this.indexGrammerProductionFlags.push(true)
        //     this.indexGrammerProductionFlags[i] = false
        // }
        
        for (var i=0;i<len;i++) {
            var gp = this.indexGrammerProductions[i]
            if (this.indexGrammerProductionFlags[i] && gp.symbol==indexOfToken) {
                var symbol : number = -1
                var factors : Array<number> = []
                if (gp.factors[0]==indexOfToken) {

                    symbol = newTokenNameIndex
                    factors = gp.factors.slice(1).concat([newTokenNameIndex])
                } else {
                    symbol = indexOfToken
                    factors = gp.factors.concat([newTokenNameIndex])
                }

                while (factors.length>1 && factors[0]==indexOfEmptyToken) factors = factors.slice(1)
                while (factors.length>1 && factors[factors.length-1]==indexOfEmptyToken) factors = factors.slice(0, factors.length-1)
                var newIndexGrammerProduction = new IndexGrammarProduction().init(symbol, factors)
                if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
                    // console.log('new 1', newIndexGrammerProduction)
                    this.indexGrammerProductions.push(newIndexGrammerProduction)
                    this.indexGrammerProductionFlags.push(true)
                    this.indexGrammerProductionFlags[i] = false
                }
            } 
        }
        var newIndexGrammerProduction = new IndexGrammarProduction().init(newTokenNameIndex, [indexOfEmptyToken])
        if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
            // console.log('new 2', newIndexGrammerProduction)
            this.indexGrammerProductions.push(newIndexGrammerProduction)
            this.indexGrammerProductionFlags.push(true)
        }
    }

    leftFactoring() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)

        var len = this.indexGrammerProductions.length
        var maxFactor : {tokenOfSymbol : number, maxLeftCommonFactor : Array<number>} | null = this.maxLeftCommonFactor()
        while (maxFactor!=null) {
            var tokenOfSymbol : number = maxFactor.tokenOfSymbol
            var maxLeftCommonFactor : Array<number> = maxFactor.maxLeftCommonFactor

            var tokenName : string = this.tokens[tokenOfSymbol].value
            var newTokenName : string = nextGrammarSymbol(tokenName, this.tokens)  
            var indexOfNewTokenName : number = -1  
            var newToken : Token = new Token().init(this.tokens[tokenOfSymbol].type, newTokenName)
            this.tokens.push(newToken)
            indexOfNewTokenName  = this.tokens.length-1
            var newgp = new IndexGrammarProduction().init(tokenOfSymbol, maxLeftCommonFactor.concat([indexOfNewTokenName]))

            if (!this.isInIndexGrammarProductionList(newgp)) {
                this.indexGrammerProductions.push(newgp)
                this.indexGrammerProductionFlags.push(true)
            }
            for (var i=0;i<len;i++) {
                var gp = this.indexGrammerProductions[i]
                if (this.indexGrammerProductionFlags[i] && gp.symbol==tokenOfSymbol && 
                    gp.factors.length>=maxLeftCommonFactor.length && 
                    this.isLeftCommonFactor(maxLeftCommonFactor, gp.factors)) {
                        var factors : Array<number> = gp.factors.slice(maxLeftCommonFactor.length)
                        if (factors.length==0) factors = [indexOfEmptyToken]
                        var newgp = new IndexGrammarProduction().init(indexOfNewTokenName, factors)
                        if (!this.isInIndexGrammarProductionList(newgp)) {
                            this.indexGrammerProductions.push(newgp)
                            this.indexGrammerProductionFlags.push(true)
                        }
                        if (this.indexGrammerProductionFlags[i]) {
                            this.indexGrammerProductionFlags[i] = false
                        }
                        
                    }
            }
            len = this.indexGrammerProductions.length
            maxFactor = this.maxLeftCommonFactor()
        }

        this.removeFalseGrammerProductions()
    }

    maxLeftCommonFactor() : {tokenOfSymbol : number, maxLeftCommonFactor : Array<number>} | null {
        var len = this.indexGrammerProductions.length
        var maxLeftCommonFactor : Array<number> | null = null
        var tokenOfSymbol : number | null = null
        for (var i=0;i<len;i++) {
            for (var j=i+1;this.indexGrammerProductionFlags[i] && j<len;j++) {
                if (this.indexGrammerProductionFlags[j]) {
                    var leftCommonFactor : Array<number> | null = this.leftCommonFactor(i, j)
                    
                    if (leftCommonFactor!=null) {
                        if (maxLeftCommonFactor==null || maxLeftCommonFactor.length<leftCommonFactor.length) {
                            maxLeftCommonFactor = leftCommonFactor
                            tokenOfSymbol = this.indexGrammerProductions[i].symbol  
                        }
                    }    
                }
            }
        }
        if (tokenOfSymbol==null) return null
        return { tokenOfSymbol : tokenOfSymbol, maxLeftCommonFactor : maxLeftCommonFactor }
    }

    leftCommonFactor(i : number, j: number) : Array<number> | null {
        if (!this.indexGrammerProductionFlags[i]) return null
        if (!this.indexGrammerProductionFlags[j]) return null
        var gpi = this.indexGrammerProductions[i]
        var gpj = this.indexGrammerProductions[j]
        if (gpi.symbol!=gpj.symbol) return null
        var len = Math.min(gpi.factors.length, gpj.factors.length)
        var result : Array<number> = []
        for (var k=0;gpi.factors[k]==gpj.factors[k] && k<len;k++) {
            result.push(gpi.factors[k])
        }
        // console.log(this.indexGrammerProductions[i], this.indexGrammerProductions[j])
        return result.length==0?null:result
    }

    isLeftCommonFactor(commonFactors : Array<number>, list : Array<number>) : boolean {
        var i = 0
        while (i<commonFactors.length && commonFactors[i]==list[i]) i++
        return i==commonFactors.length
    }

    calculateFirst() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        this.first = new Array<Array<number>>()
        for (var i=0;i<this.tokens.length;i++) {
            this.first[i] = []
        }
        for (var i=0;i<this.tokens.length;i++) {
            if (this.tokens[i].type.isTerminal) {
                this.first[i].push(i)
            }
        }
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            var pg = this.indexGrammerProductions[i]
            if (pg.factors.length==1 && pg.factors[0]==indexOfEmptyToken && this.first[pg.symbol].indexOf(indexOfEmptyToken)==-1) {
                this.first[pg.symbol].push(indexOfEmptyToken)
            }
        }

        var modifiedFlag = true
        while (modifiedFlag) {
            modifiedFlag = false
            for (var i=0;i<this.indexGrammerProductions.length;i++) {
                var gp = this.indexGrammerProductions[i]
                
                var continueFlag = true
                for (var j=0;continueFlag && j<gp.factors.length;j++) {
                    continueFlag = this.first[gp.factors[j]].indexOf(indexOfEmptyToken)>=0
                    this.first[gp.factors[j]].forEach(n=>{
                        if (this.first[gp.symbol].indexOf(n)==-1) {
                            this.first[gp.symbol].push(n)
                            modifiedFlag = true
                        }
                    })
                }
            }
        }
    }

    showFirst() {
        console.log("First")
        for (var i=0;i<this.tokens.length;i++) {
            console.log(`${i}) `, this.tokens[i].toString(), this.first[i])
        }
    }

    calculateFollow() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        this.follow = new Array<Array<number>>()
        for (var i=0;i<this.tokens.length;i++) {
            this.follow[i] = []
        }
        this.follow[this.indexOfStartSymbl] = [indexOfTerminatedToken]

        var modifiedFlag = true
        while (modifiedFlag) {
            modifiedFlag = false
            for (var i=0;i<this.indexGrammerProductions.length;i++) {
                var gp = this.indexGrammerProductions[i]
                
                for (var j=0;j<gp.factors.length-1;j++) {
                    var indexOfCurrent = gp.factors[j]
                    var firstOfLatter = this.first[gp.factors[j+1]]
                    firstOfLatter.forEach(n=>{
                        if (n!=indexOfEmptyToken && this.follow[indexOfCurrent].indexOf(n)==-1) {
                            this.follow[indexOfCurrent].push(n)
                            modifiedFlag = true
                        }
                    })
                }

                var continueFlag = true
                for (var j=gp.factors.length-1;continueFlag && j>=0;j--) {
                    var indexOfCurrent = gp.factors[j]
                    if (indexOfCurrent!=indexOfEmptyToken) {
                        this.follow[gp.symbol].forEach(n=>{
                            if (this.follow[indexOfCurrent].indexOf(n)==-1) {
                                this.follow[indexOfCurrent].push(n)
                                modifiedFlag = true
                            }
                        })
                        continueFlag = this.first[indexOfCurrent].indexOf(indexOfEmptyToken)>=0    
                    }
                }
            }
        }



    }

    showFollow() {
        console.log('Follow')
        for (var i=0;i<this.tokens.length;i++) {
            console.log(`${i}) `, this.tokens[i].toString(), `[ ${this.follow[i].map(f=>this.tokens[f].toString()).join(' ')} ]`)
        }

    }



    calculateFirstOfGrammaProductions() {
        this.firstOfGrammaProduction  = new Array<Array<number>>()
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            var gp = this.indexGrammerProductions[i]
            this.firstOfGrammaProduction[i] = this.getFirst(gp.factors)
        }
    }

    getFirst(indexOfTokens : Array<number>) : Array<number> {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var result : Array<number> = []
        var continueFlag = true
        for (var i=0;continueFlag && i<indexOfTokens.length;i++) {
            var tokenNo = indexOfTokens[i]
            if (tokenNo==indexOfEmptyToken) {
                if (result.indexOf(tokenNo)==-1) result.push(tokenNo)
            }
            this.first[tokenNo].forEach(n=>{
                if (result.indexOf(n)==-1) result.push(n)
            })
            continueFlag = this.first[tokenNo].indexOf(indexOfEmptyToken)>=0
        }
        return result
    }

}