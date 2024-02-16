import { FileUtils } from '../../src/Utils/FileUtil'
import { Markdown } from './Markdown'


var languageDefinitionPath : string = './test/Markdown/Markdown_Language.txt'
var tokenTypeDefinitionPath : string = './test/Markdown/Markdown_RegExp.txt'
var markdown : Markdown = new Markdown(languageDefinitionPath, tokenTypeDefinitionPath)

markdown.isValid(
`- Fruits
    **A**pple
    Orangle
- Animals
    Duck`
    , true)
console.log(markdown.getValidationSteps())