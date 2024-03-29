function randomize(arg: string[]) {
  return Math.floor(Math.random() * arg.length)
}

export function checkItIncludes(arr: any[], ex: any[]) {
  for (let each of arr) {
    if (each[0] === ex[0] && each[1] === ex[1]) return true
  }
  return false
}

export function checkWinnerExist(arr: any[], filter: any[]) {
  for (let each of arr) {
    if (
      filter[each[0]].value &&
      filter[each[0]].value === filter[each[1]].value &&
      filter[each[1]].value === filter[each[2]].value
    ) {
      filter[each[0]].isPT = true
      filter[each[1]].isPT = true
      filter[each[2]].isPT = true
      return true
    }
  }
  return false
}

type TMxt = { value: 'y' | 'x' | null, isPT: boolean }[]
export function mutatePossibleMvt(ext: TMxt, mutant: any[]) {
  let newExt = ext.slice()
  newExt[mutant[0]].value = null
  newExt[mutant[1]].value = 'x'
  return newExt
}

export const cheat = function () {
  const mss = [
    "it isn't your turn naa",
    "don't cheat joor",
    "be guided, you're not next",
    "hope you didn't play too fast",
  ]
  return mss[randomize(mss)]
}

// predicted winner : this must be only called once
export function predictedWinner() {
  let winnerCouldBe = ['x', 'y']
  return winnerCouldBe[randomize(winnerCouldBe)]
}

export const setFirstTimerToFalse = async (update: () => void) => {
  await window.localStorage.setItem('isFirstTimer', 'false')
  return update()
}

export const isFirstTimer = ((): boolean => {
  let tt = window.localStorage.getItem('isFirstTimer')
  if (tt === 'false') {
    return false
  }
  return true
})()
