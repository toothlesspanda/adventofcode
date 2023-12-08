const fs = require("fs")
const path = require("path")
const {
  DynamicThreadPool,
  FixedThreadPool,
  PoolEvents,
  availableParallelism,
} = require("poolifier")

const filename = path.join(__dirname, "input.txt")
const workerFile = path.join(__dirname, "worker.js")

//
// PART 2
//

function part2(content) {
  const data = {}
  content = content.filter((line) => line != "")
  let initlSeedsConfig = content[0].split(" ").map((elem) => parseInt(elem))
  initlSeedsConfig.shift()
  let category = ""
  let seedsRanges = []
  let maxSeed = 0
  for (let seedConfigIndex = 0; seedConfigIndex < initlSeedsConfig.length; seedConfigIndex += 2) {
    seedsRanges.push({
      start: initlSeedsConfig[seedConfigIndex],
      range: initlSeedsConfig[seedConfigIndex + 1],
    })
    let tmpMaxSeed = initlSeedsConfig[seedConfigIndex] + initlSeedsConfig[seedConfigIndex + 1]
    maxSeed = tmpMaxSeed > maxSeed ? tmpMaxSeed : maxSeed
  }

  //fetch range data
  for (let c = 1; c < content.length; c++) {
    if (content[c] == "") continue

    if (content[c].includes("map")) {
      category = content[c].split(" ").shift().replaceAll("-", "")
      data[category] = []
      continue
    }

    let mapNumbers = content[c].split(" ").map((elem) => parseInt(elem))

    data[category].push({
      dest: mapNumbers[0],
      src: mapNumbers[1],
      range: mapNumbers[2],
    })
  }

  //calculate locations
  let minLocation = maxSeed
  let maxCategories = Object.keys(data).length

  for (let seedIndex in seedsRanges) {
    let seedConfig = seedsRanges[seedIndex]
    let totalSeeds = seedConfig.start + seedConfig.range

    for (let seed = seedConfig.start; seed <= totalSeeds; seed++) {
      let keepLastSeedLocation = seed
      let lastLocation = 0
      let categoryIndex = 0

      for (let category in data) {
        categoryIndex++
        let location = getNextLocation(data[category], keepLastSeedLocation)
        keepLastSeedLocation = location

        if (categoryIndex == maxCategories) lastLocation = location
      }

      minLocation = minLocation > lastLocation ? lastLocation : minLocation
    }
  }

  return minLocation
}

// function part2(content) {
//   const data = {}
//   content = content.filter((line) => line != "")
//   let initlSeedsConfig = content[0].split(" ").map((elem) => parseInt(elem))
//   initlSeedsConfig.shift()
//   let category = ""
//   let seedsRanges = []
//   let maxSeed = 0

//   for (let seedConfigIndex = 0; seedConfigIndex < initlSeedsConfig.length; seedConfigIndex += 2) {
//     seedsRanges.push({
//       start: initlSeedsConfig[seedConfigIndex],
//       range: initlSeedsConfig[seedConfigIndex + 1],
//     })
//     let tmpMaxSeed = initlSeedsConfig[seedConfigIndex] + initlSeedsConfig[seedConfigIndex + 1]
//     maxSeed = tmpMaxSeed > maxSeed ? tmpMaxSeed : maxSeed
//   }

//   //fetch range data
//   for (let c = 1; c < content.length; c++) {
//     if (content[c] == "") continue

//     if (content[c].includes("map")) {
//       category = content[c].split(" ").shift().replaceAll("-", "")
//       data[category] = []
//       continue
//     }

//     let mapNumbers = content[c].split(" ").map((elem) => parseInt(elem))

//     data[category].push({
//       dest: mapNumbers[0],
//       src: mapNumbers[1],
//       range: mapNumbers[2],
//     })
//   }

//   //calculate locations
//   let minLocation = maxSeed
//   let maxCategories = Object.keys(data).length

//   let allThreadsDone = 0

//   for (let seedIndex in seedsRanges) {
//     let config = seedsRanges[seedIndex]
//     let totalSeeds = config.start + config.range
//     let chunksize = 4

