/* eslint-disable no-undef */
const main = require("./index.js")
const path = require("path")

const filename = path.join(__dirname, "input.test.txt")

// jest --runInBand day1.test.js
describe("day4", () => {
  describe("part1", () => {
    let result

    beforeAll(() => {
      result = main(filename, 1)
    })

    test("to contain numbers", () => {
      expect(result.numbers).toEqual(expect.arrayContaining([8, 2, 2, 1, 0, 0]))
    })

    test("to count", () => {
      expect(result.total).toBe(13)
    })
  })

  describe("part2", () => {
    let result

    beforeAll(() => {
      result = main(filename, 2)
    })

    test("to contain numbers", () => {
      expect(result.numbers).toEqual(expect.arrayContaining([1, 2, 4, 8, 14, 1, 1]))
    })

    test("to count", () => {
      expect(result.total).toBe(30)
    })
  })
})
