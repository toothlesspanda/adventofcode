const fs = require("fs")
const path = require("path")

const filename = path.join(__dirname, "input.txt")

//
// PART 2
//
function part2(content) {
  let totalJackpots = []
  let bubbleCard = []
  let sum = 0

  // get powers
  for (let game in content) {
    let allNumbers = content[game].split("|").map((element) => {
      return element.match(/(\d*)/g).filter((num) => num != "")
    })
    let winningNumbers = allNumbers[0]

    winningNumbers.shift()
    let bettingNumbers = allNumbers[1]

    let jackpot = bettingNumbers.filter((elem) => winningNumbers.includes(elem))

    totalJackpots.push(jackpot.length)
    bubbleCard.push(1)
  }

  //for each game
  for (let j = 0; j < totalJackpots.length; j++) {
    //get total gamecards for each iteration considering copies already
    let gameCards = bubbleCard[j]

    //for each gamecard
    // distribute the respective jackpot of this game
    // for the next as many as the jackpot number
    for (let gc = 0; gc < gameCards; gc++) {
      for (let i = 0; i < totalJackpots[j]; i++) {
        bubbleCard[j + i + 1] += 1
      }
    }
  }

  sum = bubbleCard.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  return { numbers: bubbleCard, total: sum }
}

//
// PART 1
//

function part1(content) {
  let res = []
  let sum = 0

  for (let game in content) {
    let allNumbers = content[game].split("|").map((element) => {
      return element.match(/(\d*)/g).filter((num) => num != "")
    })
    let winningNumbers = allNumbers[0]
    winningNumbers.shift()
    let bettingNumbers = allNumbers[1]

    let jackpot = bettingNumbers.filter((elem) => winningNumbers.includes(elem))
    let jackpotPoints = calculateJackpotPoints(jackpot)

    res.push(jackpotPoints)
    sum += jackpotPoints
  }

  return { numbers: res, total: sum }
}

function calculateJackpotPoints(jackpot) {
  if (jackpot.length == 1) return 1
  if (jackpot.length > 1) return Math.pow(2, jackpot.length - 1)
  return 0
}

//
//  main
//

function main(file = null, part) {
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n")

  if (part == 1) return part1(content)
  if (part == 2) return part2(content)
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(filename, 1))
//console.log(main(filename, 2))

module.exports = main
