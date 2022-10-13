import styled from '@emotion/styled'
import type { OnChainPlay } from '~/db.server'
import { useSelectedCell } from '~/hooks/SelectedCell'
import type { SerializeFrom } from '@remix-run/node'
import { HiQrcode, HiOutlineHeart } from 'react-icons/hi'
import { FaSkull } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import TempOverlay from '~/components/TempOverlay'
import SidebarSection from '~/components/SidebarSection'
import StatRow from '~/components/StatRow'
import Gameplay from '../Shared/Gameplay'

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
  readonly onChainPlay: SerializeFrom<readonly OnChainPlay[]>
}

export default function Sidebar({ extinctions, generations, livesGiven, longestStablePeriod, onChainPlay }: Props) {
  const [selectedCell] = useSelectedCell()

  return (
    <StyledSidebar>
      {selectedCell !== null && <TempOverlay />}

      <SidebarSection title="Statistics">
        <StatRow icon={<HiQrcode size={24} />} title="Generations" loading={false} value={generations} />
        <StatRow icon={<HiOutlineHeart size={24} />} title="Lives given" loading={false} value={livesGiven} />
        <StatRow icon={<FaSkull size={24} />} title="Extinctions" loading={false} value={extinctions} />

        {/* TODO remove quick fix */}
        {extinctions === 0 && (
          <StatRow icon={<BiTimeFive size={24} />} title="Longest stable period" loading={false} value={generations} />
        )}
      </SidebarSection>
      <Gameplay type="gameplay" title="On-chain Play" onChainPlay={onChainPlay} />
    </StyledSidebar>
  )
}
