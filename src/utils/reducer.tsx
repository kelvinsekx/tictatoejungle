import { isFirstTimer } from './func'
import { PLAYER, Tstate } from './types'

export const initialState = {
  active: PLAYER.ONEPLAYER,
  isFirstTimer,
}

export const reducer = (state: Tstate, action: { type: string }): Tstate => {
  switch (action.type) {
    case 'one':
      return { ...initialState }
    case 'two':
      return {
        ...state,
        active: PLAYER.TWOPLAYER,
      }
    case 'toggleFistTimer':
      return {
        ...state,
        isFirstTimer: !isFirstTimer,
      }
    default:
      throw new Error(
        'action type is not known, consider using setToOnePlayer or setToTwoPlayers'
      )
  }
}
