import { GrammarProductionFunction, LanguageFunctionsEntity } from "../src/SyntaxAnalysis/SyntaxAnalysis"


class ExampleClass extends LanguageFunctionsEntity {

    name: string = "abc"

    @GrammarProductionFunction("A->B")
    method1() : any {
        ExampleClass.count++
        this.name = 'a->b'
        return `${this.name} - (${ExampleClass.count})`
    }


    @GrammarProductionFunction("C->D")
    method2() : any {
        ExampleClass.count++
        this.name = 'c->d'
        return `${this.name} - (${ExampleClass.count})`
    }

    static count : number = 0
}

// var a = new ExampleClass()
// console.log(a['A->B']())
// console.log(a.runFunction('A->B'))
console.log(typeof ExampleClass)