const fs = require("fs")
const path = require("path")

const filename = path.join(__dirname, "input.txt")

//
// PART 2
//
function part2(content) {
  content = content.map((line) => {
    return line.match(/[0-9]+/g).join("")
  })

  let bestRaces = []
  let raceTime = content[0]
  let distanceRecord = content[1]

  for (let clock = 0; clock < raceTime; clock++) {
    let timeToFinishAfterHold = raceTime - clock
    let maxSpeed = BUTTON_SPEED_INCREASE * clock
    let distanceRaced = timeToFinishAfterHold * maxSpeed

    if (distanceRaced > distanceRecord) bestRaces.push(distanceRaced)
  }

  return { total: bestRaces.length }
}

//
// PART 1
//

function part1(content) {
  let sum = 0

  content = content.map((line) => {
    return line.match(/[0-9]+/g)
  })

  let bestRaces = []
  for (let i = 0; i < content[0].length; i++) {
    let raceTime = content[0][i]
    let distanceRecord = content[1][i]
    bestRaces[i] = []

    for (let clock = 0; clock < raceTime; clock++) {
      let timeToFinishAfterHold = raceTime - clock
      let maxSpeed = BUTTON_SPEED_INCREASE * clock
      let distanceRaced = timeToFinishAfterHold * maxSpeed

      if (distanceRaced > distanceRecord) bestRaces[i].push(distanceRaced)
    }
  }

  sum = bestRaces.reduce((acc, curr) => {
    return acc * curr.length
  }, 1)
  return { total: sum }
}

//
//  main
//

const BUTTON_SPEED_INCREASE = 1

function main(file = null, part) {
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n")

  if (part == 1) return part1(content)
  if (part == 2) return part2(content)
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(filename, 1))
//sconsole.log(main(filename, 2))

module.exports = main
