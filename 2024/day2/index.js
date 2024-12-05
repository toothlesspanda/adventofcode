const fs = require("fs")

function part1(reports) {
  let totalSafeRepots = 0

  for (let report of reports) {
    let differences = report
      .map((elem, index) => {
        if (index == report.length - 1) return null

        return report[index + 1] - elem
      })
      .filter(Number.isFinite)

    let inLimits = differences.every((x) => Math.abs(x) >= 1 && Math.abs(x) <= 3)
    let isIncreasing = differences.every((x) => Math.sign(x) == 1)
    let isDecreasing = differences.every((x) => Math.sign(x) == -1)

    if ((isIncreasing || isDecreasing) && inLimits) totalSafeRepots++
  }

  return totalSafeRepots
}

function part2(reports) {
  let totalSafeRepots = 0

  for (let report of reports) {
    let differences = report
      .map((elem, index) => {
        if (index == report.length - 1) return null

        return report[index + 1] - elem
      })
      .filter(Number.isFinite)

    let offLimits = differences.filter((x) => Math.abs(x) < 1 || Math.abs(x) > 3)
    let positives = differences.filter((x) => Math.sign(x) == 1)
    let negatives = differences.filter((x) => Math.sign(x) == -1)

    let successCriteria = {
      positives: positives.length == 0 || positives.length == differences.length,
      negatives: negatives.length == 0 || negatives.length == differences.length,
      offLimits: offLimits.length == 0,
    }

    if ((successCriteria.positives || successCriteria.negatives) && successCriteria.offLimits) {
      totalSafeRepots++
    } else if (offLimits.length == 1 || positives.length == 1 || negatives.length == 1) {
      if (checkSafeness(differences, successCriteria, offLimits, positives, negatives)) {
        totalSafeRepots++
      }
    }
  }

  return totalSafeRepots
}

function checkSafeness(differences, successCriteria, offLimits, positives, negatives) {
  if (!successCriteria.offLimits && (successCriteria.positives || successCriteria.negatives)) {
    let offLimitIndex = differences.indexOf(offLimits[0])
    if (offLimits[0] == 0 || offLimitIndex == 0 || offLimitIndex == differences.length - 1) {
      return true
    }
  }

  if (!successCriteria.positives && successCriteria.offLimits) return true

  if (!successCriteria.negative && successCriteria.offLimits) return true

  return false
}

//
//  main
//
function main(part) {
  const content = fs.readFileSync("./2024/day2/input.txt", "utf-8", "r+").split("\n")

  arr1 = []
  for (c = 0; c < content.length; c++) {
    let line = content[c]
      .split(" ")
      .filter((str) => str.length > 0)
      .map(Number)
    arr1.push(line)
  }

  let res = part == 1 ? part1(arr1) : part2(arr1)

  console.log(res)
}

main(1)
main(2)

module.exports = main
