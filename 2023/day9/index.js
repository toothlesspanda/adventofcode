const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "input.txt");

//
// PART 2
//
function part2(content) {
  let totalSum = 0;

  content = content.map((line) => {
    return line.split(" ").map((elem) => parseInt(elem));
  });

  let allNextValues = [];
  content.forEach((history) => {
    let allSequences = getNextDiffSequence(history);
    let nextValue = getPreviousValue(allSequences);

    allNextValues.push(nextValue);
  });

  totalSum = allNextValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return totalSum;
}

function getPreviousValue(allSequences) {
  let newDiff = 0;

  for (let i = 0; allSequences.length != 1; i++) {
    newDiff = allSequences.at(-2).at(0) - newDiff;

    allSequences.pop();
  }
  return newDiff;
}

//
// PART 1
//

function part1(content) {
  let totalSum = 0;

  content = content.map((line) => {
    return line.split(" ").map((elem) => parseInt(elem));
  });

  let allNextValues = [];
  content.forEach((history) => {
    let allSequences = getNextDiffSequence(history);
    let nextValue = getNextValue(allSequences);

    allNextValues.push(nextValue);
  });

  totalSum = allNextValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return totalSum;
}

function getNextDiffSequence(history) {
  let allSequences = [history];
  let doneAllsequences = false;

  while (!doneAllsequences) {
    let differences = [];
    let lastSequence = allSequences.at(-1);

    for (let i = 0; i < lastSequence.length - 1; i++) {
      let diff = parseInt(lastSequence[i + 1]) - parseInt(lastSequence[i]);
      differences.push(diff);
    }

    allSequences.push(differences);
    if (allSequences.at(-1).every((val) => val === 0)) doneAllsequences = true;
  }
  return allSequences;
}

function getNextValue(allSequences) {
  let newDiff = 0;

  for (let i = 0; allSequences.length != 1; i++) {
    newDiff = newDiff + allSequences.at(-2).at(-1);
    allSequences.pop();
  }
  return newDiff;
}

//
//  main

function main(file = null, part) {
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n");

  if (part == 1) return part1(content);
  if (part == 2) return part2(content);
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(filename, 1));
console.log(main(filename, 2));

module.exports = main;
