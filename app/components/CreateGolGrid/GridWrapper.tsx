import React from 'react'
import { useSelector } from 'react-redux'
import { dataToGrid } from '../../utils/dataToGrid'
import Grid from './Grid'
import UserCreatedGrid from './UserCreatedGrid'

const GridWrapper = () => {
  return (
    <div>
      <UserCreatedGrid />
    </div>
  )
}

export default GridWrapper
