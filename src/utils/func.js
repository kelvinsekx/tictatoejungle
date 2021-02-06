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
          console.log(filter)
        return filter;
      }
    }
    return false;
  }