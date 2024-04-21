import { FileUtils } from '../FileUtil'
import { LRSyntaxAnalyzer, LRSyntaxAnalyzerRunner } from "../../src/SyntaxAnalysis/LR"
import { SimpleMath } from './SimpleMath_Language_Function'
import { TimeCounter } from '../../src/Utils/Utils'
import { AnalysisStep } from '../../src/SyntaxAnalysis/SyntaxAnalysis'
import { TokenType } from '../../src/LexicalAnalyzer/LexicalAnalysis'


var languageDefinitionPath = './test/SimpleMath/SimpleMath_Language.txt'
var tokenTypeDefinitionPath = './test/SimpleMath/SimpleMath_RegExp.txt'

var timeCounter : TimeCounter = new TimeCounter()

var simpleMath : LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner().init(languageDefinitionPath, tokenTypeDefinitionPath, SimpleMath)
console.log(timeCounter.getTimePeriod())
var equation = "  5     +    2   -   2 *    3  "
var flag = simpleMath.isValid(equation)

var steps = simpleMath.lrSyntaxAnalyzer.analysisSteps.map(analysisStep =>{
    var handled = analysisStep.symbolTokens.filter(st=>st.token.type.name!='<TERMINATED>')
    .filter(st=>st.token.type.name!='spaces')
    .map(t=>{
        var value = ''
        if (t.value) {
            if (t.value.replace) {
                value = t.value.replace(new RegExp('\n', 'g'), '\\n').replace(new RegExp('\t', 'g'), '\\t')
            } else {
                value = t.value
            }
        }
        return `${value}`
    }).join(' ')
    var nonprocess = analysisStep.inputTokens
        .slice(analysisStep.i).filter(t=>t.type.name!='spaces').filter(t=>!t.type.isEqual(TokenType.TERMINATED_TOKENTYPE)).map(t=>t.value).join(' ')
    
    return `${handled}${handled.length==0?'':' '}${nonprocess}`

})

console.log(steps.map(s=>s.trim()).filter((s, i, arr)=>arr.indexOf(s)==i).map((s,i)=>(i==0?"  ":"= ")+s).join('\n'))
// console.log(equation , '=', simpleMath.getResult())
console.log(timeCounter.getTimePeriod())

