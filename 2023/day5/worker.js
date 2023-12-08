const { ThreadWorker } = require("poolifier")

function threadFunction(params) {
  let seedConfig = params.config
  let totalSeeds = seedConfig.start + seedConfig.range
  let minLocation = params.maxSeed
  console.log("Param.start:" + seedConfig.start)
  console.log("totalSeeds:" + totalSeeds)
  for (let seed = seedConfig.start; seed <= totalSeeds; seed++) {
    let keepLastSeedLocation = seed
    let lastLocation = 0
    let categoryIndex = 0
    console.info("Seed: " + seed)
    for (let category in params.data) {
      categoryIndex++
      let location = getNextLocation(params.data[category], keepLastSeedLocation)
      keepLastSeedLocation = location

      if (categoryIndex == params.maxCategories) lastLocation = location
    }

    minLocation = minLocation > lastLocation ? lastLocation : minLocation
    console.info("Seed: " + seed + " minLocation:" + minLocation)
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

module.exports = new ThreadWorker(threadFunction, {
  maxInactiveTime: 60000,
})
