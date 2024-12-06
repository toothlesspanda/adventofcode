export function horizontalRightLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx][colIdx + 1] == "M" &&
      matrix[lineIdx][colIdx + 2] == "A" &&
      matrix[lineIdx][colIdx + 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function horizontalLeftLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx][colIdx - 1] == "M" &&
      matrix[lineIdx][colIdx - 2] == "A" &&
      matrix[lineIdx][colIdx - 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function verticalDownLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx + 1][colIdx] == "M" &&
      matrix[lineIdx + 2][colIdx] == "A" &&
      matrix[lineIdx + 3][colIdx] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function verticalUpLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx - 1][colIdx] == "M" &&
      matrix[lineIdx - 2][colIdx] == "A" &&
      matrix[lineIdx - 3][colIdx] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function diagonalUpLeftLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx - 1][colIdx - 1] == "M" &&
      matrix[lineIdx - 2][colIdx - 2] == "A" &&
      matrix[lineIdx - 3][colIdx - 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function diagonalUpRightLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx - 1][colIdx + 1] == "M" &&
      matrix[lineIdx - 2][colIdx + 2] == "A" &&
      matrix[lineIdx - 3][colIdx + 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function diagonalDownLeftLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx + 1][colIdx - 1] == "M" &&
      matrix[lineIdx + 2][colIdx - 2] == "A" &&
      matrix[lineIdx + 3][colIdx - 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

export function diagonalDownRightLookupMAS(matrix, lineIdx, colIdx) {
  try {
    if (
      matrix[lineIdx + 1][colIdx + 1] == "M" &&
      matrix[lineIdx + 2][colIdx + 2] == "A" &&
      matrix[lineIdx + 3][colIdx + 3] == "S"
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

//
//
//   PART 2
//
//

// X _ _
// _ A _
// _ _ X
export function diagonalPositiveA(matrix, lineIdx, colIdx) {
  try {
    if (lineIdx == 7 && colIdx == 1) console.log(matrix[lineIdx - 1][colIdx - 1])
    if (lineIdx == 7 && colIdx == 1) console.log(matrix[lineIdx - 1][colIdx - 1])
    if (
      (matrix[lineIdx - 1][colIdx - 1] == "M" && matrix[lineIdx + 1][colIdx + 1] == "S") ||
      (matrix[lineIdx - 1][colIdx - 1] == "S" && matrix[lineIdx + 1][colIdx + 1] == "M")
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}

// _ _ X
// _ A _
// X _ _
export function diagonalNegativeA(matrix, lineIdx, colIdx) {
  try {
    if (
      (matrix[lineIdx - 1][colIdx + 1] == "M" && matrix[lineIdx + 1][colIdx - 1] == "S") ||
      (matrix[lineIdx - 1][colIdx + 1] == "S" && matrix[lineIdx + 1][colIdx - 1] == "M")
    ) {
      return true
    }

    return false
  } catch (err) {
    // OFFLIMITS
    return false
  }
}
