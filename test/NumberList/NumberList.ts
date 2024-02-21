import { FileUtils } from '../../src/Utils/FileUtil'
import { LRActionType, LRSyntaxAnalysis, LRSyntaxAnalysisRunner } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './Language_Function'
 

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
                        result.push(`${s} ${t} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Shift ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.REDUCE) {
                        result.push(`${s} ${t} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Reduce ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ACCEPT) {
                        result.push(`${s} ${t} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Accept ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ERROR) {
                        result.push(`${s} ${t} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Error ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.GOTO) {
                        throw new Error('Can not have GOTO action')
                    }
                } else {
                    if (actions[s][t].type==LRActionType.GOTO) {
                        result.push(`${s} ${t} ${lrSyntaxAnalysis.tokens[t].toSimpleString()} Goto ${actions[s][t].value}`)    
                    } else {
                        throw new Error('Can not have this action')
                    } 
                }    
            }
        }
    }
    return result
}

var languageDefinitionPath = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath = `${__dirname}/RegExp.txt`

var simpleMath : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunction)

// console.log(convertActionList(simpleMath.lrSyntaxAnalysis))
var equation = 
`1 a 2
b
`
var flag = simpleMath.isValid(equation, true)
// var a = simpleMath.lrSyntaxAnalysis.analysisSteps.at(-1).symbolTokens.at(-1)
console.log(equation , '=', simpleMath.getResult())

