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
    /*
    test('SyntaxAnalysis.eliminateLeftRecursion 1', ()=>{
        var a_ = new TokenType('a', 'a', true)
        var b_ = new TokenType('b', 'b', true)
        var c_ = new TokenType('c', 'd', true)
        var d_ = new TokenType('c', 'd', true)

        var lexicalAnalysis = new LexicalAnalysis([
            a_, b_, c_, d_,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var gptext = `

        A -> A d

        A -> B a
        B -> b
        A -> d

        B -> c
        `

        var tokens = lexicalAnalysis.toTokens(gptext)
        var syntaxAnalysis = new SyntaxAnalysis(tokens)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(2, [2,3]),
            new IndexGrammarProduction(2, [4,5]),
            new IndexGrammarProduction(4, [6]),
            new IndexGrammarProduction(2, [3]),
            new IndexGrammarProduction(4, [7]),
        ])).toEqual(true)

        
        console.log(syntaxAnalysis.tokens.map(t=>t.toSimpleString()))
        syntaxAnalysis.eliminateLeftRecursion()
        console.log(syntaxAnalysis.indexGrammerProductions)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(4, [6]),
            new IndexGrammarProduction(4, [7]),

            new IndexGrammarProduction(2, [3, 8]),
            new IndexGrammarProduction(2, [6, 5, 8]),
            new IndexGrammarProduction(2, [7, 5, 8]),

            new IndexGrammarProduction(8, [3, 8]),
            new IndexGrammarProduction(8, [1]),
        ])).toEqual(true)
        
    })
    */

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
        console.log(syntaxAnalysis.indexGrammerProductionFlags)
        syntaxAnalysis.eliminateLeftRecursion()
        // syntaxAnalysis.replaceGrammerProduction(2, 3)
        console.log(syntaxAnalysis.indexGrammerProductionFlags)
        console.log(syntaxAnalysis.indexGrammerProductions)
        // syntaxAnalysis.eliminateLeftRecursion()
        /*
        console.log(syntaxAnalysis.tokens.map(t=>t.toSimpleString()))
        console.log(syntaxAnalysis.indexGrammerProductions)
        
        expect(isIndexGrammarProductionSetEqual(syntaxAnalysis.indexGrammerProductions,[
            new IndexGrammarProduction(4, [6]),
            new IndexGrammarProduction(4, [7]),

            new IndexGrammarProduction(2, [3, 8]),
            new IndexGrammarProduction(2, [6, 5, 8]),
            new IndexGrammarProduction(2, [7, 5, 8]),

            new IndexGrammarProduction(8, [3, 8]),
            new IndexGrammarProduction(8, [1]),
        ])).toEqual(true)
        */
        
    })
})
  