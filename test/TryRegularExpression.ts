import { orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree, RegularExpression, toRegularExpressionChars } from '../src/LexicalAnalyzer/RegularExpression'

var value = '[ea-c"bc"]'
var chars = toRegularExpressionChars(value)
var charblocks = initCharBlocks(chars)
var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
console.log(tree.subtrees.length==2)
// expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
// expect(tree.actualChars).toEqual([])
// expect(tree.subtrees.length).toEqual(3)
// expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
// expect(tree.subtrees[0].actualChars).toEqual(['a'])
// expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
// expect(tree.subtrees[1].actualChars).toEqual(['b'])
// expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
// expect(tree.subtrees[2].actualChars).toEqual(['c'])