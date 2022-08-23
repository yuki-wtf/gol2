import produce from 'immer'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import Cell from '../GolGrid/Cell/Cell'
import GameGrid from '../GolGrid/GameGrid/GameGrid'

const UserCreatedGrid = () => {
  const [grid, setGrid] = useCreatorGrid()

  return (
    <GameGrid>
      {grid.map((rows, rowIndex) =>
        rows.map((cell, colIndex) => (
          <Cell
            onClick={() => {
              const newCells = produce(grid, (draft) => {
                draft[rowIndex][colIndex] = draft[rowIndex][colIndex] ? 0 : 1
              })

              setGrid(newCells)
            }}
            key={`${rowIndex}-${colIndex}`}
            state={grid[rowIndex][colIndex] ? 'createSelected' : 'dead'}
          />
        ))
      )}
    </GameGrid>
  )
}

export default UserCreatedGrid
