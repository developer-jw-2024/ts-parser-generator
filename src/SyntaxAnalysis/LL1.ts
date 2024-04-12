import { SyntaxAnalyzer } from "./SyntaxAnalysis";
import { LexicalAnalyzer, Token, TokenType } from "../LexicalAnalyzer/LexicalAnalysis";
import { intersection, union } from "../Utils/SetUtils"

export class LL1SyntaxAnalyzer extends SyntaxAnalyzer {

    predictiveParsingTable : Array<Array<Array<number>>> = []
    
    initWithLanguageDefinition(languageDefinition : string) : LL1SyntaxAnalyzer {
        var tokens = SyntaxAnalyzer.LanguageDefinitionLexicalAnalyzer.tokenize(languageDefinition)
        return this.initWithTokens(tokens)
    }

    initWithTokens(tokens : Array<Token>) : LL1SyntaxAnalyzer {
        super.initWithTokens(tokens)
        this.eliminateLeftRecursion()
        this.leftFactoring()
        this.calculateFirst()
        this.calculateFollow()
        this.calculateFirstOfGrammaProductions()
        this.constructLL1PredictiveParsingTable()
        return this
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
        return result && this.isCanTerminatedLL1()
    }

    isCanTerminatedLL1() {
        var isValidLL1 : boolean = true
        var hasTerminated : boolean = false
        for (var i=0;i<this.tokens.length;i++) {
            for (var j=0;j<this.tokens.length;j++) {
                if (this.predictiveParsingTable[i][j].length>0) {
                    var gps = this.predictiveParsingTable[i][j]
                    // console.log(this.tokens[j].type, TokenType.TERMINATED_TOKENTYPE, this.tokens[j].type.isEqual(TokenType.TERMINATED_TOKENTYPE))
                    if (this.tokens[j].type.isEqual(TokenType.TERMINATED_TOKENTYPE)) {
                        hasTerminated = true
                    }
                    if (gps.length>1) {
                        isValidLL1 = false
                    }
                }
            }
        }
        if (!hasTerminated) {
            isValidLL1 = false
        }
        return isValidLL1
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

    isValid(lexicalAnalyzer : LexicalAnalyzer, inputString : string) {
        var indexOfEmptyToken = this.getIndexOfToken(Token.EMPTY_TOKEN)
        var indexOfTerminatedToken = this.getIndexOfToken(Token.TERMINATED_TOKEN)

        var inputTokens : Array<Token> = lexicalAnalyzer.tokenize(inputString)
        inputTokens.push(Token.TERMINATED_TOKEN)
        var input : Array<number> = inputTokens.map(t=>this.getIndexOfToken(t))
        var stack : Array<number> = [indexOfTerminatedToken, this.getIndexOfToken(this.startSymbol)]
        var X : number = stack[stack.length-1]
        var ip : number = 0
        
        while (X!=indexOfTerminatedToken) {
            // console.log('stack:', stack, 'ip:', ip, 'X:', X, 'a:',input[ip])
            if (X==input[ip]) {
                var matchTokenIndex = stack.pop()
                // console.log("Match: ", this.tokens[matchTokenIndex].toSimpleString())
                ip++
            } else if (this.tokens[X].type.isTerminal) {
                console.log('error input 1', this.tokens[X])
                return 
            } else if (this.predictiveParsingTable[X][input[ip]].length==0) {
                console.log('error input 2')
                return 
            } else if (this.predictiveParsingTable[X][input[ip]].length==1) {
                var pgi : number = this.predictiveParsingTable[X][input[ip]][0]
                var gp = this.indexGrammerProductions[pgi]
                // console.log(this.grammerProductions[pgi].toSimpleString())
                stack.pop()
                var i : number = gp.factors.length-1
                while (i>=0 && gp.factors[i]==indexOfEmptyToken) { i-- }
                while (i>=0) {
                    stack.push(gp.factors[i])
                    i--
                }
            }
            X  = stack[stack.length-1]
        }
        // console.log('stack:', stack, 'ip:', ip, 'X:', X, 'a:',input[ip])
        
    }
}
