function isCharNumber(c) {
  return c >= "0" && c <= "9";
}
function generateRandomSetDay1(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const words = [
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

  let possibleChars = characters;
  let result = "";

  for (let i = 0; i < length; i++) {
    const includeNumber = Math.random() < 0.5; // 50% chance to include a number
    const includeWord = Math.random() < 0.3; // 30% chance to include a word

    if (includeNumber) {
      possibleChars += numbers;
    }

    if (includeWord) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      result += randomWord;
    } else {
      const randomChar =
        possibleChars[Math.floor(Math.random() * possibleChars.length)];
      result += randomChar;
    }
  }

  return result;
}

module.exports = {
  isCharNumber: isCharNumber,
  generateRandomSetDay1: generateRandomSetDay1,
};
