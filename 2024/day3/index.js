const fs = require("fs")

function part1(line) {
  let total = 0

  total = computeMultiplication(line)
  return total
}

function part2(line) {
  let total = 0

  let firstDont = detectDontMatch(line)
  let instruText = split_at_index(line, firstDont.index)
  total += computeMultiplication(instruText[0])
  let allDos = detectAllDoMatch(line)

  if (allDos.length > 1) {
    let allValidInstructionsText = detectValidInstructionsText(instruText[1])
    for (let instruction of allValidInstructionsText) {
      total += computeMultiplication(instruction[0])
    }
  }

  instruText = split_at_index(line, allDos[allDos.length - 1].index)
  if (!instruText[1].includes("don't()")) total += computeMultiplication(instruText[1])

  return total
}

function computeMultiplication(instructionsText) {
  let total = 0
  let allMatches = detectAllMultiplications(instructionsText)

  for (match of allMatches) {
    total += Number(match[1]) * Number(match[2])
  }
  return total
}

function detectAllMultiplications(text) {
  try {
    return [...text.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
  } catch (err) {
    console.log(text)
  }
}

function detectValidInstructionsText(text) {
  return [...text.matchAll(/do\(\)(.*?)don't\(\)|do\(\)/g)]
}

function detectAllDoMatch(text) {
  return [...text.matchAll(/do\(\)/g)]
}

function detectDontMatch(text) {
  return text.match(/don't\(\)/)
}

function split_at_index(value, index) {
  return [value.slice(0, index), value.slice(index)]
}

//
//  main
//
function main(part) {
  const content = fs.readFileSync("./2024/day3/input.txt", "utf-8", "r+").split("\n")

  let oneline = ""
  for (c = 0; c < content.length; c++) {
    let line = content[c]
    oneline += line
  }

  let res = part == 1 ? part1(oneline) : part2(oneline)

  console.log(res)
}

//main(1)
main(2)

module.exports = main
