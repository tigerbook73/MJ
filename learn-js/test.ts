const customOrder = ["m", "s", "t", "z"];

const array = [
  { first: "t", second: 5 },
  { first: "m", second: 1 },
  { first: "s", second: 3 },
  { first: "z", second: 2 },
  { first: "m", second: 4 },
  // add more objects as needed
];

array.sort((a, b) => {
  const orderA = customOrder.indexOf(a.first);
  const orderB = customOrder.indexOf(b.first);

  if (orderA !== orderB) {
    return orderA - orderB;
  } else {
    return a.second - b.second;
  }
});

console.log(array);
