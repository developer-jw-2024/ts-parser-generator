import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { SyntaxAnalysis, IndexGrammarProduction } from "../src/SyntaxAnalysis/SyntaxAnalysis"

import { FileUtils } from "../src/Utils/FileUtil"
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


describe('SyntaxAnalysis', ()  => {
    
    test('SyntaxAnalysis.eliminateLeftRecursion 1', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `

        S -> A a

        A -> S b
        `

        // 0: <T> 1: <E> 2:S 3:A 4:a 5:b
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4]),
            new IndexGrammarProduction(3, [2, 5]),
        ])).toEqual(true)

        
        try {
            syntaxAnalysis.eliminateLeftRecursion()
        } catch(error) {
            expect(error.message).toEqual('Can not eliminate the immediate left recursion')
        }
        
    })
    

    test('SyntaxAnalysis.eliminateLeftRecursion 2', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4]),
            new IndexGrammarProduction(2, [5]),
            new IndexGrammarProduction(3, [3, 6]),
            new IndexGrammarProduction(3, [2, 7]),
            new IndexGrammarProduction(3, [1]),
        ])).toEqual(true)
        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, true, true ,true])
        syntaxAnalysis.eliminateLeftRecursion()
        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, true, true, true, true, true])
                
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4]),
            new IndexGrammarProduction(2, [5]),
            new IndexGrammarProduction(3, [5, 7, 8]),
            new IndexGrammarProduction(3, [8]),
            new IndexGrammarProduction(8, [6, 8]),
            new IndexGrammarProduction(8, [4, 7, 8]),
            new IndexGrammarProduction(8, [1]),

        ])).toEqual(true)


        
    })

    test('SyntaxAnalysis.eliminateLeftRecursion 3', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> A a
        S -> b
        A -> A c
        A -> S d
        A -> <EMPTY>
        `
        
        // 0: <T> 1:<E> 2:S 3:A 4:a 5:b 6:c 7:d
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4]),
            new IndexGrammarProduction(2, [5]),
            new IndexGrammarProduction(3, [3, 6]),
            new IndexGrammarProduction(3, [2, 7]),
            new IndexGrammarProduction(3, [1]),
        ])).toEqual(true)
        expect(isSetEqual(syntaxAnalysis.indexGrammerProductionFlags, [true, true, true, true ,true])).toBe(true)

        syntaxAnalysis.eliminateTheImmediateLeftRecursion(3)
        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, false, false, false, true, true, true ,true])
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4]),
            new IndexGrammarProduction(2, [5]),
            new IndexGrammarProduction(3, [3, 6]),
            new IndexGrammarProduction(3, [2, 7]),
            new IndexGrammarProduction(3, [1]),
            new IndexGrammarProduction(3, [2, 7, 8]),
            new IndexGrammarProduction(3, [8]),
            new IndexGrammarProduction(8, [6, 8]),
            new IndexGrammarProduction(8, [1]),
        ])).toEqual(true)


        
    })

    test('SyntaxAnalysis.eliminateLeftRecursion 1', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)
        var e_ = new TokenType('e', 'e', true)
        var f_ = new TokenType('f', 'f', true)
        var g_ = new TokenType('g', 'g', true)
        var h_ = new TokenType('h', 'h', true)
        var i_ = new TokenType('i', 'i', true)
        var j_ = new TokenType('j', 'j', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b e f i 
        A -> a b c d h
        A -> a b e f j
        A -> <EMPTY>
        `
        
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        expect(syntaxAnalysis.leftCommonFactor(0, 1)).toEqual([3, 4])
        expect(syntaxAnalysis.leftCommonFactor(0, 2)).toEqual(null)
    })

    test('SyntaxAnalysis.eliminateLeftRecursion 2', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)
        var e_ = new TokenType('e', 'e', true)
        var f_ = new TokenType('f', 'f', true)
        var g_ = new TokenType('g', 'g', true)
        var h_ = new TokenType('h', 'h', true)
        var i_ = new TokenType('i', 'i', true)
        var j_ = new TokenType('j', 'j', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> c g
        `
        
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        syntaxAnalysis.leftFactoring()

        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4, 5, 6, 7]),
            new IndexGrammarProduction(2, [5, 7]),
        ])).toEqual(true)
    })

    test('SyntaxAnalysis.eliminateLeftRecursion 3', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)
        var e_ = new TokenType('e', 'e', true)
        var f_ = new TokenType('f', 'f', true)
        var g_ = new TokenType('g', 'g', true)
        var h_ = new TokenType('h', 'h', true)
        var i_ = new TokenType('i', 'i', true)
        var j_ = new TokenType('j', 'j', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b d
        `
        
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        syntaxAnalysis.leftFactoring()

        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4, 8]),
            new IndexGrammarProduction(8, [5, 6, 7]),
            new IndexGrammarProduction(8, [6]),
        ])).toEqual(true)
    })

    test('SyntaxAnalysis.eliminateLeftRecursion 4', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)
        var e_ = new TokenType('e', 'e', true)
        var f_ = new TokenType('f', 'f', true)
        var g_ = new TokenType('g', 'g', true)
        var h_ = new TokenType('h', 'h', true)
        var i_ = new TokenType('i', 'i', true)
        var j_ = new TokenType('j', 'j', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b
        `
        
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        syntaxAnalysis.leftFactoring()

        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [3, 4, 8]),
            new IndexGrammarProduction(8, [5, 6, 7]),
            new IndexGrammarProduction(8, [1]),
        ])).toEqual(true)
    })


    test('SyntaxAnalysis.eliminateLeftRecursion 5', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'c', true)
        var d_ = new TokenType('d', 'd', true)
        var e_ = new TokenType('e', 'e', true)
        var f_ = new TokenType('f', 'f', true)
        var g_ = new TokenType('g', 'g', true)
        var h_ = new TokenType('h', 'h', true)
        var i_ = new TokenType('i', 'i', true)
        var j_ = new TokenType('j', 'j', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_, e_, f_, g_, h_, i_, j_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `
        S -> a b c d g
        S -> a b c e
        S -> a b d
        `
         
        
        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        

        // console.log('---------------------------')
        syntaxAnalysis.leftFactoring()
        // console.log()
        
        expect(syntaxAnalysis.indexGrammerProductionFlags).toEqual([true, true, true, true, true])
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(9, [6, 7]),
            new IndexGrammarProduction(9, [8]),
            new IndexGrammarProduction(2, [3,4, 10]),
            new IndexGrammarProduction(10, [6]),
            new IndexGrammarProduction(10, [5, 9]),
        ])).toEqual(true)
    })
})
  