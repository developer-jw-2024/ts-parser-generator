import { LexicalAnalyzer, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"

import { orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from './FileUtil'
import { SyntaxAnalyzer } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalyzer } from "../src/SyntaxAnalysis/LL1"
import { LRAction, LRActionType, LRSyntaxAnalyzer } from "../src/SyntaxAnalysis/LR"

function appendToFixLen(value : string, len : number) : string {
    return value + new Array(len-value.length).fill(0).map(t=>' ').join('')
}
function convertActionList(lrSyntaxAnalyzer : LRSyntaxAnalyzer) : Array<string> {
    var result : Array<string> = []
    var actions = lrSyntaxAnalyzer.actions
    var stateLen = lrSyntaxAnalyzer.states.length
    var tokenLen = lrSyntaxAnalyzer.tokens.length
    for (var s=0;s<stateLen;s++) {
        for (var t=0;t<tokenLen;t++) {
            var token = lrSyntaxAnalyzer.tokens[t]
            
            if (actions[s][t]) {
                if (token.type.isTerminal) {
                    if (actions[s][t].type==LRActionType.SHIFT) {
                        result.push(`${s} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Shift ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.REDUCE) {
                        result.push(`${s} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Reduce ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ACCEPT) {
                        result.push(`${s} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Accept ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ERROR) {
                        result.push(`${s} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Error ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.GOTO) {
                        throw new Error('Can not have GOTO action')
                    }
                } else {
                    if (actions[s][t].type==LRActionType.GOTO) {
                        result.push(`${s} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Goto ${actions[s][t].value}`)    
                    } else {
                        throw new Error('Can not have this action')
                    } 
                }    
            }
        }
    }
    return result
}

describe('Lr', () => {
    test('LR 1', () => {
        var PLUS = new TokenType().init('PLUS', '\\+', true)
        var STAR = new TokenType().init('STAR', '\\*', true)
        var ID = new TokenType().init('ID', 'id', true)
        var OPENBRACKET = new TokenType().init('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType().init('CLOSEBRACKET', '\\)', true)

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            PLUS, STAR, ID, 
            OPENBRACKET, CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalyzer.tokenize(value)
        var lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithTokens(tokens)
        expect(lrSyntaxAnalyzer.states.length).toEqual(12)
        // console.log(lrSyntaxAnalyzer.tokens.filter(t=>!(t.type.isTerminal)).map((t,i)=>`${i}-${t.toSimpleString()}`).join('   '))
        //0-<TERMINATED>   1-<EMPTY>   2-E   3-+   4-T   5-*   6-F   7-(   8-)   9-id   10-E1
        expect(lrSyntaxAnalyzer.actions[1][0]).toEqual({type: LRActionType.ACCEPT, value: -1})
        // console.log(lrSyntaxAnalyzer.grammerProductions.map(gp=>gp.toString()).join('\n'))
        // expect(isSetEqual())
        expect(isSetEqual(
            convertActionList(lrSyntaxAnalyzer),
            [
                '0 E Goto 1',
                '0 T Goto 2',
                '0 F Goto 3',
                '0 ( Shift 4',
                '0 id Shift 5',
                '1 <TERMINATED> Accept -1',
                '1 + Shift 6',
                '2 <TERMINATED> Reduce 1',
                '2 + Reduce 1',
                '2 * Shift 7',
                '2 ) Reduce 1',
                '3 <TERMINATED> Reduce 3',
                '3 + Reduce 3',
                '3 * Reduce 3',
                '3 ) Reduce 3',
                '4 E Goto 8',
                '4 T Goto 2',
                '4 F Goto 3',
                '4 ( Shift 4',
                '4 id Shift 5',
                '5 <TERMINATED> Reduce 5',
                '5 + Reduce 5',
                '5 * Reduce 5',
                '5 ) Reduce 5',
                '6 T Goto 9',
                '6 F Goto 3',
                '6 ( Shift 4',
                '6 id Shift 5',
                '7 F Goto 10',
                '7 ( Shift 4',
                '7 id Shift 5',
                '8 + Shift 6',
                '8 ) Shift 11',
                '9 <TERMINATED> Reduce 0',
                '9 + Reduce 0',
                '9 * Shift 7',
                '9 ) Reduce 0',
                '10 <TERMINATED> Reduce 2',
                '10 + Reduce 2',
                '10 * Reduce 2',
                '10 ) Reduce 2',
                '11 <TERMINATED> Reduce 4',
                '11 + Reduce 4',
                '11 * Reduce 4',
                '11 ) Reduce 4'
              ]
        )).toEqual(true)
        
    })

    test('LR 2', () => {
        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalyzer.tokenize(value)
        var lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithTokens(tokens)
        expect(lrSyntaxAnalyzer.states.length).toEqual(12)
        // console.log(lrSyntaxAnalyzer.tokens.filter(t=>!(t.type.isTerminal)).map((t,i)=>`${i}-${t.toSimpleString()}`).join('   '))
        //0-<TERMINATED>   1-<EMPTY>   2-E   3-+   4-T   5-*   6-F   7-(   8-)   9-id   10-E1
        expect(lrSyntaxAnalyzer.actions[1][0]).toEqual({type: LRActionType.ACCEPT, value: -1})
        // console.log(lrSyntaxAnalyzer.grammerProductions.map(gp=>gp.toString()).join('\n'))
        // expect(isSetEqual())
        expect(isSetEqual(
            convertActionList(lrSyntaxAnalyzer),
            [
                '0 E Goto 1',
                '0 T Goto 2',
                '0 F Goto 3',
                '0 ( Shift 4',
                '0 id Shift 5',
                '1 <TERMINATED> Accept -1',
                '1 + Shift 6',
                '2 <TERMINATED> Reduce 1',
                '2 + Reduce 1',
                '2 * Shift 7',
                '2 ) Reduce 1',
                '3 <TERMINATED> Reduce 3',
                '3 + Reduce 3',
                '3 * Reduce 3',
                '3 ) Reduce 3',
                '4 E Goto 8',
                '4 T Goto 2',
                '4 F Goto 3',
                '4 ( Shift 4',
                '4 id Shift 5',
                '5 <TERMINATED> Reduce 5',
                '5 + Reduce 5',
                '5 * Reduce 5',
                '5 ) Reduce 5',
                '6 T Goto 9',
                '6 F Goto 3',
                '6 ( Shift 4',
                '6 id Shift 5',
                '7 F Goto 10',
                '7 ( Shift 4',
                '7 id Shift 5',
                '8 + Shift 6',
                '8 ) Shift 11',
                '9 <TERMINATED> Reduce 0',
                '9 + Reduce 0',
                '9 * Shift 7',
                '9 ) Reduce 0',
                '10 <TERMINATED> Reduce 2',
                '10 + Reduce 2',
                '10 * Reduce 2',
                '10 ) Reduce 2',
                '11 <TERMINATED> Reduce 4',
                '11 + Reduce 4',
                '11 * Reduce 4',
                '11 ) Reduce 4'
              ]
        )).toEqual(true)
        
    })

    test('LR 3', () => {
        var languageDefinition = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        // var tokens = lexicalAnalysis.tokenize(value)
        var lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithLanguageDefinition(languageDefinition)
        expect(lrSyntaxAnalyzer.states.length).toEqual(12)
        // console.log(lrSyntaxAnalyzer.tokens.filter(t=>!(t.type.isTerminal)).map((t,i)=>`${i}-${t.toSimpleString()}`).join('   '))
        //0-<TERMINATED>   1-<EMPTY>   2-E   3-+   4-T   5-*   6-F   7-(   8-)   9-id   10-E1
        expect(lrSyntaxAnalyzer.actions[1][0]).toEqual({type: LRActionType.ACCEPT, value: -1})
        // console.log(lrSyntaxAnalyzer.grammerProductions.map(gp=>gp.toString()).join('\n'))
        // expect(isSetEqual())
        expect(isSetEqual(
            convertActionList(lrSyntaxAnalyzer),
            [
                '0 E Goto 1',
                '0 T Goto 2',
                '0 F Goto 3',
                '0 ( Shift 4',
                '0 id Shift 5',
                '1 <TERMINATED> Accept -1',
                '1 + Shift 6',
                '2 <TERMINATED> Reduce 1',
                '2 + Reduce 1',
                '2 * Shift 7',
                '2 ) Reduce 1',
                '3 <TERMINATED> Reduce 3',
                '3 + Reduce 3',
                '3 * Reduce 3',
                '3 ) Reduce 3',
                '4 E Goto 8',
                '4 T Goto 2',
                '4 F Goto 3',
                '4 ( Shift 4',
                '4 id Shift 5',
                '5 <TERMINATED> Reduce 5',
                '5 + Reduce 5',
                '5 * Reduce 5',
                '5 ) Reduce 5',
                '6 T Goto 9',
                '6 F Goto 3',
                '6 ( Shift 4',
                '6 id Shift 5',
                '7 F Goto 10',
                '7 ( Shift 4',
                '7 id Shift 5',
                '8 + Shift 6',
                '8 ) Shift 11',
                '9 <TERMINATED> Reduce 0',
                '9 + Reduce 0',
                '9 * Shift 7',
                '9 ) Reduce 0',
                '10 <TERMINATED> Reduce 2',
                '10 + Reduce 2',
                '10 * Reduce 2',
                '10 ) Reduce 2',
                '11 <TERMINATED> Reduce 4',
                '11 + Reduce 4',
                '11 * Reduce 4',
                '11 ) Reduce 4'
              ]
        )).toEqual(true)
        
    })

    test('LR isValid', () => {

        var lexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalyzer.DERIVATION,
            SyntaxAnalyzer.ENTER,
            SyntaxAnalyzer.SPACES,
            SyntaxAnalyzer.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalyzer.tokenize(value)
        var lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithTokens(tokens)

        var PLUS = new TokenType().init('+', '\\+', true)
        var STAR = new TokenType().init('*', '\\*', true)
        var ID = new TokenType().init('id', '[0-9]+', true)
        var OPENBRACKET = new TokenType().init('(', '\\(', true)
        var CLOSEBRACKET = new TokenType().init(')', '\\)', true)

        var languageTokenLexicalAnalyzer = new LexicalAnalyzer().initWithTokenTypes([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET
        ])

        lrSyntaxAnalyzer.setTokenTypeLexicalAnalyzer(languageTokenLexicalAnalyzer)
        expect(lrSyntaxAnalyzer.isValidWithTokenTypeLexicalAnalyzer("3+4*6")).toEqual(true)
        // var columnLens : Array<number> = lrSyntaxAnalyzer.analysisSteps.map(s=>{
        //     return [s.stack.length, s.symbols.length, s.inputs.length, s.action.length]
        // }).reduce((pre, value)=>{
        //     return pre.map((p, i)=> Math.max(pre[i], value[i]))
        // }, [0, 0, 0, 0])
        // columnLens = columnLens.map((v)=>v+10)


        // console.log(
        //     lrSyntaxAnalyzer.analysisSteps.map(s=>{
        //         return [appendToFixLen(`[ ${s.stack} ]`, columnLens[0]),
        //                 appendToFixLen(`[ ${s.symbols} ]`, columnLens[1]),
        //                 appendToFixLen(`[ ${s.inputs} ]`, columnLens[2]),
        //                 `[ ${s.action} ]`].join('')
        //     }).join('\n')
        // )
    })
})