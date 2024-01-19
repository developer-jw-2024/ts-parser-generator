import { StateSet } from '../src/Utils/StateSet'

describe('StateSet', ()  => {
    test('StateSet', () => { 
        var a = new StateSet()
        expect(a.elements).toEqual([])

        a.addElement(3)
        expect(a.elements).toEqual([3])

        a.addElement(3)
        expect(a.elements).toEqual([3])
        
        var a = new StateSet([1,2,2,3])
        
        var a = new StateSet([1,2,-1])
        var b = new StateSet([-1, 1,2])
        expect(a.isEqual(b)).toBeTruthy()
    })
})
