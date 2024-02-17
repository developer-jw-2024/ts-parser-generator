import { AnalysisToken } from "../../src/SyntaxAnalysis/LR"

export class Item {
    content : string
    level : number
    children : Array<Item>
    count : number
    no : number
    constructor(level : number, content : string) {
        this.level = level
        this.content = content
        this.children = []
        this.count = 0
        this.no = 0
    }

    addItem(item : Item) {
        if (item==null) return
        if (item.level==this.level+1) {
            this.children.push(item)
        } else {
            this.children.at(-1).addItem(item)
        }
    }

    toString() : string {
        var result : Array<string> = this.children.map(c=>c.toString())
        var currentString : string = Array.from(Array(Math.max(0, this.level-1)).keys()).map(t=>'        ').join('') + this.content
        result.unshift(currentString+` (${this.no})`)
        return result.join('\n')
    }

    toLabel() : string {
        var result : Array<string> = this.children.map(c=>c.toLabel())
        // var currentString : string = Array.from(Array(Math.max(0, this.level-1)).keys()).map(t=>'        ').join('') + this.content
        result.unshift(`Label${this.no}["${this.content}"]`)
        return result.join('\n')
    }

    toRelation() : string {
        var result : Array<string> = this.children.map(c=>{
            var childRelation = c.toRelation()
            if (childRelation.length>0) childRelation += '\n'
            return childRelation+`Label${this.no} --> Label${c.no}`
            
        })
        return result.join('\n')
    }
}


export default {
    'ItemList -> Item':
    function(args : Array<AnalysisToken>) {
        var item = new Item(0, "")
        item.count++
        args[0].value.no = item.count
        item.addItem(args[0].value)
        return item
    }
    ,
    'ItemList -> ItemList Item':
    function(args : Array<AnalysisToken>) {
        // console.log(args[0].value, args[1].value)
        if (args[1].value==null) return args[0].value
        args[0].value.count++
        args[1].value.no = args[0].value.count
        args[0].value.addItem(args[1].value)
        return args[0].value
    }
    ,
    'Item -> FirstLevel':
    function(args : Array<AnalysisToken>) {
        // console.log('FirstLevel:', args[0].value.trim())
        return new Item(1, args[0].value.trim())
    }
    ,
    'Item -> SecondLevel':
    function(args : Array<AnalysisToken>) {
        // console.log('SecondLevel:', args[0].value.trim())
        return new Item(2, args[0].value.trim())
    }
    ,
    'Item -> ThirdLevel':
    function(args : Array<AnalysisToken>) {
        // console.log('ThirdLevel:', args[0].value.trim())
        return new Item(3, args[0].value.trim())
    }
    ,
    'Item -> Enter':function(args : Array<AnalysisToken>) {
        return null
    }
    ,
    
}
