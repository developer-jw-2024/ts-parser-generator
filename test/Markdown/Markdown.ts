import { LRSyntaxAnalyzer } from '../../src/SyntaxAnalysis/LR'
import { AnalysisStep } from '../../src/SyntaxAnalysis/SyntaxAnalysis'
import { FileUtils } from '../FileUtil'


export class Markdown {

    lrSyntaxAnalyzer : LRSyntaxAnalyzer

    constructor(languageDefinitionPath : string, tokenTypeDefinitionPath : string) {
        var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
        var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)
        
        this.lrSyntaxAnalyzer = new LRSyntaxAnalyzer().initWithLanguageDefinition(languageDefinition)
        this.lrSyntaxAnalyzer.setLanguageFunctionsEntityClass(mlf.Markdown)
        this.lrSyntaxAnalyzer.setTokenTypeDefinition(tokenTypeDefinition)                
    }

    isValid(markdownContent : string, debug : boolean = false) : boolean {
        if (markdownContent[markdownContent.length-1]!='\n') {
            markdownContent += '\n'
        }
        var flag = this.lrSyntaxAnalyzer.isValid(markdownContent, debug)
        return flag
    }

    getLastValidationStep() : AnalysisStep {
        return this.lrSyntaxAnalyzer.analysisSteps[this.lrSyntaxAnalyzer.analysisSteps.length-1]
    }

    getValidationSteps() : string {
        return this.lrSyntaxAnalyzer.getValidationSteps()
    }

    getValidationSteps_NoActions() : string {
        return this.lrSyntaxAnalyzer.getValidationSteps_NoActions()
    }
}

// var markdownContent = FileUtils.readFromFileSystem('./test/Markdown/Markdown_test_1.txt')


// console.log(lrSyntaxAnalyzer.getValidationSteps())

