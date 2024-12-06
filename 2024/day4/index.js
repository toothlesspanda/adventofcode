const fs = require("fs")
const lib = require("./lib")

function part1(matrix) {
  let total = 0

  for (let lineIdx in matrix) {
    for (let colIdx in matrix[lineIdx]) {
      if (matrix[lineIdx][colIdx] != "X") continue
      // X FOUND
      let col = Number(colIdx)
      let line = Number(lineIdx)
      if (lib.horizontalLeftLookupMAS(matrix, line, col)) total++
      if (lib.horizontalRightLookupMAS(matrix, line, col)) total++
      if (lib.verticalDownLookupMAS(matrix, line, col)) total++
      if (lib.verticalUpLookupMAS(matrix, line, col)) total++
      if (lib.diagonalUpLeftLookupMAS(matrix, line, col)) total++
      if (lib.diagonalUpRightLookupMAS(matrix, line, col)) total++
      if (lib.diagonalDownLeftLookupMAS(matrix, line, col)) total++
      if (lib.diagonalDownRightLookupMAS(matrix, line, col)) total++
    }
  }

  return total
}

function part2(matrix) {
  let total = 0

  for (let lineIdx in matrix) {
    for (let colIdx in matrix[lineIdx]) {
      if (matrix[lineIdx][colIdx] != "A") continue

      let line = Number(lineIdx)
      let col = Number(colIdx)

      if (lib.diagonalPositiveA(matrix, line, col) && lib.diagonalNegativeA(matrix, line, col)) {
        total++
      }
    }
  }

  return total
}

//
//  main
//
function main(part) {
  const content = fs.readFileSync("./2024/day4/input.txt", "utf-8", "r+").split("\n")

  let matrix = []
  for (c = 0; c < content.length; c++) {
    let line = content[c]
    matrix.push(line)
  }
  let res = part == 1 ? part1(matrix) : part2(matrix)

  console.log(res)
}

main(1)
main(2)

module.exports = main
