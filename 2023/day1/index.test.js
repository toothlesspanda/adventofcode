const { day1Part1, day1Part2 } = require("./index.js");

// jest --runInBand day1.test.js
describe("day1", () => {
  let totalSuite1 = 0;
  let totalSuite2 = 0;

  describe.each([
    ["1abc2", 12],
    ["pqr3stu8vwx", 38],
    ["a1b2c3d4e5f", 15],
    ["treb7uchet", 77],
  ])("day1Part1(%s)", (a, expected) => {
    let result;
    beforeAll(() => {
      result = day1Part1(a);
    });
    test(`returns ${expected}`, () => {
      expect(result.num).toBe(expected);
    });

    test(`total`, () => {
      totalSuite1 += expected;
      expect(result.total).toBe(totalSuite1);
    });
  });

  describe.each([
    ["two1nine", 29],
    ["eightwothree", 83],
    ["abcone2threexyz", 13],
    ["xtwone3four", 24],
    ["4nineeightseven2", 42],
    ["zoneight234", 14],
    ["7pqrstsixteen", 76],
    ["m9qvkqlgfhtwo3seven4seven", 97],
    ["5twonineeight3onefive", 55],
    ["five8six", 56],
    ["xmkhttr64htgvhjfivefcjlzjqrsjlfivekbcnhqpzg", 65],
  ])("day1Part2(%s)", (a, expected) => {
    let result;
    beforeAll(() => {
      result = day1Part2(a);
    });
    test(`returns ${expected}`, () => {
      expect(result.num).toBe(expected);
    });

    test(`total`, () => {
      totalSuite2 += expected;
      expect(result.total).toBe(totalSuite2);
    });
  });
});
