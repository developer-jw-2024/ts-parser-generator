class MyClass {
    t : number 
    constructor() {
        this.t = new Date().getTime()
    }
}

class ABCClass {
    static my : MyClass = new MyClass()
}
