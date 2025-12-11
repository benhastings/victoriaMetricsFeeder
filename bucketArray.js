// const bucketArray = [];
// let exp = -3;

// while (exp < 1) {
//   const next = exp + 1;
//   let base = 10 ** exp;
//   const cap = 10 ** next;
//   let interval = (cap - base) / 18;
//   if (interval < 0.5) {
//     interval = +interval.toFixed(3);
//     console.log(interval);
//   }

//   console.log(base, cap, interval);

//   while (base < cap) {
//     bucketArray.push(base);
//     base = base + interval;
//   }
//   exp += 1;
// }
// console.log(JSON.stringify(bucketArray));

// const bucketArray = [
//   0.001,
//   0.002,
//   0.003,
//   0.004,
//   0.005,
//   0.006,
//   0.007,
//   0.008,
//   0.009,
//   0.01,
//   0.015,
//   0.02,
//   0.025,
//   0.03,
//   0.035,
//   0.04,
//   0.045,
//   0.05,
//   0.055,
//   0.06,
//   0.065,
//   0.07,
//   0.075,
//   0.08,
//   0.085,
//   0.09,
//   0.095,
//   0.1,
//   0.15,
//   0.2,
//   0.25,
//   0.3,
//   0.35,
//   0.4,
//   0.45,
//   0.5,
//   0.55,
//   0.6,
//   0.65,
//   0.7,
//   0.75,
//   0.8,
//   0.85,
//   0.9,
//   0.95,
//   1,
//   1.5,
//   2,
//   2.5,
//   3,
//   3.5,
//   4,
//   4.5,
//   5,
//   5.5,
//   6,
//   6.5,
//   7,
//   7.5,
//   8,
//   8.5,
//   9,
//   9.5,
//   10,
//   "+Inf",
// ];

// const bucketArray = [
//   0.5,
//   1,
//   1.5,
//   2,
//   2.5,
//   3,
//   3.5,
//   4,
//   4.5,
//   5,
//   5.5,
//   6,
//   6.5,
//   7,
//   7.5,
//   8,
//   8.5,
//   9,
//   9.5,
//   10,
//   "+Inf",
// ];


// arr=[];value = 1; for (let i=1; i<=45; i++) {
//   value = value * 1.25; arr.push(Math.round(value));
//   console.log(i, '\t', Math.round(value));
// }
//----------------------
// sparse approximation up to just under 10s in ms

const bucketArray = [
     2,    4,    7,    9,   12,   15,   18,
    23,   28,   36,   44,   56,   69,   87,
   108,  136,  169,  212,  265,  331,  414,
   517,  646,  808, 1010, 1262, 1578, 1972,
  2465, 3081, 3852, 4815, 6019, 7523, 9404, "+Inf"
]

exports.bucketArray = bucketArray;
