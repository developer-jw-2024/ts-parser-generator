import { DFA } from './DFA'
import { RegularExpression, toChars } from './RegularExpression'
import { FiniteAutomatonPath, NFA } from './NFA'
import { TransferChar } from './NFA'
import { intersection } from '../Utils/SetUtils'

export class TokenType {

    static UNKNOWN_TOKENTYPE : TokenType = new TokenType("UNKNOWN", null)

    name : string
    regularExpressionValue : string | null
    regularExpression : RegularExpression | null

    constructor(name : string, regularExpressionValue : string | null) {
        this.name = name
        this.regularExpressionValue = regularExpressionValue
        this.regularExpression = regularExpressionValue==null?null:new RegularExpression(this.regularExpressionValue)
    }
}

export class Token {

    type : TokenType
    value : string
    constructor(type : TokenType, value : string) {
        this.type = type
        this.value = value
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
            var token : TokenType = tokenTypes[i]

            var dfa = token.regularExpression.dfa
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

            that.tokenTypes.forEach((tokenType)=>{
                var regularExpression = tokenType.regularExpression
                if (intersection(regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states).length>0) {
                    if (terminatdNodes[terminatedIndex]==null) {
                        terminatdNodes[terminatedIndex] = tokenType
                    }
                }
            })
        })

        this.dfa = dfa
        this.terminatdNodes = terminatdNodes
        // console.log(this.terminatdNodes)
    }

    isTerminatedNode(nodeIndex : number) : boolean {
        return (this.terminatdNodes[nodeIndex]!=null)
    }

    getToken(chars : Array<string>, nodeStartIndex : number, charStartIndex : number) : { charEndPos: number,  nodeEndIndex : number} | null {
        // console.log(chars)
        var charEndPos : number = -1
        var nodeEndIndex : number = -1

        if (nodeStartIndex>=chars.length) return null
        var nodeCursor : number = nodeStartIndex
        var charCursor : number = charStartIndex

        var transferChar : TransferChar = new TransferChar(chars[charCursor])
        // var preNodeCursor = nodeCursor
        nodeCursor = this.dfa.move(nodeCursor, transferChar)
        // console.log('-->', preNodeCursor, transferChar.transferValue, nodeCursor)
        var step = 0
        while (charCursor<chars.length && nodeCursor!=-1) {
            // console.log(nodeCursor)
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
        var chars : Array<string> = toChars(input)

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