import React from 'react'
import Footer from '../GolGrid/Footer/Footer'
import CControlBar from './CControlBar'

const IFooter = ({ gameId }) => {
  return (
    <Footer>
      <CControlBar gameId={gameId} />
    </Footer>
  )
}

export default IFooter
