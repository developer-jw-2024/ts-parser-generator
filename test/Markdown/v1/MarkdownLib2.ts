import { ErrorEntity, SymbolEntity, ValueSymbolEntity } from "../../../src/SyntaxAnalysis/SyntaxAnalysis"
import { isNulllOrUndefinedValue, isTypeOf } from "../../../src/Utils/Utils"
import * as html from "./HtmlLib"

export class MarkdownElement extends SymbolEntity {
    markdownElements : Array<MarkdownElement> = []

    getMarkdownElements() : Array<MarkdownElement> {
        return this.markdownElements
    }

    getLastMarkdownElement() : MarkdownElement | null {
        if (this.markdownElements.length==0) return null
        return this.markdownElements.at(-1)
    }

    getLastSecondMarkdownElement() : MarkdownElement | null {
        if (this.markdownElements.length<2) return null
        return this.markdownElements.at(-2)
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

    mergeUnhandledBlockquotes(elements : any) : Array<Blockquote> {
        var result = Array<MarkdownElement> = [].concat.apply([], elements)
        return result.filter(x=>isTypeOf(x, Blockquote)).filter(x=>!x.isHandled())
    }

    getUnhandledChildrenBlockquotes() : Array<Blockquote> {
        var childResult : any = this.getMarkdownElements().filter(x=>x).map(markdownElement=>{
            return markdownElement.getUnhandledBlockquotes()
        })
        var childBlockquotes : Array<Blockquote> = [].concat.apply([], childResult)
        return childBlockquotes
    }

    getUnhandledBlockquotes() : Array<Blockquote> {
        var childBlockquotes : Array<Blockquote> = this.getUnhandledChildrenBlockquotes()
        var result : Array<Blockquote> = this.mergeUnhandledBlockquotes([[this]])
        return result.concat(childBlockquotes)
    }

    toChildrenMarkdownElementsHtml() : Array<html.HtmlElement> {
        var htmlEles : Array<html.HtmlElement> =  this.getMarkdownElements().filter(x=>x).map(markdownElement=>{
            return markdownElement.toHtml()
        })
        return htmlEles
    }
    toHtml() : html.HtmlElement {
        return html.NullHtmlInstance
    }
 }
export class MarkdownValueElement extends MarkdownElement {
    value : any = null

    constructor(value : any) {
        super()
        this.value = value
    }

    getValue() {
        return this.value
    }

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  [this.getValue()].concat(this.getMarkdownElements()).filter(x=>x).map(markdownElement=>{
            if (markdownElement.toMarkdownHierarchy) {
                return markdownElement.toMarkdownHierarchy(subIntent)
            } else {
                return [`${subIntent}${markdownElement}`]
            }  
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    getUnhandledBlockquotes() : Array<Blockquote> {
        var childBlockquotes : Array<Blockquote> = this.getUnhandledChildrenBlockquotes()
        var result : Array<Blockquote> = this.mergeUnhandledBlockquotes([[this, this.getValue()]])
        return result.concat(childBlockquotes)
    }

    toValueHtml() : html.HtmlElement {
        if (isTypeOf(this.value, String)) {
            return new html.Text(this.value)
        } else if (this.value!=null && this.value.toHtml) {
            return this.value.toHtml()
        } else if (this.value==null) {
            return null
        }
        throw new Error(`The value ${this.value} in ${this.getClass()} have not handled!`)
    }

    toHtml(): html.HtmlElement {
        
        throw new Error(`The value ${this.value} in ${this.getClass()} have not handled!`)
    }
}

export class MarkdownLines extends MarkdownElement {
    merge() : Markdown {
        var markdown : Markdown = new Markdown()
        for (var i=0;i<this.children.length;i++) {
            var child : MarkdownElement = this.children[i] as MarkdownElement
            markdown.addElement(child)
        }

        var unhandledBlockquotes : Array<Blockquote> = markdown.getUnhandledBlockquotes()
        if (unhandledBlockquotes.length>0) {
            // unhandledBlockquotes[0].merge()
        }
        // while (unhandledBlockquotes.length>0) {
        //     for (var i=0;i<unhandledBlockquotes.length;i++) {
        //         var unhandledBlockquote : Blockquote = unhandledBlockquotes[i]
        //         unhandledBlockquote.merge()
        //     }
        //     unhandledBlockquotes  = markdown.getUnhandledBlockquotes()
        //     unhandledBlockquotes = []
        // }

        return markdown
    }
}


export class Markdown extends MarkdownElement {

    constructor() {
        super()
    }

    
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
        } else if (element.getClass()==DashesRule) {
            this.addDashesRule(element as DashesRule)
        } else if (element.getClass()==EqualsRule) {
            this.addEqualsRule(element as EqualsRule)
        } else if (element.getClass()==TableRow) {
            this.addTableRow(element as TableRow)
        } else if (element.getClass()==TableAlignmentRow) {
            this.addTableAlignmentRow(element as TableAlignmentRow)
        } else if (element.getClass()==FencedCodeBlockText) {
            this.addFencedCodeBlockText(element as FencedCodeBlockText)
        } else if (element.getClass()==DefinitionListItem) {
            this.addDefinitionListItem(element as DefinitionListItem)
        } else if (element.getClass()==TaskListItem) {
            this.addTaskListItem(element as TaskListItem)
        } else if (element.getClass()==Footnote) {
            this.addFootnote(element as Footnote)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }

        // var last : MarkdownElement | null =  this.getLastMarkdownElement()
        // var lastSecond : MarkdownElement | null = this.getLastSecondMarkdownElement()

        // if (last!=null 
        //     && isTypeOf(last, Blockquote)) {
        //     var blockquote : Blockquote = last as Blockquote
        //     console.log('blockquote', blockquote.timer)
        //     this.addBlockquote(blockquote)
        // }

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
        // blockquote.getMarkdown().addElement(element.value)
        // console.log('-->', element.value)
        blockquote.appendStringLine(element.value)
    }

