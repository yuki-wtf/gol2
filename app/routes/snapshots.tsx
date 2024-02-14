import { HiOutlineLightningBolt, HiOutlineLink, HiOutlineX } from 'react-icons/hi'
import ContainerInner from '../components/ContainerInner'
import PageIntro from '../components/PageIntro'
import Snapshot from '../components/Snapshot/Snapshot'
import SnapshotEmpty from '../components/Snapshot/SnapshotEmpty'
import styled from '@emotion/styled'
import { AnimatePresence } from 'framer-motion'
import * as SnapshotDialog from '../components/Snapshot/SnapshotDialog'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Infinite } from '~/db.server'
import { sql } from '~/db.server'
import { getUserId } from '~/session.server'
import { useFetcher } from '@remix-run/react'
import { num } from 'starknet'
import { useUser } from '~/hooks/useUser'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { addMintedNftDetails } from '~/helpers/addMintedNftDetails'
import { addPendingNftDetails } from '~/helpers/addPendingNftDetails'
import { getUserNFTs } from '~/helpers/getUserNFTsStarkscan'
import { useEffect, useMemo } from 'react'
import { useInterval } from 'react-use'
import { twitter } from '~/helpers/twitter'

const hexToDecimalString = num.hexToDecimalString

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  @media (max-width: 981px) {
    justify-content: center;
  }
`

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<Infinite[] | null>> {
  const userId = await getUserId(request)

  if (userId == null) return json(null)

  const userNfts = await getUserNFTs(userId)

  const result = await sql<Infinite>`
    select *
    from "infinite"
    where "transactionType" = 'game_evolved'
      and "transactionOwner" = ${hexToDecimalString(userId)}
  `

  const pendingMints = await sql<any>`
    select *
    from "mints"
    where "userId" = ${userId}
    `

  const snapshotsWithMintedNfts = addMintedNftDetails(result.rows, userNfts || [])
  const { snapshotsWithPendingAndMintedNfts, idsToRemove } = addPendingNftDetails(
    snapshotsWithMintedNfts,
    pendingMints.rows
  )

  if (idsToRemove.length > 0) {
    try {
      await sql`
        delete from "mints"
        where "generation" = ANY(${idsToRemove})
      `
      console.log('deleted mints that exist in starkscan', idsToRemove)
    } catch {
      console.error('error deleting pending mints', idsToRemove)
    }
  }

  return json(snapshotsWithPendingAndMintedNfts)
}

export default function Snapshots() {
  const user = useUser()
  const { load, data } = useFetcher()
  const { env } = useRootLoaderData()

  useEffect(() => {
    load('/snapshots')
  }, [load])

  const refreshPage = () => {
    load('/snapshots')
  }

  const hasAnyPendingMints = useMemo(() => {
    if (data == null) return false
    return data.some((s: any) => s.nft?.type === 'pending') as boolean
  }, [data])

  useInterval(
    () => {
      load('/snapshots')
    },
    hasAnyPendingMints ? 1000 * 10 : null
  )

  return (
    <ContainerInner maxWidth={1000} paddingBottom={64}>
      <PageIntro.Container>
        <PageIntro.Icon color="#F06B97" />
        <PageIntro.Text>
          Snapshots are moments in time of the Infinite game mode – mintable as NFTs. Your unique snapshots are
          collected here every time you evolve the infinite game.
        </PageIntro.Text>
      </PageIntro.Container>
      <FlexContainer>
        <AnimatePresence>
          {user != null &&
            data == null &&
            [1, 2, 3].map((item, i) => (
              <Snapshot
                key={item}
                isLoading
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    delay: 0,
                  },
                }}
              />
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {user != null && data && data.length === 0 && (
            <SnapshotEmpty
              icon={<HiOutlineLightningBolt size={40} />}
              label="You don’t have any snapshots! Evolve the Infinite game to earn your first snapshot."
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {user == null && (
            <SnapshotEmpty
              icon={<HiOutlineLink size={40} />}
              label="Connect your wallet to view snapshots from your previous plays"
            />
          )}
        </AnimatePresence>

        {user != null &&
          data &&
          data.length > 0 &&
          data
            .map((snapshot, i) => (
              <SnapshotDialog.Dialog key={snapshot.gameGeneration}>
                <SnapshotDialog.DialogTrigger asChild>
                  <Snapshot
                    nft={snapshot.nft}
                    gameGeneration={snapshot.gameGeneration}
                    gameState={snapshot.gameState}
                    user={user.userId}
                    refreshPage={refreshPage}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0,
                      },
                    }}
                  />
                </SnapshotDialog.DialogTrigger>
                <SnapshotDialog.DialogContent>
                  <div style={{ position: 'absolute', top: 10, right: 5, zIndex: 100 }}>
                    <SnapshotDialog.DialogClose onClick={undefined}>
                      <HiOutlineX size={24} />
                    </SnapshotDialog.DialogClose>
                  </div>
                  <Snapshot
                    large
                    gameGeneration={snapshot.gameGeneration}
                    gameState={snapshot.gameState}
                    user={user.userId}
                    nft={snapshot.nft}
                    refreshPage={refreshPage}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0,
                      },
                    }}
                    onClickTwitter={() => {
                      open(
                        twitter(
                          `I own generation ${snapshot.gameGeneration} in @GoL2io 💪 #GoL2 #Starknet`,
                          `${env.BASE_URL!}/infinite/${snapshot.gameGeneration}`
                        )
                      )
                    }}
                  />
                </SnapshotDialog.DialogContent>
              </SnapshotDialog.Dialog>
            ))
            .reverse()}
      </FlexContainer>
    </ContainerInner>
  )
}
