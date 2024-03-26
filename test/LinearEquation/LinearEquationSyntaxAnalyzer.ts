import { LRSyntaxAnalyzerRunner } from '../../src/SyntaxAnalysis/LR'
import { LinearEquationLanguageFunctionsEntity }  from './Language_Function'


var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

export class LinearEquationSyntaxAnalyzer {
    lrSyntaxAnalyzerRunner: LRSyntaxAnalyzerRunner

    constructor() {
        this.lrSyntaxAnalyzerRunner = new LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, LinearEquationLanguageFunctionsEntity)
        /*
        this.lrSyntaxAnalyzerRunner.setPreprocessing((v:string):string=>{
            if (v.at(-1)!='\n') return v+'\n'
            return v
        })
        */
    }

    isValid(content : string, debug : boolean = false) :boolean {
        return this.lrSyntaxAnalyzerRunner.isValid(content, debug)
    }


}