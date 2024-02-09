class A {
    hi() {
        console.log("A")
    }
}

class B extends A {
    hi() {
        super.hi()
        console.log("B")
    }
}

var object = new B()
object.hi()