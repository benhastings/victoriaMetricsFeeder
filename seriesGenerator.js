const bucketArray = require("./bucketArray");
const buckets = bucketArray.bucketArray;
const got = require("got");

const vmHost = process.argv[2];
const obsLength = +process.argv[3];

const startDT = Math.floor(Date.now() / 5000) * 5000 - 86400000;

const returnString = (le, valueArray, timeStampArray) => {
  return `{"metric":{"__name__":"latency_secondsValue","env":"perf","app":"testing","le":"${le}"},"values":[${valueArray}],"timestamps":[${timeStampArray}]}`;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const fakeArrayEntries = (input) => {
  const signValue = Math.round(Math.random());
  const nextIncrement = getRandomInt(input * 0.05, input * 0.1);
  const nextEntry =
    signValue === 1 ? input + nextIncrement : input - nextIncrement;
  return nextEntry;
};

let value = getRandomInt(0, 300);
let jsonl = "";
buckets.forEach((element, idx) => {
  // console.log("forEach idx:", idx);
  const valueArray = [];
  const timeStampArray = [startDT];
  if (idx === 0) {
    value = value;
  } else if (idx % 5 === 0) {
    value = value + getRandomInt(900, 1000);
  } else {
    value = value + getRandomInt(5, 10);
  }

  valueArray.push(value);
  if (obsLength > 0) {
    while (valueArray.length <= obsLength) {
      valueArray.push(fakeArrayEntries(value));
      timeStampArray.push(timeStampArray[timeStampArray.length - 1] + 5000);
    }
  }

  jsonl += returnString(element, valueArray, timeStampArray) + "\n";
});
// form.append()
console.log(
  "\nlength of metrics to send: ",
  jsonl.length,
  "\n",
  jsonl.substring(jsonl.length - 300, jsonl.length)
);

(async () => {
  const { body } = await got.post(`http://${vmHost}/api/v1/import`, {
    body: jsonl,
  });
  console.log("responseBody:\n", body);
})();
//  Test response
// curl -G 'http://localhost:8428/api/v1/export' -d 'match={__name__=~"latency_.*"}'
