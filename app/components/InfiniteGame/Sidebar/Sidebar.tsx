import Statistics from './Statistics'
import styled from '@emotion/styled'
import Gameplay from './Gameplay'
import TempOverlay from '../../TempOverlay/TempOverlay'
import type { Infinite } from '~/db.server'
import { useSelectedCell } from '~/hooks/SelectedCell'
import type { SerializeFrom } from '@remix-run/node'

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
  readonly onChainPlay: SerializeFrom<readonly Infinite[]>
}

export default function Sidebar({ extinctions, generations, livesGiven, longestStablePeriod, onChainPlay }: Props) {
  const [selectedCell] = useSelectedCell()

  return (
    <StyledSidebar>
      {selectedCell !== null && <TempOverlay />}

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
