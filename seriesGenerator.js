const bucketArray = require("./bucketArray");
const buckets = bucketArray.bucketArray;
const got = require("got");

const vmHost = process.argv[2];
const obsLength = +process.argv[3];

const startDT = Math.floor(Date.now() / 5000) * 5000 - 86400000;

const returnString = (le, value, timestamp, entries = false) => {
  console.log(entries);
  return `{"metric":{"__name__":"latency_secondsValue","env":"perf","app":"testing","le":"${le}"},"values":[${value}],"timestamps":[${timestamp}]}`;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let value = getRandomInt(30, 300);
let jsonl = "";
buckets.forEach((element, idx) => {
  console.log("forEach idx:", idx);
  if (idx === 0) {
    value = value;
  } else if (idx % 5 === 0) {
    value = value + getRandomInt(900, 1000);
  } else {
    value = value + getRandomInt(5, 10);
  }
  jsonl += returnString(element, value, startDT) + "\n";
});
// form.append()
console.log(jsonl);

got.post("http://localhost:8428/api/v1/import", {
  body: jsonl,
});

//  Test response
// curl -G 'http://localhost:8428/api/v1/export' -d 'match={__name__=~"latency_.*"}'
