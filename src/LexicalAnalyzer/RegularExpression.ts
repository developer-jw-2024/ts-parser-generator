import { parse } from 'path'
import { RegularExpressionSymbol, RegularExpressionCharType } from './SpecialSymbols'
import { DFA } from './DFA'
import { NFA } from './NFA'

const PareChars: Array<{ left: string, right: string }> = [
    { left: RegularExpressionSymbol.OpenCaretSquareBracket, right: RegularExpressionSymbol.CloseSquareBracket },
    { left: RegularExpressionSymbol.OpenSquareBracket, right: RegularExpressionSymbol.CloseSquareBracket },
    { left: RegularExpressionSymbol.OpenCurlyBracket, right: RegularExpressionSymbol.CloseCurlyBracket },
    { left: RegularExpressionSymbol.OpenRoundBracket, right: RegularExpressionSymbol.CloseRoundBracket },
    { left: RegularExpressionSymbol.DoubleQuotes, right: RegularExpressionSymbol.DoubleQuotes },
]

function isLeftCharInPareChars(char: string): boolean {
    var result: boolean = false
    result = PareChars.filter((pare) => {
        return pare.left == char
    }).length > 0
    return result
}

function isRightCharInPareChars(char: string): boolean {
    var result: boolean = false
    result = PareChars.filter((pare) => {
        return pare.right == char
    }).length > 0
    return result
}

function isPareChars(char1: string, char2: string): boolean {
    var result: boolean = false
    result = PareChars.filter((pare) => {
        return pare.left == char1 && pare.right == char2
    }).length > 0
    return result
}

export function initCharBlocks(chars: Array<string>): Array<{ left: number, right: number }> {
    var result: Array<{ left: number, right: number }> = []
    var pareStack: Array<{ index: number, value: string }> = []
    for (var i = 0; i < chars.length; i++) {
        var lastOpenChar: { index: number, value: string } | null = (pareStack.length > 0 ? pareStack[pareStack.length - 1] : null)
        if (lastOpenChar != null && isPareChars(lastOpenChar.value, chars[i])) {
            pareStack.pop()
            result[lastOpenChar.index].right = i
            result.push({ left: lastOpenChar.index, right: i })
        } else if (lastOpenChar!=null && lastOpenChar.value==RegularExpressionSymbol.DoubleQuotes) {
            result.push({ left: i, right: i })
        } else if (isLeftCharInPareChars(chars[i])) {
            pareStack.push({ index: i, value: chars[i] })
            result.push({ left: i, right: null })
        } else if (isRightCharInPareChars(chars[i])) {
            throw new Error(`Syntax error!`)
        } else {
            result.push({ left: i, right: i })
        }
    }
    if (pareStack.length>0) {
        throw new Error(`Syntax error!`)
    }
    return result
}

export function getEndTermIndex(chars: Array<string>, index: number): number {
    var j: number = index
    if (j >= chars.length) {
        return -1
        // throw new Error('index is out of boundary of chars');
    }
    var stack: Array<{ index: number, value: string }> = []
    if (isLeftCharInPareChars(chars[index])) {
        stack.push({ index: index, value: chars[index] })
        j++
    } else {
        if (isRightCharInPareChars(chars[index]) && chars[index]!=RegularExpressionSymbol.DoubleQuotes) {
            throw new Error(`Can not find a corresponding char to [${chars[index]}]`)
        }
        return index
    }
    var result: number = -1

    while (stack.length > 0 && j < chars.length && result == -1) {
        var lastOpenChar: { index: number, value: string } = stack[stack.length - 1]
        if (isPareChars(lastOpenChar.value, chars[j])) {
            stack.pop()
            if (stack.length == 0) {
                result = j
            }
        } else if (isLeftCharInPareChars(chars[j])) {
            stack.push({ index: j, value: chars[j] })
        }
        j++
    }
    return result
}

