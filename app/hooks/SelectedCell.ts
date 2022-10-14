import { createStateContext } from 'react-use'

export interface SelectedCell {
  readonly row: number
  readonly col: number
}

export const [useSelectedCell, SelectedCellProvider, SelectedCellContext] = createStateContext<SelectedCell | null>(
  null
)
