import { AnalysisToken } from "../../src/SyntaxAnalysis/LR"

export default {
    'C -> E' : 
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    'C -> <ERROR>' : 
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    'E -> E + T':
    function(args : Array<AnalysisToken>) {
        return args[0].value + args[2].value
    }
    ,
    'E -> T':
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    '<ERROR> -> E <ERROR>':
    function(args : Array<AnalysisToken>) {
        return args[0].value + args[1].value
    }
    ,
    'T -> T * F':
    function(args : Array<AnalysisToken>) {
        return args[0].value * args[2].value
    }
    ,    
    'T -> F':
    function(args : Array<AnalysisToken>) {
        return args[0].value
    }
    ,
    
    'F -> < E >':
    function(args : Array<AnalysisToken>) {
        return args[1].value
    }
    ,
    'F -> id':
    function(args : Array<AnalysisToken>) {
        return parseInt(args[0].value)
    }

}
