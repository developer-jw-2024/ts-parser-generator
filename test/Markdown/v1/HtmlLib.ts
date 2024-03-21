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

    // init(fun : HtmlElementInitFunction) : HtmlElement {
    //     fun(this)
    //     return this
    // }

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
}

export class HtmlRoot extends HtmlElement {}
export class Blockquote extends HtmlElement {}
export class HtmlGroupElement extends HtmlElement {}
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
export class BacktickText extends HtmlElement {}
export class DoubleBacktickText extends HtmlElement {}

export class Spaces extends HtmlStringElement {}

export class Paragraph extends HtmlElement {}
export class Sentence extends HtmlElement {}
export class PlainText extends HtmlElement {}
export class TaskList extends HtmlElement {}
export class TaskListItem extends HtmlElement {
    checked : boolean
    value : HtmlElement

    constructor(checked : boolean, value : HtmlElement) {
        super()
        this.checked = checked
        this.value = value
    }
}
export class BlankLine extends HtmlElement {}
export class ItalicText extends HtmlElement {}
export class Heading extends HtmlElement {
    level : number
    content : HtmlElement

    constructor(level : number, content : HtmlElement) {
        super()
        this.level = level
        this.content = content
    }


}
export class OrderedList extends HtmlElement {}
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