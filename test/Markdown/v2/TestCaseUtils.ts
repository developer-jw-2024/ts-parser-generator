export class TestCase {
    name : string
    content : string
    result : string

    constructor(name : string, content : string, result : string) {
        this.name = name
        this.content = content
        this.result = result
    }
}
export class TestCaseUtils {
    static StartName = '........StartName'
    static EndName = '........EndName'
    static StartContent = '........StartContent'
    static EndContent = '........EndContent'
    static StartCompareResult = '........StartCompareResult'
    static EndCompareResult = '........EndCompareResult'

    static getTestCases(content : string) : Array<TestCase>{
        var testCases : Array<TestCase> = []
        var lines : Array<string> = content.split('\n')
        var i = 0
        while (i<lines.length) {
            var nameLines : Array<string> = []
            var contentLines : Array<string> = []
            var resultLines : Array<string> = []

            while (i<lines.length && lines[i]!=TestCaseUtils.StartName) i++
            if (i<lines.length && lines[i]==TestCaseUtils.StartName) {
                i++
            } else {
                throw new Error('Can not find StartName')
            }
            while (i<lines.length && lines[i]!=TestCaseUtils.EndName) {
                nameLines.push(lines[i])
                i++
            }
            if (i<lines.length && lines[i]==TestCaseUtils.EndName) {
                i++
            } else {
                throw new Error('Can not find EndName')
            }

            while (i<lines.length && lines[i]!=TestCaseUtils.StartContent) i++
            if (i<lines.length && lines[i]==TestCaseUtils.StartContent) {
                i++
            } else {
                throw new Error('Can not find StartContent')
            }
            while (i<lines.length && lines[i]!=TestCaseUtils.EndContent) {
                contentLines.push(lines[i])
                i++
            }
            if (i<lines.length && lines[i]==TestCaseUtils.EndContent) {
                i++
            } else {
                throw new Error('Can not find EndContent')
            }

            while (i<lines.length && lines[i]!=TestCaseUtils.StartCompareResult) i++
            if (i<lines.length && lines[i]==TestCaseUtils.StartCompareResult) {
                i++
            } else {
                throw new Error('Can not find StartCompareResult')
            }
            while (i<lines.length && lines[i]!=TestCaseUtils.EndCompareResult) {
                resultLines.push(lines[i])
                i++
            }
            if (i<lines.length && lines[i]==TestCaseUtils.EndCompareResult) {
                i++
            } else {
                throw new Error('Can not find EndContent')
            }
            
            var testCase = new TestCase(nameLines.join('\n'), contentLines.join('\n'), resultLines.join('\n'))
            testCases.push(testCase)
            
        }
        return testCases
    }
}


