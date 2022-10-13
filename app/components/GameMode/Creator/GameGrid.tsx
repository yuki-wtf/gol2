import Cell from '../Shared/Game/Cell'
import Grid from '../Shared/Game/Grid'

interface Props {
  readonly data: number[][]
}

export default function GameGrid({ data }: Props) {
  return (
    <Grid>
      {data.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`

          return <Cell key={key} state={cell === 0 ? undefined : 'alive'} />
        })
      )}
    </Grid>
  )
}
