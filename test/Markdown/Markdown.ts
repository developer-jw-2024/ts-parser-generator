import { FileUtils } from '../../src/Utils/FileUtil'
import { AnalysisStep, LRSyntaxAnalysis } from "../../src/SyntaxAnalysis/LR"
import languageFunction from './v1/Markdown_Language_Function'

export class Markdown {

    lrSyntaxAnalysis : LRSyntaxAnalysis

    constructor(languageDefinitionPath : string, tokenTypeDefinitionPath : string) {
        var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
        var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)
        
        this.lrSyntaxAnalysis = new LRSyntaxAnalysis().initWithLanguageDefinition(languageDefinition)
        this.lrSyntaxAnalysis.setLanguageDefinitionFunctions(languageFunction)
        this.lrSyntaxAnalysis.setTokenTypeDefinition(tokenTypeDefinition)                
    }

    isValid(markdownContent : string, debug : boolean = false) : boolean {
        if (markdownContent[markdownContent.length-1]!='\n') {
            markdownContent += '\n'
        }
        var flag = this.lrSyntaxAnalysis.isValid(markdownContent, debug)
        return flag
    }

    getLastValidationStep() : AnalysisStep {
        return this.lrSyntaxAnalysis.analysisSteps[this.lrSyntaxAnalysis.analysisSteps.length-1]
    }

    getValidationSteps() : string {
        return this.lrSyntaxAnalysis.getValidationSteps()
    }

    getValidationSteps_NoActions() : string {
        return this.lrSyntaxAnalysis.getValidationSteps_NoActions()
    }
}

// var markdownContent = FileUtils.readFromFileSystem('./test/Markdown/Markdown_test_1.txt')


// console.log(lrSyntaxAnalysis.getValidationSteps())

