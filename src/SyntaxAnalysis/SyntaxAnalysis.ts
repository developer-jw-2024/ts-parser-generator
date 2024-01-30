import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis"
import { isListEqual } from "../Utils/ArrayListUtils"
import { isSetEqual } from "../Utils/SetUtils"

function nextGrammarSymbol(a: string) : string {
    
    var i = a.length-1
    while (a[i]>='0' && a[i]<='9' && i>=0) {
        i--
    }

    var num : string = a.substring(i+1, a.length)
    num = num.trim()
    if (num.length==0) num ="0"
    var n = parseInt(num)+1
    return a.substring(0, i+1)+n
}

function isValueInTokens(value : string, tokens : Array<Token>) : boolean {
    return tokens.filter(t=>t.value==value).length>0
}

export class GrammarProduction {
    symbol : Token
    factors : Array<Token> = []

    constructor(symbol : Token, factors : Array<Token>) {
        this.symbol = symbol
        this.factors = factors
    }

    toString() {
        return `${this.symbol.toString()} -> ${this.factors.map(t=>t.toString()).join(' ')}`
    }

    toSimpleString() {
        return `${this.symbol.toSimpleString()} -> ${this.factors.map(t=>t.toSimpleString()).join(' ')}`
    }
}

export class IndexGrammarProduction {
    symbol : number
    factors : Array<number> = []

    constructor(symbol : number, factors : Array<number>) {
        this.symbol = symbol
        this.factors = factors
    }

    isEqual(other : IndexGrammarProduction) {
        return this.symbol==other.symbol && isSetEqual(this.factors, other.factors)
    }

    copy() : IndexGrammarProduction {
        return new IndexGrammarProduction(this.symbol, this.factors)
    }
}


export class SyntaxAnalysis {
    
    static DERIVATION = new TokenType('DERIVATION', '\\->', true)
    static ENTER = new TokenType('ENTER', '\n', true)
    static SPACES = new TokenType('SPACES', '[ \t]+', true)
    static GrammarSymbol = new TokenType('GrammarSymbol', "[^ \n\t]+",false)

    startSymbol : Token
    indexOfStartSymbl : number
    tokens : Array<Token> =  []
    grammerProductions : Array<GrammarProduction>
    indexGrammerProductions : Array<IndexGrammarProduction>
    indexGrammerProductionFlags : Array<boolean>

    
    constructor(tokens : Array<Token>) {
        var list : Array<Token> = tokens.filter(t=>!t.type.isEqual(SyntaxAnalysis.SPACES))
        this.tokens = [Token.TERMINATED_TOKEN, Token.EMPTY_TOKEN]
        

        for (var i=0;i<list.length;i++) {
            if (!list[i].type.isEqual(SyntaxAnalysis.DERIVATION) && 
                !list[i].type.isEqual(SyntaxAnalysis.ENTER) && this.tokens.findIndex(t=>t.isEqual(list[i]))==-1) {
                this.tokens.push(list[i])
            }
        }

        var tokenGroups = SyntaxAnalysis.split(list, new Token(SyntaxAnalysis.ENTER, '\n'))
        this.grammerProductions = this.toGrammarProductions(tokenGroups, new Token(SyntaxAnalysis.DERIVATION, '->'))

        this.indexGrammerProductions = new Array<IndexGrammarProduction>()
        this.indexGrammerProductionFlags = new Array<boolean>()
        for (var i=0;i<this.grammerProductions.length;i++) {
            var gp = this.grammerProductions[i]
            var indexOfToken = this.getIndexOfToken(gp.symbol)
            var indexArrayOfFactors = gp.factors.map(e=>this.getIndexOfToken(e))
            this.indexGrammerProductions.push(new IndexGrammarProduction(indexOfToken, indexArrayOfFactors))
            this.indexGrammerProductionFlags.push(true)
        }

        this.startSymbol = this.grammerProductions[0].symbol
        this.indexOfStartSymbl = this.indexGrammerProductions[0].symbol

        
    }

    getIndexOfToken(token : Token) : number {
        return this.tokens.findIndex(e=>e.isEqual(token))
    }

    toGrammarProduction(list : Array<Token>, derivationToken : Token) : GrammarProduction {
        if (!list[1].isEqual(derivationToken)) {
            // console.log(list)
            throw new Error('Grammer Production Error!')
        }
        var token : Token = list[0]
        var factors : Array<Token> = list.slice(2, list.length)
        return new GrammarProduction(token, factors)
    }
    
