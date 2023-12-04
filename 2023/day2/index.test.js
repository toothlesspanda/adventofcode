const main = require("./index.js")
const path = require("path")

const filename = path.join(__dirname, "input.test.txt")

// jest --runInBand day1.test.js
describe("day2", () => {
  describe("part1", () => {
    let result

    beforeAll(() => {
      result = main(filename, 1)
    })

    test(`to haven 3 games`, () => {
      expect(result.games).toEqual([1, 2, 5])
    })

    test(`to count`, () => {
      expect(result.total).toBe(8)
    })
  })

  describe("part2", () => {
    let result

    beforeAll(() => {
      result = main(filename, 2)
    })

    test(`to have 5 powers`, () => {
      expect(result.games).toEqual([48, 12, 1560, 630, 36])
    })

    test(`to count`, () => {
      expect(result.total).toBe(2286)
    })
  })
})
