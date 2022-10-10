import type { Interpolation } from '@emotion/styled'
import styled from '@emotion/styled'

interface Props {
  readonly state?: 'pending' | 'alive' | 'selected' | 'createSelected' | 'disabled' | 'dead' | 'default'
  readonly hasHoverState?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const StyledCell = styled.div<Props>((p): Interpolation<Props> => {
  const style = ((): Interpolation<Props> => {
    switch (p.state) {
      case 'pending':
        return {
          backgroundColor: p.theme.colors.cell.cellPendingBackground,
          pointerEvents: 'none',
          boxShadow: `inset 0 0 0 1px ${p.theme.colors.cell.cellLiveBackground}`,
        }

      case 'alive':
        return {
          backgroundColor: p.theme.colors.cell.cellLiveBackground,
          pointerEvents: 'none',
        }

      case 'selected':
        return {
          backgroundColor: p.theme.colors.cell.cellPreLiveBackground,
          pointerEvents: 'none',
        }

      case 'createSelected':
        return {
          backgroundColor: p.theme.colors.cell.cellPreLiveBackground,
          cursor: 'pointer',
          '> &:hover': {
            backgroundColor: p.theme.colors.cell.cellPreLiveBackground,
          },
        }

      case 'disabled':
        return {
          pointerEvents: 'none',
          backgroundColor: p.theme.colors.cell.cellDefaultBackground,

          border: '0.5px solid #2d3038',
          '> &:hover': {
            backgroundColor: p.theme.colors.cell.cellDefaultBackground,
          },
        }

      case 'dead':
      case 'default':
      default:
        return {
          backgroundColor: p.theme.colors.cell.cellDefaultBackground,
          border: '0.5px solid #2d3038',
        }
    }
  })()

  style['&:hover'] = {
    backgroundColor: p.hasHoverState && p.theme.colors.cell.cellDefaultHover,
    cursor: p.hasHoverState ? 'pointer' : 'default',
  }

  return style
})

export default StyledCell
