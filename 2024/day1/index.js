const fs = require("fs")

function day1Part1(firstColumn, secondColumn) {
  let firstColumnSorted = firstColumn.sort()
  let secondColumnSorted = secondColumn.sort()
  let differences = []

  for (let index = 0; index < firstColumnSorted.length; index++) {
    differences.push(Math.abs(firstColumnSorted[index] - secondColumnSorted[index]))
  }

  let total = differences.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  return total
}

function day1Part2(firstColumn, secondColumn) {
  let bubble = new Array(firstColumn.length).fill(0)

  for (let i = 0; i < secondColumn.length; i++) {
    for (let k = 0; k < firstColumn.length; k++) {
      if (firstColumn[k] == secondColumn[i]) bubble[k]++
    }
  }

  let total = bubble.reduce((acc, curr, currIndex) => {
    return acc + firstColumn[currIndex] * curr
  }, 0)

  return total
}

//
//  main
//
function main(part) {
  const content = fs.readFileSync("input.txt", "utf-8", "r+").split("\n")

  let arr1 = []
  let arr2 = []
  for (c = 0; c < content.length; c++) {
    let line = content[c].split(" ").filter((str) => str.length > 0)
    arr1.push(parseInt(line[0]))
    arr2.push(parseInt(line[1]))
  }
  let res = part == 1 ? day1Part1(arr1, arr2) : day1Part2(arr1, arr2)

  console.log(res)
}

main(1)
main(2)

module.exports = main
