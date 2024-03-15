import { getClass, isTypeOf } from "../../../src/Utils/Utils"

type HtmlElementInitFunction = (object: HtmlElement) => void;

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
export class Spaces extends HtmlStringElement {}

export class Paragraph extends HtmlElement {}
export class Sentence extends HtmlElement {}
export class PlainText extends HtmlElement {}
export class BlankLine extends HtmlElement {}
export class ItalicText extends HtmlElement {}
export class Heading extends HtmlElement {}
export class OrderedList extends HtmlElement {}

export class OrderedItem extends HtmlElement {
    item : HtmlElement
    complement : HtmlElement 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplement(complement : HtmlElement) {
        this.complement = complement
    }

    getComplement() : HtmlElement | null {
        return this.complement
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

}