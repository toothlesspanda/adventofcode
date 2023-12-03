const { checkSpecialCharacterNoPeriod } = require("../../utils");
const { getAdjacentDigits, getAdjacentNumbers } = require("./helpers");
const fs = require("fs");

//
// PART 2
//
function day3part2(content, cols, lines) {
  let FINAL_RES = [];

  for (let l = 0; l < lines; l++) {
    for (let c = 0; c < cols; c++) {
      let char = content[l][c];
      let isStar = char == "*";

      if (isStar) {
        let adjacentDigits = getAdjacentDigits(
          { l: l, c: c },
          content,
          cols,
          lines
        );

        let adjacentNumbers = getAdjacentNumbers(adjacentDigits, content, cols);

        // removes duplicates
        // duplicates might happen if the same number
        // has digits adjacent to the same symbol
        // but also keeping the numbers that are the same
        // but adjacent to different symbols
        adjacentNumbers = adjacentNumbers.reduce((acc, curr) => {
          return JSON.stringify(acc).includes(JSON.stringify(curr))
            ? acc
            : [...acc, curr];
        }, []);

        if (adjacentNumbers.length == 2) {
          // get ratio
          let ratio = adjacentNumbers.reduce((acc, curr) => {
            let num = parseInt(curr.number);

            return acc * num;
          }, 1);

          FINAL_RES.push(ratio);
        }
      }
    }
  }

  let sum = FINAL_RES.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return { numbers: FINAL_RES, total: sum };
}

//
// PART 1
//

function day3part1(content, cols, lines) {
  let FINAL_RES = [];

  for (let l = 0; l < lines; l++) {
    for (let c = 0; c < cols; c++) {
      let char = content[l][c];
      let isSpecialCharacter = checkSpecialCharacterNoPeriod(char);

      if (isSpecialCharacter) {
        let adjacentDigits = getAdjacentDigits(
          { l: l, c: c },
          content,
          cols,
          lines
        );

        let adjacentNumbers = getAdjacentNumbers(adjacentDigits, content, cols);
        FINAL_RES.push(...adjacentNumbers);
      }
    }
  }

  // removes duplicates
  // duplicates might happen if the same number
  // has digits adjacent to the same symbol
  // but also keeping the numbers that are the same
  // but adjacent to different symbols
  FINAL_RES = FINAL_RES.reduce((acc, curr) => {
    return JSON.stringify(acc).includes(JSON.stringify(curr))
      ? acc
      : [...acc, curr];
  }, []);

  let sum = FINAL_RES.reduce((acc, curr) => {
    let num = parseInt(curr.number);

    return acc + num;
  }, 0);

  let finalNumbers = FINAL_RES.reduce((acc, curr) => {
    let num = parseInt(curr.number);

    return [...acc, num];
  }, []);

  return { numbers: finalNumbers, total: sum };
}

//
//  main
//

function main(filename = null, part) {
  const file = filename || "./2023/day3/input.txt";
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n");
  const numCol = content[0].length;
  const numLines = content.length;

  if (part == 1) return day3part1(content, numCol, numLines);
  if (part == 2) return day3part2(content, numCol, numLines);
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(null, 1));
//console.log(main(null, 2));

module.exports = main;
