import { RegularExpression } from "../src/LexicalAnalyzer/RegularExpression"
var regExp : RegularExpression = new RegularExpression('[^\\[\\^]+')
console.log(regExp.test("[^"))
        // expect(regExp.test("a")).toBe(true)
        // expect(regExp.test("^")).toBe(false)
        // expect(regExp.test("[")).toBe(false)
        // expect(regExp.test("a^")).toBe(false)
        // expect(regExp.test("[a")).toBe(false)
        // expect(regExp.test("[^")).toBe(false)