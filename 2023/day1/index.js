const { isCharNumber } = require("../../utils");
const fs = require("fs");

//
//  PART 1
//
function day1_fetchNumberFromStringPT1(word) {
  let firstNumber = 0;
  let lastNumber = 0;
  for (i = 0, j = word.length - 1; i < word.length || j >= 0; i++, j--) {
    if (isCharNumber(word[i])) {
      firstNumber = word[i];
      i = word.length + 1;
    }
    if (isCharNumber(word[j])) {
      lastNumber = word[j];
      j = 0;
    }

    if (j <= 0 && i >= word.length) {
      return Number(firstNumber + "" + lastNumber);
    }
  }
}

let DAY1_PART1_total = 0;

function day1Part1(word) {
  let numberFromWord = day1_fetchNumberFromStringPT1(word);
  DAY1_PART1_total += numberFromWord;
  return { num: numberFromWord, total: DAY1_PART1_total };
}

//
//  PART 2
//
const NUMBERS_IN_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function curateNumberFormat(number) {
  if (isNaN(parseInt(number))) return NUMBERS_IN_WORDS.indexOf(number);
  else {
    return number;
  }
}

function day1_fetchNumberFromStringPT2(word) {
  let wordLowCase = word.toLowerCase();
  let numbersFound = [];
  let indexNumbersFound = [];

  for (i = 0; i < wordLowCase.length; i++) {
    if (isCharNumber(wordLowCase[i])) {
      numbersFound.push(wordLowCase[i]);
      indexNumbersFound.push(i);
    }
  }

  NUMBERS_IN_WORDS.forEach(function (numberWorded) {
    let firstIndex = wordLowCase.indexOf(numberWorded);
    let lastIndex = wordLowCase.lastIndexOf(numberWorded);

    if (firstIndex > -1) {
      numbersFound.push(numberWorded);
      indexNumbersFound.push(firstIndex);
    }
    if (lastIndex > -1 && lastIndex != firstIndex) {
      numbersFound.push(numberWorded);
      indexNumbersFound.push(lastIndex);
    }
  });

  let min = indexNumbersFound.indexOf(Math.min.apply(null, indexNumbersFound)),
    max = indexNumbersFound.indexOf(Math.max.apply(null, indexNumbersFound));

  return Number(
    curateNumberFormat(numbersFound[min]) +
      "" +
      curateNumberFormat(numbersFound[max])
  );
}

let DAY1_PART2_total = 0;

function day1Part2(word) {
  let numberFromWord = day1_fetchNumberFromStringPT2(word);
  DAY1_PART2_total += numberFromWord;

  return { num: numberFromWord, total: DAY1_PART2_total };
}

//
//  main
//
//55017 - part1
//53539 - part2
function main() {
  const content = fs.readFileSync("./input.txt", "utf-8", "r+").split("\n");
  for (c = 0; c < content.length; c++) {
    let res1 = day1Part1(content[c]);
    let res2 = day1Part2(content[c]);

    if (c == content.length - 1) {
      console.log(res1);
      console.log(res2);
    }
  }
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//main();

module.exports = { day1Part1, day1Part2 };
