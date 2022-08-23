import { createStateContext } from 'react-use'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'

export type CreatorGrid = number[][]

export const [useCreatorGrid, CreatorGridProvider, CreatorGridContext] = createStateContext<CreatorGrid>(
  gameStateToGrid('0')
)
