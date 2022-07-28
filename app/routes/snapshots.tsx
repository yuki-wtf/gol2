import { HiOutlineLightningBolt, HiOutlineLink } from 'react-icons/hi'
import ContainerInner from '../components/Layout/ContainerInner'
import PageIntro from '../components/PageIntro/PageIntro'
import Snapshot from '../components/Snapshot/Snapshot'
import SnapshotEmpty from '../components/SnapshotEmpty/SnapshotEmpty'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import * as SnapshotDialog from '../components/Snapshot/SnapshotDialog'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Infinite } from '~/db.server'
import { db } from '~/db.server'
import { getUserId } from '~/session.server'
import { useLoaderData } from '@remix-run/react'
import { hexToDecimalString } from 'starknet/utils/number'
import { useUserId } from '~/hooks/useUserId'
import type { TypedResponse } from '@remix-run/react/dist/components'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  @media (max-width: 981px) {
    justify-content: center;
  }
`

function twitter(url: string, text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<Infinite[]>> {
  const userId = await getUserId(request)

  if (userId == null) return json(null)

  const result = await db.query<Infinite>(
    ` select *
        from "infinite"
        where "transactionType" in ('sds')
        -- and "transactionOwner" = $1
      `
    // [hexToDecimalString(userId)]
  )

  return json(result.rows)
}

export default function Snapshots() {
  const userId = useUserId()
  const data = useLoaderData<typeof loader>()

  return (
    <ContainerInner maxWidth={1000} paddingBottom={64}>
      <PageIntro.Container>
        <PageIntro.Icon color="#F06B97" />
        <PageIntro.Text>
          Snapshots are moments in time of the Infinite game mode. Your unique snapshots are collected here every time
          you evolve the infinite game.
        </PageIntro.Text>
      </PageIntro.Container>
      <FlexContainer>
        <AnimatePresence>
          {userId && data == null &&
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
          {userId && data && data.length === 0 && (
            <SnapshotEmpty
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 3,
                },
              }}
              icon={<HiOutlineLightningBolt size={40} />}
              label="You don’t have any snapshots! Evolve the Infinite game to earn your first snapshot."
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!userId && (
            <SnapshotEmpty
              icon={<HiOutlineLink size={40} />}
              label="Connect your wallet to view snapshots from your previous plays"
            />
          )}
        </AnimatePresence>

        {userId &&
          data &&
          data.length > 0 &&
          data
            .map((snapshot, i) => (
              <SnapshotDialog.Dialog key={snapshot.gameGeneration}>
                <SnapshotDialog.DialogTrigger asChild>
                  <Snapshot
                    isSnapshot
                    gameGeneration={snapshot.gameGeneration}
                    gameState={snapshot.gameState}
                    user={userId}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 1,
                      },
                    }}
                    onClick={undefined}
                    onClickTwitter={undefined}
                    id={undefined}
                    isLoading={undefined}
                  />
                </SnapshotDialog.DialogTrigger>
                <SnapshotDialog.DialogContent>
                  <Snapshot
                    isSnapshot
                    large
                    gameGeneration={snapshot.gameGeneration}
                    gameState={snapshot.gameState}
                    user={userId}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 1,
                      },
                    }}
                    onClickTwitter={() => {
                      open(
                        twitter(
                          `https://gol2-thecotne.netlify.app/infinite/${snapshot.gameGeneration}`,
                          `I helped evolve the Game of Life on StarkNet. Join us and shape the future! #GoL2 #Starknet`
                        )
                      )
                    }}
                    onClick={undefined}
                    id={undefined}
                    isLoading={undefined}
                  />
                </SnapshotDialog.DialogContent>
              </SnapshotDialog.Dialog>
            ))
            .reverse()}
      </FlexContainer>
    </ContainerInner>
  )
}
