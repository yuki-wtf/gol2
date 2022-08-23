import GameGrid from '../../GolGrid/GameGrid/GameGrid'
import Cell from '../../GolGrid/Cell/Cell'
import { useSelectedCell } from '~/hooks/SelectedCell'

const Grid = ({ data }) => {
  const [selectedCell, setSelectedCell] = useSelectedCell()

  return (
    <GameGrid>
      {data.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (cell === 0) {
            return (
              <Cell
                state={
                  selectedCell != null && selectedCell.row === rowIndex && selectedCell.col === colIndex
                    ? 'selected'
                    : 'default'
                }
                onClick={() => {
                  setSelectedCell({
                    col: colIndex,
                    row: rowIndex,
                  })
                }}
                key={`${rowIndex}${colIndex}`}
              />
            )
          } else {
            return <Cell state="alive" key={`${rowIndex}${colIndex}`} />
          }
        })
      })}
    </GameGrid>
  )
}

export default Grid
