import { ErrorEntity, SymbolEntity, ValueSymbolEntity } from "../../../src/SyntaxAnalysis/SyntaxAnalysis"
import { isNulllOrUndefinedValue, isTypeOf } from "../../../src/Utils/Utils"

export class MarkdownElement extends SymbolEntity {
    markdownElements : Array<MarkdownElement> = []

    getMarkdownElements() : Array<MarkdownElement> {
        return this.markdownElements
    }

    getLastMarkdownElement() : MarkdownElement | null {
        if (this.markdownElements.length==0) return null
        return this.markdownElements.at(-1)
    }

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  this.getMarkdownElements().map(markdownElement=>{
            if (markdownElement.toMarkdownHierarchy) {
                return markdownElement.toMarkdownHierarchy(subIntent)
            } else {
                return [`${subIntent}${markdownElement}`]
            }
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }
 }
export class MarkdownValueElement extends MarkdownElement {
    value : MarkdownElement

    constructor(value : MarkdownElement) {
        super()
        this.value = value
    }

    getValue() {
        return this.value
    }
}


export class MarkdownLines extends MarkdownElement {
    merge() : Markdown {
        var markdown : Markdown = new Markdown()
        for (var i=0;i<this.children.length;i++) {
            var child : MarkdownElement = this.children[i] as MarkdownElement
            markdown.addElement(child)
        }
        return markdown
    }
}


export class Markdown extends MarkdownElement {
    addElement(element : MarkdownElement) {
        if (element.getClass()==Sentence) {
            this.addSentence(element as Sentence)
        } else if (element.getClass()==MarkdownError) {
            this.getMarkdownElements().push(element)
        } else if (element.getClass()==BlankLine) {
            this.getMarkdownElements().push(element)
        } else if (element.getClass()==Heading) {
            this.getMarkdownElements().push(element)
        } else if (element.getClass()==OrderedItem) {
            this.addOrderedItem(element as OrderedItem)
        } else if (element.getClass()==UnorderedItem) {
            this.addUnorderedItem(element as UnorderedItem)
        } else if (element.getClass()==BlockquoteLine) {
            this.addBlockquoteLine(element as BlockquoteLine)
        } else if (element.getClass()==Complement) {
            this.addComplement(element as Complement)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    addSentence(element : Sentence) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var paragraph : Paragraph | null = null
        if (isTypeOf(lastElement, Paragraph)) {
            paragraph = lastElement as Paragraph
        } else {
            paragraph = new Paragraph()
            this.getMarkdownElements().push(paragraph)
        }
        paragraph.addElement(element)
    }

    addOrderedItem(element : OrderedItem) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var orderedList : OrderedList | null = null
        if (isTypeOf(lastElement, OrderedList)) {
            orderedList = lastElement as OrderedList
        } else {
            orderedList = new OrderedList()
            this.getMarkdownElements().push(orderedList)
        }
        orderedList.addElement(element)

    }

    addUnorderedItem(element : UnorderedItem) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var unorderedList : UnorderedList | null = null
        if (isTypeOf(lastElement, UnorderedList)) {
            unorderedList = lastElement as UnorderedList
        } else {
            unorderedList = new UnorderedList()
            this.getMarkdownElements().push(unorderedList)
        }
        unorderedList.addElement(element)
    }

