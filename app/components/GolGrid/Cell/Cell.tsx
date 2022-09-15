import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface Props {
  readonly state?: 'pending' | 'alive' | 'selected' | 'createSelected' | 'dead'
  readonly hasHoverState?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const pendingCell = (p: any) => css`
  background-color: ${p.theme.colors.cell.cellPendingBackground};
  pointer-events: none;
  box-shadow: inset 0 0 0 1px ${p.theme.colors.cell.cellLiveBackground};
`
const aliveCell = (p: any) => css`
  background-color: ${p.theme.colors.cell.cellLiveBackground};
  pointer-events: none;
`
const selectedCell = (p: any) => css`
  background-color: ${p.theme.colors.cell.cellPreLiveBackground};
  pointer-events: none;
`
const createSelectedCell = (p: any) => css`
  background-color: ${p.theme.colors.cell.cellPreLiveBackground};
  cursor: pointer;
  > &:hover {
    background-color: ${p.theme.colors.cell.cellPreLiveBackground};
  }
`

const defaultCell = (p: any) => css`
  background-color: ${p.theme.colors.cell.cellDefaultBackground};
  border: 0.5px solid #2d3038;
`

const StyledCell = styled.div<Props>`
  ${(p) => {
    switch (p.state) {
      case 'pending':
        return pendingCell(p)

      case 'alive':
        return aliveCell(p)

      case 'selected':
        return selectedCell(p)

      case 'createSelected':
        return createSelectedCell(p)

      case 'dead':
        return defaultCell(p)

      default:
        return defaultCell(p)
    }
  }} &:hover {
    background-color: ${(p) => p.hasHoverState && p.theme.colors.cell.cellDefaultHover};
    cursor: ${(p) => (p.hasHoverState ? 'pointer' : 'default')};
  }
`

const Cell = ({ state, onClick, hasHoverState = false }: Props) => {
  return <StyledCell state={state} onClick={onClick} hasHoverState={hasHoverState} />
}

export default Cell
