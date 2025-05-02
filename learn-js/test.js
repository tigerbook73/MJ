import { writeFile } from "fs";
let comb_1 = [
  (1, 1, 1),
  (2, 2, 2),
  (3, 3, 3),
  (4, 4, 4),
  (5, 5, 5),
  (6, 6, 6),
  (7, 7, 7),
  (8, 8, 8),
  (9, 9, 9),
  (1, 2, 3),
  (2, 3, 4),
  (3, 4, 5),
  (4, 5, 6),
  (5, 6, 7),
  (6, 7, 8),
  (7, 8, 9),
];

function comb(array, size) {
  const results = [];

  function combine(current, remaining) {
    if (current.length === size) {
      results.push(current);
      return;
    }
    if (remaining.length === 0) {
      return;
    }

    combine(current.concat(remaining[0]), remaining.slice(1));
    combine(current, remaining.slice(1));
  }

  combine([], array);
  return results;
}

// Example usage:
const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

let comb_2 = comb(comb_1, 2);
let comb_3 = comb(comb_1, 3);

comb_1 = JSON.stringify(comb_1);
comb_2 = JSON.stringify(comb_2);
comb_3 = JSON.stringify(comb_3);

writeFile("output3.txt", comb_3, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("File written successfully");
  }
});

writeFile("output2.txt", comb_2, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("File written successfully");
  }
});