export function toChars(content: string): string[] {
    var chars: Array<string> = []
    var hasDoubleQuotes : boolean = false
    for (var i = 0; i < content.length; i++) {
        var handleFlag = false
        if (!handleFlag && content[i] == RegularExpressionSymbol.BackSlash) {
            if (!handleFlag && hasDoubleQuotes) {
                chars.push(content[i])
                handleFlag = true    
            }
            if (!handleFlag && i + 1 < content.length) {
                chars.push(content[i] + content[i + 1])
                handleFlag = true
                i++
            }
        }
        if (!handleFlag && content[i] == RegularExpressionSymbol.OpenSquareBracket) {
            if (i + 1 < content.length) {
                if (content[i + 1] == RegularExpressionSymbol.Caret) {
                    chars.push(content[i] + content[i + 1])
                    handleFlag = true
                    i++
                }
            }
        }

        if (!handleFlag) {
            chars.push(content[i])
            handleFlag = true
            if (content[i]==RegularExpressionSymbol.DoubleQuotes) {
                hasDoubleQuotes = !hasDoubleQuotes
            }
        }
    }
    if (chars[chars.length - 1] == RegularExpressionSymbol.BackSlash) {
        chars.pop()
    }
    return chars
}

export function orGroup(chars: Array<string>): Array<Array<string>> {
    var result: Array<Array<string>> = []
    var s = 0
    var e = chars.length - 1
    var i = s
    var j = i
    while (i <= e) {
        var nextIndex: number = getEndTermIndex(chars, j)
        if (nextIndex == -1) {
            throw new Error(`Can not find a corresponding char to [${chars[j]}]`)
        }
        if (nextIndex == j && chars[j] == RegularExpressionSymbol.VerticalBar) {
            result.push(chars.slice(i, nextIndex))
            if (nextIndex == chars.length - 1) {
                result.push([])
            }
            i = j + 1
            j = i
        } else if (nextIndex == chars.length - 1) {
            result.push(chars.slice(i, nextIndex + 1))
            i = nextIndex + 1
            j = i
        } else {
            j = nextIndex + 1
        }
    }
    return result
}

export function andGroup(chars: Array<string>): Array<Array<string>> {
    var result: Array<Array<string>> = []
    var s = 0
    var e = chars.length - 1
    var i = s
    var j = i
    while (i <= e) {
        var nextIndex: number = getEndTermIndex(chars, j)
        if (nextIndex == -1) {
            throw new Error(`Can not find a corresponding char to [${chars[j]}]`)
        }
        if (nextIndex + 1 < chars.length && chars[nextIndex + 1] == RegularExpressionSymbol.OpenCurlyBracket) {
            var closeIndex: number = getEndTermIndex(chars, nextIndex + 1)
            if (closeIndex == -1) {
                throw new Error(`Can not find a corresponding char to [${chars[j]}]`)
            }
            nextIndex = closeIndex
        }

        while (nextIndex + 1 < chars.length && (
            chars[nextIndex + 1] == RegularExpressionSymbol.Star ||
            chars[nextIndex + 1] == RegularExpressionSymbol.Plus ||
            chars[nextIndex + 1] == RegularExpressionSymbol.QuestionMark
        )) {
            nextIndex++
        }
        if (nextIndex + 1 < chars.length && chars[nextIndex + 1]==RegularExpressionSymbol.Hyphen) {
            if (nextIndex+2 < chars.length && !(isLeftCharInPareChars(chars[nextIndex + 2]) ||
                chars[nextIndex + 2] == RegularExpressionSymbol.Star ||
                chars[nextIndex + 2] == RegularExpressionSymbol.Plus ||
                chars[nextIndex + 2] == RegularExpressionSymbol.QuestionMark)
            ) {
                nextIndex+=2
            } else {
                throw new Error(`Syntax error at ${nextIndex+2}`)
            }
        }
        result.push(chars.slice(i, nextIndex + 1))
        i = nextIndex + 1
        j = i
    }
    return result
}

export function orGroupsWithIndex(chars: Array<string>, charBlocks : Array<{ left: number, right: number }>, startIndex: number, endIndex: number): Array<{ left: number, right: number }> {
    var result: Array<{ left: number, right: number }> = []
    var i = startIndex
    var j = i
    while (i <= endIndex) {
        var currentEndIndex: number = charBlocks[j].right
        if (chars[currentEndIndex]==RegularExpressionSymbol.VerticalBar) {
            if (i<=currentEndIndex-1) result.push({ left: i, right: currentEndIndex-1 })
            i = currentEndIndex + 1
        } else if (currentEndIndex==endIndex) {
            result.push({ left: i, right: currentEndIndex})
            i = currentEndIndex + 1
        }
        j=currentEndIndex+1

    }
    return result
}

