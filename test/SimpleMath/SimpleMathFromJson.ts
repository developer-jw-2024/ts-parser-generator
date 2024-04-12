import { FileUtils } from '../../src/Utils/FileUtil'
import { LRSyntaxAnalyzerRunner } from "../../src/SyntaxAnalysis/LR"
import { SimpleMath } from './SimpleMath_Language_Function'
import { TimeCounter } from '../../src/Utils/Utils'

var timeCounter : TimeCounter = new TimeCounter()

var equations : Array<string> = [
    " 6 * 2 + 1",
    "  3 / (1 - (-1))  ",
    " 5 / 5 - 10",
]

var json = FileUtils.readJSONFromFileSystem(`${__dirname}/SimpleMathLanguage.json`)
FileUtils.writeJSONToFileSystem(`${__dirname}/SimpleMathLanguage.json`, json)
var b : LRSyntaxAnalyzerRunner = LRSyntaxAnalyzerRunner.initFromJSON(json)
b.setLanguageFunctionsEntityClass(SimpleMath)

console.log('init from json: ',timeCounter.getTimePeriod())
equations.forEach(equation=>{
    var flag = b.isValid(equation)
    console.log(equation , '=', b.getResult(), '\tUsed time: ', timeCounter.getTimePeriod())
        
})

