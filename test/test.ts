import { RegularExpression } from "../index"
import { LexicalAnalysis, Token, TokenType } from "../src/LexicalAnalyzer/LexicalAnalysis"
import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'
import { FiniteAutomatonPath, NFA, TransferChar } from '../src/LexicalAnalyzer/NFA'
import { isSetEqual } from '../src/Utils/SetUtils'
import { FileUtils } from '../src/Utils/FileUtil'
import { SyntaxAnalysis } from "../src/SyntaxAnalysis/SyntaxAnalysis"

var regExp : RegularExpression = new RegularExpression('[^\\[\\^]+')
console.log(regExp.test("[^"))
        // expect(regExp.test("a")).toBe(true)
        // expect(regExp.test("^")).toBe(false)
        // expect(regExp.test("[")).toBe(false)
        // expect(regExp.test("a^")).toBe(false)
        // expect(regExp.test("[a")).toBe(false)
        // expect(regExp.test("[^")).toBe(false)