export function andGroupsWithIndex(chars: Array<string>, charBlocks : Array<{ left: number, right: number }>, startIndex: number, endIndex: number): Array<{ left: number, right: number }> {
    var result: Array<{ left: number, right: number }> = []
    var i = startIndex
    var j = i
    while (i <= endIndex) {
        var currentEndIndex: number = charBlocks[j].right
        while (currentEndIndex + 1 <= endIndex && 
            charBlocks[currentEndIndex + 1].left == charBlocks[currentEndIndex + 1].right &&
            (
            chars[currentEndIndex + 1] == RegularExpressionSymbol.Star ||
            chars[currentEndIndex + 1] == RegularExpressionSymbol.Plus ||
            chars[currentEndIndex + 1] == RegularExpressionSymbol.QuestionMark
        )) {
            currentEndIndex++
        }
        if (currentEndIndex+1 <= endIndex && currentEndIndex+2 <= endIndex && 
            charBlocks[currentEndIndex + 1].left == charBlocks[currentEndIndex + 1].right &&
            chars[currentEndIndex + 1] == RegularExpressionSymbol.Hyphen && 
            charBlocks[currentEndIndex + 2].left == charBlocks[currentEndIndex + 2].right) {
            currentEndIndex+=2
        } else if (currentEndIndex+1<= endIndex && 
            chars[charBlocks[currentEndIndex + 1].left]==RegularExpressionSymbol.OpenCurlyBracket && 
            chars[charBlocks[currentEndIndex + 1].right]==RegularExpressionSymbol.CloseCurlyBracket) {
            currentEndIndex = charBlocks[currentEndIndex + 1].right
        }

        result.push({left : i, right: currentEndIndex})
        i = currentEndIndex + 1
        j = i
    }
    return result
}


export enum RegularExpressionTreeOperation {
    OR,
    AND,
    NOT,
    PLUS,
    STAR,
    QUESTION,
    CHAR,
    ANYCHAR,
    UNKNOWN
}

export class RegularExpressionTree {
    operation: RegularExpressionTreeOperation = RegularExpressionTreeOperation.UNKNOWN
    chars : Array<string> = []
    actualChars : Array<string> = []
    charBlocks  : Array<{ left: number, right: number }> = []
    startIndex : number = -1
    endIndex : number = -1
    subtrees: Array<RegularExpressionTree> = []
    constructor(
        operation: RegularExpressionTreeOperation = RegularExpressionTreeOperation.UNKNOWN,
        chars : Array<string> = [],
        actualChars : Array<string> = [],
        charBlocks  : Array<{ left: number, right: number }> = [],
        startIndex : number = -1,
        endIndex : number = -1,
        subtrees: Array<RegularExpressionTree> = []) {

        this.operation = operation
        this.chars = chars
        this.actualChars = actualChars
        this.charBlocks = charBlocks
        this.startIndex = startIndex
        this.endIndex = endIndex
        this.subtrees = subtrees

        if (this.operation==RegularExpressionTreeOperation.CHAR && 
            this.actualChars[0].length==2 && this.actualChars[0][0]=='\\') {
                // this.actualChars[0] = this.actualChars[0].slice(1)
            if (this.actualChars[0]=='\\n') {
                this.actualChars[0]='\n'
            } else if (this.actualChars[0]=='\\t') {
                this.actualChars[0]='\t'
            }
        }
    }

}

function fromStringFromCharRange(startChar : string, endChar : string) : Array<string> {
    var result : Array<string> = []
    for (var i = startChar.charCodeAt(0); i<=endChar.charCodeAt(0); i++) {
        result.push(String.fromCharCode(i))
    }
    return result
}

//[]
export function buildOrRegularExpressionTree(
    chars : Array<string>, 
    charBlocks ? : Array<{ left: number, right: number }>, 
    startIndex? : number, endIndex? : number) : RegularExpressionTree | null {
    
    var actualChars : Array<string> = []
    for (var i=startIndex+1;i<=endIndex-1;i++) {
        if (i+1<endIndex && chars[i+1]==RegularExpressionSymbol.Hyphen) {
            var subChars = fromStringFromCharRange(chars[i], chars[i+2])
            actualChars = actualChars.concat(subChars)
            i+=2
        } else {
            actualChars.push(chars[i])
        }
    }
    var subtrees : Array<RegularExpressionTree> = []
    for (var i=0;i<actualChars.length;i++) {
        var subtree = new RegularExpressionTree(RegularExpressionTreeOperation.CHAR, [], [actualChars[i]], charBlocks, 0, 0, [])
        subtrees.push(subtree)
    }
    var tree = new RegularExpressionTree(RegularExpressionTreeOperation.OR, chars, [], charBlocks, startIndex, endIndex, subtrees)
    return  tree

}

