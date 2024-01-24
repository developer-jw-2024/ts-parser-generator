import { toChars, orGroup, andGroup, getEndTermIndex, initCharBlocks, orGroupsWithIndex, andGroupsWithIndex, RegularExpressionTreeOperation, buildRegularExpressionTree } from '../src/LexicalAnalyzer/RegularExpression'


describe('RegularExpression', ()  => {
    test('toChars', () => { 
        expect(toChars('\\')).toEqual([]);
        expect(toChars('')).toEqual([]);
        expect(toChars('\\"*')).toEqual(["\\\"", "*"]);
        expect(toChars('\\"*\\')).toEqual(["\\\"", "*"]);
        expect(toChars(' ')).toEqual([' ']);
        expect(toChars('.')).toEqual(['.']);
        expect(toChars('" "')).toEqual(['"', ' ', '"']);
        expect(toChars('"."')).toEqual(['"', '.', '"']);
        expect(toChars('"\\"')).toEqual(['"', '\\', '"']);
        expect(toChars('"\\*"')).toEqual(['"', '\\', '*', '"']);
        expect(toChars('\\\\')).toEqual(["\\\\"]);
        expect(toChars('\\\\\\n')).toEqual(["\\\\", "\\n"]);
        expect(toChars('"|ab"c')).toEqual(['"', '|', 'a', 'b', '"', 'c'])
        expect(toChars('[abc]cde')).toEqual(['[', 'a', 'b', 'c', ']', 'c', 'd', 'e'])
        expect(toChars('[^abc]cde')).toEqual(['[^', 'a', 'b', 'c', ']', 'c', 'd', 'e'])
        expect(toChars('[^a-zc]cde')).toEqual(['[^', 'a', '-', 'z' ,'c', ']', 'c', 'd', 'e']) 
    });

    test('getFollowTermIndex', () => {
        expect(getEndTermIndex(toChars('\\'), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars(''), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars('a'), 0)).toEqual(0);
        expect(getEndTermIndex(toChars(' '), 0)).toEqual(0);
        expect(getEndTermIndex(toChars('abc'), 0)).toEqual(0);
        expect(getEndTermIndex(toChars('abc'), 1)).toEqual(1);
        expect(getEndTermIndex(toChars('abc'), 2)).toEqual(2);
        expect(getEndTermIndex(toChars('abc'), 3)).toEqual(-1);
        expect(getEndTermIndex(toChars('['), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars('[abc'), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars('[a]bc'), 0)).toEqual(2);
        expect(getEndTermIndex(toChars('[[a]]bc'), 0)).toEqual(4);
        expect(getEndTermIndex(toChars('[[a]]bc'), 1)).toEqual(3);
        expect(getEndTermIndex(toChars('[[a]bc'), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars('[[a]bc'), 1)).toEqual(3);
        expect(getEndTermIndex(toChars('[^da]bc'), 0)).toEqual(3);
        expect(getEndTermIndex(toChars('|'), 0)).toEqual(0);
        expect(getEndTermIndex(toChars('(ab)c'), 0)).toEqual(3);
        expect(getEndTermIndex(toChars('{ab}c'), 0)).toEqual(3);
        expect(getEndTermIndex(toChars('"ab"c'), 0)).toEqual(3);
        expect(getEndTermIndex(toChars('"a[b"c'), 0)).toEqual(-1);
        expect(getEndTermIndex(toChars('[abc]cde'), 0)).toEqual(4);
        expect(getEndTermIndex(toChars('[^abc]cde'), 0)).toEqual(4);
    });

    test('orTerms', () => {
        expect(orGroup(toChars('\\'))).toEqual([]);

        try {
            expect(orGroup(toChars('['))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to [[]`)
        }
        
        try {
            expect(orGroup(toChars(']'))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to []]`)
        }

        try {
            expect(orGroup(toChars('('))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to [(]`)
        }
        
        try {
            expect(orGroup(toChars(')'))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to [)]`)
        }

        try {
            expect(orGroup(toChars('{'))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to [{]`)
        }
        
        try {
            expect(orGroup(toChars('}'))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to [}]`)
        }

        try {
            expect(orGroup(toChars('"'))).toEqual([]);
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual(`Can not find a corresponding char to ["]`)
        }


        expect(orGroup(toChars(''))).toEqual([]);
        expect(orGroup(toChars('a'))).toEqual([['a']]);
        expect(orGroup(toChars('.'))).toEqual([['.']]);
        expect(orGroup(toChars(' '))).toEqual([[' ']]);
        expect(orGroup(toChars('a '))).toEqual([['a', ' ']]);
        expect(orGroup(toChars(' a'))).toEqual([[' ', 'a']]);
        expect(orGroup(toChars('" "a'))).toEqual([['"', ' ', '"', 'a']]);
        expect(orGroup(toChars('ab'))).toEqual([['a', 'b']]);
        expect(orGroup(toChars('a b'))).toEqual([['a', ' ', 'b']]);
        expect(orGroup(toChars('ab*'))).toEqual([['a', 'b', '*']]);
        expect(orGroup(toChars('a*b*'))).toEqual([['a', '*','b', '*']]);
        expect(orGroup(toChars('abc'))).toEqual([['a', 'b', 'c']]);
        expect(orGroup(toChars('(abc)'))).toEqual([['(', 'a', 'b', 'c', ')']]);
        try {
            orGroup(toChars('((abc)'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Can not find a corresponding char to [(]');
        }
        try {
            orGroup(toChars('(abc){2,3'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Can not find a corresponding char to [{]');
        }

        try {
            console.log(orGroup(toChars('(abc))')))
        } catch (e) {
            expect(e.message).toBe('Can not find a corresponding char to [)]');
        }

        expect(orGroup(toChars('ab|c'))).toEqual([['a', 'b'], ['c']]);
        expect(orGroup(toChars('ab{2,3}|c'))).toEqual([['a', 'b', '{', '2', ',', '3', '}'], ['c']]);
        expect(orGroup(toChars('a(b|c)'))).toEqual([['a','(', 'b', '|', 'c', ')']]);
        expect(orGroup(toChars('ab|c|de'))).toEqual([['a', 'b'], ['c'], ['d', 'e']]);
        expect(orGroup(toChars('ab|'))).toEqual([['a', 'b'], []]);
        expect(orGroup(toChars('|ab'))).toEqual([[],['a', 'b']]);
        expect(orGroup(toChars('"|ab"c'))).toEqual([['"', '|', 'a', 'b', '"', 'c']]);
        expect(orGroup(toChars('" "c'))).toEqual([['"', ' ', '"', 'c']]);
        expect(orGroup(toChars('ab*'))).toEqual([['a', 'b', '*']]);
        expect(orGroup(toChars('ab+'))).toEqual([['a', 'b', '+']]);
       expect(orGroup(toChars('ab+?'))).toEqual([['a', 'b', '+', '?']]);
       expect(orGroup(toChars('ab?+'))).toEqual([['a', 'b', '?', '+']]);
       expect(orGroup(toChars('"ab?|c+"'))).toEqual([['"', 'a', 'b', '?', '|', 'c', '+', '"']]);
    })

    test('andGroup', () => {
        expect(andGroup(toChars('\\'))).toEqual([]);
        expect(andGroup(toChars(''))).toEqual([]);
        expect(andGroup(toChars('a'))).toEqual([['a']]);
        expect(andGroup(toChars('[a]'))).toEqual([['[','a', ']']]);
        expect(andGroup(toChars('ab*'))).toEqual([['a'], ['b', '*']]);
        expect(andGroup(toChars('(ab)*'))).toEqual([['(', 'a', 'b', ')', '*']]);
        expect(andGroup(toChars('(ab)*+?'))).toEqual([['(', 'a', 'b', ')', '*', '+', '?']]);
        try {
            andGroup(toChars('((abc)'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Can not find a corresponding char to [(]');
        }
        try {
            andGroup(toChars('(abc){2,3'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Can not find a corresponding char to [(]');
        }
        try {
            andGroup(toChars('a-*'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Syntax error at 2');
        }

        expect(andGroup(toChars('ab+'))).toEqual([['a'], ['b', '+']]);
        expect(andGroup(toChars('a*b*'))).toEqual([['a','*'], ['b', '*']]);
        expect(andGroup(toChars('a+b+'))).toEqual([['a', '+'], ['b', '+']]);
        expect(andGroup(toChars('a+*b+'))).toEqual([['a', '+', '*'], ['b', '+']]);
        expect(andGroup(toChars('a+*?b+'))).toEqual([['a', '+', '*', '?'], ['b', '+']]);
        expect(andGroup(toChars('ab'))).toEqual([['a'], ['b']]);
        expect(andGroup(toChars('abc'))).toEqual([['a'], ['b'], ['c']]);
        expect(andGroup(toChars('a"bc"""d'))).toEqual([['a'], ['"', 'b', 'c', '"'], ['"', '"'], ['d']]);
        expect(andGroup(toChars('a"b|c"""d'))).toEqual([['a'], ['"', 'b', '|', 'c', '"'], ['"', '"'], ['d']]);
        expect(andGroup(toChars('"d[a]"abc'))).toEqual([['"', 'd', '[', 'a', ']', '"'], ['a'], ['b'], ['c']]);
        expect(andGroup(toChars('a(bc)'))).toEqual([['a'], ['(', 'b', 'c', ')']]);
        expect(andGroup(toChars('a-fto'))).toEqual([['a', '-', 'f'], ['t'], ['o']]);
        expect(andGroup(toChars('poa-ftq'))).toEqual([['p'], ['o'], ['a', '-', 'f'], ['t'], ['q']]);
        expect(andGroup(toChars('poa-ft1-2q'))).toEqual([['p'], ['o'], ['a', '-', 'f'], ['t'], ['1', '-', '2'], ['q']]);
        expect(andGroup(toChars('a-f1-2'))).toEqual([['a', '-', 'f'], ['1', '-', '2']]);
        expect(andGroup(toChars(' a(bc)'))).toEqual([[' '], ['a'], ['(', 'b', 'c', ')']]);
        expect(andGroup(toChars('a(de)+(bc)'))).toEqual([['a'], ['(', 'd', 'e', ')', '+'], ['(', 'b', 'c', ')']]);
        expect(andGroup(toChars('ab{2,3}'))).toEqual([['a'], ['b', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a {2,3}'))).toEqual([['a'], [' ', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a" "{2,3}'))).toEqual([['a'], ['"', ' ', '"', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a(xy){2,3}'))).toEqual([['a'], ['(', 'x', 'y', ')', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a"xyz"{2,3}'))).toEqual([['a'], ['"', 'x', 'y', 'z', '"', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a{2,}b{2,3}'))).toEqual([['a', '{', '2', ',', '}'], ['b', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a{2}b{2,3}'))).toEqual([['a', '{', '2','}'], ['b', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a{2}*b{2,3}'))).toEqual([['a', '{', '2','}', '*'], ['b', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('a{2}+b{2,3}'))).toEqual([['a', '{', '2','}', '+'], ['b', '{', '2', ',', '3', '}']]);
        expect(andGroup(toChars('[^a-z]def'))).toEqual([['[^', 'a', '-', 'z', ']'], ['d'], ['e'], ['f']]);
    })

    test('initCharBlocks', () => { 
        expect(initCharBlocks(toChars('\\'))).toEqual([]);
        expect(initCharBlocks(toChars(''))).toEqual([]);

        expect(()=>{
            initCharBlocks(toChars('('))
        }).toThrow('Syntax error the char "(" at 0!')

        expect(()=>{
            initCharBlocks(toChars(')'))
        }).toThrow('Syntax error the char ")" at 0!')

        expect(()=>{
            initCharBlocks(toChars('['))
        }).toThrow('Syntax error the char "[" at 0!')

        expect(()=>{
            initCharBlocks(toChars(']'))
        }).toThrow('Syntax error the char "]" at 0!')

        expect(()=>{
            initCharBlocks(toChars('{'))
        }).toThrow('Syntax error the char "{" at 0!')

        expect(()=>{
            initCharBlocks(toChars('}'))
        }).toThrow('Syntax error the char "}" at 0!')

        expect(initCharBlocks(toChars('.'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('"."'))).toEqual([{left : 0, right : 2},{left : 1, right : 1},{left : 0, right : 2}]);
        expect(initCharBlocks(toChars(','))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('^'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('$'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('-'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('*'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('+'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('?'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('|'))).toEqual([{left : 0, right : 0}]);

        expect(initCharBlocks(toChars('a'))).toEqual([{left : 0, right : 0}]);
        expect(initCharBlocks(toChars('ab'))).toEqual([{
            left : 0, right : 0}, 
            {left : 1, right : 1}]
        )
        expect(initCharBlocks(toChars('\\"*'))).toEqual([{
            left : 0, right : 0}, 
            {left : 1, right : 1}]
        )
        expect(initCharBlocks(toChars('\\"*\\'))).toEqual([{
            left : 0, right : 0}, 
            {left : 1, right : 1}]
        )
        expect(initCharBlocks(toChars(' '))).toEqual([{
            left : 0, right : 0}, 
            ]
        )
        expect(initCharBlocks(toChars('" "'))).toEqual([
            {left : 0, right : 2}, 
            {left : 1, right : 1},
            {left : 0, right : 2},
        ])
        expect(initCharBlocks(toChars('"["'))).toEqual([
            {left : 0, right : 2}, 
            {left : 1, right : 1},
            {left : 0, right : 2},
        ])
        expect(initCharBlocks(toChars('\\\\'))).toEqual([
            {left : 0, right : 0}, 
        ])
        expect(initCharBlocks(toChars('\\\\\\n'))).toEqual([
            {left : 0, right : 0}, 
            {left : 1, right : 1}, 
        ])
        expect(initCharBlocks(toChars('"|ab"c'))).toEqual([
            {left : 0, right : 4}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 0, right : 4},
            {left : 5, right : 5},
        ])
        expect(initCharBlocks(toChars('[abc]cde'))).toEqual([
            {left : 0, right : 4}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 0, right : 4},
            {left : 5, right : 5},
            {left : 6, right : 6},
            {left : 7, right : 7},
        ])
        expect(initCharBlocks(toChars('abc|cde'))).toEqual([
            {left : 0, right : 0}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 5, right : 5},
            {left : 6, right : 6},
        ])
        expect(initCharBlocks(toChars('[a-d]c'))).toEqual([
            {left : 0, right : 4}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 0, right : 4},
            {left : 5, right : 5},
        ])
        expect(initCharBlocks(toChars('[^abc]cde'))).toEqual([
            {left : 0, right : 4}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 0, right : 4},
            {left : 5, right : 5},
            {left : 6, right : 6},
            {left : 7, right : 7},
        ])
        expect(initCharBlocks(toChars('[^a-zc]cde'))).toEqual([
            {left : 0, right : 5}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 0, right : 5},
            {left : 6, right : 6},
            {left : 7, right : 7},
            {left : 8, right : 8},
        ])

        expect(initCharBlocks(toChars('(a(bc)?)+'))).toEqual([
            {left : 0, right : 7}, 
            {left : 1, right : 1},
            {left : 2, right : 5},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 2, right : 5},
            {left : 6, right : 6},
            {left : 0, right : 7},
            {left : 8, right : 8},
        ])
    
        try {
            initCharBlocks(toChars('(a(bc)?'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Syntax error the char "(" at 0!');
        }
    
        try {
            initCharBlocks(toChars(')a(bc)?'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Syntax error the char ")" at 0!');
        }
    
        try {
            initCharBlocks(toChars('a(bc))'))
            expect(true).toBe(false)
        } catch (e) {
            expect(e.message).toBe('Syntax error the char ")" at 5!');
        }

        expect(initCharBlocks(toChars('"(a?)+"'))).toEqual([
            {left : 0, right : 6}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 5, right : 5},
            {left : 0, right : 6},
        ])

        expect(initCharBlocks(toChars('(ab)+'))).toEqual([
            {left : 0, right : 3}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 0, right : 3},
            {left : 4, right : 4},
        ])

        expect(initCharBlocks(toChars('(ab)+?'))).toEqual([
            {left : 0, right : 3}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 0, right : 3},
            {left : 4, right : 4},
            {left : 5, right : 5},
        ])

        expect(initCharBlocks(toChars('(ab){2,3}'))).toEqual([
            {left : 0, right : 3}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 0, right : 3},
            {left : 4, right : 8},
            {left : 5, right : 5},
            {left : 6, right : 6},
            {left : 7, right : 7},
            {left : 4, right : 8},
        ])

        expect(initCharBlocks(toChars('[abc-e]'))).toEqual([
            {left : 0, right : 6}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 5, right : 5},
            {left : 0, right : 6},
        ])

        expect(initCharBlocks(toChars('[^abc-e]'))).toEqual([
            {left : 0, right : 6}, 
            {left : 1, right : 1},
            {left : 2, right : 2},
            {left : 3, right : 3},
            {left : 4, right : 4},
            {left : 5, right : 5},
            {left : 0, right : 6},
        ])
    });

    test('orGroupsWithIndex', () => { 
        var value = "\\"
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([]);

        var value = ""
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([]);

        var value = "a"
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 0}
        ]);

        var value = " "
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 0}
        ]);

        var value = "a "
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
        ]);


        var value = ' a'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
        ]);

        var value = '" "a'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 3},
        ]);

        var value = 'ab'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
        ]);

        var value = 'a b'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 2},
        ]);

        var value = 'ab*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 2},
        ]);

        var value = 'a*b*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 3},
        ]);

        var value = 'abc'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 2},
        ]);

        var value = 'ab|c'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
            {left : 3, right: 3}
        ]);

        var value = 'ab{2,3}|c'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 6},
            {left : 8, right: 8}
        ]);


        var value = 'a(b|c)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 5},
        ]);

        var value = 'ab|c|de'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
            {left : 3, right: 3},
            {left : 5, right: 6},
        ]);

        var value = 'ab|'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 1},
        ]);

        var value = '|ab'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 1, right: 2},
        ]);

        var value = '"|ab"c'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 5},
        ]);

        var value = '"|ab"|"|"'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 4},
            {left : 6, right: 8},
        ]);

        var value = '"ab?|c+"'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left : 0, right: 7},
        ]);

        var value = 'ab(de|def)ds'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 2, 9)).toEqual([
            {left : 2, right: 9},
        ]);

        var value = 'ab(de|def)ds'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 3, 8)).toEqual([
            {left : 3, right: 4},
            {left : 6, right: 8},
        ]);

        var value = 'ab(de+|d*e?f)ds'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(orGroupsWithIndex(chars, charblocks, 3, 12)).toEqual([
            {left : 3, right: 5},
            {left : 7, right: 12},
        ]);
    })

    test('andGroupsWithIndex', () => { 
        var value = "\\"
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([]);

        var value = ''
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([]);

        var value = '.'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0}
        ]);

        var value = 'a'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0}
        ]);

        var value = 'a*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 1}
        ]);

        var value = 'a*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, 0)).toEqual([
            {left: 0, right: 0}
        ]);

        var value = '[a]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 2}
        ]);


        var value = 'ab*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 2}
        ]);

        var value = '(ab)*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 4},
        ]);

        var value = 'ab+'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 2}
        ]);

        var value = 'a*b*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 1},
            {left: 2, right: 3}
        ]);

        var value = 'a*+b+'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 2},
            {left: 3, right: 4}
        ]);

        var value = 'ab'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 1}
        ]);

        var value = '[a-c]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 4},
        ]);

        var value = 'a"bcd"'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 5}
        ]);

        var value = 'a"bc"""d'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 4},
            {left: 5, right: 6},
            {left: 7, right: 7},
        ]);

        var value = 'a"b|c"""d'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 5},
            {left: 6, right: 7},
            {left: 8, right: 8},
        ]);

        var value = '"d[a]"abc'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 5},
            {left: 6, right: 6},
            {left: 7, right: 7},
            {left: 8, right: 8},
        ]);


        var value = 'a(bc)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 4},
        ]);

        var value = '(bc)+'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 4}
        ]);

        var value = '(bc)+?*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 6}
        ]);

        var value = '(bc){2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 8}
        ]);

        var value = 'a-fto'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 2},
            {left: 3, right: 3},
            {left: 4, right: 4},
        ]);

        var value = 'poa-ftq'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 1},
            {left: 2, right: 4},
            {left: 5, right: 5},
            {left: 6, right: 6},
        ]);

        var value = 'poa-ft1-2q'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 1},
            {left: 2, right: 4},
            {left: 5, right: 5},
            {left: 6, right: 8},
            {left: 9, right: 9},
        ]);

        var value = 'a-f1-2'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 2},
            {left: 3, right: 5},
        ]);

        var value = ' a(bc)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 1},
            {left: 2, right: 5},
        ]);

        var value = 'a(de)+(bc)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 5},
            {left: 6, right: 9},
        ]);

        var value = 'ab{2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 6},
        ]);

        var value = 'a {2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 6},
        ]);

        var value = 'a" "{2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 8},
        ]);

        var value = 'a(xy){2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 9},
        ]);

        var value = 'a(xy){2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 2, 3)).toEqual([
            {left: 2, right: 2},
            {left: 3, right: 3},
        ]);

        var value = 'a"xyz"{2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 0, charblocks.length-1)).toEqual([
            {left: 0, right: 0},
            {left: 1, right: 10},
        ]);

        var value = '[^a-z]def'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        expect(andGroupsWithIndex(chars, charblocks, 1, 3)).toEqual([
            {left: 1, right: 3},
        ]);
    })

    test("buildRegularExpressionTree", () => {
        try {
            var value = '\\'
            var chars = toChars(value)
            var charblocks = initCharBlocks(chars)
            var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
            expect(tree).toBeNull()    
        } catch(e) {
            expect(e.message).toBe('Syntax Error')
        }

        try {
            var value = ''
            var chars = toChars(value)
            var charblocks = initCharBlocks(chars)
            var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
            expect(tree).toBeNull()    
        } catch(e) {
            expect(e.message).toBe('Syntax Error')
        }

        var value = 'a'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['a'])

        var value = '.'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.ANYCHAR)
        expect(tree.actualChars).toEqual([])

        var value = '"abc"'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees.length).toEqual(3)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[2].actualChars).toEqual(['c'])

        try {
            var value = '*'
            var chars = toChars(value)
            var charblocks = initCharBlocks(chars)
            var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual('Syntax Error')
        }

        try {
            var value = ','
            var chars = toChars(value)
            var charblocks = initCharBlocks(chars)
            var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
            expect(true).toBe(false)
        } catch(e) {
            expect(e.message).toEqual('Syntax Error')
        }

        var value = '\n'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['\n'])

        var value = '\n'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['\n'])

        var value = '\t'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['\t'])

        var value = '\\*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['*'])

        var value = '\\\\'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.actualChars).toEqual(['\\'])

        var value = 'ab'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '(ab)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '((ab))'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '((a))b'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])


        var value = '((((a))(((b)))))'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = 'a|b'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '(a|b)'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '((a|b))'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = '((a|((b))))'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])

        var value = 'a*'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.STAR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(1)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])

        var value = 'a+'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.PLUS)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(1)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])

        var value = 'a?'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.QUESTION)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(1)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])

        var value = 'a{2}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])

        var value = '(ab){2}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(2)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[1].subtrees.length).toEqual(2)
        expect(tree.subtrees[1].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[1].actualChars).toEqual(['b'])

        var value = '(ab){2,}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(3)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[1].subtrees.length).toEqual(2)
        expect(tree.subtrees[1].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[1].actualChars).toEqual(['b'])

        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.STAR)
        expect(tree.subtrees[2].subtrees.length).toEqual(1)
        expect(tree.subtrees[2].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[2].subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[2].subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[1].actualChars).toEqual(['b'])

        var value = '(ab){2,3}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(3)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[1].subtrees.length).toEqual(2)
        expect(tree.subtrees[1].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[1].actualChars).toEqual(['b'])

        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.QUESTION)
        expect(tree.subtrees[2].subtrees.length).toEqual(1)
        expect(tree.subtrees[2].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[2].subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[2].subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[1].actualChars).toEqual(['b'])

        var value = '(ab){20,30}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)

        var value = '(ab){2,4}'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(4)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[1].subtrees.length).toEqual(2)
        expect(tree.subtrees[1].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].subtrees[1].actualChars).toEqual(['b'])

        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.QUESTION)
        expect(tree.subtrees[2].subtrees.length).toEqual(1)
        expect(tree.subtrees[2].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[2].subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[2].subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].subtrees[0].subtrees[1].actualChars).toEqual(['b'])

        expect(tree.subtrees[3].operation).toEqual(RegularExpressionTreeOperation.QUESTION)
        expect(tree.subtrees[3].subtrees.length).toEqual(1)
        expect(tree.subtrees[3].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.AND)
        expect(tree.subtrees[3].subtrees[0].subtrees.length).toEqual(2)
        expect(tree.subtrees[3].subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[3].subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[3].subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[3].subtrees[0].subtrees[1].actualChars).toEqual(['b'])

        var value = '[abc]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(3)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].actualChars).toEqual(['c'])

        var value = '[^abc]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.NOT)
        expect(tree.actualChars).toEqual(['a', 'b', 'c'])
        expect(tree.subtrees.length).toEqual(0)

        var value = '[^a-e]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.NOT)
        expect(tree.actualChars).toEqual(['a', 'b', 'c', 'd', 'e'])
        expect(tree.subtrees.length).toEqual(0)

        var value = '[^a-e0-4]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.NOT)
        expect(tree.actualChars).toEqual(['a', 'b', 'c', 'd', 'e', '0', '1', '2', '3', '4'])
        expect(tree.subtrees.length).toEqual(0)

        var value = '[abc]+'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.PLUS)
        expect(tree.subtrees.length).toEqual(1)

        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.subtrees[0].actualChars).toEqual([])
        expect(tree.subtrees[0].subtrees.length).toEqual(3)
        expect(tree.subtrees[0].subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[0].subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[0].subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].subtrees[2].actualChars).toEqual(['c'])

        
        var value = '[a-d]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(4)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].actualChars).toEqual(['c'])
        expect(tree.subtrees[3].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[3].actualChars).toEqual(['d'])
        
        var value = '[a-d4-7]'
        var chars = toChars(value)
        var charblocks = initCharBlocks(chars)
        var tree = buildRegularExpressionTree(chars, charblocks, 0, charblocks.length-1)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(8)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].actualChars).toEqual(['c'])
        expect(tree.subtrees[3].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[3].actualChars).toEqual(['d'])
        expect(tree.subtrees[4].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[4].actualChars).toEqual(['4'])
        expect(tree.subtrees[5].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[5].actualChars).toEqual(['5'])
        expect(tree.subtrees[6].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[6].actualChars).toEqual(['6'])
        expect(tree.subtrees[7].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[7].actualChars).toEqual(['7'])

        var value = '[a-d4-7]'
        var chars = toChars(value)
        var tree = buildRegularExpressionTree(chars)
        expect(tree.operation).toEqual(RegularExpressionTreeOperation.OR)
        expect(tree.actualChars).toEqual([])
        expect(tree.subtrees.length).toEqual(8)
        expect(tree.subtrees[0].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[0].actualChars).toEqual(['a'])
        expect(tree.subtrees[1].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[1].actualChars).toEqual(['b'])
        expect(tree.subtrees[2].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[2].actualChars).toEqual(['c'])
        expect(tree.subtrees[3].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[3].actualChars).toEqual(['d'])
        expect(tree.subtrees[4].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[4].actualChars).toEqual(['4'])
        expect(tree.subtrees[5].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[5].actualChars).toEqual(['5'])
        expect(tree.subtrees[6].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[6].actualChars).toEqual(['6'])
        expect(tree.subtrees[7].operation).toEqual(RegularExpressionTreeOperation.CHAR)
        expect(tree.subtrees[7].actualChars).toEqual(['7'])


    })
});

