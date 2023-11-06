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
import { useLoaderData } from '@remix-run/react'
import { num } from 'starknet'
import { useUser } from '~/hooks/useUser'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
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
const Twitterlink = styled.a`
  color: #f06b97;
  &:hover {
    opacity: 0.8;
  }
`

function twitter(text: string, url: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<Infinite[] | null>> {
  const userId = await getUserId(request)

  if (userId == null) return json(null)

  const result = await sql<Infinite>`
    select *
    from "infinite"
    where "transactionType" = 'game_evolved'
      and "transactionOwner" = ${hexToDecimalString(userId)}
  `

  return json(result.rows)
}

export default function Snapshots() {
  const user = useUser()
  const data = useLoaderData<typeof loader>()
  const { env } = useRootLoaderData()

  return (
    <ContainerInner maxWidth={1000} paddingBottom={64}>
      <PageIntro.Container>
        <PageIntro.Icon color="#F06B97" />
        <PageIntro.Text>
          Snapshots are moments in time of the Infinite game mode. Your unique snapshots are collected here every time
          you evolve the infinite game. <br /> <br /> Think snapshots should be mintable as NFTs? Let us know on{' '}
          <Twitterlink href="https://twitter.com/GoL2io" title="Twitter">
            Twitter
          </Twitterlink>
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
                    gameGeneration={snapshot.gameGeneration}
                    gameState={snapshot.gameState}
                    user={user.userId}
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
