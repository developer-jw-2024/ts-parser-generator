import { DFA } from './DFA'
import { RegularExpression, toContentChars, toRegularExpressionChars } from './RegularExpression'
import { FiniteAutomatonPath, NFA } from './NFA'
import { TransferChar } from './NFA'
import { intersection } from '../Utils/SetUtils'
import { isNulllOrUndefinedValue } from '../Utils/Utils'
import { RegularExpressionSymbol } from './SpecialSymbols'

export class TokenType {

    static EMPTY_TOKENTYPE : TokenType = new TokenType().init("<EMPTY>", '<EMPTY>', true)
    static ERROR_TOKENTYPE : TokenType = new TokenType().init("<ERROR>", '<ERROR>', true)
    static TERMINATED_TOKENTYPE : TokenType = new TokenType().init("<TERMINATED>", null, true)
    static UNKNOWN_TOKENTYPE : TokenType = new TokenType().init("<UNKNOWN>", null, true)

    name : string
    regularExpressionValue : string | null
    regularExpression : RegularExpression | null
    isTerminal : boolean
    skipChar : string

    init(name : string, regularExpressionValue : string | null, isTerminal : boolean,  skipChar : string = RegularExpressionSymbol.BackSlash) {
        this.name = name
        this.regularExpressionValue = regularExpressionValue
        try {
            this.regularExpression = regularExpressionValue==null?null:new RegularExpression().initWtihRegularExpression(this.regularExpressionValue)
        } catch(error) {

            throw new Error(`Can not solve token type for [ ${name} ]`)
        }
        this.isTerminal = isTerminal
        this.skipChar = skipChar
        return this
    }

    initWithRegularExpression(name : string, regularExpressionValue : string, regularExpression : RegularExpression, isTerminal : boolean,  skipChar : string = RegularExpressionSymbol.BackSlash) {
        this.name = name
        this.regularExpressionValue = regularExpressionValue
        this.regularExpression = regularExpression
        this.isTerminal = isTerminal
        this.skipChar = skipChar
        return this
    }

    isEqual(other : TokenType) {
        return this.name == other.name
    }

    static initFromJSON(jsonObject : Object) : TokenType {
        var object : TokenType = new TokenType()
        object.initWithRegularExpression(
            jsonObject['name'],
            jsonObject['regularExpressionValue'],
            RegularExpression.initFromJSON(jsonObject['regularExpression']),
            jsonObject['isTerminal'],
            jsonObject['skipChar']
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            name : this.name,
            regularExpressionValue : this.regularExpressionValue,
            regularExpression : this.regularExpression?this.regularExpression.convertToJSON():null,
            isTerminal : this.isTerminal,
            skipChar : this.skipChar
        }
        return jsonObject
    }
}

export class Token {

    static EMPTY_TOKEN : Token = new Token().init(TokenType.EMPTY_TOKENTYPE, '<EMPTY>')
    static TERMINATED_TOKEN : Token = new Token().init(TokenType.TERMINATED_TOKENTYPE, '<TERMINATED>')
    static ERROR_TOKEN : Token = new Token().init(TokenType.ERROR_TOKENTYPE, '<ERROR>')
    static UNKNOWN_TOKEN : Token = new Token().init(TokenType.UNKNOWN_TOKENTYPE, '<UNKNOWN>')

    type : TokenType
    value : string

    init(type : TokenType, value : string) {
        this.type = type
        // this.value = value
        this.value = this.formalizedValue(value)
        return this
    }

    formalizedValue(value : string) : string {
        var v = value
        var result = ""
        for (var i=0;i<v.length;i++) {
            if (v[i] == this.type.skipChar && i+1<v.length) {
                result += v[i+1]
                i++
            } else {
                result += v[i]
            }
        }
        // if (this.type.skipChar!=RegularExpressionSymbol.BackSlash) {
            // console.log(`formalizedValue: Token =${this.type.name}, value = ${value},  result = ${result}, skipChar =  ${this.type.skipChar}` )
        // }
        return result

    }
    
    static initFromJSON(jsonObject : Object) : Token {
        var object : Token = new Token()
        object.init(
            TokenType.initFromJSON(jsonObject['type']),
            jsonObject['value']
        )
        return object
    }

    convertToJSON() : Object {
        var jsonObject = {
            type : this.type.convertToJSON(),
            value : this.value
        }
        return jsonObject
    }
    

    copy(value : string) : Token {
        return new Token().init(this.type, value)
    }

