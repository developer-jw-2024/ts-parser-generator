import { getClass, isTypeOf } from "../../../src/Utils/Utils"


export class HtmlElement {
    children : Array<HtmlElement> = []

    getChilden() : Array<HtmlElement> {
        return this.children
    }

    addChild(child : HtmlElement) {
        this.children.push(child)
    }

    setChildren(children : Array<HtmlElement>) {
        this.children = children
    }

    init(fieldName : string , value : any) : HtmlElement {
        this[fieldName] = value
        return this
    }

    initChildren(value : any) : HtmlElement {
        return this.init('children', value)
    }

    isEqual(other : HtmlElement) : boolean {
        if (this.getClass()!=other.getClass()) return false
        if (this.getChilden().length!=other.getChilden().length) return false
        var len = this.getChilden().length
        var flag : boolean = true
        for (var i=0;flag && i<len;i++) {
            flag = this.getChilden()[i].isEqual(other.getChilden()[i])
        }
        return flag
    }

    getClass() : any {
        return (this as object).constructor
    }

    buildBeginHtmlString(tagName : string, propertyValues : string[] = []) {
        var properties : string[] = [tagName]
        for (var i=0;i<propertyValues.length;i+=2) {
            var name : string = propertyValues[i]
            var value : string = propertyValues[i+1]
            if (value!=null) {
                properties.push(`${name} = "${value}"`)
            } else {
                properties.push(`${name}`)
            }
        }
        return `<${properties.join(' ')}>`
    }
    
    buildEndHtmlString(tagName : string) {
        var properties : string[] = [`/${tagName}`]
        return `<${properties.join(' ')}>`
    }

    toHtmlString(intent : string = '') : string {
        throw new Error('not implement toHtmlString')
    }

    buildChildrenHtmlString(intent?: string, splitter : string = '\n'): string {
        return this.getChilden().map((c:HtmlElement)=>{
            return c.toHtmlString(intent)
        }).join(splitter)
    }
}

export class HtmlRoot extends HtmlElement {
    toHtmlString(intent?: string): string {
        return this.buildChildrenHtmlString(intent)
    }
}
export class Blockquote extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('div', ['class', 'blockquote'])
        var endTag : string = intent + this.buildEndHtmlString('div')
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class HtmlStringElement extends HtmlElement {
    value : string

    constructor(value : string) {
        super()
        this.value = value
    }

    getValue() : string {
        return this.value
    }

    setValue(value : string) {
        this.value = value
    }

    isEqual(other : HtmlStringElement) : boolean {
        if (!super.isEqual(other)) return false
        if (this.value!=other.getValue()) return false
        return true
    }

    toHtmlString(intent: string = ''): string {
        return this.value
    }
}
export class HtmlValueElement extends HtmlElement {
    value : HtmlElement

    constructor(value : HtmlElement) {
        super()
        this.value = value
    }

    getValue() : HtmlElement {
        return this.value
    }

    setValue(value : HtmlElement) {
        this.value = value
    }

    initValue(value : any) : HtmlElement {
        return this.init('value', value)
    }


    isEqual(other : HtmlValueElement) : boolean {
        if (!super.isEqual(other)) return false
        if (!this.value.isEqual(other.getValue())) return false
        return true
    }
}

export class ErrorHtmlElement extends HtmlStringElement {}


export class NullHtmlElement extends HtmlElement {}
export var NullHtmlInstance : NullHtmlElement = new NullHtmlElement()

export class Text extends HtmlStringElement {}
export class FencedCodeBlockText extends HtmlStringElement {}
export class HorizontalRule extends HtmlStringElement {}
export class BacktickText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '`'+this.buildChildrenHtmlString('', '')+'`'
    }
}
export class DoubleBacktickText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '``'+this.buildChildrenHtmlString('', '')+'``'
    }
}

export class Spaces extends HtmlStringElement {}

