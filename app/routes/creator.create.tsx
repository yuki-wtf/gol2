import UserCreatedGame from '../components/GameMode/Creator/UserCreatedGame'
import PageHeader from '../components/GameMode/Creator/PageHeader'
import ContainerInner from '../components/ContainerInner'
import Typography from '../components/Typography'
import styled from '@emotion/styled'
import Button from '../components/Button'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import { useUser } from '~/hooks/useUser'
import { useGameContract } from '~/hooks/useGameContract'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import { gridToGameState } from '~/helpers/gridToGameState'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { useDialog } from '~/hooks/Dialog'
import Dialog from '~/components/Dialog/Dialog'
import Loader from '~/components/Loader'
import { HiOutlineX } from 'react-icons/hi'
import { useContractWrite } from '@starknet-react/core'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'

const gameExamples = [
  {
    url: '/assets/examples/1.svg',
  },
  {
    url: '/assets/examples/2.svg',
  },
  {
    url: '/assets/examples/3.svg',
  },
  {
    url: '/assets/examples/4.svg',
  },
  {
    url: '/assets/examples/5.svg',
  },
  {
    url: '/assets/examples/6.svg',
  },
  {
    url: '/assets/examples/7.svg',
  },
  {
    url: '/assets/examples/8.svg',
  },
  {
    url: '/assets/examples/9.svg',
  },
  {
    url: '/assets/examples/10.svg',
  },
  {
    url: '/assets/examples/11.svg',
  },
  {
    url: '/assets/examples/12.svg',
  },
  {
    url: '/assets/examples/13.svg',
  },
  {
    url: '/assets/examples/14.svg',
  },
  {
    url: '/assets/examples/15.svg',
  },
  {
    url: '/assets/examples/16.svg',
  },
  {
    url: '/assets/examples/17.svg',
  },
  {
    url: '/assets/examples/18.svg',
  },
  {
    url: '/assets/examples/19.svg',
  },
  {
    url: '/assets/examples/20.svg',
  },
]
const TextWrapper = styled(Typography.H4SemiBold)`
  text-transform: none;
  color: #f3e9e1;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 170%;
  margin-bottom: 16px;
`
const Styledlist = styled.ul`
  padding: 0;
  margin: 0px 0 32px 22px;
`
const StyledlistItem = styled.li`
  padding: 0;
  margin: 0;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  margin-bottom: 16px;
  color: #f3e9e1;
`

const Create = () => {
  const [grid, setGrid] = useCreatorGrid()
  const user = useUser()
  const { contract } = useGameContract()
  const gameState = useMemo(() => gridToGameState(grid), [grid])

  const {
    data,
    isLoading: loading,
    isError: error,
    reset,
    write,
  } = useContractWrite({
    calls: contract ? [contract.populateTransaction.create!(gameState)] : [],
  })

  const [, setDialog] = useDialog()
  const { isCorrectNetwork } = useCheckNetwork()

  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])

  const navigate = useNavigate()

  useEffect(() => {
    if (data == null) return undefined

    void (async () => {
      const gameState = gridToGameState(grid)

      const formData = new FormData()

      formData.append('hash', data.transaction_hash)
      formData.append('status', 'RECEIVED')
      formData.append('functionName', 'create')
      formData.append('functionCaller', user!.userId)
      formData.append('functionInputGameState', gameState)

      await fetch('/api/transaction', {
        body: formData,
        method: 'post',
      })

      setGrid(gameStateToGrid('0'))

      navigate('/creator')
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigate])

  return (
    <ContainerInner>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '100%',
          maxWidth: '882px',
          margin: '1vh auto 0',
          paddingBottom: 64,
          gap: 24,
          borderBottom: '2px solid #0A0C10',
        }}
      >
        <div
          style={{
            width: 544,
            minWidth: 544,
          }}
        >
          <PageHeader title="Create new game" />
          <UserCreatedGame />
        </div>
        <div
          style={{
            display: 'flex',
            // maxWidth: "274px",
            flex: 1,
            marginTop: 64,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            <TextWrapper>Let’s create your game!</TextWrapper>
            <div>
              <Styledlist>
                <StyledlistItem>
                  Start by giving life to a pattern of cells on the grid (See some examples below)
                </StyledlistItem>
                <StyledlistItem>When you are happy with the pattern, click Start Game</StyledlistItem>
                <StyledlistItem>
                  The game will progress to the 1st generation and from that point on no more cells can be altered,
                  choose wisely!
                </StyledlistItem>
              </Styledlist>
              <div>
                {loading && (
                  <Dialog
                    textCentered
                    description="Confirm this transaction in your wallet"
                    title="Waiting for confirmation"
                    open={approvalDialogOpen}
                    animation={<Loader variant="light" />}
                    onClose={() => {
                      setApprovalDialogOpen(false)
                      reset()
                    }}
                  />
                )}
                {error && (
                  <Dialog
                    hasConfirmButton
                    textCentered
                    title="Transaction rejected"
                    open={userCancelledDialogOpen}
                    onClose={() => {
                      setUserCancelledDialogOpen(false)
                      reset()
                    }}
                    icon={<HiOutlineX size={40} />}
                  />
                )}
                <Button
                  label="Create Game"
                  isLoading={loading}
                  disabled={gameState === '0'}
                  onClick={() => {
                    if (!isCorrectNetwork) {
                      setDialog('WrongNetworkDialog')
                      return
                    }

                    if (user != null) {
                      console.log(gameState)

                      if (gameState === '0') return

                      // TODO test this
                      write()
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    setGrid(gameStateToGrid('0'))
                  }}
                  tertiary
                  label="CLEAR"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            color: '#F3E9E1',
          }}
        >
          <TextWrapper>Examples of starting patterns</TextWrapper>
          <Typography.BaseSemiBold color="#C2B9B2">
            Here are some fun patterns but remember you can start with anything!
          </Typography.BaseSemiBold>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 33,
            marginTop: 32,
          }}
        >
          {gameExamples.map((example) => {
            return (
              <div key={example.url}>
                <img width={144} height={144} src={example.url} alt="" />
              </div>
            )
          })}
        </div>
      </div>
    </ContainerInner>
  )
}

export default Create
