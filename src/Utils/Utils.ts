export function isNulllOrUndefinedValue(value : any) {
    return (value==null || value==undefined)
}

export class TimeCounter {
    timeStamps : Array<Date> =[]
    preTime : Date | null = null
    constructor() {
        this.preTime = new Date()
        this.timeStamps.push(this.preTime)
    }
    getTimePeriod() : number {
        var now = new Date()
        this.timeStamps.push(now)
        var result = now.getTime() - this.preTime.getTime()
        this.preTime = now
        return result
    }
}

export function isTypeOf(value, type) : boolean {
    return (value!=null && value.constructor==type)
}

export function getType(v) {
    if (Array.isArray(v)) return "array"
    return typeof v
}
