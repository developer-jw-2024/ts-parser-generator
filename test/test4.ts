var a = [[1,23], [8,3]]
var b = [].concat.apply([], a)
b.unshift(99)
console.log(b)