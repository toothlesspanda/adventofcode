const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "input2.txt");

//
// PART 2
//
let stepsTaken = [];

function part2(content) {
  let directions = content[0];
  let nodeGraph = new Map();

  content.slice(2).forEach((line) => {
    let lineSplited = line.match(/\w\w\w/g);
    nodeGraph.set(lineSplited[0], [0, lineSplited[1], lineSplited[2]]);
  });

  let initialNodes = [];
  for (const [key, _] of nodeGraph) {
    if (key[2] == "A") initialNodes.push(key);
  }

  //slet stepsTaken = initialNodes.slice(0)
  let steps = 0;
  let zFound = new Array(initialNodes.length).fill(false);
  let stepsforindx = [];
  for (let d = 0; d < directions.length && zFound.includes(false); d++) {
    steps++;
    for (let indx in initialNodes) {
      let isFound = [];

      if (initialNodes[indx][3] != "Z")
        isFound = findZ(
          nodeGraph,
          directions[d],
          initialNodes[indx],
          stepsTaken
        );

      if (isFound[1]) {
        zFound[indx] = true;
        stepsforindx[indx] = steps;
      }
      initialNodes[indx] = isFound[0] || initialNodes[indx];
    }

    if (d == directions.length - 1) d = -1;
  }
  console.log(stepsforindx);
  let maxsteps = stepsforindx.reduce(findLCM);

  return { total: maxsteps };
}

function findLCM(a, b) {
  let max = Math.max(a, b);
  let min = Math.min(a, b);

  for (i = max; ; i += max) {
    if (i % min == 0) {
      return i;
    }
  }
}

function findZ(nodeGraph, direction, initialNode, stepsTaken) {
  let tmpNode = null;
  if (direction == "L") tmpNode = nodeGraph.get(initialNode)[1];
  if (direction == "R") tmpNode = nodeGraph.get(initialNode)[2];
  initialNode = tmpNode;
  stepsTaken.push(initialNode);

  if (initialNode[2] == "Z") return [initialNode, true];

  return [initialNode, false];
}
//
// PART 1
//

function part1(content) {
  let directions = content[0];
  let nodeGraph = new Map();

  content.slice(2).forEach((line) => {
    let lineSplited = line.match(/\w\w\w/g);
    nodeGraph.set(lineSplited[0], [0, lineSplited[1], lineSplited[2]]);
  });

  let initialNode = "AAA";
  let stepsTaken = ["AAA"];
  let zFound = false;
  for (let d = 0; d < directions.length && !zFound; d++) {
    let tmpNode = null;

    if (directions[d] == "L") tmpNode = nodeGraph.get(initialNode)[1];
    if (directions[d] == "R") tmpNode = nodeGraph.get(initialNode)[2];

    initialNode = tmpNode;
    stepsTaken.push(initialNode);

    if (initialNode == "ZZZ") zFound = true;
    if (d == directions.length - 1) d = -1;
  }

  return { total: stepsTaken.length - 1 };
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
//console.log(main(filename, 1))
console.log(main(filename, 2));

module.exports = main;
