import { LexicalAnalyzer, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { SyntaxAnalyzer, IndexGrammarProduction } from "../src/SyntaxAnalysis/SyntaxAnalysis"

import { FileUtils } from "./FileUtil"
import { isSetEqual } from '../src/Utils/SetUtils'

function isIndexGrammarProductionSubSetToAnother(list1 : Array<IndexGrammarProduction>, list2 : Array<IndexGrammarProduction>) : boolean {
    var count : number = 0
    for (var i=0;i<list1.length;i++) {
        var obj = list1[i]
        if (list2.filter(e=>e.isEqual(obj)).length>0) count++
    }
    return (count==list1.length) 
}

function isIndexGrammarProductionSetEqual(list1 : Array<IndexGrammarProduction>, list2 : Array<IndexGrammarProduction>) : boolean {
    return isIndexGrammarProductionSubSetToAnother(list1, list2) &&
            isIndexGrammarProductionSubSetToAnother(list2, list1)
}


describe('syntaxAnalyzer', ()  => {
    
    test('SyntaxAnalyzer.eliminateLeftRecursion 0', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `

        S -> A a

        A -> S b
        `

        var tokens = lexicalAnalyzer.tokenize(gptext)
        // 0: <T> 1: <E> 2:S 3:A 4:a 5:b
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(5, [4, 7]),
        ])).toEqual(true)

        
        try {
            syntaxAnalyzer.eliminateLeftRecursion()
        } catch(error) {
            expect(error.message).toEqual('Can not eliminate the immediate left recursion')
        }
        
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 1', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `

        S -> A a

        A -> S b
        `

        // 0: <T> 1: <E> 2:S 3:A 4:a 5:b
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(5, [4, 7]),
        ])).toEqual(true)

        
        try {
            syntaxAnalyzer.eliminateLeftRecursion()
        } catch(error) {
            expect(error.message).toEqual('Can not eliminate the immediate left recursion')
        }
        
    })
    

    test('SyntaxAnalyzer.eliminateLeftRecursion 2', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
        ])).toEqual(true)
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true ,true])
        syntaxAnalyzer.eliminateLeftRecursion()
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true, true, true, true])
                
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [7, 9, 10]),
            new IndexGrammarProduction().init(5, [10]),
            new IndexGrammarProduction().init(10, [8, 10]),
            new IndexGrammarProduction().init(10, [6, 9, 10]),
            new IndexGrammarProduction().init(10, [1]),

        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 2_1', ()=>{

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
        ])).toEqual(true)
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true ,true])
        syntaxAnalyzer.eliminateLeftRecursion()
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true, true, true, true])
                
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [7, 9, 10]),
            new IndexGrammarProduction().init(5, [10]),
            new IndexGrammarProduction().init(10, [8, 10]),
            new IndexGrammarProduction().init(10, [6, 9, 10]),
            new IndexGrammarProduction().init(10, [1]),

        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 3', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true ,true])).toBe(true)

        syntaxAnalyzer.eliminateTheImmediateLeftRecursion(5)
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, false, false, false, true, true, true ,true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
            new IndexGrammarProduction().init(5, [4, 9, 10]),
            new IndexGrammarProduction().init(5, [10]),
            new IndexGrammarProduction().init(10, [8, 10]),
            new IndexGrammarProduction().init(10, [1]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 3-1', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true ,true])).toBe(true)

        syntaxAnalyzer.eliminateTheImmediateLeftRecursion(5)
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, false, false, false, true, true, true ,true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6]),
            new IndexGrammarProduction().init(4, [7]),
            new IndexGrammarProduction().init(5, [5, 8]),
            new IndexGrammarProduction().init(5, [4, 9]),
            new IndexGrammarProduction().init(5, [1]),
            new IndexGrammarProduction().init(5, [4, 9, 10]),
            new IndexGrammarProduction().init(5, [10]),
            new IndexGrammarProduction().init(10, [8, 10]),
            new IndexGrammarProduction().init(10, [1]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 4', ()=>{
        var i_ = new TokenType().init('i', 'i', true)
        var t_ = new TokenType().init('t', 't', true)
        var e_ = new TokenType().init('e', 'e', true)
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            i_, t_, e_, a_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> i E t S
        S -> i E t S e S
        S -> a
        E -> b
        `
        
        // 0: <T> 1:<E> 2:S 3:i 4:E 5:t 6:e 7:a 8:b 9:S'
        var tokens = lexicalAnalyzer.tokenize(gptext)
        
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true])).toBe(true)

        syntaxAnalyzer.eliminateLeftRecursion()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalyzer.eliminateLeftRecursion 4-1', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> i E t S
        S -> i E t S e S
        S -> a
        E -> b
        `
        
        // 0: <T> 1:<E> 2:S 3:i 4:E 5:t 6:e 7:a 8:b 9:S'
        var tokens = lexicalAnalyzer.tokenize(gptext)
        
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true])).toBe(true)

        syntaxAnalyzer.eliminateLeftRecursion()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalyzer.leftCommonFactor', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)
        var e_ = new TokenType().init('e', 'e', true)
        var f_ = new TokenType().init('f', 'f', true)
        var g_ = new TokenType().init('g', 'g', true)
        var h_ = new TokenType().init('h', 'h', true)
        var i_ = new TokenType().init('i', 'i', true)
        var j_ = new TokenType().init('j', 'j', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b e f i 
        A -> a b c d h
        A -> a b e f j
        A -> <EMPTY>
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        expect(syntaxAnalyzer.leftCommonFactor(0, 1)).toEqual([5, 6])
        expect(syntaxAnalyzer.leftCommonFactor(0, 2)).toEqual(null)
    })

    test('SyntaxAnalyzer.leftCommonFactor 1', ()=>{

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b e f i 
        A -> a b c d h
        A -> a b e f j
        A -> <EMPTY>
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        expect(syntaxAnalyzer.leftCommonFactor(0, 1)).toEqual([5, 6])
        expect(syntaxAnalyzer.leftCommonFactor(0, 2)).toEqual(null)
    })

    test('SyntaxAnalyzer.leftFactoring 1-0', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> c g
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 8, 9]),
            new IndexGrammarProduction().init(4, [7, 9]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 1', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)
        var e_ = new TokenType().init('e', 'e', true)
        var f_ = new TokenType().init('f', 'f', true)
        var g_ = new TokenType().init('g', 'g', true)
        var h_ = new TokenType().init('h', 'h', true)
        var i_ = new TokenType().init('i', 'i', true)
        var j_ = new TokenType().init('j', 'j', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> c g
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 8, 9]),
            new IndexGrammarProduction().init(4, [7, 9]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 2', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)
        var e_ = new TokenType().init('e', 'e', true)
        var f_ = new TokenType().init('f', 'f', true)
        var g_ = new TokenType().init('g', 'g', true)
        var h_ = new TokenType().init('h', 'h', true)
        var i_ = new TokenType().init('i', 'i', true)
        var j_ = new TokenType().init('j', 'j', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b d
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 10]),
            new IndexGrammarProduction().init(10, [7, 8, 9]),
            new IndexGrammarProduction().init(10, [8]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 2-1', ()=>{

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b d
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 10]),
            new IndexGrammarProduction().init(10, [7, 8, 9]),
            new IndexGrammarProduction().init(10, [8]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 3', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)
        var e_ = new TokenType().init('e', 'e', true)
        var f_ = new TokenType().init('f', 'f', true)
        var g_ = new TokenType().init('g', 'g', true)
        var h_ = new TokenType().init('h', 'h', true)
        var i_ = new TokenType().init('i', 'i', true)
        var j_ = new TokenType().init('j', 'j', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 10]),
            new IndexGrammarProduction().init(10, [7, 8, 9]),
            new IndexGrammarProduction().init(10, [1]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 3-1', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b
        `
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        syntaxAnalyzer.leftFactoring()

        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 10]),
            new IndexGrammarProduction().init(10, [7, 8, 9]),
            new IndexGrammarProduction().init(10, [1]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 4', ()=>{
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)
        var c_ = new TokenType().init('c', 'c', true)
        var d_ = new TokenType().init('d', 'd', true)
        var e_ = new TokenType().init('e', 'e', true)
        var f_ = new TokenType().init('f', 'f', true)
        var g_ = new TokenType().init('g', 'g', true)
        var h_ = new TokenType().init('h', 'h', true)
        var i_ = new TokenType().init('i', 'i', true)
        var j_ = new TokenType().init('j', 'j', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b c e
        S -> a b d
        `
         
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        

        // console.log('---------------------------')
        syntaxAnalyzer.leftFactoring()
        // console.log()
        
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(11, [8, 9]),
            new IndexGrammarProduction().init(11, [10]),
            new IndexGrammarProduction().init(4, [5, 6, 12]),
            new IndexGrammarProduction().init(12, [8]),
            new IndexGrammarProduction().init(12, [7, 11]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 4-1', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b c e
        S -> a b d
        `
         
        
        var tokens = lexicalAnalyzer.tokenize(gptext)
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        

        // console.log('---------------------------')
        syntaxAnalyzer.leftFactoring()
        // console.log()
        
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(11, [8, 9]),
            new IndexGrammarProduction().init(11, [10]),
            new IndexGrammarProduction().init(4, [5, 6, 12]),
            new IndexGrammarProduction().init(12, [8]),
            new IndexGrammarProduction().init(12, [7, 11]),
        ])).toEqual(true)
    })

    test('SyntaxAnalyzer.leftFactoring 5', ()=>{
        var i_ = new TokenType().init('i', 'i', true)
        var t_ = new TokenType().init('t', 't', true)
        var e_ = new TokenType().init('e', 'e', true)
        var a_ = new TokenType().init('a', 'a', true)
        var b_ = new TokenType().init('b', 'b', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            i_, t_, e_, a_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> i E t S
        S -> i E t S e S
        S -> a
        E -> b
        `
        
        // 0: <T> 1:<E> 2:S 3:i 4:E 5:t 6:e 7:a 8:b 9:S'
        var tokens = lexicalAnalyzer.tokenize(gptext)
        
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true])).toBe(true)

        syntaxAnalyzer.leftFactoring()
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true ,true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 11]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(11, [8, 4]),
            new IndexGrammarProduction().init(11, [1]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalyzer.leftFactoring 5-1', ()=>{
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var gptext = `
        S -> i E t S
        S -> i E t S e S
        S -> a
        E -> b
        `
        
        // 0: <T> 1:<E> 2:S 3:i 4:E 5:t 6:e 7:a 8:b 9:S'
        var tokens = lexicalAnalyzer.tokenize(gptext)
        
        var syntaxAnalyzer = new SyntaxAnalyzer().initWithTokens(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4]),
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 8, 4]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalyzer.indexGrammerProductionFlags, [true, true, true, true])).toBe(true)

        syntaxAnalyzer.leftFactoring()
        expect(syntaxAnalyzer.indexGrammerProductionFlags).toEqual([true, true, true, true ,true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalyzer.indexGrammerProductions,[
            new IndexGrammarProduction().init(4, [5, 6, 7, 4, 11]),
            new IndexGrammarProduction().init(4, [9]),
            new IndexGrammarProduction().init(11, [8, 4]),
            new IndexGrammarProduction().init(11, [1]),
            new IndexGrammarProduction().init(6, [10]),
        ])).toEqual(true)


        
    })
})
  