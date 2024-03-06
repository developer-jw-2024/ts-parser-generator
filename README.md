# 1. Install:

```
> yarn add ts-parser-generator
or
> npm i ts-parser-generator
```

# 2. Usage:
### 2.1 Regular Expression
```TypeScript
import * as tpg from 'ts-parser-generator'

var regexp : tpg.regexp.RegularExpression = new tpg.regexp.RegularExpression("wo*f")

console.log(regexp.test("wf"))
console.log(regexp.test("wof"))
console.log(regexp.test("woof"))
console.log(regexp.test("wooof"))
console.log(regexp.test("woooof"))
console.log(regexp.test("wuf"))
console.log(regexp.test("wff"))
console.log(regexp.test("wwf"))
```


### 2.2 Lexical Analysis
> LexicalAnalysis helps to retrieve tokens from string or text.
> For example below, we define 3 types of tokens : number, alphabet, spaces, and a string `1.2 Apple` to feed the LexicalAnalysis, we can get 3 tokens from toTokens methods.

```TypeScript
import * as tpg from 'ts-parser-generator'

var NUMBER_TYPE = new tpg.lexical.TokenType('NUMBER', '[1-9][0-9]*\\.[0-9]*', true)
var ALPHABET_TYPE = new tpg.lexical.TokenType('ALPHABET', '[a-zA-Z]+', true)
var SPACES_TYPE = new tpg.lexical.TokenType('SPACES', '[ \t]+', true)

var lexicalAnalysis = new tpg.lexical.LexicalAnalysis([
    NUMBER_TYPE,
    ALPHABET_TYPE,
    SPACES_TYPE,
])

var tokens = lexicalAnalysis.toTokens("1.2 Apple")
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

> If we pass the string '1.2 - Apple' to a lexical analyzer and it contains an unknown token, the analyzer will generate a token with the reserved type 'UNKNOWN'. This 'UNKNOWN' token is used to identify certain tokens that are not predefined, which helps us to handle them as well.
```json
[
  { type: 'NUMBER', value: '1.2' },
  { type: 'SPACES', value: ' ' },
  { type: '<UNKNOWN>', value: '-' },
  { type: 'SPACES', value: ' ' },
  { type: 'ALPHABET', value: 'Apple' }
]
```
