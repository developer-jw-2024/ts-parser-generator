export class StateSet {
    elements : Array<number> = []
    constructor(elements : Array<number> = []) {
        this.elements = elements
    }

    addElement(element : number) {
        if (this.hasElement(element)) return 
        this.elements.push(element)
    }

    removeElement(element : number) {
        this.elements = this.elements.filter(x=>x!=element)
    }

    hasElement(element : number) {
        var flag = this.elements.filter(x=>x==element).length>0
        return flag
    }

    isEqual(otherStateSet : StateSet) : boolean {
        return this.isSubSetOf(otherStateSet) && otherStateSet.isSubSetOf(this)
    }

    isSubSetOf(otherStateSet : StateSet) : boolean {
        return this.elements.filter(ele=>otherStateSet.hasElement(ele)).length==this.elements.length
    }

    isSuperSetOf(otherStateSet : StateSet) : boolean {
        return otherStateSet.isSubSetOf(this)
    }
}

