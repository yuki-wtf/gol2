import Cell from "./Game/Cell"
import GameGrid from "./Game/Grid"

interface Props {
  readonly data: number[][]
  readonly isGameOver?: boolean
}

export default function SnapshotGrid({ data, isGameOver }: Props) {
  if (isGameOver)
    return (
      <div style={{ position: 'absolute', top: 4, left: 13, zIndex: 4 }}>
        <img style={{ width: 204, height: 204 }} src="/assets/grid/gameoversmall.png" alt="game over" />
      </div>
    )
  return (
    <GameGrid isWithoutMotion>
      {data.map((row, j) =>
        row.map((cell, i) => <Cell state={cell === 0 ? 'default' : 'alive'} key={`${i}${cell}`} />)
      )}
    </GameGrid>
  )
}
