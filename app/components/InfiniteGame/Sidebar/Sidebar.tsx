import Statistics from './Statistics'
import styled from 'styled-components'
import Gameplay from './Gameplay'
import TempOverlay from '../../TempOverlay/TempOverlay'
import { useSelector } from 'react-redux'
import type { Infinite } from '~/db.server'
import type { UseDataFunctionReturn } from '@remix-run/react/dist/components'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  min-width: 274px;
  gap: 24px;
  position: relative;
`

interface Props {
  readonly generations: number
  readonly livesGiven: number
  readonly extinctions: number
  readonly longestStablePeriod: number
  readonly onChainPlay: UseDataFunctionReturn<readonly Infinite[]>
}

export default function Sidebar({ extinctions, generations, livesGiven, longestStablePeriod, onChainPlay }: Props) {
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid)

  return (
    <StyledSidebar>
      {selectedCellRow !== null && <TempOverlay />}
      <Statistics
        title="Statistics"
        extinctions={extinctions}
        generations={generations}
        livesGiven={livesGiven}
        longestStablePeriod={longestStablePeriod}
      />
      <Gameplay type="gameplay" title="On-chain Play" onChainPlay={onChainPlay} />
    </StyledSidebar>
  )
}
