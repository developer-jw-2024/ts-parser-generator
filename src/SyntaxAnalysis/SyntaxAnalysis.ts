import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis"

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


        // for (var i=0;i<this.tokens.length;i++) {
        //     console.log(`${i}) `, this.tokens[i].toString(), this.follow[i])
        // }

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
        // for (var i=0;i<this.tokens.length;i++) {
        //     console.log(`${i}) `, this.tokens[i].toString(), this.first[i])
        // }
    }

    isLL1() : boolean {

        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)


        var result : boolean = false
        for (var i=0;!result && i<this.tokens.length;i++) {
            if (this.tokens[i].type.isTerminal) {
                for (var j=0;!result && j<this.tokens.length;j++) {
                    for (var k=j+1;!result && k<this.tokens.length;k++) {
                        result = (this.first[j].indexOf(i)>=0 && this.first[k].indexOf(i)>=0)
                    }                        
                }
            }
        }
        for (var j=0;!result && j<this.tokens.length;j++) {
            if (j!=indexOfEmptyToken) {
                for (var k=j+1;!result && k<this.tokens.length;k++) {
                    if (k!=indexOfEmptyToken) {
                        result = (this.first[j].indexOf(indexOfEmptyToken)>=0 && this.first[k].indexOf(indexOfEmptyToken)>=0)
                    }
                }                            
            }
        }
        return result
    }
}