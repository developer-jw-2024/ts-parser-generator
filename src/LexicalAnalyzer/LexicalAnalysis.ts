import { DFA } from './DFA'
import { RegularExpression, toContentChars, toRegularExpressionChars } from './RegularExpression'
import { FiniteAutomatonPath, NFA } from './NFA'
import { TransferChar } from './NFA'
import { intersection } from '../Utils/SetUtils'

export class TokenType {

    static EMPTY_TOKENTYPE : TokenType = new TokenType("<EMPTY>", '<EMPTY>', true)
    static ERROR_TOKENTYPE : TokenType = new TokenType("<ERROR>", '<ERROR>', true)
    static TERMINATED_TOKENTYPE : TokenType = new TokenType("<TERMINATED>", null, true)
    static UNKNOWN_TOKENTYPE : TokenType = new TokenType("<UNKNOWN>", null, true)

    name : string
    regularExpressionValue : string | null
    regularExpression : RegularExpression | null
    isTerminal : boolean

    constructor(name : string, regularExpressionValue : string | null, isTerminal : boolean) {
        this.name = name
        this.regularExpressionValue = regularExpressionValue
        try {
            this.regularExpression = regularExpressionValue==null?null:new RegularExpression(this.regularExpressionValue)
        } catch(error) {

            throw new Error(`Can not solve token type for [ ${name} ]`)
        }
        this.isTerminal = isTerminal
    }

    isEqual(other : TokenType) {
        return this.name == other.name
    }
}

export class Token {

    static EMPTY_TOKEN : Token = new Token(TokenType.EMPTY_TOKENTYPE, '<EMPTY>')
    static TERMINATED_TOKEN : Token = new Token(TokenType.TERMINATED_TOKENTYPE, '<TERMINATED>')
    static ERROR_TOKEN : Token = new Token(TokenType.ERROR_TOKENTYPE, '<ERROR>')
    static UNKNOWN_TOKEN : Token = new Token(TokenType.UNKNOWN_TOKENTYPE, '<UNKNOWN>')

    type : TokenType
    value : string
    constructor(type : TokenType, value : string) {
        this.type = type
        this.value = value
    }

    copy(value : string) : Token {
        return new Token(this.type, value)
    }

    toString() : string | null {
        return `<${this.type.name} , ${this.value.replace(new RegExp('\n', 'g'), '\\n').replace(new RegExp('\t', 'g'), '\\t')}>`
        // return `<${this.type.name} , ${this.value}>  ${this.type.isTerminal?'X':''}`
    }

    toSimpleString() : string | null {
        if (this.value==null) return ''
        var result = ''
        for (var i=0;i<this.value.length;i++) {
            if (this.value[i]=='\n') {
                result += ''
            } else if (this.value[i]=='\t') {
                result += ''
            } else {
                result += this.value[i]
            }
        }
        return result
    }

    

    isEqual(other : Token) {
        return this.type.isEqual(other.type) && this.value==other.value
    }
}


export class LexicalAnalysis {
    tokenTypes : Array<TokenType>
    startIndex : number
    nfa : NFA
    dfa : DFA
    terminatdNodes : Map<number, {name : string, regularExpressionValue : string, regularExpression : RegularExpression} | null>

    constructor(tokenTypes : Array<TokenType>) {
        this.tokenTypes = tokenTypes
        this.startIndex = 0
        var numOfNodes = 1

        var nfa_startIndex : number = this.startIndex
        var nfa_terminatedIndexList : Array<number> = []
        var nfa_finiteAutomatonPaths : Array<FiniteAutomatonPath> = []

        for (var i=0;i<tokenTypes.length;i++) {
            var tokenType : TokenType = tokenTypes[i]

            var dfa = tokenType.regularExpression.dfa
            dfa.deltaNodeNumber(numOfNodes)

            numOfNodes+=dfa.getNumberOfNodes()
            nfa_terminatedIndexList = nfa_terminatedIndexList.concat(dfa.terminatedIndexList)
            nfa_finiteAutomatonPaths.push(new FiniteAutomatonPath(nfa_startIndex, dfa.startIndex, new TransferChar(null, true)))
            nfa_finiteAutomatonPaths = nfa_finiteAutomatonPaths.concat(dfa.finiteAutomatonPaths)
        }

        this.nfa = new NFA()
        this.nfa.initWith(nfa_startIndex, nfa_terminatedIndexList, nfa_finiteAutomatonPaths)
        var dfa = this.nfa.toDFA()
        var that = this
        var terminatdNodes = new Map<number, TokenType | null>()
        dfa.terminatedIndexList.forEach((terminatedIndex)=>{
            terminatdNodes[terminatedIndex] = null
            // console.log('terminatedIndex: ', terminatedIndex)
            that.tokenTypes.forEach((tokenType)=>{
                var regularExpression = tokenType.regularExpression
                // console.log('\t',tokenType.name, regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states,
                //     intersection(regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states))
                if (intersection(regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states).length>0) {
                    if (terminatdNodes[terminatedIndex]==null) {
                        terminatdNodes[terminatedIndex] = tokenType
                    }
                    // console.log('\t', terminatdNodes[terminatedIndex])
                }
            })
        })

        this.dfa = dfa
        this.terminatdNodes = terminatdNodes
        // console.log(dfa.terminatedIndexList)
        // dfa.finiteAutomatonPaths.forEach(p=>{
        //     console.log(p.source, p.destination, p.transferChar.transferValue, p.transferChar.negativeTransferValues)
        // })

    }

