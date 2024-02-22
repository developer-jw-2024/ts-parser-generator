import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { RegularExpression } from "../index"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalysis } from "../src/SyntaxAnalysis/LL1"


describe('LL', () => {
    test('LL1SyntaxAnalysis 0', () => {
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/LL1_Test1.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'E'},
            {isTerminal: false,type : 'GrammarSymbol', value : 'T'},
            {isTerminal: false,type : 'GrammarSymbol', value : 'E\''},
            {isTerminal: true,type : 'GrammarSymbol', value : '+'},
            {isTerminal: false,type : 'GrammarSymbol', value : 'F'},
            {isTerminal: false,type : 'GrammarSymbol', value : 'T\''},
            {isTerminal: true,type : 'GrammarSymbol', value : '*'},
            {isTerminal: true,type : 'GrammarSymbol', value : '('},
            {isTerminal: true,type : 'GrammarSymbol', value : ')'},
            {isTerminal: true,type : 'GrammarSymbol', value : 'id'},
        ])


        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [11, 13], //E
            [11, 13], //T
            [1, 7], //E'
            [7], //+
            [11, 13],  //F
            [1, 10], //T'
            [10], //*
            [11], //(
            [12], //)
            [13] //id
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0, 12],
            [7, 0, 12],
            [0, 12],
            [11, 13],
            [10,7,0,12],
            [7, 0, 12],
            [11,13],
            [11,13],
            [10,7,0,12],
            [10,7,0,12],
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [11, 13], 
            [7],
            [1],
            [11, 13],
            [10],
            [1], 
            [11],
            [13]
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "F id F -> id",
            "F ( F -> ( E )",
            "T' + T' -> <EMPTY>",
            "T' * T' -> * F T'",
            "T' ) T' -> <EMPTY>",
            "T' <TERMINATED> T' -> <EMPTY>",
            "T id T -> F T'",
            "T ( T -> F T'",
            "E' + E' -> + T E'",
            "E' ) E' -> <EMPTY>",
            "E' <TERMINATED> E' -> <EMPTY>",
            "E id E -> T E'",
            "E ( E -> T E'"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 1', () => {
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/LL1_Test1.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                value : t.value
            }
        })).toEqual([
            {type : '<TERMINATED>', value : '<TERMINATED>'},
            {type : '<EMPTY>', value : '<EMPTY>'},
            {type : '<ERROR>', value : '<ERROR>'},
            {type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {type : 'GrammarSymbol', value : 'E'},
            {type : 'GrammarSymbol', value : 'T'},
            {type : 'GrammarSymbol', value : 'E\''},
            {type : 'PLUS', value : '+'},
            {type : 'GrammarSymbol', value : 'F'},
            {type : 'GrammarSymbol', value : 'T\''},
            {type : 'STAR', value : '*'},
            {type : 'OPENBRACKET', value : '('},
            {type : 'CLOSEBRACKET', value : ')'},
            {type : 'ID', value : 'id'},
        ])


        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [11, 13], //E
            [11, 13], //T
            [1, 7], //E'
            [7], //+
            [11, 13],  //F
            [1, 10], //T'
            [10], //*
            [11], //(
            [12], //)
            [13] //id
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0, 12],
            [7, 0, 12],
            [0, 12],
            [11, 13],
            [10,7,0,12],
            [7, 0, 12],
            [11,13],
            [11,13],
            [10,7,0,12],
            [10,7,0,12],
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [11, 13], 
            [7],
            [1],
            [11, 13],
            [10],
            [1], 
            [11],
            [13]
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "F id F -> id",
            "F ( F -> ( E )",
            "T' + T' -> <EMPTY>",
            "T' * T' -> * F T'",
            "T' ) T' -> <EMPTY>",
            "T' <TERMINATED> T' -> <EMPTY>",
            "T id T -> F T'",
            "T ( T -> F T'",
            "E' + E' -> + T E'",
            "E' ) E' -> <EMPTY>",
            "E' <TERMINATED> E' -> <EMPTY>",
            "E id E -> T E'",
            "E ( E -> T E'"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })
    
    test('LL1SyntaxAnalysis.isValid', () => {
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var ll1LexicalAnalysis = new LexicalAnalysis([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/LL1_Test1.txt')
        var tokens = ll1LexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)

        
        var languageLexicalAnalysis = new LexicalAnalysis([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET
        ])
        
        
        ll1.isValid(languageLexicalAnalysis, "id+id*id")
        

    })

    test('LL1SyntaxAnalysis.isValid-1', () => {

        var ll1LexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/LL1_Test1.txt')
        var tokens = ll1LexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)

        // console.log(ll1.tokens.map((t, i)=>`${i}:${t.toSimpleString()}`).join(' '))
        var PLUS = new TokenType('+', '\\+', true)
        var STAR = new TokenType('*', '\\*', true)
        var ID = new TokenType('id', '[0-9]+', true)
        var OPENBRACKET = new TokenType('(', '\\(', true)
        var CLOSEBRACKET = new TokenType(')', '\\)', true)

        var languageLexicalAnalysis = new LexicalAnalysis([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET
        ])
        
        
        ll1.isValid(languageLexicalAnalysis, "1+2*3")
        

    })
    
    test('LL1SyntaxAnalysis 2', () => {
        var i_ = new TokenType('i', 'i', true)
        var t_ = new TokenType('t', 't', true)
        var e_ = new TokenType('e', 'e', true)
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            i_, t_, a_, e_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/NOT_LL1_Test.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                value : t.value
            }
        })).toEqual([
            {type : '<TERMINATED>', value : '<TERMINATED>'},
            {type : '<EMPTY>', value : '<EMPTY>'},
            {type : '<ERROR>', value : '<ERROR>'},
            {type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {type : 'GrammarSymbol', value : 'S'},
            {type : 'i', value : 'i'},
            {type : 'GrammarSymbol', value : 'E'},
            {type : 't', value : 't'},
            {type : 'GrammarSymbol', value : 'S\''},
            {type : 'a', value : 'a'},
            {type : 'e', value : 'e'},
            {type : 'b', value : 'b'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5, 9], //S
            [5], //i
            [11], //E
            [7], //t
            [1,10],  //S'
            [9], //a
            [10], //e
            [11], //b
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0, 10],//S 2
            [11],//i 3
            [7],//E 4
            [5, 9],//t 5
            [0, 10],//S' 6
            [0, 10],//a 7
            [5, 9],//e 8 
            [7],//b 9
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [9],
            [10],
            [1],
            [11],
        ])

        var m : Array<string> = []
        var isValidLL1 : boolean = true
        var hasTerminated : boolean = false
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    })

                    if (ll1.tokens[j].type.isTerminal) {
                        hasTerminated = true
                    }
                    if (gps.length>0) {
                        isValidLL1 = false
                    }
                    m.push(`${A} ${a} ${gps.join('/')}`)
                }
            }
        }
        if (!hasTerminated) {
            isValidLL1 = false
        }

        var m2 : Array<string> = [
            "S a S -> a",
            "S i S -> i E t S S'",
            "S' e S' -> e S/S' -> <EMPTY>",
            "S' <TERMINATED> S' -> <EMPTY>",
            "E b E -> b",
        ]

        // console.log(minus(m, m2))
        // console.log(minus(m2, m))

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 2-1', () => {
        // var i_ = new TokenType('i', 'i', true)
        // var t_ = new TokenType('t', 't', true)
        // var e_ = new TokenType('e', 'e', true)
        // var a_ = new TokenType('a', 'a', true)
        // var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            // i_, t_, a_, e_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = FileUtils.readFromFileSystem('./test/NOT_LL1_Test.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'i'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'E'},
            {isTerminal: true, type : 'GrammarSymbol', value : 't'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S\''},
            {isTerminal: true, type : 'GrammarSymbol', value : 'a'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'e'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'b'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5, 9], //S
            [5], //i
            [11], //E
            [7], //t
            [1,10],  //S'
            [9], //a
            [10], //e
            [11], //b
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0, 10],//S 2
            [11],//i 3
            [7],//E 4
            [5, 9],//t 5
            [0, 10],//S' 6
            [0, 10],//a 7
            [5, 9],//e 8 
            [7],//b 9
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [9],
            [10],
            [1],
            [11],
        ])

        var m : Array<string> = []
        var isValidLL1 : boolean = true
        var hasTerminated : boolean = false
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    })
                    if (ll1.tokens[j].type.isTerminal) {
                        hasTerminated = true
                    }
                    if (gps.length>0) {
                        isValidLL1 = false
                    }
                    m.push(`${A} ${a} ${gps.join('/')}`)
                }
            }
        }
        if (!hasTerminated) {
            isValidLL1 = false
        }

        var m2 : Array<string> = [
            "S a S -> a",
            "S i S -> i E t S S'",
            "S' e S' -> e S/S' -> <EMPTY>",
            "S' <TERMINATED> S' -> <EMPTY>",
            "E b E -> b",
        ]

        // console.log(minus(m, m2))
        // console.log(minus(m2, m))

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 3', () => {
        var i_ = new TokenType('i', 'i', true)
        var t_ = new TokenType('t', 't', true)
        var e_ = new TokenType('e', 'e', true)
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            i_, t_, a_, e_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> a S
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                value : t.value
            }
        })).toEqual([
            {type : '<TERMINATED>', value : '<TERMINATED>'},
            {type : '<EMPTY>', value : '<EMPTY>'},
            {type : '<ERROR>', value : '<ERROR>'},
            {type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {type : 'GrammarSymbol', value : 'S'},
            {type : 'a', value : 'a'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5], //S
            [5], //a
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0],//S 2
            [5],//a 3
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S a S -> a S",
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 3-1', () => {

        var lexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> a S
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'a'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5], //S
            [5], //a
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0],//S 2
            [5],//a 3
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S a S -> a S",
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 4', () => {
        var i_ = new TokenType('i', 'i', true)
        var t_ = new TokenType('t', 't', true)
        var e_ = new TokenType('e', 'e', true)
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            i_, t_, a_, e_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> S a
        `
        var tokens = lexicalAnalysis.toTokens(value)
        try {
            var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        } catch(error) {
            expect(error.message).toEqual('Can not eliminate the immediate left recursion')
        }
    
    })

    test('LL1SyntaxAnalysis 4-1', () => {
        var lexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> S a
        `
        var tokens = lexicalAnalysis.toTokens(value)
        try {
            var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        } catch(error) {
            expect(error.message).toEqual('Can not eliminate the immediate left recursion')
        }
    
    })

    test('LL1SyntaxAnalysis 5', () => {
        var i_ = new TokenType('i', 'i', true)
        var t_ = new TokenType('t', 't', true)
        var e_ = new TokenType('e', 'e', true)
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            i_, t_, a_, e_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> a A
        A -> b S
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                value : t.value
            }
        })).toEqual([
            {type : '<TERMINATED>', value : '<TERMINATED>'},
            {type : '<EMPTY>', value : '<EMPTY>'},
            {type : '<ERROR>', value : '<ERROR>'},
            {type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {type : 'GrammarSymbol', value : 'S'},
            {type : 'a', value : 'a'},
            {type : 'GrammarSymbol', value : 'A'},
            {type : 'b', value : 'b'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5], //S
            [5], //a
            [7], //A
            [7], //b
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0],//S 2
            [7],//a 3 
            [0],//A 4 
            [5],//b 5 
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [7], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S a S -> a A",
            "A b A -> b S"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 5-1', () => {
        var lexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> a A
        A -> b S
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(false)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'a'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'A'},
            {isTerminal: true, type : 'GrammarSymbol', value : 'b'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [5], //S
            [5], //a
            [7], //A
            [7], //b
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0],//S 2
            [7],//a 3 
            [0],//A 4 
            [5],//b 5 
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [7], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S a S -> a A",
            "A b A -> b S"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 6', () => {
        var ob_ = new TokenType('(', '\\(', true)
        var cb_ = new TokenType(')', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            ob_, cb_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> ( S ) S
        S -> <EMPTY>
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                value : t.value
            }
        })).toEqual([
            {type : '<TERMINATED>', value : '<TERMINATED>'},
            {type : '<EMPTY>', value : '<EMPTY>'},
            {type : '<ERROR>', value : '<ERROR>'},
            {type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {type : 'GrammarSymbol', value : 'S'},
            {type : '(', value : '('},
            {type : ')', value : ')'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [1,5], //S
            [5], //(
            [6], //)
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0,6],//S 2
            [5],//( 3
            [5,0,6],//) 4
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [1], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S <TERMINATED> S -> <EMPTY>",
            "S ( S -> ( S ) S",
            "S ) S -> <EMPTY>"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 6-1', () => {
        var lexicalAnalysis = new LexicalAnalysis([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])


        var value = `
        S -> ( S ) S
        S -> <EMPTY>
        `
        var tokens = lexicalAnalysis.toTokens(value)
        var ll1 = new LL1SyntaxAnalysis().initWithTokens(tokens)
        expect(ll1.isLL1()).toEqual(true)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S'},
            {isTerminal: true, type : 'GrammarSymbol', value : '('},
            {isTerminal: true, type : 'GrammarSymbol', value : ')'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [1,5], //S
            [5], //(
            [6], //)
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0,6],//S 2
            [5],//( 3
            [5,0,6],//) 4
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [1], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S <TERMINATED> S -> <EMPTY>",
            "S ( S -> ( S ) S",
            "S ) S -> <EMPTY>"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })

    test('LL1SyntaxAnalysis 6-2', () => {
        

        var languageDefinition = `
        S -> ( S ) S
        S -> <EMPTY>
        `
        var ll1 = new LL1SyntaxAnalysis().initWithLanguageDefinition(languageDefinition)
        expect(ll1.isLL1()).toEqual(true)
        
        expect(ll1.tokens.map(t=>{
            return {
                type : t.type.name,
                isTerminal : t.type.isTerminal,
                value : t.value
            }
        })).toEqual([
            {isTerminal: true, type : '<TERMINATED>', value : '<TERMINATED>'},
            {isTerminal: true, type : '<EMPTY>', value : '<EMPTY>'},
            {isTerminal: true, type : '<ERROR>', value : '<ERROR>'},
            {isTerminal: true, type : '<UNKNOWN>', value : '<UNKNOWN>'},
            {isTerminal: false, type : 'GrammarSymbol', value : 'S'},
            {isTerminal: true, type : 'GrammarSymbol', value : '('},
            {isTerminal: true, type : 'GrammarSymbol', value : ')'},
        ])

        expect(ll1.first).toEqual([
            [0], //<TERMINATED>
            [1], //<EMPTY>
            [2], //<ERROR>
            [3], //<UNKNOWN>
            [1,5], //S
            [5], //(
            [6], //)
        ])

        expect(ll1.follow).toEqual([
            [], //<TERMINATED> 0
            [], //<EMPTY> 1
            [], //<ERROR> 2
            [], //<UNKNOWN> 3
            [0,6],//S 2
            [5],//( 3
            [5,0,6],//) 4
        ])

        expect(ll1.firstOfGrammaProduction).toEqual([
            [5], 
            [1], 
        ])

        var m : Array<string> = []
        for (var i=0;i<ll1.tokens.length;i++) {
            for (var j=0;j<ll1.tokens.length;j++) {
                if (ll1.predictiveParsingTable[i][j].length>0) {
                    var A = ll1.tokens[i].toSimpleString()
                    var a = ll1.tokens[j].toSimpleString()
                    var gps = ll1.predictiveParsingTable[i][j].map(pgi=>{
                        return ll1.grammerProductions[pgi].toSimpleString()
                    }).join('/')
                    m.push(`${A} ${a} ${gps}`)
                }
            }
        }

        var m2 : Array<string> = [
            "S <TERMINATED> S -> <EMPTY>",
            "S ( S -> ( S ) S",
            "S ) S -> <EMPTY>"
        ]

        expect(isSetEqual(m, m2)).toBe(true)

    })
})