import { FiniteAutomatonPath, TransferChar } from "../src/LexicalAnalyzer/NFA";

var a = new TransferChar().init('a', false, false, null, false)
var b = new FiniteAutomatonPath().init(1, 2, a)

var jsonObject = b.convertToJSON()
var o = FiniteAutomatonPath.initFromJSON(jsonObject)
console.log(o)