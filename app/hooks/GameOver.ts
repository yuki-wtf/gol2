import { createStateContext } from 'react-use'

type GameOverMessage = boolean | null

export const [useGameOver, GameOverProvider, GameOverContext] = createStateContext<GameOverMessage>(null)
