/* eslint-disable no-undef */
const main = require("./index.js")
const path = require("path")

const filename = path.join(__dirname, "input.test.txt")

// jest --runInBand day1.test.js
describe("day3", () => {
  describe("part1", () => {
    let result

    beforeAll(() => {
      result = main(filename, 1)
    })

    test("to contain numbers", () => {
      expect(result.numbers).toEqual(
        expect.arrayContaining([467, 35, 633, 617, 592, 755, 664, 598])
      )
    })

    test("to count", () => {
      expect(result.total).toBe(4361)
    })
  })

  describe("part2", () => {
    let result

    beforeAll(() => {
      result = main(filename, 2)
    })

    test("to contain numbers", () => {
      expect(result.numbers).toEqual(expect.arrayContaining([16345, 451490]))
    })

    test("to count", () => {
      expect(result.total).toBe(467835)
    })
  })
})