    isTerminatedNode(nodeIndex : number) : boolean {
        return (this.terminatdNodes[nodeIndex]!=null)
    }

    getToken(chars : Array<string>, nodeStartIndex : number, charStartIndex : number) : { charEndPos: number,  nodeEndIndex : number} | null {
        // console.log(chars)
        // console.log('--------------------------------')
        var charEndPos : number = -1
        var nodeEndIndex : number = -1

        if (nodeStartIndex>=chars.length) return null
        var nodeCursor : number = nodeStartIndex
        var charCursor : number = charStartIndex

        var transferChar : TransferChar = new TransferChar(chars[charCursor])
        var preNodeCursor = nodeCursor
        nodeCursor = this.dfa.move(nodeCursor, transferChar)
        // console.log('-->', preNodeCursor, transferChar.transferValue, nodeCursor)
        var step = 0
        while (charCursor<chars.length && nodeCursor!=-1) {
            // console.log('nodeCursor:', nodeCursor)
            if (this.terminatdNodes[nodeCursor]!=null) {
                charEndPos = charCursor
                nodeEndIndex = nodeCursor
            }
            charCursor++
            if (charCursor<chars.length) {
                transferChar = new TransferChar(chars[charCursor])
                // var preNodeCursor = nodeCursor
                nodeCursor = this.dfa.move(nodeCursor, transferChar)
                // console.log('-->', preNodeCursor, transferChar.transferValue, nodeCursor, charEndPos)    
            }
        }
        if (charEndPos>=0) {
            return { charEndPos: charEndPos,  nodeEndIndex : nodeEndIndex }
        }
        return null
    }

    toTokens(input : string) {
        var tokens : Array<Token> = []
        var chars : Array<string> = toContentChars(input)
        // var chars : Array<string> = toChars(input)

        var nodeStartIndex : number = 0
        var lastSuccessCharIndex : number = 0
        var i = 0
        while (i<chars.length) {
            var tokenEndResult :{ charEndPos: number,  nodeEndIndex : number} | null = this.getToken(chars, nodeStartIndex, i)
            if (tokenEndResult!=null) {
                if (i>lastSuccessCharIndex) {
                    tokens.push(new Token(TokenType.UNKNOWN_TOKENTYPE, chars.slice(lastSuccessCharIndex, i).join('')))
                    // console.log("UNKNOWN", lastSuccessCharIndex, i, chars.slice(lastSuccessCharIndex, i).join(''))
                }
                
                var tokenType = this.terminatdNodes[tokenEndResult.nodeEndIndex]
                tokens.push(new Token(tokenType, chars.slice(i, tokenEndResult.charEndPos+1).join('')))
                // console.log(tokenType.name, tokenType.regularExpressionValue, i, tokenEndResult.charEndPos, chars.slice(i, tokenEndResult.charEndPos+1))
                lastSuccessCharIndex = tokenEndResult.charEndPos+1
                nodeStartIndex = 0
                i = lastSuccessCharIndex
            } else {
                i++
            }
            // console.log(i)
        }
        // console.log(i, lastSuccessCharIndex)
        if (i>lastSuccessCharIndex) {
            tokens.push(new Token(TokenType.UNKNOWN_TOKENTYPE, chars.slice(lastSuccessCharIndex, i).join('')))
            // console.log("UNKNOWN", lastSuccessCharIndex, i, chars.slice(lastSuccessCharIndex, i))
        }
        // console.log(tokens)
        return tokens

    }
}

/**
A a
ABB abb
AAABBB a*b+
 */