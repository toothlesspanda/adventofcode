const { count } = require("console")
const fs = require("fs")
const path = require("path")

const filename = path.join(__dirname, "input.txt")

//
// PART 2
//
function part2(content) {
  let sum = 0

  content = content.map((line) => {
    return line.split(" ")
  })

  let finalScores = []

  for (let handIndex = 0; handIndex < content.length; handIndex++) {
    let hand = content[handIndex]
    let rank = checkHandValue2(hand[0])
    finalScores.push({
      hand: hand[0],
      bid: hand[1],
      rank,
    })
  }

  checkforTiesJOKER(finalScores)

  finalScores = finalScores.sort(function (a, b) {
    let tieCheck = a.rank - b.rank
    return tieCheck == 0 ? a.subRank - b.subRank : tieCheck
  })

  //console.log(finalScores)
  fs.writeFileSync("./output.txt", JSON.stringify(finalScores, null, 1))

  sum = finalScores.reduce((acc, curr, currInd) => {
    return acc + curr.bid * (currInd + 1)
  }, 0)

  return { total: sum }
}

function checkHandValue2(hand) {
  let bubbleHand = new Array(13).fill(0) // [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"]
  let bubbleHandType = [[], [], [], [], [], [], []] // ["HIGH", "PAIR", "3KIND", "FH", "4KIND", "5KIND","2PAI","FH"]
  let rank = 0
  let countPairs = 0
  let hasTrio = 0
  let countJs = 0

  //bubbling array with ocurrencies
  for (let cardIndex in hand) {
    let index = CARDS_JOKER.findIndex((elem) => elem == hand[cardIndex])
    bubbleHand[index] += 1

    if (index == 0) countJs += 1

    if (cardIndex == 4 && countJs > 0 && countJs < 5) {
      let lastValueableCard = bubbleHand.findLastIndex((elem) => elem == 4)
      if (lastValueableCard == -1) lastValueableCard = bubbleHand.findLastIndex((elem) => elem == 3)
      if (lastValueableCard == -1) lastValueableCard = bubbleHand.findLastIndex((elem) => elem == 2)
      if (lastValueableCard == -1) lastValueableCard = bubbleHand.findLastIndex((elem) => elem == 1)
      let isAJoker = lastValueableCard == 0

      if (isAJoker) {
        lastValueableCard = bubbleHand.findLastIndex((elem, idx) => elem > 0 && idx != 0)
      }

      bubbleHand[lastValueableCard] += countJs
      bubbleHand[0] = 0
    }
  }

  //asses handtype by number of occurrencies
  bubbleHand.forEach((elem, idx) => {
    if (elem == 0) return
    if (elem == 2) countPairs++
    if (elem == 3) hasTrio++

    bubbleHandType[elem - 1].push(idx)
  })

  //infer complex hands
  //2pairs
  if (countPairs == 2) {
    bubbleHandType[5] = bubbleHandType[1]
    bubbleHandType[1] = []
  }
  //fullhouse
  if (hasTrio == 1 && countPairs == 1) {
    bubbleHandType[6].push(bubbleHandType[1], bubbleHandType[2])
    bubbleHandType[2] = []
    bubbleHandType[1] = []
  }

  rank = scoreHand(bubbleHandType, hand)

  return rank
}

// AUX FUNCTIONS

function checkforTiesJOKER(allRanks) {
  for (let [_, handType] of Object.entries(HAND_TYPES)) {
    if (handType.length <= 1) continue

    handType.sort(sortCardByCardJOKER)

    allRanks.forEach((rank) => {
      let idx = handType.findIndex((elem) => elem.hand == rank.hand)
      if (idx > -1) rank.subRank = idx
    })
  }
}

function sortCardByCardJOKER(hand1, hand2) {
  let hand1CardValue = 0
  let hand2CardValue = 0
  if (hand1.hand[0] != hand2.hand[0]) {
    hand1CardValue = CARDS_JOKER.findIndex((elem) => elem == hand1.hand[0])
    hand2CardValue = CARDS_JOKER.findIndex((elem) => elem == hand2.hand[0])
  } else if (hand1.hand[1] != hand2.hand[1]) {
    hand1CardValue = CARDS_JOKER.findIndex((elem) => elem == hand1.hand[1])
    hand2CardValue = CARDS_JOKER.findIndex((elem) => elem == hand2.hand[1])
  } else if (hand1.hand[2] != hand2.hand[2]) {
    hand1CardValue = CARDS_JOKER.findIndex((elem) => elem == hand1.hand[2])
    hand2CardValue = CARDS_JOKER.findIndex((elem) => elem == hand2.hand[2])
  } else if (hand1.hand[3] != hand2.hand[3]) {
    hand1CardValue = CARDS_JOKER.findIndex((elem) => elem == hand1.hand[3])
    hand2CardValue = CARDS_JOKER.findIndex((elem) => elem == hand2.hand[3])
  } else if (hand1.hand[4] != hand2.hand[4]) {
    hand1CardValue = CARDS_JOKER.findIndex((elem) => elem == hand1.hand[4])
    hand2CardValue = CARDS_JOKER.findIndex((elem) => elem == hand2.hand[4])
  }

  return hand1CardValue - hand2CardValue
}

//
// PART 1
//

