import { SyntaxAnalysis } from "../SyntaxAnalysis/SyntaxAnalysis";
import { LexicalAnalysis, Token } from "./LexicalAnalysis";
import { intersection, union } from "../Utils/SetUtils"

export class LL1LexicalAnalysis extends SyntaxAnalysis {

    //Map<tokens.index, [tokens.index]
    first : Array<Array<number>> = new Array<Array<number>>()
    follow : Array<Array<number>> = new Array<Array<number>>()
    
    firstOfGrammaProduction : Array<Array<number>> = new Array<Array<number>>()
    predictiveParsingTable : Array<Array<Array<number>>> = []
    
    constructor(tokens : Array<Token>) {
        super(tokens)
        this.calculateFirst()
        this.calculateFollow()
        this.calculateFirstOfGrammaProductions()
        this.constructLL1PredictiveParsingTable()
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
            console.log(`${i}) `, this.tokens[i].toString(), this.follow[i])
        }

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

        this.predictiveParsingTable = []
        for (var i=0;i<this.tokens.length;i++) {
            this.predictiveParsingTable[i] = []
            for (var j=0;j<this.tokens.length;j++) {
                this.predictiveParsingTable[i][j] = []
            }
        }
        for (var i=0;i<this.indexGrammerProductions.length;i++) {
            var pg = this.indexGrammerProductions[i]
            var symbol = pg.symbol
            var firstOfpg = this.firstOfGrammaProduction[i]
            if (this.predictiveParsingTable[symbol]==null || this.predictiveParsingTable[symbol]==undefined) {
                this.predictiveParsingTable[symbol] = []
            }
            for (var j=0;j<firstOfpg.length;j++) {
                var a = firstOfpg[j]
                if (this.tokens[a].type.isTerminal && a!=indexOfEmptyToken) {
                    if (this.predictiveParsingTable[symbol][a]==null || this.predictiveParsingTable[symbol][a]==undefined) {
                        this.predictiveParsingTable[symbol][a] = []
                    }
                    this.predictiveParsingTable[symbol][a].push(i)
                }
            }
            
            if (firstOfpg.indexOf(indexOfEmptyToken)>=0) {
                
                var followOfSymbol = this.follow[symbol]
                for (var j=0;j<followOfSymbol.length;j++) {
                    var b =followOfSymbol[j]
                    if (this.tokens[b].type.isTerminal && b!=indexOfEmptyToken) {
                        if (this.predictiveParsingTable[symbol][b]==null || this.predictiveParsingTable[symbol][b]==undefined) {
                            this.predictiveParsingTable[symbol][b] = []
                        }
                        this.predictiveParsingTable[symbol][b].push(i)
                    }
                }
            }
        }


    }
}