    toGrammarProductions(list : Array<Array<Token>>, derivationToken : Token) : Array<GrammarProduction> {
        var result : Array<GrammarProduction> = list.map(tokenList=>this.toGrammarProduction(tokenList, derivationToken))
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

    /*
    eliminateLeftRecursion2() {
        var gpList : Array<IndexGrammarProduction> = this.indexGrammerProductions.map(x=>x.copy())
        var flags : Array<boolean> = this.indexGrammerProductions.map(x=>true)
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)

        var continueFlag = true
        while (continueFlag) {
            continueFlag = false
            var len = gpList.length
            for (var i=0;i<len;i++) {
                var igp = gpList[i]
                var iToken = this.tokens[igp.symbol]
                var jToken = this.tokens[igp.factors[0]]
                var replacedFlag = false
                if (flags[i] && igp.symbol!=igp.factors[0] && !iToken.type.isTerminal && !jToken.type.isTerminal) {
                    for (var j=0;j<len;j++) {
                        var jgp = gpList[j]
                        if (flags[j] && jgp.symbol==igp.factors[0]) {
                            var newIndexGrammarProduction = new IndexGrammarProduction(igp.symbol, jgp.factors.concat(igp.factors.slice(1)))
                            if (!this.isInIndexGrammarProductionList(newIndexGrammarProduction, gpList)) {
                                // console.log('New0:', igp, jgp, newIndexGrammarProduction)

                                gpList.push(newIndexGrammarProduction)
                                flags.push(true)
                            }
                            replacedFlag = true
                            continueFlag = true    
                        }
                    }
                }
                if (replacedFlag) {
                    flags[i] = false
                    // console.log('Delete ', i)
                }
                
                if (flags[i] && igp.symbol==igp.factors[0] && !iToken.type.isTerminal) {
                    var tokenName : string = this.tokens[igp.symbol].value
                    tokenName = nextGrammarSymbol(tokenName)
                    while (isValueInTokens(tokenName, this.tokens)) {
                        tokenName = nextGrammarSymbol(tokenName)
                    }
                    var newToken : Token | null = null
                    var newTokenIndex : number = -1
                    for (var j=0;j<len;j++) {
                        var jgp = gpList[j]
                        if (flags[j] && jgp.symbol==igp.symbol && jgp.symbol!=jgp.factors[0]) {
                            if (newToken==null) {
                                newToken = new Token(this.tokens[igp.symbol].type, tokenName)
                                this.tokens.push(newToken)
                                newTokenIndex = this.tokens.length-1
                            }
                            var newIndexGrammarProduction = new IndexGrammarProduction(igp.symbol, jgp.factors.concat([newTokenIndex]))
                            if (!this.isInIndexGrammarProductionList(newIndexGrammarProduction, gpList)) {
                                // console.log('New1:', flags[i], igp, flags[j], jgp, newIndexGrammarProduction)
                                gpList.push(newIndexGrammarProduction)
                                flags.push(true)
                            }
                            replacedFlag = true
                            continueFlag = true
                            flags[j] = false
                            // console.log('1 Delete ', j)
                        }
                    }
                    if (newToken!=null) {
                        for (var j=0;j<len;j++) {
                            var jgp = gpList[j]
                            if (flags[j] && jgp.symbol==igp.symbol) {
                                var newIndexGrammarProduction = new IndexGrammarProduction(newTokenIndex, igp.factors.slice(1).concat([newTokenIndex]))
                                if (!this.isInIndexGrammarProductionList(newIndexGrammarProduction, gpList)) {
                                    // console.log('New2:', newIndexGrammarProduction)
                                    gpList.push(newIndexGrammarProduction)
                                    flags.push(true)
                                }
                                replacedFlag = true
                                continueFlag = true
                                flags[j] = false
                                // console.log('2 Delete ', j)
                            }
                        }
                        var newIndexGrammarProduction = new IndexGrammarProduction(newTokenIndex, [indexOfEmptyToken])
                        if (!this.isInIndexGrammarProductionList(newIndexGrammarProduction, gpList)) {
                            // console.log('New3:', newIndexGrammarProduction)
                            gpList.push(newIndexGrammarProduction)
                            flags.push(true)
                        }
                    }
                    
                }
                
            }

        }

        // console.log(gpList)
        // console.log(flags)
        // console.log(this.tokens)

        this.indexGrammerProductions = gpList.filter((gp, i)=>flags[i])
    }
    */
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
        var cupgp : Array<GrammarProduction> =[]
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            if (this.indexGrammerProductionFlags[i]) {
                var tokenOfSymbol : Token = this.tokens[this.indexGrammerProductions[i].symbol]
                var factors : Array<Token> = this.indexGrammerProductions[i].factors.map(f=>this.tokens[f])
    
                cupgp.push(new GrammarProduction(tokenOfSymbol, factors))    
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
                        var newIndexGrammerProduction = new IndexGrammarProduction(symbol, factors)
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
                    newTokenName = nextGrammarSymbol(tokenName)    
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
        this.tokens.push(new Token(this.tokens[indexOfToken].type, newTokenName))

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
                var newIndexGrammerProduction = new IndexGrammarProduction(symbol, factors)
                if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
                    // console.log('new 1', newIndexGrammerProduction)
                    this.indexGrammerProductions.push(newIndexGrammerProduction)
                    this.indexGrammerProductionFlags.push(true)
                    this.indexGrammerProductionFlags[i] = false
                }
            } 
        }
        var newIndexGrammerProduction = new IndexGrammarProduction(newTokenNameIndex, [indexOfEmptyToken])
        if (!this.isInIndexGrammarProductionList(newIndexGrammerProduction)) {
            // console.log('new 2', newIndexGrammerProduction)
            this.indexGrammerProductions.push(newIndexGrammerProduction)
            this.indexGrammerProductionFlags.push(true)
        }
    }

    leftFactoring() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)

        var len = this.indexGrammerProductions.length
        var maxLeftCommonFactor : Array<number> | null = null
        var tokenOfSymbol : number | null = null
        for (var i=0;i<len;i++) {
            for (var j=i+1;j<len;j++) {
                var leftCommonFactor : Array<number> | null = this.leftCommonFactor(i, j)
                if (leftCommonFactor!=null) {
                    if (maxLeftCommonFactor==null || maxLeftCommonFactor.length<leftCommonFactor.length) {
                        maxLeftCommonFactor = leftCommonFactor
                        tokenOfSymbol = this.indexGrammerProductions[i].symbol  
                    }
                }
            }
        }
        if (tokenOfSymbol!=null) {
            console.log(tokenOfSymbol, maxLeftCommonFactor)
            var tokenName : string = this.tokens[tokenOfSymbol].value
            var newTokenName : string = nextGrammarSymbol(tokenName)  
            var indexOfNewTokenName : number = -1  
            while (isValueInTokens(newTokenName, this.tokens)) {
                newTokenName = nextGrammarSymbol(newTokenName)
            }
            var newToken : Token = new Token(this.tokens[tokenOfSymbol].type, newTokenName)
            this.tokens.push(newToken)

            indexOfNewTokenName  = this.tokens.length-1
            var newgp = new IndexGrammarProduction(tokenOfSymbol, maxLeftCommonFactor.concat([indexOfNewTokenName]))

            if (!this.isInIndexGrammarProductionList(newgp)) {
                this.indexGrammerProductions.push(newgp)
                this.indexGrammerProductionFlags.push(true)
            }
            for (var i=0;i<len;i++) {
                var gp = this.indexGrammerProductions[i]
                if (gp.symbol==tokenOfSymbol && 
                    gp.factors.length>=maxLeftCommonFactor.length && 
                    this.isLeftCommonFactor(maxLeftCommonFactor, gp.factors)) {
                        var factors : Array<number> = gp.factors.slice(maxLeftCommonFactor.length)
                        if (factors.length==0) factors = [indexOfEmptyToken]
                        var newgp = new IndexGrammarProduction(indexOfNewTokenName, factors)
                        if (!this.isInIndexGrammarProductionList(newgp)) {
                            this.indexGrammerProductions.push(newgp)
                            this.indexGrammerProductionFlags.push(true)
                            this.indexGrammerProductionFlags[i] = false
                        }
                    }
            }

        }
    }

    leftCommonFactor(i : number, j: number) : Array<number> | null {
        var gpi = this.indexGrammerProductions[i]
        var gpj = this.indexGrammerProductions[j]
        if (gpi.symbol!=gpj.symbol) return null
        var len = Math.min(gpi.factors.length, gpj.factors.length)
        var result : Array<number> = []
        for (var k=0;gpi.factors[k]==gpj.factors[k] && k<len;k++) {
            result.push(gpi.factors[k])
        }
        console.log(this.indexGrammerProductions[i], this.indexGrammerProductions[j])
        return result.length==0?null:result
    }

    isLeftCommonFactor(commonFactors : Array<number>, list : Array<number>) : boolean {
        var i = 0
        while (i<commonFactors.length && commonFactors[i]==list[i]) i++
        return i==commonFactors.length
    }



}