import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis"
import { intersection, union } from "../Utils/SetUtils"

class GrammarProduction {
    symbol : Token
    factors : Array<Token> = []

    constructor(symbol : Token, factors : Array<Token>) {
        this.symbol = symbol
        this.factors = factors
    }

    toString() {
        return `${this.symbol.toString()} ==> ${this.factors.map(t=>t.toString()).join(' ')}`
    }

    toSimpleString() {
        return `${this.symbol.toSimpleString()} ==> ${this.factors.map(t=>t.toSimpleString()).join(' ')}`
    }
}

class IndexGrammarProduction {
    symbol : number
    factors : Array<number> = []

    constructor(symbol : number, factors : Array<number>) {
        this.symbol = symbol
        this.factors = factors
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

    //Map<tokens.index, [tokens.index]
    first : Map<number, Array<number>> = new Map<number, Array<number>>()
    follow : Map<number, Array<number>> = new Map<number, Array<number>>()
    
    firstOfGrammaProduction : Map<number, Array<number>> = new Map<number, Array<number>>()
    
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
        for (var i=0;i<this.grammerProductions.length;i++) {
            var gp = this.grammerProductions[i]
            var indexOfToken = this.getIndexOfToken(gp.symbol)
            var indexArrayOfFactors = gp.factors.map(e=>this.getIndexOfToken(e))
            this.indexGrammerProductions.push(new IndexGrammarProduction(indexOfToken, indexArrayOfFactors))
        }

        this.startSymbol = this.grammerProductions[0].symbol
        this.indexOfStartSymbl = this.indexGrammerProductions[0].symbol

        this.calculateFirst()
        this.calculateFollow()
        this.calculateFirstOfGrammaProductions()
        
    }

    getIndexOfToken(token : Token) : number {
        return this.tokens.findIndex(e=>e.isEqual(token))
    }

    toGrammarProduction(list : Array<Token>, derivationToken : Token) : GrammarProduction {
        if (!list[1].isEqual(derivationToken)) {
            console.log(list)
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

    calculateFollow() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        this.follow = new Map<number, Array<number>>()
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


        console.log('Follow')
        for (var i=0;i<this.tokens.length;i++) {
            console.log(`${i}) `, this.tokens[i].toString(), this.follow[i])
        }

    }

    calculateFirst() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        this.first = new Map<number, Array<number>>()
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
        console.log("First")
        for (var i=0;i<this.tokens.length;i++) {
            console.log(`${i}) `, this.tokens[i].toString(), this.first[i])
        }
    }

    calculateFirstOfGrammaProductions() {
        this.firstOfGrammaProduction  = new Map<number, Array<number>>()
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

    isLL1() : boolean {

        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)

        var result : boolean = true
        for (var i=0;result && i<this.indexGrammerProductions.length;i++) {
            var pgi = this.indexGrammerProductions[i]
            var firstOfi = this.firstOfGrammaProduction[i]
            var symbol = pgi.symbol
            for (var j=i+1;result && j<this.indexGrammerProductions.length;j++) {
                var pgj = this.indexGrammerProductions[j]
                var firstOfj = this.firstOfGrammaProduction[j]
                if (symbol==pgj.symbol) {
                    if (result) {
                        result = intersection(firstOfi, firstOfj).length==0
                    }
                    if (result && firstOfj.indexOf(indexOfEmptyToken)>=0) {
                        result = intersection(firstOfi, this.follow[symbol]).length==0
                    }
                    if (result && firstOfi.indexOf(indexOfEmptyToken)>=0) {
                        result = intersection(firstOfj, this.follow[symbol]).length==0
                    }
                }
            }
        }
        return result
    }

    constructLL1PredictiveParsingTable() {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var predictiveParsingTable : Array<Array<Array<number>>> = []
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            var pg = this.indexGrammerProductions[i]
            var symbol = pg.symbol
            var firstOfpg = this.firstOfGrammaProduction[i]
            // console.log(i, this.grammerProductions[i].toSimpleString(), firstOfpg, indexOfEmptyToken)
            if (predictiveParsingTable[symbol]==null || predictiveParsingTable[symbol]==undefined) {
                predictiveParsingTable[symbol] = []
            }
            for (var j=0;j<firstOfpg.length;j++) {
                var a = firstOfpg[j]
                if (this.tokens[a].type.isTerminal) {
                    if (predictiveParsingTable[symbol][a]==null || predictiveParsingTable[symbol][a]==undefined) {
                        predictiveParsingTable[symbol][a] = []
                    }
                    predictiveParsingTable[symbol][a].push(i)
                    console.log(this.tokens[symbol].value, this.tokens[a].value, this.grammerProductions[i].toSimpleString())
                }
            }
            
            if (firstOfpg.indexOf(indexOfEmptyToken)>=0) {
                
                var followOfSymbol = this.follow[symbol]
                for (var j=0;j<followOfSymbol.length;j++) {
                    var b =followOfSymbol[j]
                    if (this.tokens[b].type.isTerminal || b==indexOfEmptyToken) {
                        if (predictiveParsingTable[symbol][b]==null || predictiveParsingTable[symbol][b]==undefined) {
                            predictiveParsingTable[symbol][b] = []
                        }
                        predictiveParsingTable[symbol][b].push(i)
                        console.log(this.tokens[symbol].value, this.tokens[b].value, this.grammerProductions[i].toSimpleString())
                    }
                }
            }
        }

        console.log(predictiveParsingTable)
        for (var i=0;i<this.tokens.length;i++) {
            if (!this.tokens[i].type.isTerminal && i!=indexOfEmptyToken) {
                for (var j=0;j<this.tokens.length;j++) {
                    if (!this.tokens[j].type.isTerminal) {
                        if (predictiveParsingTable[i][j]!=null && predictiveParsingTable[i][j]!=undefined) {
                            console.log(this.tokens[i].toString(), this.tokens[j].toString())
                            var list = predictiveParsingTable[i][j]
                            for (var k=0;k<list.length;k++) {
                                console.log('\t', this.grammerProductions[k].toString())
                            }
                        }
                    }
                }
            }
        }
    }
}