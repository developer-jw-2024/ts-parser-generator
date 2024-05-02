import { regexp } from "../src";
import { RegularExpression, buildRegularExpressionTree, initCharBlocks, toContentChars, toRegularExpressionChars } from "../src/LexicalAnalyzer/RegularExpression";
import { FileUtils } from "./FileUtil";

// []
// [^]
// ""
// <>
// {}
// ()
function splitBySpace(value : string ) : Array<string> {
    var chars = toRegularExpressionChars(value)
    var charblocks = initCharBlocks(chars)
    var words = []
    var word = ''
    var i = 0
    while (i<chars.length) {
        var range = charblocks[i]
        if (range.left==range.right && chars[range.left]==' ') {
            if (word.length>0) {
                words.push(word)
            }
            word = ''
        } else {
            for (var j=range.left;j<=range.right;j++) {
                word += chars[j]
            }
        }
        i = range.right + 1
    }
    if (word.length>0) {
        words.push(word)
        word = ''
    }
    return words
} 
var value = '    Equation    \\$[^\\$]*[ab ]"def "<>{32dafs}(dafasf)\\$  abc   '
var words = splitBySpace(value)
console.log(words)
// charblocks.forEach((range, index)=>{
//     var word = ""
//     for (var i=range.left;i<=range.right;i++) {
//         word += chars[i]
//     }
//     console.log(index, range,word)
// })
