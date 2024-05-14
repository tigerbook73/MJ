//;

import axios from "axios";

// console.log("start");

// const timerId = setTimeout(() => {
//   console.log("1 sec timeout");
// }, 1000);

// console.log("end");

// const timerId2 = setTimeout(() => {
//   console.log("2 sec timeout");
// }, 2000);

// clearTimeout(timerId);
// clearTimeout(timerId2);

axios
  .get("https://timeapi.io/api/time/current/zone", {
    params: {
      timezone: "Australia/Melbourne",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

console.log("end of call axios");
