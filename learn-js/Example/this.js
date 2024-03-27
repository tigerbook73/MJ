console.log('1: ', this);

function print() {
  console.log('2: ', this);
}

const obj = {
  print: print,
  print2: () => console.log('3: ', this),
};

print();
obj.print();
obj.print2();
