import React from "react";

function Test3(props) {
  const obj1 = {
    a: 1,
    b: {
      c: 2,
      d: 3,
      e: {
        f: 4,
        g: 5,
        h: {
          i: 6,
        },
      },
    },
  };

  const checkObjectPrinview = (obj, i = 1) => {
    let line = "";
    for (let y = 1; y <= i; y++) {
      line += "-";
    }

    for (const key in obj) {
      // console.log(`${typeof obj[key]} >>> ${key}`);
      if (typeof obj[key] === "object") {
        console.log(`${line}${key} `);
        checkObjectPrinview(obj[key], i + 1);
      } else {
        console.log(`${line}${key} = ${obj[key]}`);
      }
    }
  };
  checkObjectPrinview(obj1);

  return <div>Test</div>;
}

export default Test3;
