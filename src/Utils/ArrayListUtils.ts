function isNullOfUndefined<T>(ele : T) : boolean {
    return ele==null || ele==undefined
}
export function isListEqual<T>(list1 : Array<T>, list2: Array<T>) : boolean {
    if (isNullOfUndefined(list1) && isNullOfUndefined(list2)) return true
    if (list1.length!=list2.length) return false

    var i : number = 0
    while (i<list1.length && list1[i]==list2[i]) i++
    return i==list1.length
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