    addBlockquoteLine(element : BlockquoteLine) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var blockquote : Blockquote | null = null
        if (isTypeOf(lastElement, Blockquote)) {
            blockquote = lastElement as Blockquote
        } else {
            blockquote = new Blockquote()
            this.getMarkdownElements().push(blockquote)
        }
        blockquote.getMarkdown().addElement(element.value)
    }

    addComplement(element : Complement) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isNulllOrUndefinedValue(lastElement)) {
            throw new Error(`Can no append complement to this markdown`)
        } else if (lastElement.getClass()==OrderedList) {
            (lastElement as OrderedList).addElement(element)
        } else {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name} with last element ${lastElement.getClass().name}`)
        }
    }
}

export class MarkdownError extends MarkdownElement {
    value : any = null
    constructor(value : any) {
        super()
        this.value = value
    }

    
}

export class Paragraph extends MarkdownElement {
    addElement(element : MarkdownElement) {
        if (element.getClass()==Sentence) {
            this.addSentence(element as Sentence)
        } else {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    addSentence(element : Sentence) {
        this.getMarkdownElements().push(element)
    }
}

export class BlankLine extends MarkdownElement {
    
}

export class TableRow extends MarkdownElement {}
export class TableAlignmentRow extends MarkdownElement {}
export class TableNoAlignment extends MarkdownValueElement {}
export class TableLeftAlignment extends MarkdownValueElement {}
export class TableRightAlignment extends MarkdownValueElement {}
export class TableCenterAlignment extends MarkdownValueElement {}
export class TaskListItem extends MarkdownElement {
    checked : boolean
    value : any

    constructor(checked : boolean, value : any) {
        super()
        this.checked = checked
        this.value = value
    }

    isChecked() {
        return this.checked
    }

    getValue() {
        return this.value
    }
}

export class DefinitionListItem extends MarkdownValueElement {}

export class PlainText extends MarkdownElement {}

export class Sentence extends MarkdownElement {
    
}

export class BoldText extends MarkdownElement {}
export class ItalicText extends MarkdownElement {}
export class StrikethroughText extends MarkdownElement {}
export class HighlightText extends MarkdownElement {}
export class SubscriptText extends MarkdownElement {}
export class SuperscriptText extends MarkdownElement {}
export class DoubleBacktickText extends MarkdownElement {}
export class BacktickText extends MarkdownElement {}
export class FencedCodeBlockText extends MarkdownElement{}

export class SimpleText extends MarkdownValueElement {}

export class Spaces extends MarkdownValueElement {}

export class Footnote extends MarkdownValueElement {}
export class URLAddress extends MarkdownValueElement {}
export class EmailAddress extends MarkdownValueElement {}
export class Emoji extends MarkdownValueElement {}

export class FootnoteReference extends MarkdownValueElement {}
export class HorizontalRule extends MarkdownValueElement {}
export class Blockquote extends MarkdownElement {

    constructor() {
        super()
        var markdown : Markdown = new Markdown()
        this.getMarkdownElements().push(markdown)
    }

    getMarkdown() : Markdown {
        return this.getLastMarkdownElement() as Markdown
    }


}

export class BlockquoteLine extends MarkdownValueElement {}

export class Complement extends MarkdownValueElement {}

export class Heading extends MarkdownValueElement {
    level : number

    constructor(level : number, value : any) {
        super(value)
        this.level = level
    }
}

export class OrderedList extends MarkdownElement {
    addElement(element : MarkdownElement) {
        if (element.getClass()==OrderedItem) {
            this.addOrderedItem(element as OrderedItem)
        } else if (element.getClass()==Complement) {
            this.addComplement(element as Complement)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }

    }

    addOrderedItem(element : OrderedItem) {
        this.getMarkdownElements().push(element)
    }

    addComplement(element : Complement) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isNulllOrUndefinedValue(lastElement)) {
            throw new Error(`Can no append complement to this markdown`)
        } else if (lastElement.getClass()==OrderedItem) {
            (lastElement as OrderedItem).addElement(element)
        } else {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }
}
export class OrderedItem extends MarkdownValueElement {
    constructor(value : MarkdownElement) {
        super(value)
        // var complementMarkdown : Markdown = new Markdown()
        // this.getMarkdownElements().push(complementMarkdown)
    }

    addElement(element : MarkdownElement) {
        if (element.getClass()==Complement) {
            var lastElement : MarkdownElement = this.getLastMarkdownElement()
            var complementMarkdown : Markdown | null = null
            if (isNulllOrUndefinedValue(lastElement)) {
                complementMarkdown = new Markdown()
                this.getMarkdownElements().push(complementMarkdown)
            } else if (lastElement.getClass()==Markdown) {
                complementMarkdown = lastElement as Markdown
            }
            if (complementMarkdown!=null) {
                complementMarkdown.addElement((element as Complement).getValue())
            } else {
                throw new Error(`Can not find a Markdown to append ${element.getClass().name} in ${this.getClass().name}`)
            }
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }

    }

    getComplementMarkdown() : Markdown {
        return this.getLastMarkdownElement() as Markdown
    }
}

export class UnorderedList extends MarkdownElement {

    addElement(element : MarkdownElement) {
        if (element.getClass()==UnorderedItem) {
            this.addUnorderedItem(element as OrderedItem)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }

    }

    addUnorderedItem(element : UnorderedItem) {
        this.getMarkdownElements().push(element)

    }


}
export class UnorderedItem extends MarkdownValueElement {}

export class Image extends MarkdownElement {
    alt : any
    url : any
    title : any

    constructor(alt : any, url : any, title : any=null) {
        super()
        this.alt = alt
        this.url = url
        this.title = title
    }

    getTitle() {
        return this.title
    }

    getAlt() {
        return this.alt
    }
}

export class Link extends MarkdownElement {
    alt : any
    url : any
    title : any

    constructor(alt : any, url : any, title : any=null) {
        super()
        this.alt = alt
        this.url = url
        this.title = title
    }

    getTitle() {
        return this.title
    }

    getAlt() {
        return this.alt
    }
}
