const { lookup } = require("dns/promises");
const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "input.test3.txt");

//
// PART 2
//

//
// PART 1
//

function part1(content) {
  let totalSum = 0;
  let numLines = content.length;
  let numColumns = content[0].length;

  let matrixPositions = Array(numLines)
    .fill(null)
    .map(() => Array(numColumns).fill(0));

  let startingPosition = [content.findIndex((line) => line.includes("S"))];
  startingPosition.push(content[startingPosition[0]].indexOf("S"));
  matrixPositions[startingPosition[0]][startingPosition[1]] = 0;

  console.log(matrixPositions);
  let allPositionsFound = false;
  while (!allPositionsFound) {
    lookupNextPosition(content, matrixPositions, startingPosition);
  }

  return totalSum;
}

function lookupNextPosition(pipesMatrix, positionsMatrix, currPosition) {
  let up = pipesMatrix[currPosition[0] + 1][currPosition[1]];
  let down = pipesMatrix[currPosition[0] - 1][currPosition[1]];
  let left = pipesMatrix[currPosition[0]][currPosition[1] - 1];
  let right = pipesMatrix[currPosition[0]][currPosition[1] + 1];
  [up, down, left, right];
  console.log("up: " + up);
  console.log("down: " + down);
  console.log("left: " + left);
  console.log("right: " + right);
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
console.log(main(filename, 1));
//console.log(main(filename, 2));

module.exports = main;