    addComplement(element : Complement) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isNulllOrUndefinedValue(lastElement)) {
            throw new Error(`Can no append complement to this markdown`)
        } else if (lastElement.getClass()==OrderedList) {
            (lastElement as OrderedList).addElement(element)
        } else if (lastElement.getClass()==UnorderedList) {
            (lastElement as UnorderedList).addElement(element)
        } else if (lastElement.getClass()==Footnote) {
            (lastElement as Footnote).addElement(element)
        } else {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name} with last element ${lastElement.getClass().name}`)
        }
    }

    addDashesRule(element : DashesRule) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isTypeOf(lastElement, Paragraph)) {
            var paragraph : Paragraph = lastElement as Paragraph
            var sentence : Sentence | null = null
            if (paragraph.getMarkdownElements().length==1) {
                sentence = paragraph.getMarkdownElements().pop()
            } 
            if (paragraph.getMarkdownElements().length==0) {
                this.getMarkdownElements().pop()
            }
            if (isNulllOrUndefinedValue(sentence)) {
                this.getMarkdownElements().push(new HorizontalRule(element.getValue()))
            } else {
                this.getMarkdownElements().push(new Heading(2, sentence))
            }

        } else {
            this.getMarkdownElements().push(new HorizontalRule(element.getValue()))
        }
    }

    addEqualsRule(element : EqualsRule) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isTypeOf(lastElement, Paragraph)) {
            var paragraph : Paragraph = lastElement as Paragraph
            var sentence : Sentence | null = null
            if (paragraph.getMarkdownElements().length==1) {
                sentence = paragraph.getMarkdownElements().pop()
            } 
            if (paragraph.getMarkdownElements().length==0) {
                this.getMarkdownElements().pop()
            }
            if (isNulllOrUndefinedValue(sentence)) {
            } else {
                this.getMarkdownElements().push(new Heading(1, sentence))
            }
        }
    }

    addTableRow(element : TableRow) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var table : Table | null = null
        if (isTypeOf(lastElement, Table)) {
            table = lastElement as Table
        } else {
            table = new Table()
            this.getMarkdownElements().push(table)
        }
        table.addElement(element)
    }

    addTableAlignmentRow(element : TableAlignmentRow) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var table : Table | null = null
        if (isTypeOf(lastElement, Table)) {
            table = lastElement as Table
        } else {
            table = new Table()
            this.getMarkdownElements().push(table)
        }
        table.addElement(element)
    }

    addFencedCodeBlockText(element : FencedCodeBlockText) {
        this.getMarkdownElements().push(element)
    }

    addDefinitionListItem(element : DefinitionListItem) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        var descriptionList : DescriptionList | null = null

        if (isTypeOf(lastElement, Paragraph)) {
            var paragraph : Paragraph = lastElement as Paragraph
            var sentence : Sentence | null = null
            if (paragraph.getMarkdownElements().length==1) {
                sentence = paragraph.getMarkdownElements().pop()
            } 
            if (paragraph.getMarkdownElements().length==0) {
                this.getMarkdownElements().pop()
            }
            if (isTypeOf(this.getLastMarkdownElement(), DescriptionList)) {
                descriptionList = this.getLastMarkdownElement() as DescriptionList
            } else {
                descriptionList  = new DescriptionList()
                this.getMarkdownElements().push(descriptionList)    
            }

            var definitionListItemGroup  = new DefinitionListItemGroup()
            descriptionList.addElement(definitionListItemGroup)

            if (isNulllOrUndefinedValue(sentence)) {
            } else {
                definitionListItemGroup.setNameOfGroup(sentence)
            }
        } else if (isTypeOf(lastElement, DescriptionList)) {
            descriptionList = lastElement as DescriptionList
        } else {
            descriptionList  = new DescriptionList()
            this.getMarkdownElements().push(descriptionList)    
            var definitionListItemGroup  = new DefinitionListItemGroup()
            descriptionList.addElement(definitionListItemGroup)
        }
        if (isNulllOrUndefinedValue(descriptionList)) {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name} with last element ${lastElement.getClass().name}`)
        } else {
            descriptionList.addElement(element)
        }
    }

    addTaskListItem(element : TaskListItem) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        
        var taskList : TaskList | null = null
        if (isTypeOf(lastElement, TaskList)) {
            taskList = lastElement as TaskList
        } else {
            taskList = new TaskList()
            this.getMarkdownElements().push(taskList)
        }
        taskList.addElement(element)
    }

    addFootnote(element : Footnote) {
        this.getMarkdownElements().push(element)
    }

    toHtml() : html.HtmlElement {
        var g : html.HtmlRoot = new html.HtmlRoot()
        g.setChildren(this.toChildrenMarkdownElementsHtml())
        return g
    }
}

