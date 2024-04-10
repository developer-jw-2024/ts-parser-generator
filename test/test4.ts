import { TransferChar } from "../src/LexicalAnalyzer/NFA"


var a : Map<string, TransferChar> = new Map<string, TransferChar>()

a.set("abc", new TransferChar().init("a", false, false, null, false))
a.set("def", new TransferChar().init("b", false, false, null, false))


let keys = Array.from(a.keys());
keys.forEach(key=>{
    console.log(key, a.get(key))
})
