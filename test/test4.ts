function buildBeginHtmlString(tagName : string, ...propertyValues : string[]) {
    var properties : string[] = [tagName]
    for (var i=0;i<propertyValues.length;i+=2) {
        var name : string = propertyValues[i]
        var value : string = propertyValues[i+1]
        properties.push(`${name} = "${value}"`)
    }
    return `<${properties.join(' ')}>`
}

function buildEndHtmlString(tagName : string) {
    var properties : string[] = [`/${tagName}`]
    return `<${properties.join(' ')}>`
}

console.log(buildBeginHtmlString('p', 'class', 'blockquote'))
console.log(buildEndHtmlString('p'))