import { AnalysisToken, GrammarProductionFunction, LanguageFunctionsEntity } from "../../src/SyntaxAnalysis/SyntaxAnalysis"
import { FileUtils } from "../../src/Utils/FileUtil"

export class NumberList extends LanguageFunctionsEntity {
    @GrammarProductionFunction('WriteToFile -> All')
    function1(args : Array<AnalysisToken>) {
        // console.log(args[0].value)
        FileUtils.writeToFileSystem(`${__dirname}/Result.txt`, args[0].value.join('\n'))
        return args[0].value
    }
    
    @GrammarProductionFunction('All -> Lines')
    function2(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    
    @GrammarProductionFunction('All -> WholeList')
    function3(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    
    @GrammarProductionFunction('All -> Lines WholeList')
    function4(args : Array<AnalysisToken>) {
        return args[0].value.concat([args[1].value])
    }
    

    @GrammarProductionFunction('Lines -> WholeLine')
    function5(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    
    @GrammarProductionFunction('Lines -> Lines WholeLine')
    function6(args : Array<AnalysisToken>) {
        return args[0].value.concat([args[1].value])
    }
    

    @GrammarProductionFunction('WholeList -> List')
    function7(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    @GrammarProductionFunction('WholeList -> <ERROR>')
    function8(args : Array<AnalysisToken>) {
        return 'Error'
    }
    

    @GrammarProductionFunction('WholeLine -> WholeList Enter')
    function9(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    @GrammarProductionFunction('WholeLine -> Enter')
    function10(args : Array<AnalysisToken>) {
        return 'Error'
    }
    
    @GrammarProductionFunction('List -> Integer')
    function11(args : Array<AnalysisToken>) {
        return parseInt(args[0].value)
    }
    
    @GrammarProductionFunction('List -> Spaces')
    function12(args : Array<AnalysisToken>) {
        return 0
    }
    
    @GrammarProductionFunction('List -> List Integer')
    function13(args : Array<AnalysisToken>) {
        return args[0].value + parseInt(args[1].value)
    }
    
    @GrammarProductionFunction('List -> List Spaces')
    function14(args : Array<AnalysisToken>) {
        return args[0].value
    }
    

}
