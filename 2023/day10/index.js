const { lookup } = require("dns/promises")
const fs = require("fs")
const path = require("path")

const filename = path.join(__dirname, "input.test3.txt")

//
// PART 2
//

//
// PART 1
//

function part1(content) {
  let totalSum = 0
  let numLines = content.length
  let numColumns = content[0].length

  let matrixPositions = Array(numLines)
    .fill(null)
    .map(() => Array(numColumns).fill(0))

  let startingPosition = [content.findIndex((line) => line.includes("S"))]
  startingPosition.push(content[startingPosition[0]].indexOf("S"))
  matrixPositions[startingPosition[0]][startingPosition[1]] = 0

  console.log(matrixPositions)
  let allPositionsFound = false
  while (!allPositionsFound) {
    lookupNextPosition(content, matrixPositions, startingPosition)
  }

  return totalSum
}

function lookupNextPosition(pipesMatrix, positionsMatrix, currPosition) {
  let nextPositions = new NextPositions(currPosition, pipesMatrix)

  if (nextPositions.u.symbol == "|") {
    lookupNextPosition(pipesMatrix, positionsMatrix, nextPositions.u.coords)
  }
  if (AVAILABLE_TILES_names.includes(nextPositions.l.symbol)) {
    lookupNextPosition(pipesMatrix, positionsMatrix, nextPositions.l.coords)
  }
  if (AVAILABLE_TILES_names.includes(nextPositions.u.symbol)) {
    lookupNextPosition(pipesMatrix, positionsMatrix, nextPositions.u.coords)
  }
  if (AVAILABLE_TILES_names.includes(nextPositions.u.symbol)) {
    lookupNextPosition(pipesMatrix, positionsMatrix, nextPositions.u.coords)
  }
}

class NextPositions {
  constructor(data, matrix) {
    this.u = { coords: [data[0] + 1, data[1]], symbol: matrix[data[0] + 1][data[1]] }
    this.d = { coords: [data[0] - 1, data[1]], symbol: matrix[data[0] - 1][data[1]] }
    this.l = { coords: [data[0], data[1] - 1], symbol: matrix[data[0]][data[1] - 1] }
    this.r = { coords: [data[0], data[1] + 1], symbol: matrix[data[0]][data[1] + 2] }
  }

  l() {
    return this.l
  }
  r() {
    return this.r
  }
  d() {
    return this.d
  }
  u() {
    return this.u
  }
}
//
//  main

const AVAILABLE_TILES = {
  "|": ["u", "d"],
  "-": ["l", "r"],
  L: ["u", "r"],
  J: ["u", "l"],
  7: ["l", "d"],
  F: ["r", "d"],
}
const AVAILABLE_TILES_names = Object.keys(AVAILABLE_TILES)

function main(file = null, part) {
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n")

  if (part == 1) return part1(content)
  if (part == 2) return part2(content)
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
console.log(main(filename, 1))
//console.log(main(filename, 2));

module.exports = main
