import styled from '@emotion/styled'
import { css } from '@emotion/react'

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

  cursor: ${!p.isSnapshot ? 'pointer' : 'default'};
  > &:hover {
    background-color: ${!p.isSnapshot && p.theme.colors.cell.cellDefaultHover};
  }
`
// const StyledCell = styled(motion.div)`
//   ${(p) => {
//     switch (p.state) {
//       case 'pending':
//         return pendingCell

//       case 'alive':
//         return aliveCell

//       case 'selected':
//         return selectedCell

//       case 'createSelected':
//         return createSelectedCell

//       case 'dead':
//         return defaultCell

//       default:
//         return defaultCell
//     }
//   }}
// `
const StyledCell2 = styled.div`
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
  }}

  &:hover {
    background-color: ${(p) => !p.isSnapshot && p.theme.colors.cell.cellDefaultHover};
  }
`

const Cell = ({ state = 'default', onClick, isSnapshot }) => {
  // const { playbackMode } = useSelector((state) => state.playback)

  // if (isSnapshot || playbackMode) {
  return <StyledCell2 isSnapshot state={state} onClick={onClick} />
  // }

  // return (
  //   <StyledCell
  //     initial={{
  //       opacity: 0,
  //       scale: 0,
  //     }}
  //     animate={{
  //       opacity: 1,
  //       scale: 1,
  //       transition: {
  //         delay: 0.4,
  //       },
  //     }}
  //     state={state}
  //     onClick={onClick}
  //   />
  // )
}

export default Cell
