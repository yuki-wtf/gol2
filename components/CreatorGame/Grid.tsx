import React, { useEffect, useState } from 'react'
import GameGrid from '../GolGrid/GameGrid/GameGrid'
import Cell from '../GolGrid/Cell/Cell'
import { useDispatch, useSelector } from 'react-redux'
import GameOver from '../Logos/Creator/GameOver'

const Grid = ({ data }) => {
  const dispatch = useDispatch()
  const { playbackMode } = useSelector((state) => state.playback)
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
