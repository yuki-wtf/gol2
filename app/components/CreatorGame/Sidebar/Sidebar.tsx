import Statistics from './Statistics'
import styled from '@emotion/styled'
import Gameplay from './Gameplay'
import type { UseDataFunctionReturn } from '@remix-run/react/dist/components'
import type { Creator } from '~/db.server'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  min-width: 274px;
  gap: 24px;
  position: relative;
  padding-top: 60px;
`

interface Props {
  readonly generations: number
  readonly uniquePlayers: number
  readonly cellsToStart: number
  readonly gamesByUser: number

  readonly onChainPlay: UseDataFunctionReturn<readonly Creator[]>
}

export default function Sidebar({ cellsToStart, gamesByUser, generations, uniquePlayers, onChainPlay }: Props) {
  return (
    <StyledSidebar>
      <Statistics
        title="Statistics"
        cellsToStart={cellsToStart}
        gamesByUser={gamesByUser}
        generations={generations}
        uniquePlayers={uniquePlayers}
      />
      <Gameplay type="gameplay" title="On-chain Play" onChainPlay={onChainPlay} />
    </StyledSidebar>
  )
}
