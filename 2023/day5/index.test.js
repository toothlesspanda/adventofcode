/* eslint-disable no-undef */
const main = require("./index.js")
const path = require("path")

const filename = path.join(__dirname, "input.test.txt")

// jest --runInBand day1.test.js
describe("day5", () => {
  describe("part1", () => {
    let result

    beforeAll(() => {
      result = main(filename, 1)
    })

    test("to count", () => {
      expect(result).toBe(35)
    })
  })

  describe("part2", () => {
    let result

    // beforeAll(async () => {
    //   result = await main(filename, 2)
    // })xs

    test("to count", async () => {
      await expect(main(filename, 2)).resolves.toBe(46)
    })
  })
})
