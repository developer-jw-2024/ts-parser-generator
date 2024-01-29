import { compareFunction } from "../src/Utils/SetUtils"

class Tank implements compareFunction<Tank> {
    value : number
    constructor(value : number) {
        this.value = value
    }
    isEqual(other : Tank) : boolean {
        return this.value == other.value
    }
}

class Monitor implements compareFunction<Monitor> {
    p : number
    constructor(p : number) {
        this.p= p
    }
    isEqual(other : Monitor) : boolean {
        return this.p == other.p
    }
}

function groupBy<T extends compareFunction<T>>(list : Array<T>) : boolean {
    return list[0].isEqual(list[1])
}

console.log(groupBy([new Tank(1), new Tank(2)]))
console.log(groupBy([new Tank(2), new Tank(2)]))
console.log(groupBy([new Monitor(1), new Monitor(2)]))
console.log(groupBy([new Monitor(2), new Monitor(2)]))
console.log(groupBy([new Monitor(2), new Tank(2)]))
