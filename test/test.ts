function abc(nodes : Array<number>) : Array<number> {
    var result : Array<number> = nodes.map(x=>x)
    result.push(3)
    return result
}

var a : Array<number> = [1,2,8]
var b : Array<number> = abc(a)

console.log(a)
console.log(b)
