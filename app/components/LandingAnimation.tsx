import { COLUMNS } from '../utils/constants'
import useGame from '../hooks/useGame'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function LandingAnimation() {
  const { grid, initialize, setIsRunning } = useGame()
  useEffect(() => {
    initialize()

    setTimeout(() => {
      setIsRunning(true)
    }, 1000)
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2 } }}>
      <div style={{ zIndex: 0, position: 'absolute', inset: 0, height: '100vh' }}>
        <div
          style={{
            zIndex: 0,
            display: 'grid',
            height: 'calc(100vh - 72px)',
            gridTemplateColumns: `repeat(${COLUMNS}, 42px)`,
            gap: 0,
            overflow: 'hidden',
          }}
          data-testid="grid-wrapper"
        >
          {grid &&
            Object.keys(grid).map((column, index) => (
              <div key={index} className="column" data-testid="column" style={{ gap: 0, height: '100vh' }}>
                {grid[column].map((cell: boolean, rowIndex: number) => (
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      backgroundColor: cell ? 'rgba(255,255,255,0.05)' : 'transparent',
                    }}
                    key={rowIndex}
                    data-testid="cell"
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}
