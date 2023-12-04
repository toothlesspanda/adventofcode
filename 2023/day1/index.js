const { isCharNumber } = require("../../utils")
const fs = require("fs")

//
//  PART 1
//
function fetchNumberFromStringPT1(word) {
  let firstNumber = 0
  let lastNumber = 0

  for (i = 0, j = word.length - 1; i < word.length || j >= 0; i++, j--) {
    if (isCharNumber(word[i])) {
      firstNumber = word[i]
      i = word.length + 1
    }

    if (isCharNumber(word[j])) {
      lastNumber = word[j]
      j = 0
    }
  }

  return Number(firstNumber + "" + lastNumber)
}

let DAY1_PART1_total = 0

function day1Part1(word) {
  let numberFromWord = fetchNumberFromStringPT1(word)
  DAY1_PART1_total += numberFromWord

  return { num: numberFromWord, total: DAY1_PART1_total }
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
]

function curateNumberFormat(number) {
  if (!isNaN(parseInt(number))) return number

  return NUMBERS_IN_WORDS.indexOf(number)
}

// Explanation:
// Get all numeric values occurrences and all number names
// occurrences and store them in two arrays, one to keep the number
// and the other the index.
// Since they will have the same position it's then easier to
// fetch them we needed
// Then we get the minimum and the maximum, considering duplicated (e.g.: one1234one)
// and then we get the numbers, check if they are a string or a number
// and convert them if necessary in an actual number
// e.g.: blaone123yythreedd14adf => 14
//       1st array: [1,2,3,1,4,one,three]
//       2nd array: [6,7,8,18,19,3,11]
// [6,7,8,18,19,3,11] =>  min: 3 (index: 5 ) | max: 19 (index: 4)
// [1,2,3,1,4,one,three] =>  index: 5 => one | index: 4 => 4
// one4 => 14
function fetchNumberFromStringPT2(word) {
  let wordLowCase = word.toLowerCase()
  let numbersFound = []
  let indexNumbersFound = []

  for (i = 0; i < wordLowCase.length; i++) {
    if (isCharNumber(wordLowCase[i])) {
      numbersFound.push(wordLowCase[i])
      indexNumbersFound.push(i)
    }
  }

  NUMBERS_IN_WORDS.forEach(function (numberWorded) {
    // we need the first and last index in case we have duplicated words
    //in the beginning or end
    let firstIndex = wordLowCase.indexOf(numberWorded)
    let lastIndex = wordLowCase.lastIndexOf(numberWorded)

    if (firstIndex > -1) {
      numbersFound.push(numberWorded)
      indexNumbersFound.push(firstIndex)
    }
    if (lastIndex > -1 && lastIndex != firstIndex) {
      numbersFound.push(numberWorded)
      indexNumbersFound.push(lastIndex)
    }
  })

  let min = indexNumbersFound.indexOf(Math.min.apply(null, indexNumbersFound)),
    max = indexNumbersFound.indexOf(Math.max.apply(null, indexNumbersFound))

  return Number(curateNumberFormat(numbersFound[min]) + "" + curateNumberFormat(numbersFound[max]))
}

let DAY1_PART2_total = 0

function day1Part2(word) {
  let numberFromWord = fetchNumberFromStringPT2(word)
  DAY1_PART2_total += numberFromWord

  return { num: numberFromWord, total: DAY1_PART2_total }
}

//
//  main
//
function main() {
  const content = fs.readFileSync("./input.txt", "utf-8", "r+").split("\n")
  for (c = 0; c < content.length; c++) {
    let res1 = day1Part1(content[c])
    let res2 = day1Part2(content[c])

    if (c == content.length - 1) {
      console.log(res1)
      console.log(res2)
    }
  }
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//main();

module.exports = { day1Part1, day1Part2 }
