import GameGrid from '../GolGrid/GameGrid/GameGrid'
import Cell from '../GolGrid/Cell/Cell'

interface Props {
  readonly data: number[][]
}

export default function CSnapshotGrid({ data }: Props) {
  return (
    <GameGrid isWithoutMotion>
      {data.map((row, j) =>
        row.map((cell, i) => <Cell isSnapshot state={cell === 0 ? 'default' : 'alive'} key={`${i}${cell}`} />)
      )}
    </GameGrid>
  )
}
