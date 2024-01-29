export interface compareFunction<T> {
    isEqual(other: T): boolean;
}

export enum CharsSetType {
    ALL = "ALL",
    NEGATIVE = "NEGATIVE",
    NORMAL = "NORMAL",
}

export class CharsSet {
    static AllCharsSet = new CharsSet([], CharsSetType.ALL)
    chars : Array<string> = []
    type : CharsSetType = CharsSetType.NORMAL

    constructor(chars : Array<string> = [], type : CharsSetType =CharsSetType.NORMAL) {
        this.chars = chars.filter((x, i, l)=>l.indexOf(x)==i)
        this.type = type
    }

    isEqual(otherSet : CharsSet) : boolean {
        return this.type == otherSet.type && isSetEqual(this.chars, otherSet.chars)
    }

    isNegativeSet() : boolean {
        return this.type == CharsSetType.NEGATIVE
    }

    isNormalSet() : boolean {
        return this.type == CharsSetType.NORMAL
    }

    isAllSet() : boolean {
        return this.type == CharsSetType.ALL
    }


    union(otherSet : CharsSet) : CharsSet {
        if (this.isAllSet() || otherSet.isAllSet()) {
            return CharsSet.AllCharsSet
        }
        if (this.isNegativeSet() && otherSet.isNegativeSet()) { // ^A ∪ ^B
            return new CharsSet(intersection(this.chars, otherSet.chars), CharsSetType.NEGATIVE)
        } else if (this.isNormalSet() && otherSet.isNegativeSet()) { // A ∪ ^B
            return new CharsSet(minus(otherSet.chars, this.chars), CharsSetType.NEGATIVE)
        } else if (this.isNegativeSet() && otherSet.isNormalSet()) { // ^A ∪ B
            return new CharsSet(minus(this.chars, otherSet.chars), CharsSetType.NEGATIVE)
        } else if (this.isNormalSet() && otherSet.isNormalSet()) { // A ∪ B
            return new CharsSet(union(this.chars, otherSet.chars), CharsSetType.NORMAL)
        }
    }

    intersection(otherSet : CharsSet) : CharsSet {
        if (this.isAllSet() && otherSet.isAllSet()) {
            return CharsSet.AllCharsSet
        }
        if (this.isAllSet()) {
            if (otherSet.isNegativeSet()) {
                return new CharsSet(otherSet.chars, CharsSetType.NEGATIVE)
            } else if (otherSet.isNormalSet()) {
                return new CharsSet(otherSet.chars, CharsSetType.NORMAL)
            }
        } else if (otherSet.isAllSet()) {
            if (this.isNegativeSet()) {
                return new CharsSet(this.chars, CharsSetType.NEGATIVE)
            } else if (this.isNormalSet()) {
                return new CharsSet(this.chars, CharsSetType.NORMAL)
            }
        }
        if (this.isNegativeSet() && otherSet.isNegativeSet()) { // ^A ∩ ^B
            return new CharsSet(union(this.chars, otherSet.chars), CharsSetType.NEGATIVE)
        } else if (this.isNormalSet() && otherSet.isNegativeSet()) { // A ∩ ^B
            return new CharsSet(minus(this.chars,otherSet.chars), CharsSetType.NORMAL)
        } else if (this.isNegativeSet() && otherSet.isNormalSet()) { // ^A ∩ B
            return new CharsSet(minus(otherSet.chars, this.chars), CharsSetType.NORMAL)
        } else if (this.isNormalSet() && otherSet.isNormalSet()) { // A ∩ B
            return new CharsSet(intersection(this.chars, otherSet.chars), CharsSetType.NORMAL)
        }
    }
    
    minus(otherSet : CharsSet) : CharsSet {
        if (this.isAllSet() && otherSet.isAllSet()) {

            return new CharsSet([], CharsSetType.NORMAL)
        }
        if (this.isAllSet()) {
            if (otherSet.isNegativeSet()) {
                return new CharsSet(otherSet.chars, CharsSetType.NORMAL)
            } else if (otherSet.isNormalSet()) {
                return new CharsSet(otherSet.chars, CharsSetType.NEGATIVE)
            }
        } else if (otherSet.isAllSet()) {
            if (this.isNegativeSet()) {
                return new CharsSet([], CharsSetType.NORMAL)
            } else if (this.isNormalSet()) {
                return new CharsSet([], CharsSetType.NORMAL)
            }
        }
        if (this.isNegativeSet() && otherSet.isNegativeSet()) { // ^A - ^B
            return new CharsSet(minus(otherSet.chars, this.chars), CharsSetType.NORMAL)
        } else if (this.isNormalSet() && otherSet.isNegativeSet()) { // A - ^B
            return new CharsSet(intersection(this.chars, otherSet.chars), CharsSetType.NORMAL)
        } else if (this.isNegativeSet() && otherSet.isNormalSet()) { // ^A - B
            return new CharsSet(union(this.chars, otherSet.chars), CharsSetType.NEGATIVE)
        } else if (this.isNormalSet() && otherSet.isNormalSet()) { // A - B
            return new CharsSet(minus(this.chars, otherSet.chars), CharsSetType.NORMAL)
        }
    }
    
}

export function union<T>(list1 : Array<T>, list2: Array<T>) : Array<T> {
    if (list1==null || list1==undefined) return list1 = []
    if (list2==null || list2==undefined) return list2 = []
    var list : Array<T> = []
    list1.forEach(x=>{
        if (list.indexOf(x)==-1) list.push(x)
    })
    list2.forEach(x=>{
        if (list.indexOf(x)==-1) list.push(x)
    })
    return list
}

export function intersection<T>(list1 : Array<T>, list2: Array<T>) : Array<T> {
    if (list1==null || list1==undefined) return list1 = []
    if (list2==null || list2==undefined) return list2 = []
    list1 = list1.filter((x, i, l)=>l.indexOf(x)==i)
    list2 = list2.filter((x, i, l)=>l.indexOf(x)==i)
    var list = list1.filter(x=>list2.indexOf(x)>=0)
    return list
}

export function minus<T>(list1 : Array<T>, list2: Array<T>) : Array<T> {
    if (list1==null || list1==undefined) return list1 = []
    if (list2==null || list2==undefined) return list2 = []
    list1 = list1.filter((x, i, l)=>l.indexOf(x)==i)
    list2 = list2.filter((x, i, l)=>l.indexOf(x)==i)
    var list = list1.filter(x=>list2.indexOf(x)==-1)
    return list
}

export function isSetEqual<T>(list1 : Array<T>, list2: Array<T>) : boolean {
    if ((list1==null || list1==undefined) && (list2==null || list2==undefined)) return true
    if (list1.length!=list2.length) return false
    return list1.filter(e=>list2.indexOf(e)>=0).length==list1.length && 
            list2.filter(e=>list1.indexOf(e)>=0).length==list2.length
}

export function isSubSetOf<T>(subSet : Array<T>, superSet : Array<T>) : boolean {
    return subSet.filter(ele=>superSet.indexOf(ele)==-1).length==0
}

export function isSuperSetOf<T>(superSet : Array<T>, subSet : Array<T>) : boolean {
    return isSubSetOf(subSet, superSet)
}
