# 1. Install:

```
> yarn add ts-parser-generator
or
> npm i ts-parser-generator
```

# 2. Usage:
### 2.1 Regular Expression
```TypeScript
import { regexp } from 'ts-parser-generator'

var regularExpression : regexp.RegularExpression = new regexp.RegularExpression("wo*f")

console.log(regularExpression.test("wf"))
console.log(regularExpression.test("wof"))
console.log(regularExpression.test("woof"))
console.log(regularExpression.test("wooof"))
console.log(regularExpression.test("woooof"))
console.log(regularExpression.test("wuf"))
console.log(regularExpression.test("wff"))
console.log(regularExpression.test("wwf"))
```


### 2.2 Lexical Analysis
> LexicalAnalysis helps to retrieve tokens from string or text.
> For example below, we define 3 types of tokens : number, alphabet, spaces, and a string `1.2 Apple` to feed the LexicalAnalysis, we can get 3 tokens from toTokens methods.

```TypeScript
import { lexical } from 'ts-parser-generator'

var NUMBER_TYPE = new lexical.TokenType('NUMBER', '[1-9][0-9]*\\.[0-9]*', true)
var ALPHABET_TYPE = new lexical.TokenType('ALPHABET', '[a-zA-Z]+', true)
var SPACES_TYPE = new lexical.TokenType('SPACES', '[ \t]+', true)

var lexicalAnalyzer = new lexical.LexicalAnalyzer([
    NUMBER_TYPE,
    ALPHABET_TYPE,
    SPACES_TYPE,
])

var tokens = lexicalAnalyzer.tokenize("1.2 Apple")
var result = tokens.map(t=>{
    return {
        type: t.type.name,
        value : t.value
    }
})

console.log(result)
```

> After running the program above, we can get 3 tokens as below:
```json
[
  { type: 'NUMBER', value: '1.2' },
  { type: 'SPACES', value: ' ' },
  { type: 'ALPHABET', value: 'Apple' }
]
```

> If we pass the string '1.2 -Apple' to a lexical analyzer and it contains an unknown token, the analyzer will generate a token with the reserved type 'UNKNOWN'. This 'UNKNOWN' token is used to identify certain tokens that are not predefined, which helps us to handle them as well.
```json
[
  { type: 'NUMBER', value: '1.2' },
  { type: 'SPACES', value: ' ' },
  { type: '<UNKNOWN>', value: '-' },
  { type: 'ALPHABET', value: 'Apple' }
]
```

### 2.3 Syntax Analysis
> I will use a simple language to calculate a math equation. If the equation is valid for the defined language, it will print the result; otherwise, it will indicate that it is invalid.
#### 2.3.1 Token definition
> create a file called **_SimpleMath_RegExp.txt_**, and the content as below:
```
+ \+
- \-
* \*
/ /
( \(
) \)
integer (\-)?[0-9]+
spaces [\t ]+
```
#### 2.3.2 language grammar production definition
> create a file called **_SimpleMath_Language.txt_**, and the contnt as below:
```
E -> E + T
E -> E - T
E -> T
T -> T * F
T -> T / F
T -> F
F -> ( E )
F -> F spaces
F -> spaces F
F -> integer
F -> - integer
```
#### 2.3.3 Semantic analysis
> Here we will define an object to handle all the grammar productions
```Typescript
import { syntax } from "ts-parser-generator";

export class SimpleMath extends syntax.LanguageFunctionsEntity {

    @syntax.GrammarProductionFunction('E -> E + T')
    plus(args : Array<syntax.AnalysisToken>) {
        return args[0].value + args[2].value
    }
    

    @syntax.GrammarProductionFunction('E -> E - T')
    minus(args : Array<syntax.AnalysisToken>) {
        return args[0].value - args[2].value
    }
    
    @syntax.GrammarProductionFunction('E -> T')
    toEquation(args : Array<syntax.AnalysisToken>) {
        return args[0].value
    }
    
    
    @syntax.GrammarProductionFunction('T -> T * F')
    multi(args : Array<syntax.AnalysisToken>) {
        return args[0].value * args[2].value
    }
    
    @syntax.GrammarProductionFunction('T -> T / F')
    div(args : Array<syntax.AnalysisToken>) {
        return args[0].value / args[2].value
    }
    
    
    @syntax.GrammarProductionFunction('T -> F')
    toTerm(args : Array<syntax.AnalysisToken>) {
        return args[0].value
    }
    
    
    @syntax.GrammarProductionFunction('F -> ( E )')
    toFactor1(args : Array<syntax.AnalysisToken>) {
        return args[1].value
    }
    
    @syntax.GrammarProductionFunction('F -> F spaces')
    toFactor2(args : Array<syntax.AnalysisToken>) {
        return args[0].value
    }
    
    @syntax.GrammarProductionFunction('F -> spaces F')
    toFactor3(args : Array<syntax.AnalysisToken>) {
        return args[1].value
    }
    
    @syntax.GrammarProductionFunction('F -> integer')
    toFactor4(args : Array<syntax.AnalysisToken>) {
        return parseInt(args[0].value)
    }
    
    @syntax.GrammarProductionFunction('F -> - integer')
    toFactor5(args : Array<syntax.AnalysisToken>) {
        return -parseInt(args[1].value)
    }
    
}
```

#### 2.3.4 Ruuning the language
> create a program called **_app.ts_** as below:
```Typescript
import { lr } from "ts-parser-generator";
import { SimpleMath } from './SimpleMath_Language_Function'


var languageDefinitionPath = './SimpleMath_Language.txt'
var tokenTypeDefinitionPath = './SimpleMath_RegExp.txt'

var simpleMath : lr.LRSyntaxAnalyzerRunner = new lr.LRSyntaxAnalyzerRunner(languageDefinitionPath, tokenTypeDefinitionPath, SimpleMath)

var equation = '5 a 3'
var flag : boolean = simpleMath.isValid(equation)
if (flag) {
    console.log(`${equation} = ${simpleMath.getResult()}`)
} 
```
> after runing the program, you will get:
```
6 + 2 * 3 = 12
```
> if you change the euqation to invalid eqaution, such as "5 a 3", you will get an exception error becase it is not fit the lanague definition.