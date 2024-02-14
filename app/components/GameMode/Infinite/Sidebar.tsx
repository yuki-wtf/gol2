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
import { useRef, useState } from 'react'
import { useUser } from '~/hooks/useUser'
import { num } from 'starknet'
import MintSnapshot from './MintSnapshot'

const hexToDecimalString = num.hexToDecimalString

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

interface GameDetails {
  gameGeneration: string
  gameState: string
}
export default function Sidebar({ extinctions, generations, livesGiven, longestStablePeriod, onChainPlay }: Props) {
  const [selectedCell] = useSelectedCell()
  const currentUser = useUser()
  const [gameDetails, setGameDetails] = useState<GameDetails[] | null>(null)
  const [_, setSnapshotCreated] = useCreatedSnapshot()
  const [activeSnapshot, setActiveSnapshot] = useState<GameDetails | null>(null)
  const activeSnapshotTimeout = useRef<NodeJS.Timeout | null>(null)
  const snapshotCreatedTimeout = useRef<NodeJS.Timeout | null>(null)

  const myOnChainPlay = onChainPlay.filter(
    (tnx) => currentUser?.userId && tnx.owner === hexToDecimalString(currentUser.userId)
  )

  const onChainPlayPrev = useRef(myOnChainPlay)

  const onMintModalClose = (snapshotMinted?: boolean) => {
    setActiveSnapshot(null)
    setGameDetails((prev) => prev?.slice(1) ?? null)
    if (snapshotMinted) {
      setSnapshotCreated(true)
      if (snapshotCreatedTimeout.current) clearTimeout(snapshotCreatedTimeout.current)
      snapshotCreatedTimeout.current = setTimeout(() => setSnapshotCreated(false), 10000)
    }
  }

  useDeepCompareEffect(() => {
    const newReceivedTxns = onChainPlayPrev.current.filter(
      (tnx) => tnx.status === 'RECEIVED' && tnx.type === 'game_evolved'
    )
    const updatedTnxObject = myOnChainPlay.reduce<Record<string, typeof newReceivedTxns[0]>>((acc, tnx) => {
      acc[tnx.hash] = tnx
      return acc
    }, {})

    newReceivedTxns.forEach((tnx) => {
      const updatedTnx = updatedTnxObject[tnx.hash]
      const isAccepted = ['ACCEPTED_ON_L2', 'ACCEPTED_ON_L1', 'PENDING'].includes(updatedTnx?.status ?? '')
      if (isAccepted && !!updatedTnx?.gameGeneration && !!updatedTnx.gameState) {
        const newState: GameDetails = {
          gameGeneration: updatedTnx.gameGeneration,
          gameState: updatedTnx.gameState,
        }
        setGameDetails((prev) =>
          prev
            ? prev.some((p) => p.gameGeneration === newState.gameGeneration)
              ? prev
              : [newState, ...prev]
            : [newState]
        )
      }
    })
    onChainPlayPrev.current = myOnChainPlay
  }, [myOnChainPlay])

  useDeepCompareEffect(() => {
    if (gameDetails?.[0]) {
      if (activeSnapshotTimeout.current) clearTimeout(activeSnapshotTimeout.current)
      activeSnapshotTimeout.current = setTimeout(
        () => setActiveSnapshot((prev) => (prev ? prev : gameDetails[0])),
        1000
      )
    }
  }, [gameDetails])

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
        {activeSnapshot && (
          <MintSnapshot
            snapshot={activeSnapshot}
            onClose={() => onMintModalClose()}
            onSnapshotMintCreated={() => onMintModalClose(true)}
          />
        )}
      </SidebarSection>
      <Gameplay type="gameplay" title="On-chain Play" onChainPlay={onChainPlay} />
    </StyledSidebar>
  )
}
