import { FileUtils } from "../../../src/Utils/FileUtil"

var tags = 
`
StarBoldTag 
UnderlineBoldTag
StarItalicTag 
UnderlineItalicTag
StarBoldItalicTag 
UnderlineBoldItalicTag
StrikethroughTag
HighlightTag
SubscriptTag
SuperscriptTag
`.split('\n').map(t=>t.trim()).filter(t=>t.length>0)

var result = 
`
Sentence -> Match_emphasis
Sentence -> Sentence Match_emphasis

PlainText -> SimpleText
PlainText -> Spaces
PlainText -> PlainText SimpleText
PlainText -> PlainText Spaces

`
var beginSymbols = tags.map(t=>'Begin'+t.substring(0, t.length-3)+'Text')
var no_text = tags.map(t=>'NO_'+t.substring(0, t.length-3)+'Text_Match_emphasis')
var typeSymbols = tags.map(t=>t.substring(0, t.length-3)+'Text')
var texts = tags.map((s,i)=>{
    return [
        `${beginSymbols[i]} -> ${tags[i]} ${no_text[i]}`,
        `${beginSymbols[i]} -> ${beginSymbols[i]} ${no_text[i]}`,
        `${typeSymbols[i]} -> ${beginSymbols[i]} ${tags[i]}`,
    ].join('\n')
}).join('\n\n')

result += `${texts}\n\n`

var no_Match_emphasis = tags.map((x, i)=>{
    return [`${no_text[i]} -> PlainText`].concat(
        tags.map((s,j)=>{
            if (i!=j) return `${no_text[i]} -> ${typeSymbols[j]}`
            return undefined
        }).filter(t=>t)
    ).join('\n')
}).join('\n\n')

result += `${no_Match_emphasis}\n\n`


var Match_emphasis = [`Match_emphasis -> PlainText`].concat(
    tags.map((s,j)=>{
        return `Match_emphasis -> ${typeSymbols[j]}`
    }).filter(t=>t)
).join('\n')

result += `${Match_emphasis}\n`

FileUtils.writeToFileSystem(`${__dirname}/GenerateLanguage.txt`, result)
// console.log(tag)
// console.log('Begin'+tag.substring(0, tag.length-3)+'Text')
// console.log('NO_'+tag.substring(0, tag.length-3)+'Text_Match_emphasis')
// console.log(tag.substring(0, tag.length-3)+'Text')