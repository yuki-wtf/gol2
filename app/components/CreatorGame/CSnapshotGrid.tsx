import GameGrid from '../GolGrid/GameGrid/GameGrid'
import Cell from '../GolGrid/Cell/Cell'

const CSnapshotGrid = ({ loading = true, data, isSnapshot = true }) => {
  return (
    <GameGrid isSnapshotCreator small>
      {!loading && data && data.length ? (
        data.map((row, j) => {
          return row.map((cell, i) => {
            if (cell === 0) return <Cell isSnapshot key={`${i}${cell}`} />
            else {
              return <Cell isSnapshot state="alive" key={`${i}${cell}`} />
            }
          })
        })
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          fetching...
        </div>
      )}
    </GameGrid>
  )
}

export default CSnapshotGrid
