import GameGrid from '../GolGrid/GameGrid/GameGrid'
import Cell from '../GolGrid/Cell/Cell'
import GameOver from '../Logos/Creator/GameOver'

const Grid = ({ data }) => {
  return (
    <GameGrid>
      {data && data.length ? (
        data.map((row, j) => {
          return row.map((cell, i) => {
            if (cell === 0) return <Cell key={`${i}${cell}`} />
            else {
              return <Cell state="alive" key={`${i}${cell}`} />
            }
          })
        })
      ) : (
        <GameOver />
      )}
    </GameGrid>
  )
}

export default Grid
