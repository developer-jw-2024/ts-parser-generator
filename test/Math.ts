import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { RegularExpression } from "../index"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual, minus } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"
import { LL1SyntaxAnalysis } from "../src/SyntaxAnalysis/LL1"
import { LRAction, LRActionType, LRSyntaxAnalysis } from "../src/SyntaxAnalysis/LR"

function appendToFixLen(value : string, len : number) : string {
    return value + new Array(len-value.length).fill(0).map(t=>' ').join('')
}

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

var lexicalAnalysis = new LexicalAnalysis([
    TokenType.EMPTY_TOKENTYPE,
    SyntaxAnalysis.DERIVATION,
    SyntaxAnalysis.ENTER,
    SyntaxAnalysis.SPACES,
    SyntaxAnalysis.GrammarSymbol
])
var value = FileUtils.readFromFileSystem('./test/SimpleMath_Language.txt')
var tokens = lexicalAnalysis.toTokens(value)
var lrSyntaxAnalysis = new LRSyntaxAnalysis().initWithTokens(tokens)
// console.log(convertActionList(lrSyntaxAnalysis))
// lrSyntaxAnalysis.tokens.map(t=>{
//     console.log(t.toSimpleString(), t.type.isTerminal?'Y':'X')
// })

var tokenDefinitionContent = FileUtils.readFromFileSystem('./test/SimpleMath_RegExp.txt')
var tokenTypes : Array<TokenType> = tokenDefinitionContent.split('\n').map(line=>{
    var spaceIndex = line.indexOf(' ')
    var name = line.substring(0, spaceIndex)
    var reg = line.substring(spaceIndex)
    name = name.trim()
    reg = reg.trim()
    return new TokenType(name, reg, true)
})

var languageLexicalAnalysis = new LexicalAnalysis(tokenTypes)
var flag = lrSyntaxAnalysis.isValid(languageLexicalAnalysis, "3*4")

lrSyntaxAnalysis.showValidationSteps()

