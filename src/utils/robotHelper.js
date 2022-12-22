import {
  predeterminedAvailableMovements as ptA,
  possibleMovements,
} from './util'

export function findPossibleMoveable(ext) {
  let keepState = []
  /**try to keep the state of available movements for x */
  for (let c of possibleMovements) {
    if (ext[c[0]].value === 'x' && ext[c[1]].value === null) {
      keepState.push(c)
    }
  }
  /**important for debugging */
  //console.log(keepState);
  const l = keepState.length
  /** dont think like a fool */
  if (l < 2) {
    /**
     * # if the state is just one,
     * # return it, and end the thinking
     */
    return keepState[0]
  }

  if (l >= 2) {
    /** "(* ! *)"  */
    /** my name is ROBOT sekx */
    /** I have been built not to be foolish, */
    /** and not to be too smart. */
    /** my job here is just simple, win when given the
     * most foolish opportunity to.
     * thanks,
     *
     *                      Yours sincerely,
     *                       Robot, sekx.
     */
    function TMWTD() {
      for (let x of ptA) {
        let truthy = true
        if (keepState.length === x.ar.length) {
          for (let i = 0; i < keepState.length; i++) {
            if (
              keepState[i][0] !== x.ar[i][0] ||
              keepState[i][1] !== x.ar[i][1]
            ) {
              truthy = false
            }
          }
          if (truthy) return x.pt
        }
      }
    }
    let td = TMWTD()
    //console.log(td)
    if (td === 'I') {
      return keepState[1]
    } else if (td === 'II') {
      return keepState[5]
    } else if (td === 'III') {
      return keepState[3]
    } else if (td === 'IV') {
      return keepState[2]
    } else if (td === 'V') {
      return keepState[6]
    } else if (td === 'VI') {
      return keepState[5]
    } else if (td === 'VII') {
      return keepState[1]
    } else if (td === 'VIII') {
      return keepState[1]
    } else {
      return keepState[Math.floor(Math.random() * l)]
    }
  }
}
