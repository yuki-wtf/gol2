import styled from '@emotion/styled'
import type { OnChainPlay } from '~/db.server'
import type { SerializeFrom } from '@remix-run/node'
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from 'react-icons/hi'
import { BiTimeFive } from 'react-icons/bi'
import SidebarSection from '~/components/SidebarSection'
import StatRow from '~/components/StatRow'
import Gameplay from '../Shared/Gameplay'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
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

  readonly onChainPlay: SerializeFrom<readonly OnChainPlay[]>
}

export default function Sidebar({ cellsToStart, gamesByUser, generations, uniquePlayers, onChainPlay }: Props) {
  return (
    <StyledSidebar>
      <SidebarSection title="Statistics">
        <StatRow icon={<HiQrcode size={24} />} title="Generations" loading={false} value={generations} />
        <StatRow icon={<HiOutlineUser size={24} />} title="Unique Players" loading={false} value={uniquePlayers} />
        <StatRow
          icon={<HiOutlineHeart size={24} />}
          title="Number of cells to start"
          loading={false}
          value={cellsToStart}
        />
        <StatRow icon={<BiTimeFive size={24} />} title="Number of games by user" loading={false} value={gamesByUser} />
      </SidebarSection>

      <Gameplay type="gameplay" title="On-chain Play" onChainPlay={onChainPlay} />
    </StyledSidebar>
  )
}
