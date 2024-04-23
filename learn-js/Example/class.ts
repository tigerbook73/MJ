class A {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class B {
  constructor(public name: string) {
    //
  }

  getName() {
    return this.name;
  }
}

const a = new A("name is a");
const b = new B("name is b");
console.log(a);
console.log(b);
