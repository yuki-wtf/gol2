import produce from 'immer'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateGridSelection } from '../../features/creator/create/CreateGameSlice'
import Cell from '../GolGrid/Cell/Cell'
import GameGrid from '../GolGrid/GameGrid/GameGrid'
let gameSpeed = 100

const generateGrid = (rows, columns, random = false) => {
  let cells = []

  for (let i = 0; i < rows; i++) {
    //for every row, makes columns
    let row = []
    cells.push(row)

    for (let j = 0; j < columns; j++) {
      //if 3rd argument is true, push 1(alive), otherwise push 0 (dead cell)
      row.push(0)
    }
  }

  return cells
}

const isEmptyGrid = (grid) => {
  let empty = true //assume by default as empty

  grid.map((row) => {
    row.map((cell) => {
      //if found alive return true
      if (cell == 1) empty = false
    })
  })
  return empty
}

const countNeighbors = (grid) => {
  //2d array, each cell contain a number of neighbors
  console.log('grid ', grid)
  let count = generateGrid(32, 32)
  grid.map((row, rowIndex, grid) => {
    row.map((cell, cellIndex) => {
      const left = torus(cellIndex - 1, row.length)
      const right = torus(cellIndex + 1, row.length)
      const up = torus(rowIndex - 1, grid.length)
      const down = torus(rowIndex + 1, grid.length)
      const neighbours = [
        grid[up][left],
        grid[up][cellIndex],
        grid[up][right],
        grid[rowIndex][left],
        grid[rowIndex][right],
        grid[down][left],
        grid[down][cellIndex],
        grid[down][right],
      ]
      count[rowIndex][cellIndex] = neighbours.reduce((x, y) => x + y) //counts numbers and puts in a cell

      return cell
    })
  })
  return count
}

const torus = (index, length) => {
  // handle connecting edges together
  if (index === -1) {
    return length - 1
  } else if (index === length) {
    return 0
  } else {
    return index
  }
}

const UserCreatedGrid = () => {
  const dispatch = useDispatch()
  const [cells, setCells] = useState(generateGrid(32, 32, true))
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [request, setRequest] = useState([])
  const nextGeneration = useCallback(() => {
    if (isEmptyGrid(cells)) {
      return //if all cells are 0, stop
    }

    let neighbors = countNeighbors(cells)
    let oldGrid = cells
    let newGrid = generateGrid(32, 32)

    for (let i = 0, rows = oldGrid.length; i < rows; i++) {
      for (let j = 0, columns = oldGrid[0].length; j < columns; j++) {
        if ((oldGrid[i][j] == 1 && neighbors[i][j] == 2) || neighbors[i][j] == 3) {
          //if alive and neighb 2 or 3, stays alive
          newGrid[i][j] = 1
        } else if (oldGrid[i][j] == 0 && neighbors[i][j] == 3) {
          //if dead and has 3 neighb new cell will be born
          newGrid[i][j] = 1
        } else {
          //otherwise death
          newGrid[i][j] = 0
        }
      }
    }

    setCells(newGrid) //update grid and count

    setCount(count++)
  }, [cells, count])
  useEffect(() => {
    let intervalId
    if (isRunning)
      intervalId = setInterval(() => {
        nextGeneration()
      }, gameSpeed)
    if (!isRunning) clearInterval(intervalId)
    return () => clearInterval(intervalId)
  }, [isRunning, nextGeneration])

  function handleCreateGame() {
    const chosenGameGrid = cells
    // console.log(chosenGameGrid);
    let arr = new Array()
    chosenGameGrid.map((row) => {
      const formatRow = parseInt(row.join('').toString(), 2)
      arr.push(formatRow)
    })
    return setRequest(arr)
  }

  console.log(request)
  return (
    <GameGrid>
      {cells &&
        cells.map((rows, i) =>
          rows.map((cell, k) => (
            <Cell
              onClick={() => {
                const newCells = produce(cells, (cellsCopy) => {
                  cellsCopy[i][k] = cellsCopy[i][k] ? 0 : 1
                })
                setCells(newCells)
                dispatch(updateGridSelection(newCells))
              }}
              key={`${i}-${k}`}
              state={cells[i][k] ? 'createSelected' : 'dead'}
            />
          ))
        )}
    </GameGrid>
  )
}

export default UserCreatedGrid
