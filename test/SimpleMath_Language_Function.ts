import { AnalysisToken } from "../src/SyntaxAnalysis/LR"

export default {
    
    'E -> E + T':
    function(e : AnalysisToken, plus : AnalysisToken, t: AnalysisToken) {
        return e.value + t.value
    }
    ,

    'E -> T':
    function(t : AnalysisToken) {
        return t.value
    }
    ,
    
    'T -> T * F':
    function(t : AnalysisToken, star : AnalysisToken, f : AnalysisToken) {
        return t.value * f.value
    }
    ,
    
    'T -> F':
    function(f : AnalysisToken) {
        return f.value
    }
    ,
    
    'F -> ( E )':
    function(ob : AnalysisToken, e : AnalysisToken, cb : AnalysisToken) {
        return e.value
    }
    ,
    'F -> integer':
    function(integer : AnalysisToken) {
        return parseInt(integer.value)
    }
}
