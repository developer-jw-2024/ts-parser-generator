import { AnalysisToken, GrammarProductionFunction, LanguageFunctionsEntity } from "../../src/SyntaxAnalysis/SyntaxAnalysis"

export class SimpleMath extends LanguageFunctionsEntity {
    
    @GrammarProductionFunction('E -> E + T')
    plus(args : Array<AnalysisToken>) {
        return args[0].value + args[2].value
    }
    

    @GrammarProductionFunction('E -> E - T')
    minus(args : Array<AnalysisToken>) {
        return args[0].value - args[2].value
    }
    
    @GrammarProductionFunction('E -> T')
    toEquation(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    
    @GrammarProductionFunction('T -> T * F')
    multi(args : Array<AnalysisToken>) {
        return args[0].value * args[2].value
    }
    
    @GrammarProductionFunction('T -> T / F')
    div(args : Array<AnalysisToken>) {
        return args[0].value / args[2].value
    }
    
    
    @GrammarProductionFunction('T -> F')
    toTerm(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    
    @GrammarProductionFunction('F -> ( E )')
    toFactor1(args : Array<AnalysisToken>) {
        return args[1].value
    }
    
    @GrammarProductionFunction('F -> F spaces')
    toFactor2(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    @GrammarProductionFunction('F -> spaces F')
    toFactor3(args : Array<AnalysisToken>) {
        return args[1].value
    }
    
    @GrammarProductionFunction('F -> integer')
    toFactor4(args : Array<AnalysisToken>) {
        return parseInt(args[0].value)
    }
    
    @GrammarProductionFunction('F -> - integer')
    toFactor5(args : Array<AnalysisToken>) {
        return -parseInt(args[1].value)
    }
    
}
