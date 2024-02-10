function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first(): called");
    };
  }

@first
function add(a:number, b:number) : number {
    return a +b
}

console.log(add(5,3))