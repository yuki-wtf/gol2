import { useSelectedCell } from '~/hooks/SelectedCell'
import type { SerializeFrom } from '@remix-run/node'
import type { ReceivedCell } from '~/db.server'
import { useUser } from '~/hooks/useUser'
import { useHelpMessage } from '~/hooks/HelpMessage'
import Grid from '../Shared/Game/Grid'
import Cell from '../Shared/Game/Cell'

interface Props {
  readonly data: number[][]
  readonly isPlaying: boolean
  readonly receivedCells: SerializeFrom<readonly ReceivedCell[]>
}

export default function GameGrid({ data, receivedCells, isPlaying }: Props) {
  const [, setHelpMessage] = useHelpMessage()
  const [selectedCell, setSelectedCell] = useSelectedCell()
  const user = useUser()
  const balance = user?.balance ?? 0

  return (
    <Grid>
      {data.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`
          const cellIndex = rowIndex * 15 + colIndex

          if (receivedCells.find((c) => c.cellIndex === cellIndex) != null) {
            return <Cell state="pending" key={key} />
          }

          if (cell === 0) {
            if (isPlaying) return <Cell state="disabled" key={key} />
            return (
              <Cell
                state={
                  selectedCell != null && selectedCell.row === rowIndex && selectedCell.col === colIndex
                    ? 'selected'
                    : 'default'
                }
                onClick={() => {
                  if (user != null && balance == 0) {
                    setHelpMessage('balanceMessage')
                    return
                  }
                  if (user != null) {
                    setSelectedCell({
                      col: colIndex,
                      row: rowIndex,
                    })
                    return
                  }
                  setHelpMessage('connectWalletMessage')
                }}
                hasHoverState
                key={key}
              />
            )
          } else {
            return <Cell state="alive" key={key} />
          }
        })
      })}
    </Grid>
  )
}
