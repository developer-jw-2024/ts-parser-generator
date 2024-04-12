import { TransferChar } from "../src/LexicalAnalyzer/NFA"


var a : Map<number, TransferChar> = new Map<number, TransferChar>()

a.set(3, new TransferChar().init("a", false, false, null, false))
a.set(2, new TransferChar().init("b", false, false, null, false))


let keys = Array.from(a.keys());
var obj = {}
keys.forEach(key=>{
    obj[key] = a.get(key)
    console.log(key, a.get(key))
})

var key2s = Object.keys(obj)
console.log(key2s)

