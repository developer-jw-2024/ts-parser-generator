import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalyzer, LRSyntaxAnalyzerRunner } from "../../src/SyntaxAnalysis/LR"
import { SimpleMath } from './SimpleMath_Language_Function'

class TimeCounter {
    timeStamps : Array<Date> =[]
    preTime : Date | null = null
    constructor() {
        this.preTime = new Date()
        this.timeStamps.push(this.preTime)
    }
    getTimePeriod() : number {
        var now = new Date()
        this.timeStamps.push(now)
        var result = now.getTime() - this.preTime.getTime()
        this.preTime = now
        return result
    }
}
var languageDefinitionPath = './test/SimpleMath/SimpleMath_Language.txt'
var tokenTypeDefinitionPath = './test/SimpleMath/SimpleMath_RegExp.txt'

var timeCounter : TimeCounter = new TimeCounter()

var simpleMath : LRSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, SimpleMath)
console.log(timeCounter.getTimePeriod())
var equations : Array<string> = [
    " 6 * 2 + 1",
    "  3 / (1 - (-1))  ",
    " 5 / 5 - 10",
]
equations.forEach(equation=>{
    var flag = simpleMath.isValid(equation)
    console.log(equation , '=', simpleMath.getResult(), '\tUsed time: ', timeCounter.getTimePeriod())
        
})

