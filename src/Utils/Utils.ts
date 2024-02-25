export function isNulllOrUndefinedValue(value : any) {
    return (value==null || value==undefined)
}

export function getType(v) {
    if (Array.isArray(v)) return "array"
    return typeof v
}