export class MarkdownError extends MarkdownElement {
    value : string = ''
    constructor(value : string) {
        super()
        this.value = value
    }

    toHtml(): html.HtmlElement {
        return new html.ErrorHtmlElement(this.value)
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

    toHtml(): html.HtmlElement {
        var p : html.Paragraph = new html.Paragraph()
        p.setChildren(this.toChildrenMarkdownElementsHtml())
        return p
    }
    
}

export class BlankLine extends MarkdownElement {

    toHtml(): html.HtmlElement {
        return new html.BlankLine()
    }
}



export class TableRow extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.TableRow = new html.TableRow()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}
export class TableCell extends MarkdownElement {
    tableRow : TableRow | null = null

    constructor(tableRow : TableRow) {
        super()
        this.tableRow = tableRow
    }

    getTableRow() : TableRow | null{
        return this.tableRow
    }

    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.TableCell = new html.TableCell()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}
export class TableAlignmentRow extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.TableAlignmentRow = new html.TableAlignmentRow()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}
export class TableColumnAlignment extends MarkdownValueElement{
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    
}
export class TableNoAlignment extends TableColumnAlignment {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }
    
    toHtml(): html.HtmlElement {
        return new html.TableNoAlignment(this.value)
    }
}
export class TableLeftAlignment extends TableColumnAlignment {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.TableLeftAlignment(this.value)
    }

}
export class TableRightAlignment extends TableColumnAlignment {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.TableRightAlignment(this.value)
    }
}
export class TableCenterAlignment extends TableColumnAlignment {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.TableCenterAlignment(this.value)
    }
}
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

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  [this.value].concat(this.getMarkdownElements()).filter(x=>x).map(markdownElement=>{
            if (markdownElement.toMarkdownHierarchy) {
                return markdownElement.toMarkdownHierarchy(subIntent)
            } else {
                return [`${subIntent}${markdownElement}`]
            }
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    getUnhandledBlockquotes() : Array<Blockquote> {
        var childBlockquotes : Array<Blockquote> = this.getUnhandledChildrenBlockquotes()
        var result : Array<Blockquote> = this.mergeUnhandledBlockquotes([[this, this.getValue()]])
        return result.concat(childBlockquotes)
    }

}

export class TaskList extends MarkdownElement {
    
    addElement(element : MarkdownElement) {
        if (element.getClass()==TaskListItem) {
            this.getMarkdownElements().push(element)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    
}

export class DefinitionListItem extends MarkdownValueElement {}

export class PlainText extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.PlainText = new html.PlainText()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}

export class Sentence extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }



    toHtml(): html.HtmlElement {
        var e : html.Sentence = new html.Sentence()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}

export class BoldText extends MarkdownElement {}
export class StarBoldText extends BoldText {}
export class UnderlineBoldText extends BoldText {}
export class ItalicText extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.ItalicText = new html.ItalicText()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
    
}
export class StarItalicText extends ItalicText {}
export class UnderlineItalicText extends ItalicText {}
export class BoldItalicText extends MarkdownElement {}
export class StarBoldItalicText extends BoldItalicText {}
export class UnderlineBoldItalicText extends BoldItalicText {}
export class StrikethroughText extends MarkdownElement {}
export class HighlightText extends MarkdownElement {}
export class SubscriptText extends MarkdownElement {}
export class SuperscriptText extends MarkdownElement {}
export class DoubleBacktickText extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.DoubleBacktickText = new html.DoubleBacktickText()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}
export class BacktickText extends MarkdownElement {
    addChild(child : any) {
        this.children.push(child)
        this.markdownElements.push(child)
    }

