import { createStateContext } from 'react-use'

type GameOverMessage = boolean

export const [useGameOver, GameOverProvider, GameOverContext] = createStateContext<GameOverMessage>(false)
