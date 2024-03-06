import { FileUtils } from '../../src/Utils/FileUtil'
import { LRActionType, LRSyntaxAnalyzer, LRSyntaxAnalyzerRunner } from "../../src/SyntaxAnalysis/LR"
import { NumberList } from './Language_Function'
 

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
                        result.push(`${s} ${t} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Shift ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.REDUCE) {
                        result.push(`${s} ${t} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Reduce ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ACCEPT) {
                        result.push(`${s} ${t} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Accept ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.ERROR) {
                        result.push(`${s} ${t} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Error ${actions[s][t].value}`)
                    } else if (actions[s][t].type==LRActionType.GOTO) {
                        throw new Error('Can not have GOTO action')
                    }
                } else {
                    if (actions[s][t].type==LRActionType.GOTO) {
                        result.push(`${s} ${t} ${lrSyntaxAnalyzer.tokens[t].toSimpleString()} Goto ${actions[s][t].value}`)    
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

var simpleMath : LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, NumberList)

// console.log(convertActionList(simpleMath.lrSyntaxAnalyzer))
var equation = FileUtils.readFromFileSystem(`${__dirname}/Input.txt`)
var flag = simpleMath.isValid(equation)
// var a = simpleMath.lrSyntaxAnalyzer.analysisSteps.at(-1).symbolTokens.at(-1)
console.log(equation , '=', simpleMath.getResult())

