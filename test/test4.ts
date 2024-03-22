

function isPrime(n: number) : boolean {
    var m = Math.ceil(Math.sqrt(n))
    var f = true
    for (var i=2;f && i<=m;i++) {
        f = (n % i)!=0
    }
    return f
}

function nextPrime(n:number) : number {
    if (isPrime(n)) {
        n++
    }
    while (!isPrime(n)) n++
    return n
}
var p = [11]
//console.log(nextPrime(p.at(-1)))
var v = [500]
for (var i=2;i<=11;i++) {
    var pp = p.at(-1)
    v.push(v.at(-1)-pp)
    pp = nextPrime(pp)
    p.push(pp)
}
console.log(p)
console.log(v)