// prettier-ignore
export const possibleMovements = [
  [0, 1],[0, 3],[0, 4],
  [1, 0],[1, 2],[1, 4],
  [2, 1],[2, 5],[2, 4],
  [3, 0],[3, 6],[3, 4],
  [4, 0],[4, 1],[4, 2],
  [4, 3],[4, 5],[4, 6],
  [4, 7],[4, 8],[5, 2],
  [5, 8],[5, 4],[6, 7],
  [6, 3],[6, 4],[7, 6],
  [7, 8],[7, 4],[8, 7],
  [8, 5],[8, 4],
]

// prettier-ignore
export const winningPosition = [
  [0, 3, 6],[3, 4, 5],
  [1, 4, 7],[2, 4, 6],
  [2, 5, 8],[0, 4, 8],
]

// prettier-ignore
export const predeterminedAvailableMovements = [
  { pt: 'I', ar: [[6, 4],[7, 4],[8, 5],[8, 4]] },
  { pt: 'II', ar: [[4, 1],[4, 5],[4, 7],[6, 7],[8, 7],[8, 5]] },
  { pt: 'III',ar: [[4, 2],[4, 7],[4, 8],[5, 2],[5, 8],[6, 7]] },
  { pt: 'IV', ar: [[3, 6],[7, 6],[8, 5]] },
  { pt: 'V', ar: [[3, 6],[3, 4],[5, 8],[5, 4],[7, 6],[7, 8],[7, 4]] },
  { pt: 'VI', ar: [[3, 4],[5, 2],[5, 8],[5, 4],[7, 8],[7, 4]] },
  { pt: 'VII', ar: [[3, 6],[7, 6]] },
  { pt: 'VIII', ar: [[5, 8],[7, 8]] },
]
