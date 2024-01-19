import { CharsSet, CharsSetType, isSetEqual } from '../src/Utils/SetUtils'

describe('StateSet', ()  => {
    test('StateSet', () => { 
        var a = new CharsSet()
        expect(a.type).toEqual(CharsSetType.NORMAL)

        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.union(b)
        expect(c.chars).toEqual([])
        expect(c.type).toEqual(CharsSetType.ALL)

        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet(['b', 'c'])
        var c = a.union(b)
        expect(c.chars).toEqual([])
        expect(c.type).toEqual(CharsSetType.ALL)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.union(b)
        expect(c.chars).toEqual([])
        expect(c.type).toEqual(CharsSetType.ALL)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'])
        var c = a.union(b)
        expect(isSetEqual(c.chars, ['a', 'b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.union(b)
        expect(isSetEqual(c.chars, ['c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)


        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'])
        var c = a.union(b)
        expect(isSetEqual(c.chars, ['a'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)

        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.union(b)
        expect(isSetEqual(c.chars, ['b'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)

        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.intersection(b)
        expect(c.chars).toEqual([])
        expect(c.type).toEqual(CharsSetType.ALL)

        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet(['b', 'c'])
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['a', 'b'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)

        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['a', 'b'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'])
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['b'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['a'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'])
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.intersection(b)
        expect(isSetEqual(c.chars, ['a', 'b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)

        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'a'], CharsSetType.NEGATIVE)
        var c = a.intersection(b)
        expect(a.isEqual(b)).toBe(true)

        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, [])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet(['b', 'c'])
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)
        
        var a = new CharsSet([], CharsSetType.ALL)
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, [])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet([], CharsSetType.ALL)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, [])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)

        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'])
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['a'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'])
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['b'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'])
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['a', 'b', 'c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NEGATIVE)
        
        var a = new CharsSet(['a', 'b'], CharsSetType.NEGATIVE)
        var b = new CharsSet(['b', 'c'], CharsSetType.NEGATIVE)
        var c = a.minus(b)
        expect(isSetEqual(c.chars, ['c'])).toBe(true)
        expect(c.type).toEqual(CharsSetType.NORMAL)
        
    })
})