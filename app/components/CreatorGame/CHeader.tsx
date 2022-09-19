import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useLocalStorage } from 'react-use'
import { useGameOver } from '~/hooks/GameOver'
import { StarknetChainId } from 'starknet4/dist/constants'
import { useDialog } from '~/hooks/Dialog'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useGameContract } from '~/hooks/useGameContract'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useUser } from '~/hooks/useUser'
import Button from '../Button/Button'
import DialogTxnError from '../DialogTxnError/DialogTxnError'
import DialogWaiting from '../DialogWaiting/DialogWaiting'
import Header from '../GolGrid/Header/Header'
import Highlight from '../Highlight/Highlight'

export const IHeader = ({ gameId }) => {
  const [hasClickedEvolveCreator, setHasClickedEvolveCreator] = useLocalStorage('has-clicked-evolve-creator', false)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useGameContract()
  const user = useUser()
  const { library } = useStarknet()
  const [dialog, setDialog] = useDialog()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const [GameOverMessage, setGameOverMessage] = useGameOver()
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.MAINNET : StarknetChainId.TESTNET

  // const balance = user?.balance ?? 0

  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'evolve',
  })

  useEffect(() => {
    console.log('game over', GameOverMessage)

    if (hasClickedEvolveCreator) return

    setTimeout(() => {
      if (GameOverMessage === null || GameOverMessage === true) {
        setHelpMessage(null)
        return
      }
      setHelpMessage('evolveCreator')
    }, 1000)
  }, [setHelpMessage, hasClickedEvolveCreator, GameOverMessage])

  useEffect(() => {
    let timer
    if (helpMessage === 'evolveCreator') {
      timer = setTimeout(() => {
        setHelpMessage(null)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [helpMessage, setHelpMessage])

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])

  useEffect(() => {
    if (data == null) return undefined

    const formData = new FormData()

    formData.append('hash', data)
    formData.append('status', 'RECEIVED')
    formData.append('functionName', 'evolve')
    formData.append('functionCaller', user.userId)
    formData.append('functionInputGameId', gameId)

    fetch('/api/transaction', {
      body: formData,
      method: 'post',
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
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
      <Header>
        <Highlight
          collisonPadding={{ left: 24 }}
          onClose={() => setHelpMessage(null)}
          active={helpMessage === 'evolveCreator'}
          title="Evolve game & earn tokens"
          desc="10 GOL tokens = 1 new game"
        >
          <Button
            onClick={() => {
              setHasClickedEvolveCreator(true)

              if (library.chainId != currentStarknetChainId) {
                setDialog('WrongNetworkDialog')
                return
              }

              if (user != null) {
                // TODO test this
                invoke({
                  args: [gameId],
                })
                return
              }
              setHelpMessage('connectWalletMessage')
            }}
            isLoading={loading}
            label="Evolve"
            icon={<HiOutlineLightningBolt size={24} />}
            disabled={GameOverMessage}
          />
        </Highlight>
      </Header>
    </>
  )
}
export default IHeader
