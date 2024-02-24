import { GrammarProductionFunction, LanguageFunctionsEntity } from "../src/SyntaxAnalysis/SyntaxAnalysis"

class A extends LanguageFunctionsEntity {
    name : string 
    gi : number =3

    constructor(name : string) {
        super()
        this.name = name

    }
    

    @GrammarProductionFunction('A->B')
    abc(v : string) : any {
        console.log("in function:", this.gi, this.name)
        this.name = v
        return "ABC"
    }

    @GrammarProductionFunction('D->E')
    def(v : string) : any {
        this.name = v
        return "DEF"
    }
}