    toString() : string | null {
        var value = ''
        if (isNulllOrUndefinedValue(value)) {

        } else if (typeof this.value=='string') {
            value = this.value.replace(new RegExp('\n', 'g'), '\\n').replace(new RegExp('\t', 'g'), '\\t')
        } else {
            value = this.value
        }
        
        return `<${this.type.name} , ${value}>`
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


export class LexicalAnalyzer {
    startIndex : number
    dfa : DFA
    terminatdNodes : Map<number, TokenType | null>
    
    nfa : NFA
    tokenTypes : Array<TokenType>

    init(startIndex : number, dfa : DFA, terminatdNodes : Map<number, TokenType | null>) {
        this.startIndex = startIndex
        this.dfa = dfa
        this.terminatdNodes = terminatdNodes
        return this
    }

    initWithTokenTypes(tokenTypes : Array<TokenType>) {
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
            nfa_finiteAutomatonPaths.push(new FiniteAutomatonPath().init(nfa_startIndex, dfa.startIndex, new TransferChar().init(null, true)))
            nfa_finiteAutomatonPaths = nfa_finiteAutomatonPaths.concat(dfa.finiteAutomatonPaths)
        }

        this.nfa = new NFA()
        this.nfa.initWith(nfa_startIndex, nfa_terminatedIndexList, nfa_finiteAutomatonPaths)
        var dfa = this.nfa.toDFA()
        var that = this
        var terminatdNodes = new Map<number, TokenType | null>()
        dfa.terminatedIndexList.forEach((terminatedIndex)=>{
            // terminatdNodes.set(terminatedIndex,null)
            //terminatdNodes[terminatedIndex] = null
            // console.log('terminatedIndex: ', terminatedIndex)
            that.tokenTypes.forEach((tokenType)=>{
                var regularExpression = tokenType.regularExpression
                // console.log('\t',tokenType.name, regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states,
                //     intersection(regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states))
                if (intersection(regularExpression.dfa.terminatedIndexList, dfa.dfaStates[terminatedIndex].states).length>0) {
                    if (isNulllOrUndefinedValue(terminatdNodes.get(terminatedIndex))) {
                        terminatdNodes.set(terminatedIndex, tokenType)
                    }
                    // console.log('\t', terminatdNodes[terminatedIndex])
                }
            })
        })

        this.dfa = dfa
        this.terminatdNodes = terminatdNodes
        return this
        

    }

    static initFromJSON(jsonObject : Object) : LexicalAnalyzer {
        var object : LexicalAnalyzer = new LexicalAnalyzer()
        var terminatdNodesJsonObject = jsonObject['terminatdNodes']
        var map : Map<number, TokenType | null> = new Map<number, TokenType | null>()
        var keys = Object.keys(terminatdNodesJsonObject)
        keys.forEach(key=>{
            var tokenType : TokenType = TokenType.initFromJSON(terminatdNodesJsonObject[key])
            var keyInt = parseInt(key)
            map.set(keyInt, tokenType)
        })
        object.init(
            jsonObject['startIndex'],
            DFA.initFromJSON(jsonObject['dfa']),
            map
        )
        return object
    }

    convertToJSON() : Object {
        var terminatdNodesJsonObject = {}
        let keys = Array.from(this.terminatdNodes.keys());
        keys.forEach(key=>{
            terminatdNodesJsonObject[key] = (this.terminatdNodes.get(key) as TokenType).convertToJSON()
        })
        var jsonObject = {
            startIndex : this.startIndex,
            dfa : this.dfa.convertToJSON(),
            terminatdNodes : terminatdNodesJsonObject
        }
        return jsonObject
    }
    

    isTerminatedNode(nodeIndex : number) : boolean {
        return (this.terminatdNodes.get(nodeIndex)!=null)
    }

    getToken(chars : Array<string>, nodeStartIndex : number, charStartIndex : number) : { charEndPos: number,  nodeEndIndex : number} | null {
        // console.log(chars)
        // console.log('--------------------------------')
        var charEndPos : number = -1
        var nodeEndIndex : number = -1

        if (nodeStartIndex>=chars.length) return null
        var nodeCursor : number = nodeStartIndex
        var charCursor : number = charStartIndex

        var transferChar : TransferChar = new TransferChar().init(chars[charCursor])
        var preNodeCursor = nodeCursor
        nodeCursor = this.dfa.move(nodeCursor, transferChar)
        // console.log('-->', preNodeCursor, transferChar.transferValue, nodeCursor)
        var step = 0
        while (charCursor<chars.length && nodeCursor!=-1) {
            // console.log('nodeCursor:', nodeCursor)
            if (this.terminatdNodes.get(nodeCursor)!=null) {
                charEndPos = charCursor
                nodeEndIndex = nodeCursor
            }
            charCursor++
            if (charCursor<chars.length) {
                transferChar = new TransferChar().init(chars[charCursor])
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

    tokenize(input : string) {
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
                    tokens.push(new Token().init(TokenType.UNKNOWN_TOKENTYPE, chars.slice(lastSuccessCharIndex, i).join('')))
                    // console.log("UNKNOWN", lastSuccessCharIndex, i, chars.slice(lastSuccessCharIndex, i).join(''))
                }
                
                var tokenType = this.terminatdNodes.get(tokenEndResult.nodeEndIndex)
                tokens.push(new Token().init(tokenType, chars.slice(i, tokenEndResult.charEndPos+1).join('')))
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
            tokens.push(new Token().init(TokenType.UNKNOWN_TOKENTYPE, chars.slice(lastSuccessCharIndex, i).join('')))
            // console.log("UNKNOWN", lastSuccessCharIndex, i, chars.slice(lastSuccessCharIndex, i))
        }

        /*
        tokens.filter(t=>{
            var v = t.value
            var result = ""
            for (var i=0;i<v.length;i++) {
                if (v[i] == RegularExpressionSymbol.BackSlash && i+1<v.length) {
                    result += v[i+1]
                    i++
                } else {
                    result += v[i]
                }
            }
            t.value = result
        })
        */

        return tokens

    }
}

/**
A a
ABB abb
AAABBB a*b+
 */