    toHtml(): html.HtmlElement {
        var e : html.BacktickText = new html.BacktickText()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}
export class FencedCodeBlockText extends MarkdownValueElement{
    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  this.getMarkdownElements().filter(x=>x).map(markdownElement=>{
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

export class SimpleText extends MarkdownValueElement {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.Text(this.value)
    }
}

export class Spaces extends MarkdownValueElement {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.Spaces(this.value)
    }
}
export class Cursor extends MarkdownElement {}
export class Footnote extends MarkdownElement {

    footnoteReference : MarkdownElement | null = null
    detail : MarkdownElement | null = null

    constructor(footnoteReference : MarkdownElement, detail : MarkdownElement) {
        super()
        this.footnoteReference = footnoteReference
        this.detail = detail
    }

    addComplement(element : Complement) {
        this.getMarkdownElements().push(element)
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

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  [this.footnoteReference, this.detail].concat(this.getMarkdownElements()).filter(x=>x).map(markdownElement=>{
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
export class URLAddress extends MarkdownValueElement {}
export class EmailAddress extends MarkdownValueElement {}
export class Emoji extends MarkdownValueElement {}

export class FootnoteReference extends MarkdownValueElement {}
export class HorizontalRule extends MarkdownValueElement {
    toMarkdownHierarchy(intent : string = '') {
        // var subIntent = `${intent}    `
        var resultArray =  []
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        return new html.HorizontalRule(this.value)
    }
}
export class DashesRule extends MarkdownValueElement {}
export class EqualsRule extends MarkdownValueElement {}

export class Blockquote extends MarkdownElement {
    isHandledFlag : boolean = false
    contentLines : Array<string> = []

    constructor() {
        super()
        // var markdown : Markdown = new Markdown()
        // this.getMarkdownElements().push(markdown)
        this.isHandledFlag = false
        this.contentLines = []
    }

    appendStringLine(line : string) {
        this.contentLines.push(line)
    }

    getContent() : string {
        return this.contentLines.map(l=>{
            if (l.startsWith('> ')) {
                return l.substring(2)
            } else if (l.startsWith('>>')) {
                return l.substring(1)
            } else if (l.startsWith('>▮ ')) {
                return l.substring(3)
            } else if (l.startsWith('>>▮')) {
                return l.substring(1)
            } else if (l.startsWith('▮> ')) {
                return l.substring(3)
            } else if (l.startsWith('▮>>')) {
                return l.substring(2)
            } else if (l.startsWith('>▮>')) {
                return l.substring(2)
            } else {
                return l                
            }
        }).join('\n')
    }

    getMarkdown() : Markdown {
        return this.getLastMarkdownElement() as Markdown
    }

    merge() {
        // var content : string = this.getContent()
        // var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()
        // var blockquoteMarkdown : Markdown =  markdownSyntaxAnalyzer.toMarkddown(content)
        // this.getMarkdownElements().push(blockquoteMarkdown)
        this.isHandledFlag = true
    }
    
    isHandled(): boolean {
        return this.isHandledFlag
    }

    toHtml(): html.HtmlElement {
        var e : html.Blockquote = new html.Blockquote()
        e.addChild(this.getMarkdown().toHtml())
        return e
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

    toHtml(): html.HtmlElement {
        var e : html.Heading = new html.Heading(this.level, this.toValueHtml())
        return e
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

    toHtml(): html.HtmlElement {
        var e : html.OrderedList = new html.OrderedList()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }

   
}
export class OrderedItem extends MarkdownValueElement {
    

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

    toHtml(): html.HtmlElement {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        var complementMarkdown : Markdown | null = null
        if (!isNulllOrUndefinedValue(lastElement)) {
            complementMarkdown = lastElement as Markdown
        }
        var e : html.OrderedItem = new html.OrderedItem(this.toValueHtml())
        if (complementMarkdown!=null) {
            e.setComplement(complementMarkdown.toHtml())
        }
        return e
    }
}

export class UnorderedList extends MarkdownElement {

    addElement(element : MarkdownElement) {
        if (element.getClass()==UnorderedItem) {
            this.addUnorderedItem(element as OrderedItem)
        } else if (element.getClass()==Complement) {
            this.addComplement(element as Complement)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }

    }

    addUnorderedItem(element : UnorderedItem) {
        this.getMarkdownElements().push(element)

    }

    addComplement(element : Complement) {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        if (isNulllOrUndefinedValue(lastElement)) {
            throw new Error(`Can no append complement to this markdown`)
        } else if (lastElement.getClass()==UnorderedItem) {
            (lastElement as UnorderedItem).addElement(element)
        } else {
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    toHtml(): html.HtmlElement {
        var e : html.UnorderedList = new html.UnorderedList()
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }

}
export class UnorderedItem extends MarkdownValueElement {
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

    toHtml(): html.HtmlElement {
        var lastElement : MarkdownElement = this.getLastMarkdownElement()
        var complementMarkdown : Markdown | null = null
        if (!isNulllOrUndefinedValue(lastElement)) {
            complementMarkdown = lastElement as Markdown
        }
        var e : html.UnorderedItem = new html.UnorderedItem(this.toValueHtml())
        if (complementMarkdown!=null) {
            e.setComplement(complementMarkdown.toHtml())
        }
        return e
    }
}

export class DescriptionList extends MarkdownElement {
    addElement(element : MarkdownElement) {
        if (element.getClass()==DefinitionListItemGroup) {
            this.getMarkdownElements().push(element)
        } else if (element.getClass()==DefinitionListItem) {
            (this.getLastMarkdownElement() as DefinitionListItemGroup).addElement(element)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

}

export class DefinitionListItemGroup extends MarkdownElement {
    nameOfGroup : MarkdownElement | null = null
    // elements : Array<MarkdownElement> | null = null

    setNameOfGroup(nameOfGroup : MarkdownElement) {
        this.nameOfGroup = nameOfGroup
    }

    getNameOfGroup() {
        return this.nameOfGroup
    }

    addElement(element : MarkdownElement) {
        if (element.getClass()==DefinitionListItem) {
            this.getMarkdownElements().push(element)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  [this.nameOfGroup].concat(this.getMarkdownElements()).filter(x=>x).map(markdownElement=>{
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

export class Table extends MarkdownElement {
    headerRow : TableRow | null = null
    tableAlignmentRow : TableAlignmentRow | null = null

    setHeaderRow(headerRow : TableRow) {
        this.headerRow = headerRow
    }

    getHeaderRow() : TableRow | null {
        return this.headerRow
    }

    setTableAlignmentRow(tableAlignmentRow : TableAlignmentRow) {
        this.tableAlignmentRow = tableAlignmentRow
    }

    getTableAlignmentRow() : TableAlignmentRow | null{
        return this.tableAlignmentRow
    }

    addElement(element : MarkdownElement) {
        if (element.getClass()==TableRow) {
            this.getMarkdownElements().push(element)
        } else if (element.getClass()==TableAlignmentRow) {
            this.addTableAlignmentRow(element as TableAlignmentRow)
        } else{
            throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`)
        }
    }

    addTableAlignmentRow(element : TableAlignmentRow) {
        if (this.getMarkdownElements().length==0) {
            this.setTableAlignmentRow(element)
        } else if (this.getMarkdownElements().length==1) {
            var headerRow : TableRow = this.getMarkdownElements().pop()
            this.setHeaderRow(headerRow)
            this.setTableAlignmentRow(element)
        }
    }

    toMarkdownHierarchy(intent : string = '') {
        var subIntent = `${intent}    `
        var resultArray =  [this.getHeaderRow(), this.getTableAlignmentRow()].concat(this.getMarkdownElements()).filter(x=>x).map(markdownElement=>{
            if (markdownElement.toMarkdownHierarchy) {
                return markdownElement.toMarkdownHierarchy(subIntent)
            } else {
                return [`${subIntent}${markdownElement}`]
            }  
        })
        resultArray.unshift(`${intent}${this.constructor.name}`)
        return [].concat.apply([], resultArray)
    }

    toHtml(): html.HtmlElement {
        var headerRowHtml : html.HtmlElement | null = this.getHeaderRow()==null?null:this.getHeaderRow().toHtml()
        var tableAlignmentRowHtml : html.HtmlElement | null = this.getTableAlignmentRow()==null?null:this.getTableAlignmentRow().toHtml()
        var e : html.Table = new html.Table(headerRowHtml, tableAlignmentRowHtml)
        e.setChildren(this.toChildrenMarkdownElementsHtml())
        return e
    }
}

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
