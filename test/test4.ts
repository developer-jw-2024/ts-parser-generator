class GrammarProductionFunctions {

    grammarProductionFunctions : Map<string, Function> | null = null
    gpIndex : Map<number, string> | null = null

    constructor() {}

    setGrammarProductionFunctions(iterable?: Iterable<readonly [string, Function]>) {
        this.grammarProductionFunctions = new Map<string, Function>(iterable)
        this.gpIndex = new Map<number, string>()

        var keys = this.grammarProductionFunctions.keys()
        
        for (let key of keys) {
            var func = this.grammarProductionFunctions.get(key)
            this.grammarProductionFunctions.set(key, func.bind(this))
        }
    }

    setGrammarProductionFunctionIndex(grammerProduction : string, index : number) {
        this.gpIndex.set(index, grammerProduction)
    }

    getGPFunction(grammerProduction : string) : Function | null | undefined  {
        return this.grammarProductionFunctions.get(grammerProduction)
    }

    getGPFunctionByIndex(index : number) : Function | null | undefined  {
        if (this.gpIndex.has(index)) {
            var key = this.gpIndex.get(index)
            return this.grammarProductionFunctions.get(key)
        }
        return null
    }

}
class A extends GrammarProductionFunctions {
    name : string 
    gi : number =3

    constructor(name : string) {
        super()
        this.name = name
        
        this.setGrammarProductionFunctions([
            [
                'A->B', this.abc
            ],
            [
                'D->E', this.def
            ]
        ])
        
    }
    

    abc(v : string) : any {
        console.log("in function:", this.gi, this.name)
        this.name = v
        return "ABC"
    }

    def(v : string) : any {
        this.name = v
        return "DEF"
    }
}

var a = new A("D")
a.setGrammarProductionFunctionIndex('A->B', 3)
a.setGrammarProductionFunctionIndex('D->E', 5)
console.log("before", a)
var x = a.getGPFunctionByIndex(5)(3)
console.log("after", x, a)
