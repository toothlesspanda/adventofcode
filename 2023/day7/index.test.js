/* eslint-disable no-undef */
const main = require("./index.js")
const path = require("path")

const filename = path.join(__dirname, "input.txt")

// jest --runInBand day1.test.js
describe("day7", () => {
  describe("part1", () => {
    let result

    beforeAll(() => {
      result = main(filename, 1)
    })

    test("to count", () => {
      expect(result.total).toBe(6440)
    })
  })

  describe("part2", () => {
    let result

    beforeAll(() => {
      result = main(filename, 2)
    })

    test("to count", () => {
      expect(result.total).toBe(5905)
    })
  })
})
