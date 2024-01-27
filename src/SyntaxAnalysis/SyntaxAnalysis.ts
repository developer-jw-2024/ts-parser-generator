import { LexicalAnalysis, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis"

class GrammarProduction {
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




}