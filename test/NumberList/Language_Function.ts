import { AnalysisToken } from "../../src/SyntaxAnalysis/LR"
import { FileUtils } from "../../src/Utils/FileUtil"

export default {
    'WriteToFile -> All':
    function(args : Array<AnalysisToken>) {
        // console.log(args[0].value)
        FileUtils.writeToFileSystem(`${__dirname}/Result.txt`, args[0].value.join('\n'))
        return args[0].value
    }
    ,
    'All -> Lines':
    function(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    ,
    'All -> WholeList':
    function(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    ,
    'All -> Lines WholeList':
    function(args : Array<AnalysisToken>) {
        return args[0].value.concat([args[1].value])
    }
    ,

    'Lines -> WholeLine':
    function(args : Array<AnalysisToken>) {
        return [args[0].value]
    }
    ,
    'Lines -> Lines WholeLine':
    function(args : Array<AnalysisToken>) {
        return args[0].value.concat([args[1].value])
    }
    ,

    'WholeList -> List':
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    'WholeList -> <ERROR>':
    function(args : Array<AnalysisToken>) {
        return 'Error'
    }
    ,

    'WholeLine -> WholeList Enter':
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    'WholeLine -> Enter':
    function(args : Array<AnalysisToken>) {
        return 'Error'
    }
    ,
    'List -> Integer':
    function(args : Array<AnalysisToken>) {
        return parseInt(args[0].value)
    }
    ,
    'List -> Spaces':
    function(args : Array<AnalysisToken>) {
        return 0
    }
    ,
    'List -> List Integer':
    function(args : Array<AnalysisToken>) {
        return args[0].value + parseInt(args[1].value)
    }
    ,
    'List -> List Spaces':
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,

}
