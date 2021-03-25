function random (varr){
  const random = Math.floor(Math.random()*varr.length)
  return random;
}

export function checkItIncludes(arr, ex) {
    for (let each of arr) {
      if (each[0] === ex[0] && each[1] === ex[1]) return true;
    }
    return false;
  }

export function checkWinnerExist(arr, filter) {
    for (let each of arr) {
      if (
        filter[each[0]].vl &&
        filter[each[0]].vl === filter[each[1]].vl &&
        filter[each[1]].vl === filter[each[2]].vl
      ) {
          filter[each[0]].isPT = true
          filter[each[1]].isPT = true
          filter[each[2]].isPT = true;
          // console.log(filter)
        return filter;
      }
    }
    return false;
  }

export function mutatePossibleMvt(ext, mutant) {
  let newExt = ext.slice()
  newExt[mutant[0]].vl = null;
  newExt[mutant[1]].vl = 'x'
  return newExt
}

export const cheat = function (){
  const mss = ["it isn't your turn naa", 
    "don't cheat joor", 
    "be guided, you're not next", 
    "hope you didn't play too fast"];
  return mss[random(mss)];
}

// predicted winner : this must be only called once
export function predictedWinner (){
  let winnerCouldBe = ['x', 'y']
  return winnerCouldBe[random(winnerCouldBe)]
}