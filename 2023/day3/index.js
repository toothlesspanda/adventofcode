const { checkSpecialCharacterNoPeriod } = require("../../utils");
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
// HELPERS
//

// Positions to evaluate
// (0,0),(1,0),(2,0)
// (0,1),  X,  (2,1)
// (0,2),(1,2),(2,2)
// then remove positions
// out of the matrix
function getAdjacentDigits(charPosition, content, col, lines) {
  const positionsOfInterest = [
    { l: charPosition.l - 1, c: charPosition.c - 1 }, //top left
    { l: charPosition.l - 1, c: charPosition.c }, //top
    { l: charPosition.l - 1, c: charPosition.c + 1 }, //top right
    { l: charPosition.l, c: charPosition.c - 1 }, // left
    { l: charPosition.l, c: charPosition.c + 1 }, // right
    { l: charPosition.l + 1, c: charPosition.c - 1 }, // bottom left
    { l: charPosition.l + 1, c: charPosition.c }, // bottom
    { l: charPosition.l + 1, c: charPosition.c + 1 }, // bottom right
  ];

  //remove positions beyond edges
  const positionsValidated = positionsOfInterest.filter(
    (position) =>
      position.c > -1 &&
      position.c < col &&
      position.l > -1 &&
      position.l < lines
  );

  let adjacentNumbers = [];
  positionsValidated.forEach((position) => {
    let adjacentChar = content[position.l][position.c];

    if (!isNaN(parseInt(adjacentChar))) {
      adjacentNumbers.push({
        adjacentChar: adjacentChar,
        position: position,
      });
    }
  });

  return adjacentNumbers;
}

// from the digits adjacent to a symbol
// we will fetch their own
// adjacent digits that together will form a number
function getAdjacentNumbers(adjacentDigits, content, cols) {
  let adjacentNumbers = [];
  adjacentDigits.forEach((adjDig) => {
    let currentChar = adjDig.adjacentChar;
    let allPreviousFound,
      allNextFound = false;
    // storing the initial position tell us if there are numbers
    // adjacent to the same symbo
    //   => which means duplicates
    // if the numbers are the same,but the positions are different
    //   => which means they are adjacent to different symbols
    let keepFirstPosition = { l: adjDig.position.l, c: adjDig.position.c };

    for (
      i = adjDig.position.c - 1, j = adjDig.position.c + 1;
      !allPreviousFound || !allNextFound;

    ) {
      let previousChar = i < 0 ? null : content[adjDig.position.l][i];
      let nextChar = j > cols ? null : content[adjDig.position.l][j];

      //assess previous char and prepend to our final number
      if (
        previousChar &&
        !isNaN(parseInt(previousChar)) &&
        previousChar != "."
      ) {
        currentChar = previousChar + "" + currentChar;
        keepFirstPosition.c = i;
        i--;
      } else {
        allPreviousFound = true;
      }

      //assess next char and append to our final number
      if (nextChar && !isNaN(parseInt(nextChar) && nextChar != ".")) {
        currentChar = currentChar + "" + nextChar;
        j++;
      } else {
        allNextFound = true;
      }

      //push once all digits are found for this number
      if (allPreviousFound && allNextFound)
        adjacentNumbers.push({
          number: currentChar,
          initialPosition: keepFirstPosition,
        });
    }
  });

  return adjacentNumbers;
}

//
//  main
//

function main(filename = null, part) {
  const file = filename || "./input.txt";
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
