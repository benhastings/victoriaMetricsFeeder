// -------------------------------
// Example Usage
// -------------------------------
//  node seriesGenerator.js localhost:8428 30 random

const bucketArray = require("./bucketArray");
const buckets = bucketArray.bucketArray;
const got = require("got");

const vmHost = process.argv[2];
const obsLength = +process.argv[3];
const setting = process.argv[4];

const startDT = Math.floor(Date.now() / 1000) * 1000 - obsLength * 1000;

const returnString = (le, valueArray, timeStampArray) => {
  return `{"metric":{"__name__":"latency_seconds","env":"perf","app":"testing","le":"${le}"},"values":[${valueArray}],"timestamps":[${timeStampArray}]}`;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const fakeArrayEntries = (input) => {
  let nextEntry = input;
  if (setting !== "fixed") {
    const signValue = Math.round(Math.random());
    const nextIncrement = getRandomInt(
      Math.round(input * 0.05),
      Math.round(input * 0.1) + 1
    );
    nextEntry = signValue === 1 ? input + nextIncrement : input - nextIncrement;
  }
  return nextEntry;
};

let value = getRandomInt(0, 10);
value = 10;
let jsonl = "";
buckets.forEach((element, idx) => {
  // console.log("forEach idx:", idx);
  const valueArray = [];
  const timeStampArray = [startDT];
  if (idx === 0) {
    value = value;
  } else if (idx % 11 === 0) {
    value = value + getRandomInt(1000, 1010);
  } else if (idx % 3 === 0) {
    value = value + getRandomInt(1000, 1010);
  } else if (element === "+Inf") {
    true;
  } else {
    value = value + getRandomInt(0, 5);
  }

  valueArray.push(value);
  if (obsLength > 0) {
    while (valueArray.length <= obsLength) {
      valueArray.push(fakeArrayEntries(value));
      timeStampArray.push(timeStampArray[timeStampArray.length - 1] + 1000);
    }
  }

  jsonl += returnString(element, valueArray, timeStampArray) + "\n";
});
// form.append()
console.log(
  "\nlength of metrics to send: ",
  jsonl.length,
  "\n",
  // jsonl.substring(jsonl.length - 300, jsonl.length)
  jsonl
);

(async () => {
  const { body } = await got.post(`http://${vmHost}/api/v1/import`, {
    body: jsonl,
  });
  console.log("responseBody:\n", body, "\nTimings", body.timings);
})();
//  Test response
// curl -G 'http://localhost:8428/api/v1/export' -d 'match={__name__=~"latency_.*"}'