//[^]
export function buildNotRegularExpressionTree(
    chars : Array<string>, 
    charBlocks ? : Array<{ left: number, right: number }>, 
    startIndex? : number, endIndex? : number) : RegularExpressionTree | null {
    
    var actualChars : Array<string> = []
    for (var i=startIndex+1;i<=endIndex-1;i++) {
        if (i+1<endIndex && chars[i+1]==RegularExpressionSymbol.Hyphen) {
            var subChars = fromStringFromCharRange(chars[i], chars[i+2])
            actualChars = actualChars.concat(subChars)
            i+=2
        } else {
            actualChars.push(chars[i])
        }
    }
    var tree = new RegularExpressionTree(RegularExpressionTreeOperation.NOT, chars, actualChars, charBlocks, startIndex, endIndex, [])
    return  tree

}

export function buildRegularExpressionTree(chars : Array<string>, charBlocks ? : Array<{ left: number, right: number }>, startIndex? : number, endIndex? : number) : RegularExpressionTree | null {
    if (charBlocks==null) {
        charBlocks = initCharBlocks(chars)
        startIndex = 0
        endIndex = charBlocks.length - 1
    }
    var i = startIndex
    var j = endIndex

    if (i>j) {
        throw new Error(`Syntax Error`)
    }

    while (i<=j && charBlocks[i].left==charBlocks[j].left && 
        charBlocks[i].right==charBlocks[j].right && 
        chars[i]==RegularExpressionSymbol.OpenRoundBracket && 
        chars[j]==RegularExpressionSymbol.CloseRoundBracket) {
        i++
        j--
    }

    var tree : RegularExpressionTree  | null = null
    var orGroups = orGroupsWithIndex(chars, charBlocks, i, j)
    if (orGroups.length>1) {
        var subtrees = orGroups.map((subGroup : { left: number, right: number }):RegularExpressionTree | null=>{
            var subtree = buildRegularExpressionTree(chars, charBlocks, subGroup.left, subGroup.right)
            return subtree
        })
        tree = new RegularExpressionTree(RegularExpressionTreeOperation.OR, chars, [], charBlocks, i, j, subtrees)
    } else if (orGroups.length==1) {
        var andGroups = andGroupsWithIndex(chars, charBlocks, i, j)
        if (andGroups.length==1) {
            var group = andGroups[0]
            if (chars[group.right]==RegularExpressionSymbol.Star) { //a*
                var subtree = buildRegularExpressionTree(chars, charBlocks, group.left, group.right-1)
                tree = new RegularExpressionTree(RegularExpressionTreeOperation.STAR, chars, [], charBlocks, group.left, group.right, [subtree])
            } else if (chars[group.right]==RegularExpressionSymbol.Plus) { //a+
                var subtree = buildRegularExpressionTree(chars, charBlocks, group.left, group.right-1)
                tree = new RegularExpressionTree(RegularExpressionTreeOperation.PLUS, chars, [], charBlocks, group.left, group.right, [subtree])
            } else if (chars[group.right]==RegularExpressionSymbol.QuestionMark) { //a?
                var subtree = buildRegularExpressionTree(chars, charBlocks, group.left, group.right-1)
                tree = new RegularExpressionTree(RegularExpressionTreeOperation.QUESTION, chars, [], charBlocks, group.left, group.right, [subtree])
            } else if (chars[group.right]==RegularExpressionSymbol.CloseCurlyBracket) { //a{2} a{2,} a{2,3}
                var regExpCharBlock = charBlocks[group.left]
                var bracketCharBlock = charBlocks[group.right]
                //regExpCharBlock.left, regExpCharBlock.right
                //bracketCharBlock.left, bracketCharBlock.right
                var minNumOfTimes : string  | null = null
                var hasComma : boolean = false
                var maxNumOfTimes : string  | null = null
                for (var i=bracketCharBlock.left+1; i<bracketCharBlock.right ; i++) {
                    if (chars[i]==RegularExpressionSymbol.Comma) {
                        hasComma = true
                    } else {
                        if (hasComma) {
                            maxNumOfTimes = (maxNumOfTimes==null?'':maxNumOfTimes) + chars[i]
                        } else {
                            minNumOfTimes = (minNumOfTimes==null?'':minNumOfTimes) + chars[i]
                        }
                    }
                }
                // minNumOfTimes, hasComma, maxNumOfTimes
                // 2 false, ==> 1 2
                // 2 true, 5 ==> 1 2 3? 4? 5?
                // 2 true null ==> 1 2 3*
                var subtrees : Array<RegularExpressionTree> =[]
                for (var i=0;i<parseInt(minNumOfTimes);i++) {
                    var subtree = buildRegularExpressionTree(chars, charBlocks, regExpCharBlock.left, regExpCharBlock.right)
                    subtrees.push(subtree)
                }
                if (hasComma) {
                    if (maxNumOfTimes==null) {
                        var subtree = buildRegularExpressionTree(chars, charBlocks, regExpCharBlock.left, regExpCharBlock.right)
                        // console.log(subtree)
                        var starSubTree = new RegularExpressionTree(RegularExpressionTreeOperation.STAR, chars, [], charBlocks, group.left, group.right, [subtree])
                        subtrees.push(starSubTree)
                    } else {
                        for (var i=parseInt(minNumOfTimes);i<parseInt(maxNumOfTimes);i++) {
                            var subtree = buildRegularExpressionTree(chars, charBlocks, regExpCharBlock.left, regExpCharBlock.right)
                            var questionSubTree = new RegularExpressionTree(RegularExpressionTreeOperation.QUESTION, chars, [], charBlocks, group.left, group.right, [subtree])
                            subtrees.push(questionSubTree)
                        }
                    }
                }
                tree = new RegularExpressionTree(RegularExpressionTreeOperation.AND, chars, [], charBlocks, group.left, group.right, subtrees)
            } else if (chars[group.left]==RegularExpressionSymbol.OpenCaretSquareBracket && 
                chars[group.right]==RegularExpressionSymbol.CloseSquareBracket) { //[^]
                tree = buildNotRegularExpressionTree(chars, charBlocks, group.left, group.right)
            } else if (chars[group.left]==RegularExpressionSymbol.OpenSquareBracket && 
                chars[group.right]==RegularExpressionSymbol.CloseSquareBracket) { //[])
                tree = buildOrRegularExpressionTree(chars, charBlocks, group.left, group.right)
            } else if (chars[group.left]==RegularExpressionSymbol.DoubleQuotes && 
                chars[group.right]==RegularExpressionSymbol.DoubleQuotes) { //""

                var subtrees : Array<RegularExpressionTree> = []
                for (var i=group.left+1; i<=group.right-1;i++) {
                    var subtree = new RegularExpressionTree(RegularExpressionTreeOperation.CHAR, chars, [chars[i]], charBlocks, i, i, [])    
                    subtrees.push(subtree)
                }
                tree = new RegularExpressionTree(RegularExpressionTreeOperation.AND, chars, [], charBlocks, group.left, group.right, subtrees)    
            } else if (group.left==group.right) { //a
                if (chars[group.left]==RegularExpressionSymbol.Dot) {
                    tree = new RegularExpressionTree(RegularExpressionTreeOperation.ANYCHAR, chars, [], charBlocks, group.left, group.right, subtrees)
                } else {
                    if (RegularExpressionSymbol.isRegularExpressionSymbol(chars[group.left])) {
                        throw new Error('Syntax Error')
                    }
                    tree = new RegularExpressionTree(RegularExpressionTreeOperation.CHAR, chars, [chars[group.left]], charBlocks, group.left, group.right, subtrees)
                }
            } else {
            }
        } else if (andGroups.length>1) {
            var subtrees = andGroups.map((subGroup : { left: number, right: number }):RegularExpressionTree | null=>{
                var subtree = buildRegularExpressionTree(chars, charBlocks, subGroup.left, subGroup.right)
                return subtree
            })
            tree = new RegularExpressionTree(RegularExpressionTreeOperation.AND, chars, [], charBlocks, i, j, subtrees)    
        }
    }
    return tree
}

export class RegularExpression {
    dfa : DFA
    constructor(regularExpression : string) {
        var chars = toChars(regularExpression)
        var tree = buildRegularExpressionTree(chars)
        var nfa = new NFA()
        nfa.initWithRegularExpressionTree(tree)
        this.dfa = nfa.toDFA()
    }

    test(value : string) {
        return this.dfa.test(value)
    }
}

