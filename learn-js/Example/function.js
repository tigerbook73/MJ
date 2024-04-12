// greet1('Justin'); // OK
// greet2('Justin'); // ERROR

// function can be invoked before definition
function greet1(name) {
  console.log("Hello, " + name + "!");
}

const greet2 = (name) => {
  console.log("Hi, " + name + "!");
};

greet1("Justin"); // OK
greet2("Justin"); // OK
