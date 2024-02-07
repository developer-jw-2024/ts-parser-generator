import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { RegularExpression } from "../index"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalysis } from "../src/SyntaxAnalysis/LL1"
import { LRAction, LRActionType, LRSyntaxAnalysis } from "../src/SyntaxAnalysis/LR"

function convertActionList(lrSyntaxAnalysis : LRSyntaxAnalysis) : Array<string> {
    var result : Array<string> = []
    var actions = lrSyntaxAnalysis.actions
    var stateLen = lrSyntaxAnalysis.states.length
    var tokenLen = lrSyntaxAnalysis.tokens.length
    for (var s=0;s<stateLen;s++) {
        for (var t=0;t<tokenLen;t++) {
            var token = lrSyntaxAnalysis.tokens[t]
            
            if (actions[s][t]) {
                if (token.type.isTerminal) {
                    if (actions[s][t].type==LRActionType.SHIFT) {
                        result.push(`${s} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Shift ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.REDUCE) {
                        result.push(`${s} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Reduce ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ACCEPT) {
                        result.push(`${s} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Accept ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ERROR) {
                        result.push(`${s} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Error ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.GOTO) {
                        throw new Error('Can not have GOTO action')
                    }
                } else {
                    if (actions[s][t].type==LRActionType.GOTO) {
                        result.push(`${s} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Goto ${actions[s][t].value}`)    
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
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            PLUS, STAR, ID, 
            OPENBRACKET, CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var lrSyntaxAnalysis = new LRSyntaxAnalysis(tokens)
        expect(lrSyntaxAnalysis.states.length).toEqual(12)
        // console.log(lrSyntaxAnalysis.tokens.filter(t=>!(t.type.isTerminal)).map((t,i)=>`${i}-${t.toSimpleString()}`).join('   '))
        //0-<TERMINATED>   1-<EMPTY>   2-E   3-+   4-T   5-*   6-F   7-(   8-)   9-id   10-E1
        expect(lrSyntaxAnalysis.actions[1][0]).toEqual({type: LRActionType.ACCEPT, value: -1})
        // console.log(lrSyntaxAnalysis.grammerProductions.map(gp=>gp.toString()).join('\n'))
        // expect(isSetEqual())
        expect(isSetEqual(
            convertActionList(lrSyntaxAnalysis),
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
        var PLUS = new TokenType('PLUS', '\\+', true)
        var STAR = new TokenType('STAR', '\\*', true)
        var ID = new TokenType('ID', 'id', true)
        var OPENBRACKET = new TokenType('OPENBRACKET', '\\(', true)
        var CLOSEBRACKET = new TokenType('CLOSEBRACKET', '\\)', true)

        var lexicalAnalysis = new LexicalAnalysis([
            PLUS, STAR, ID, 
            OPENBRACKET, CLOSEBRACKET,
            TokenType.EMPTY_TOKENTYPE,
            SyntaxAnalysis.DERIVATION,
            SyntaxAnalysis.ENTER,
            SyntaxAnalysis.SPACES,
            SyntaxAnalysis.GrammarSymbol
        ])

        var value = FileUtils.readFromFileSystem('./test/LR_Test.txt')
        var tokens = lexicalAnalysis.toTokens(value)
        var lrSyntaxAnalysis = new LRSyntaxAnalysis(tokens)

        var languageLexicalAnalysis = new LexicalAnalysis([
            PLUS,
            STAR,
            ID,
            OPENBRACKET,
            CLOSEBRACKET
        ])

        // lrSyntaxAnalysis.isValid(languageLexicalAnalysis, "*id")

    })
})