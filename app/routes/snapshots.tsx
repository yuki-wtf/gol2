import { useStarknet } from '@starknet-react/core'
import { HiOutlineLink } from 'react-icons/hi'
import ContainerInner from '../components/Layout/ContainerInner'
import PageIntro from '../components/PageIntro/PageIntro'
import Snapshot from '../components/Snapshot/Snapshot'
import SnapshotEmpty from '../components/SnapshotEmpty/SnapshotEmpty'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { dataToGrid } from '../utils/dataToGrid'
import { useSelector } from 'react-redux'
import * as SnapshotDialog from '../components/Snapshot/SnapshotDialog'

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

export default function Snapshots() {
  const { snapshots: snapshotsRedux } = useSelector((state) => state.user)
  // const { snapshots, loading, error } = useFetchTokens()
  const { account } = useStarknet()

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
        {/* Show Loading */}
        <AnimatePresence>
          {!account &&
            !snapshotsRedux.length &&
            [1, 2, 3].map((item, i) => (
              <Snapshot
                data={dataToGrid({
                  row_0: 0,
                  row_1: 0,
                  row_2: 0,
                  row_3: 0,
                  row_4: 0,
                  row_5: 0,
                  row_6: 0,
                  row_7: 0,
                  row_8: 0,
                  row_9: 0,
                  row_10: 0,
                  row_11: 0,
                  row_12: 32,
                  row_13: 8,
                  row_14: 103,
                  row_15: 0,
                  row_16: 0,
                  row_17: 0,
                  row_18: 0,
                  row_19: 0,
                  row_20: 0,
                  row_21: 0,
                  row_22: 0,
                  row_23: 0,
                  row_24: 0,
                  row_25: 0,
                  row_26: 0,
                  row_27: 0,
                  row_28: 0,
                  row_29: 0,
                  row_30: 0,
                  row_31: 0,
                })}
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

        {/* TODO: check for shapshots and show You don't have any snapshots -  */}

        {/* <AnimatePresence>
         {account && !snapshots.length && (
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
        </AnimatePresence> */}
        <AnimatePresence>
          {!account && (
            <SnapshotEmpty
              initial={{
                opacity: 0,
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
              icon={<HiOutlineLink size={40} />}
              label="Connect your wallet to view snapshots from your previous plays"
            />
          )}
        </AnimatePresence>

        {account &&
          snapshotsRedux &&
          snapshotsRedux.length > 0 &&
          snapshotsRedux
            .map((snapshot, i) => (
              <SnapshotDialog.Dialog key={snapshot}>
                <SnapshotDialog.DialogTrigger asChild>
                  <Snapshot
                    isSnapshot
                    generationNumber={snapshot}
                    user={account}
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
                  />
                </SnapshotDialog.DialogTrigger>
                <SnapshotDialog.DialogContent>
                  <Snapshot
                    isSnapshot
                    large
                    generationNumber={snapshot}
                    user={account}
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
                          `https://gol2-thecotne.netlify.app/infinite/${snapshot}`,
                          `I helped evolve the Game of Life on StarkNet. Join us and shape the future! #GoL2 #Starknet`
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

