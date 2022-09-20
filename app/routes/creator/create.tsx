import CreateGolGrid from '../../components/CreateGolGrid/CreateGolGrid'
import CreatorGameHeader from '../../components/CreatorGameHeader/CreatorGameHeader'
import ContainerInner from '../../components/Layout/ContainerInner'
import Typography from '../../components/Typography/Typography'
import styled from '@emotion/styled'
import Button from '../../components/Button/Button'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import { useUser } from '~/hooks/useUser'
import { useGameContract } from '~/hooks/useGameContract'
import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import { gridToGameState } from '~/helpers/gridToGameState'
import DialogWaiting from '~/components/DialogWaiting/DialogWaiting'
import DialogTxnError from '~/components/DialogTxnError/DialogTxnError'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { useDialog } from '~/hooks/Dialog'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { StarknetChainId } from 'starknet4/dist/constants'

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
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'create',
  })

  const { library } = useStarknet()
  const [dialog, setDialog] = useDialog()
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.MAINNET : StarknetChainId.TESTNET

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

    ;(async () => {
      const gameState = gridToGameState(grid)

      const formData = new FormData()

      formData.append('hash', data)
      formData.append('status', 'RECEIVED')
      formData.append('functionName', 'create')
      formData.append('functionCaller', user.userId)
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
          <CreatorGameHeader title="Create new game" />
          <CreateGolGrid />
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
                  <DialogWaiting
                    open={approvalDialogOpen}
                    onClose={() => {
                      setApprovalDialogOpen(false)
                      reset()
                    }}
                  />
                )}
                {error && (
                  <DialogTxnError
                    open={userCancelledDialogOpen}
                    onClose={() => {
                      setUserCancelledDialogOpen(false)
                      reset()
                    }}
                  />
                )}
                <Button
                  label="Create Game"
                  isLoading={loading}
                  onClick={() => {
                    if (library.chainId != currentStarknetChainId) {
                      setDialog('WrongNetworkDialog')
                      return
                    }

                    if (user != null) {
                      const gameState = gridToGameState(grid)
                      console.log(gameState)

                      // TODO test this
                      invoke({
                        args: [gameState],
                      })
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
