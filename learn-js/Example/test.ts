export {};

function getMonthName(mo: number): string {
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (months[mo]) {
    return months[mo];
  } else {
    throw "InvalidMonthNo"; //throw keyword is used here
  }
}

const newfunc = getMonthName;

function func1() {
  return null;
}

const func2 = function () {
  return null;
};

function generate(num: number) {
  if (num < 0) {
    return function () {
      return "Negative";
    };
  }
  return null;
}
