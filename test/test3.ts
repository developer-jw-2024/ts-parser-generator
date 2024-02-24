function first(gp : string) {
    // console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // console.log(target, propertyKey, this)
        const originalMethod = descriptor.value;
        const className = target.constructor.name;
        var clazz = target.constructor
        clazz.prototype[gp] = originalMethod
        console.log("first(): called");
    };
  }
   
  function second() {
    // console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
  }
   
  class ExampleClass {

    name : string = "abc"
    


    @first("a->b")
    @second()
    method() {
        console.log('I am method', this)
    }
  }

  var a = new ExampleClass()
  a.method()
  a['a->b']()
//   for (var member in ExampleClass) { // For each member of the dictionary
//     if (typeof ExampleClass[member] == "function") { // Is it a function?
//       if (ExampleClass.hasOwnProperty(member)) { // Not inherited
//         console.log(member)
//       }
//     }
//   }
  