import React from 'react'
import ControlBar from '../../GolGrid/Footer/ControlBar/ControlBar'
import Footer from '../../GolGrid/Footer/Footer'
import { useSelector } from 'react-redux'
import TempOverlay from '../../TempOverlay/TempOverlay'

const IFooter = () => {
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid)
  return (
    <Footer>
      {selectedCellRow !== null && <TempOverlay />}
      <ControlBar />
    </Footer>
  )
}

export default IFooter