export class Paragraph extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '<p>'+this.buildChildrenHtmlString('', '<br/>')+'</p>'
    }
}
export class Sentence extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return this.buildChildrenHtmlString('', '')
    }
}
export class PlainText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return this.buildChildrenHtmlString('', '')
    }
}
export class TaskList extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('div', ['class', 'taskList'])
        var endTag : string = intent + this.buildEndHtmlString('div')
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class TaskListItem extends HtmlElement {
    checked : boolean
    value : HtmlElement

    constructor(checked : boolean, value : HtmlElement) {
        super()
        this.checked = checked
        this.value = value
    }

    toHtmlString(intent : string=''): string {
        var inputProperties : string[] = ['type', 'checkbox']
        if (this.checked) {
            inputProperties.push('checked')
            inputProperties.push(null)
        }
        var input : string = intent + this.buildBeginHtmlString('input', inputProperties)
        var label : string = intent + this.buildBeginHtmlString('label', [])+this.value.toHtmlString('')+this.buildEndHtmlString('label')
        var html : string = input + label + '<br/>'
        return html
    }
}
export class BlankLine extends HtmlElement {
    toHtmlString(intent: string = ''): string {
        return intent + '<br/>'
    }
}
export class ItalicText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('em')
        var endTag : string = this.buildEndHtmlString('em')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class BoldText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('strong')
        var endTag : string = this.buildEndHtmlString('strong')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class Heading extends HtmlElement {
    level : number
    content : HtmlElement

    constructor(level : number, content : HtmlElement) {
        super()
        this.level = level
        this.content = content
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`h${this.level}`)
        var endTag : string = intent + this.buildEndHtmlString(`h${this.level}`)
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class OrderedList extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`ol`)
        var endTag : string = intent + this.buildEndHtmlString(`ol`)
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class OrderedItem extends HtmlElement {
    item : HtmlElement
    complementBlock : HtmlElement 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlock : HtmlElement) {
        this.complementBlock = complementBlock
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`li`)
        var endTag : string = intent + this.buildEndHtmlString(`li`)
        var innerHtml : string = [
            this.item==null?null:this.item.toHtmlString(),
            this.complementBlock==null?null:this.complementBlock.toHtmlString(),
        ].filter(x=>x).join('\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class DefinitionList extends HtmlElement {}
export class DefinitionItem extends HtmlElement {
    term : HtmlElement

    constructor(term : HtmlElement) {
        super() 
        this.term = term
    }
    setTerm(term : HtmlElement) {
        this.term = term
    }

    getTerm() : HtmlElement {
        return this.term
    }

}
export class DefinitionItemValue extends HtmlElement {
    item : HtmlElement
    complementBlock : HtmlElement 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlock : HtmlElement) {
        this.complementBlock = complementBlock
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

}
export class UnorderedList extends HtmlElement {}

export class UnorderedItem extends HtmlElement {
    item : HtmlElement
    complementBlock : HtmlElement 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlock : HtmlElement) {
        this.complementBlock = complementBlock
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

}

export class Table extends HtmlElement {
    headerRow : HtmlElement | null = null
    tableAlignmentRow : HtmlElement  | null = null

    constructor(headerRow : HtmlElement | null = null, tableAlignmentRow : HtmlElement | null = null ) {
        super() 
        this.headerRow = headerRow
        this.tableAlignmentRow = tableAlignmentRow
    }

    setHeaderRow(headerRow : HtmlElement) {
        this.headerRow = headerRow
    }
    getHeaderRow() : HtmlElement {
        return this.headerRow
    }
    setTableAlignmentRow(tableAlignmentRow : HtmlElement) {
        this.tableAlignmentRow = tableAlignmentRow
    }
    getTableAlignmentRow() : HtmlElement {
        return this.tableAlignmentRow
    }
}

export class TableRow extends HtmlElement {
}
export class TableCell extends HtmlElement {
}

export class TableAlignmentRow extends HtmlElement {}
export class TableNoAlignment extends HtmlStringElement {}
export class TableLeftAlignment extends HtmlStringElement {}
export class TableRightAlignment extends HtmlStringElement {}
export class TableCenterAlignment extends HtmlStringElement {}

export class Footnote extends HtmlElement {
    footnoteReference : HtmlElement | null = null
    detail : HtmlElement | null = null
    complementBlock : HtmlElement | null = null

    constructor(footnoteReference : HtmlElement, detail : HtmlElement | null) {
        super()
        this.footnoteReference = footnoteReference
        this.detail = detail
    }

    setComplementBlock(complementBlock : HtmlElement) {
        this.complementBlock = complementBlock
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

}

export class FootnoteReference extends HtmlValueElement {
    
}

export class Cursor extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '|'
    }
}