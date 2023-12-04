const fs = require("fs")

//
// PART 2
//
function day2part2(content) {
  let FINAL_RES = { games: [], total: 0 }

  for (let gameIndex = 0; gameIndex < content.length; gameIndex++) {
    let eligibleForGame = true

    let rgbCounter = getMaximumBallsOfEachColorPerGame(content[gameIndex])
    let power = rgbCounter.R * rgbCounter.G * rgbCounter.B

    if (eligibleForGame) {
      FINAL_RES.games.push(power)
      FINAL_RES.total += power
    }
  }
  return FINAL_RES
}

function getMaximumBallsOfEachColorPerGame(game) {
  let rgbCounter = { R: 0, G: 0, B: 0 }
  let colorBalls = game.matchAll(/(\d*)( green| blue| red)/gm)

  for (const colorBall of colorBalls) {
    let [numberStr, color] = colorBall[0].split(" "),
      number = parseInt(numberStr)

    switch (color) {
      case "red":
        if (rgbCounter.R < number) rgbCounter.R = number
        break
      case "green":
        if (rgbCounter.G < number) rgbCounter.G = number
        break
      case "blue":
        if (rgbCounter.B < number) rgbCounter.B = number
        break
    }
  }

  return rgbCounter
}

//
// PART 1
//
function day2part1(content) {
  let FINAL_RES = { games: [], total: 0 }

  for (let gameIndex = 0; gameIndex < content.length; gameIndex++) {
    let rounds = content[gameIndex].split(";")
    let eligibleForGame = true

    for (let roundIndex in rounds) {
      let roundEligble = checkRoundEligiblePart1(rounds[roundIndex])

      if (!roundEligble) {
        eligibleForGame = false
        break
      }
    }

    if (eligibleForGame) {
      let gameNumber = gameIndex + 1
      FINAL_RES.games.push(gameNumber)
      FINAL_RES.total += gameNumber
    }
  }
  return FINAL_RES
}

function checkRoundEligiblePart1(round) {
  let colorBalls = round.matchAll(/(\d*)( green| blue| red)/gm)

  for (const colorBall of colorBalls) {
    let [numberStr, color] = colorBall[0].split(" "),
      number = parseInt(numberStr)

    switch (color) {
      case "red":
        if (number > GAME.R) return false
        break
      case "green":
        if (number > GAME.G) return false
        break
      case "blue":
        if (number > GAME.B) return false
        break
    }
  }

  return true
}

//
//  main
//
const GAME = { R: 12, G: 13, B: 14 }
function main(filename = null, part) {
  const file = filename || "./input.txt"
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n")

  if (part == 1) return day2part1(content)
  if (part == 2) return day2part2(content)
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(null, 1));
//console.log(main(null, 2));

module.exports = main