function part1(content) {
  let sum = 0

  content = content.map((line) => {
    return line.split(" ")
  })

  let finalScores = []

  for (let handIndex = 0; handIndex < content.length; handIndex++) {
    let hand = content[handIndex]
    let rank = checkHandValue(hand[0])
    finalScores.push({
      hand: hand[0],
      bid: hand[1],
      rank,
      finalRank: 0,
    })
  }

  checkforTies(finalScores)

  finalScores = finalScores.sort(function (a, b) {
    let tieCheck = a.rank - b.rank
    return tieCheck == 0 ? a.subRank - b.subRank : tieCheck
  })

  finalScores = finalScores.map((elem, idx) => {
    elem.finalRank = idx + 1
    return elem
  })

  sum = finalScores.reduce((acc, curr, currInd) => {
    return acc + curr.bid * (currInd + 1)
  }, 0)

  return { total: sum }
}

/////
/// AUX FUNCTIONS
/////

function checkHandValue(hand) {
  let bubbleHand = new Array(13).fill(0) // [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"]
  let bubbleHandType = [[], [], [], [], [], [], []] // ["HIGH", "PAIR", "3KIND", "FH", "4KIND", "5KIND","2PAI","FH"]
  let rank = 0
  let countPairs = 0
  let hasTrio = 0

  //bubbling array with ocurrencies
  //asses handtype by number of occurrencies
  for (let cardIndex in hand) {
    let index = CARDS.findIndex((elem) => elem == hand[cardIndex])
    bubbleHand[index] += 1

    if (cardIndex == 4) {
      bubbleHand.forEach((elem, idx) => {
        if (elem == 0) return
        if (elem == 2) countPairs++
        if (elem == 3) hasTrio++

        bubbleHandType[elem - 1].push(idx)
      })
    }
  }

  //infer complex hands
  //2pairs
  if (countPairs == 2) {
    bubbleHandType[5] = bubbleHandType[1]
    bubbleHandType[1] = []
  }
  //fullhouse
  if (hasTrio == 1 && countPairs == 1) {
    bubbleHandType[6].push(bubbleHandType[1], bubbleHandType[2])
    bubbleHandType[2] = []
    bubbleHandType[1] = []
  }

  rank = scoreHand(bubbleHandType, hand)

  return rank
}

function scoreHand(bubbleHandType, hand) {
  let rank = 0
  for (let htIdx = 0; htIdx < bubbleHandType.length; htIdx++) {
    let tmpRank = 0

    if (bubbleHandType[htIdx].length > 0) {
      switch (htIdx) {
        case 0:
          tmpRank = 1
          HAND_TYPES.HIGH.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 1:
          tmpRank = 2
          HAND_TYPES.PAIR.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 2:
          tmpRank = 4
          HAND_TYPES.KIND3.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 3:
          tmpRank = 6
          HAND_TYPES.KIND4.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 4:
          tmpRank = 7
          HAND_TYPES.KIND5.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 5:
          tmpRank = 3
          HAND_TYPES.PAIR2.push({ hand, cards: bubbleHandType[htIdx] })
          break
        case 6:
          tmpRank = 5
          HAND_TYPES.FH.push({ hand, cards: bubbleHandType[htIdx] })
          break
        default:
          tmpRank = 0
          break
      }
      if (tmpRank > rank) {
        rank = tmpRank
        Object.values(HAND_TYPES)[rank - 1] = Object.values(HAND_TYPES)[rank - 1].filter(
          (elem) => elem.hand != hand
        )
      }
    }
  }

  return rank
}

function checkforTies(allRanks) {
  for (let [_, handType] of Object.entries(HAND_TYPES)) {
    if (handType.length <= 1) continue

    handType.sort(sortCardByCard)

    allRanks.forEach((rank) => {
      let idx = handType.findIndex((elem) => elem.hand == rank.hand)
      if (idx > -1) rank.subRank = idx
    })
  }
}

function sortCardByCard(hand1, hand2) {
  let hand1CardValue = 0
  let hand2CardValue = 0
  if (hand1.hand[0] != hand2.hand[0]) {
    hand1CardValue = CARDS.findIndex((elem) => elem == hand1.hand[0])
    hand2CardValue = CARDS.findIndex((elem) => elem == hand2.hand[0])
  } else if (hand1.hand[1] != hand2.hand[1]) {
    hand1CardValue = CARDS.findIndex((elem) => elem == hand1.hand[1])
    hand2CardValue = CARDS.findIndex((elem) => elem == hand2.hand[1])
  } else if (hand1.hand[2] != hand2.hand[2]) {
    hand1CardValue = CARDS.findIndex((elem) => elem == hand1.hand[2])
    hand2CardValue = CARDS.findIndex((elem) => elem == hand2.hand[2])
  } else if (hand1.hand[3] != hand2.hand[3]) {
    hand1CardValue = CARDS.findIndex((elem) => elem == hand1.hand[3])
    hand2CardValue = CARDS.findIndex((elem) => elem == hand2.hand[3])
  } else if (hand1.hand[4] != hand2.hand[4]) {
    hand1CardValue = CARDS.findIndex((elem) => elem == hand1.hand[4])
    hand2CardValue = CARDS.findIndex((elem) => elem == hand2.hand[4])
  }

  return hand1CardValue - hand2CardValue
}
//
//  main

const CARDS_JOKER = ["J", 2, 3, 4, 5, 6, 7, 8, 9, "T", "Q", "K", "A"] //
const CARDS = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"]
const HAND_TYPES = { HIGH: [], PAIR: [], PAIR2: [], KIND3: [], FH: [], KIND4: [], KIND5: [] }
function main(file = null, part) {
  const content = fs.readFileSync(file, "utf-8", "r+").split("\n")

  if (part == 1) return part1(content)
  if (part == 2) return part2(content)
}

//comment to run tests comment this line
//uncomment to run the script `node index.js`
//console.log(main(filename, 1))
console.log(main(filename, 2))

module.exports = main
