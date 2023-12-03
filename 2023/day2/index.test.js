const day2 = require("./index.js");

const filename = "./2023/day2/input.test.txt";

// jest --runInBand day1.test.js
describe("day2", () => {
  let totalSuite1 = 0;

  describe("part1", () => {
    let result;

    beforeAll(() => {
      result = day2(filename, 1);
    });

    test(`to haven 3 games`, () => {
      expect(result.games).toEqual([1, 2, 5]);
    });

    test(`to count`, () => {
      expect(result.total).toBe(8);
    });
  });

  describe("part2", () => {
    let result;

    beforeAll(() => {
      result = day2(filename, 2);
      console.log(result);
    });

    test(`to have 5 powers`, () => {
      expect(result.games).toEqual([48, 12, 1560, 630, 36]);
    });

    test(`to count`, () => {
      expect(result.total).toBe(2286);
    });
  });
});