//     let totalChunks = parseInt(config.range / chunksize) * 100
//     let reamaining = config.range % chunksize
//     let totalDone = 0

//     let pool = new DynamicThreadPool(
//       Math.floor(availableParallelism() / 2),
//       availableParallelism(),
//       workerFile,
//       {
//         errorHandler: (e) => console.error(e),
//         onlineHandler: () => console.info("worker is online"),
//       }
//     )

//     for (let chunk = 0; chunk < 4; chunk += 1) {
//       pool
//         .execute({
//           config: { start: config.start + allThreadsDone, range: chunksize },
//           maxSeed,
//           maxCategories,
//           data,
//         })
//         .then((data) => {
//           allThreadsDone++
//           minLocation = minLocation > data ? data : minLocation
//           console.log("Workers done: " + allThreadsDone)
//           console.log("seedsRanges.length:" + seedsRanges.length)
//           if (allThreadsDone === chunksize) {
//             console.log("Workers done")
//             console.info(minLocation)
//             totalDone += chunksize
//             return pool.destroy()
//           }
//           return minLocation
//         })
//         .catch((err) => console.error(err))

//       // let seedConfig = seedsRanges[seedIndex]
//       // let totalSeeds = seedConfig.start + seedConfig.range
//       // const worker = new Worker("./worker.js", { configIndex: seedIndex })
//       // worker.on("message", (msg) => {
//       //   console.log(`Worker message received: ${msg}`)
//       //   minimalSeeds.push(msgs)
//       // })
//       // worker.on("error", (err) => console.error(error))
//       // worker.on("exit", (code) => console.log(`Worker exited with code ${code}.`))
//       // workers[seedIndex] = worker
//     }
//   }

//   return minLocation
// }

const smallestDivisor = (n) => {
  if (n <= 1) {
    return "Enter a number greater than 1"
  } else if (n % 2 == 0) {
    return n
  } else {
    let r = Math.sqrt(n)

    let d = 3

    while (n % d != 0 && d < r) {
      d = d + 2
    }

    if (n % d == 0) {
      return d
    } else {
      return n
    }
  }
}

//
// PART 1
//

function part1(content) {
  const data = {}
  content = content.filter((line) => line != "")
  let seeds = content[0].split(" ").map((elem) => parseInt(elem))
  seeds.shift()
  let category = ""
  let maxSeed = 0

  //fetch range data
  for (let c = 1; c < content.length; c++) {
    if (content[c] == "") continue

    if (content[c].includes("map")) {
      category = content[c].split(" ").shift().replaceAll("-", "")
      data[category] = []
      continue
    }

    let mapNumbers = content[c].split(" ").map((elem) => parseInt(elem))

    data[category].push({
      dest: mapNumbers[0],
      src: mapNumbers[1],
      range: mapNumbers[2],
    })

    let tmpMaxSeed = mapNumbers[1] + mapNumbers[2]
    maxSeed = tmpMaxSeed > maxSeed ? tmpMaxSeed : maxSeed
  }

  //calculate locations
  let minLocation = maxSeed
  let maxCategories = Object.keys(data).length

  for (let seedIndex in seeds) {
    let keepLastSeedLocation = seeds[seedIndex]
    let lastLocation = 0
    let categoryIndex = 0

    for (let category in data) {
      categoryIndex++
      let location = getNextLocation(data[category], keepLastSeedLocation)
      keepLastSeedLocation = location

      if (categoryIndex == maxCategories) lastLocation = location
    }

    minLocation = minLocation > lastLocation ? lastLocation : minLocation
  }

  return minLocation
}

function getNextLocation(category, currentLocation) {
  let newLocation = currentLocation
  for (let rangeIndex in category) {
    if (
      currentLocation >= category[rangeIndex].src &&
      currentLocation < category[rangeIndex].src + category[rangeIndex].range
    ) {
      let position = currentLocation - category[rangeIndex].src
      let destination = category[rangeIndex].dest + position
      newLocation = destination
      break
    }
  }

  return newLocation
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
console.log(main(filename, 1))
//console.log(main(filename, 2))

module.exports = main
