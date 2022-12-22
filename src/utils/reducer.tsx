import { isFirstTimer } from './func'
type Tstate = {
  player: string
  active: string
  isFirstTimer: boolean
}

export enum PLAYER {
  ONEPLAYER = 'onePlayer',
  TWOPLAYER = 'twoPlayers',
}

export const initialState = {
  player: 'onePlayer',
  active: 'one',
  isFirstTimer,
}

export const reducer = (state: Tstate, action: { type: string }): Tstate => {
  switch (action.type) {
    case 'one':
      return { ...initialState }
    case 'two':
      return {
        ...state,
        player: PLAYER.TWOPLAYER,
        active: 'two',
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
