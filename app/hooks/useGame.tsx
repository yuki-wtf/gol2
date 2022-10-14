import { useCallback, useEffect, useState } from 'react'
import type { Grid } from '../utils'
import { getCellPosition, getCells, randomizeGrid, transformGrid } from '../utils'
import { COLUMNS, INTERVAL } from '../utils/constants'
import { useInterval } from 'react-use'

export default function useGame() {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [steps, setSteps] = useState<number>(0)
  const [grid, setGrid] = useState<Grid>({})
  const [liveCellsPos, setLiveCellsPos] = useState<number[]>([])

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(
    () => {
      handleNext()
    },
    isRunning ? INTERVAL : null
  )

  const initialize = useCallback(() => {
    setSteps(0)
    const cells = getCells(COLUMNS)
    cells[1]![4] = true
    cells[2]![5] = true
    cells[3]![3] = true
    cells[3]![4] = true
    cells[3]![5] = true

    cells[30]![4] = true
    cells[31]![3] = true
    cells[31]![4] = true
    cells[31]![5] = true
    cells[32]![4] = true

    cells[22]![16] = true
    cells[23]![16] = true
    cells[21]![17] = true
    cells[22]![17] = true
    cells[22]![18] = true

    setGrid(cells)
  }, [])

  const handleNext = useCallback(() => {
    const nextGrid = transformGrid(grid)
    setGrid(nextGrid)
    setSteps(steps + 1)
  }, [grid, steps])

  const handleCell = useCallback(
    (column: number, rowIndex: number, cell: boolean) => {
      const currentCell = !cell

      const newOb = { ...grid }
      newOb[column]![rowIndex] = currentCell

      const cellPos = getCellPosition(grid, column, rowIndex)

      if (currentCell) {
        setLiveCellsPos([...liveCellsPos, cellPos])
      } else {
        const liveCellsToUpdate = [...liveCellsPos]
        const cellIndex = liveCellsToUpdate.indexOf(cellPos)
        if (cellIndex > -1) {
          liveCellsToUpdate.splice(cellIndex, 1)
        }

        setLiveCellsPos(liveCellsToUpdate)
      }
      setGrid(newOb)
    },
    [grid, liveCellsPos]
  )

  const randomize = useCallback(() => {
    setGrid(randomizeGrid(grid))
  }, [grid])

  return {
    grid,
    isRunning,
    steps,
    initialize,
    setIsRunning,
    randomize,
    handleCell,
    handleNext,
  }
}
