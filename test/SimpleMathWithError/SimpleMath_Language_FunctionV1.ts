import { AnalysisToken, GrammarProductionFunction, LanguageFunctionsEntity } from "../../src/SyntaxAnalysis/SyntaxAnalysis"

export class SimpleMath extends LanguageFunctionsEntity {

    @GrammarProductionFunction('E -> E + T')
    toEquation3(args : Array<AnalysisToken>) {
        return args[0].value + args[2].value
    }

    @GrammarProductionFunction('E -> E - T')
    toEquation2(args : Array<AnalysisToken>) {
        return args[0].value - args[2].value
    }
    
    @GrammarProductionFunction('E -> T')
    toEquation1(args : Array<AnalysisToken>) {
        return args[0].value
    }
    

    @GrammarProductionFunction('T -> T * F')
    toTerm3(args : Array<AnalysisToken>) {
        return args[0].value * args[2].value
    }
    
    @GrammarProductionFunction('T -> T / F')
    toTerm2(args : Array<AnalysisToken>) {
        return args[0].value / args[2].value
    }
    
    
    @GrammarProductionFunction('T -> F')
    toTerm1(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    
    @GrammarProductionFunction('F -> ( E )')
    toFactor5(args : Array<AnalysisToken>) {
        return args[1].value
    }
    
    @GrammarProductionFunction('F -> F spaces')
    toFactor4(args : Array<AnalysisToken>) {
        return args[0].value
    }
    
    @GrammarProductionFunction('F -> spaces F')
    toFactor3(args : Array<AnalysisToken>) {
        return args[1].value
    }
    
    @GrammarProductionFunction('F -> integer')
    toFactor2(args : Array<AnalysisToken>) {
        return parseInt(args[0].value)
    }
    
    @GrammarProductionFunction('F -> - integer')
    toFactor1(args : Array<AnalysisToken>) {
        return -parseInt(args[1].value)
    }
}

