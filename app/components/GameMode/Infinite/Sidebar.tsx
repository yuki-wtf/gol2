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
import { useCreatedSnapshot } from '~/hooks/CreatedSnapshot'
import { useDeepCompareEffect } from 'react-use'
import { useRef } from 'react'

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
  const onChainPlayPrev = useRef(onChainPlay)
  const [_, setCreatedSnapshot] = useCreatedSnapshot()
  useDeepCompareEffect(() => {
    const newReceivedTxns = onChainPlayPrev.current.filter(
      (tnx) => tnx.status === 'RECEIVED' && tnx.type === 'game_evolved'
    )
    const updatedTnxObject = onChainPlay.reduce<Record<string, typeof newReceivedTxns[0]>>((acc, tnx) => {
      acc[tnx.hash] = tnx
      return acc
    }, {})

    newReceivedTxns.forEach((tnx) => {
      const updatedTnx = updatedTnxObject[tnx.hash]
      if (['ACCEPTED_ON_L2', 'ACCEPTED_ON_L1', 'PENDING'].includes(updatedTnx?.status ?? '')) {
        setCreatedSnapshot(true)
      }
    })
    onChainPlayPrev.current = onChainPlay
  }, [onChainPlay])

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
