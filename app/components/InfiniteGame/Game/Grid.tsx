import GameGrid from '../../GolGrid/GameGrid/GameGrid'
import Cell from '../../GolGrid/Cell/Cell'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCellColumn, setSelectedCellRow } from '../../../features/Infinite/grid/infiniteGridSlice'

const Grid = ({ data }) => {
  const dispatch = useDispatch()
  const { selectedCellRow, selectedCellColumn } = useSelector((state) => state.infiniteGrid)
  const { playbackMode } = useSelector((state) => state.playback)

  const handleSelected = (row, column) => {
    if (playbackMode) return
    // console.log('row/col', row, column)
    dispatch(setSelectedCellRow(row))
    dispatch(setSelectedCellColumn(column))
  }

  // console.log("data is", data);
  return (
    <GameGrid>
      {data &&
        data.length &&
        data.map((row, j) => {
          return row.map((cell, i) => {
            if (cell === 0)
              return (
                <Cell
                  state={selectedCellRow === j && selectedCellColumn === i ? 'selected' : 'default'}
                  onClick={() => {
                    handleSelected(j, i)
                  }}
                  key={`${i}${cell}`}
                />
              )
            else {
              return <Cell state="alive" key={`${i}${cell}`} />
            }
          })
        })}
    </GameGrid>
  )
}

export default Grid
