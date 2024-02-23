import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalysis, LRSyntaxAnalysisRunner } from "../../src/SyntaxAnalysis/LR"
import languageFunctions from './SimpleMath_Language_Function'

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

var simpleMath : LRSyntaxAnalysisRunner = new LRSyntaxAnalysisRunner(languageDefinitionPath, tokenTypeDefinitionPath, languageFunctions)
console.log(timeCounter.getTimePeriod())
var equation = "  3 / (1 - (-1))  "
var flag = simpleMath.isValid(equation)
console.log(equation , '=', simpleMath.getResult())
console.log(timeCounter.getTimePeriod())

