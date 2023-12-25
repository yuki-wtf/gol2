import { useContractWrite } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import { useLocalStorage } from 'react-use'

import Button from '~/components/Button'
import Dialog from '~/components/Dialog/Dialog'
import Highlight from '~/components/Highlight'
import Loader from '~/components/Loader'
import { useDialog } from '~/hooks/Dialog'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useGameContract } from '~/hooks/useGameContract'
import { useUser } from '~/hooks/useUser'
import Header from '../Shared/Game/Header'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'
interface Props {
  readonly isGameOver: boolean
  readonly gameId: string
}

export default function GameHeader({ gameId, isGameOver }: Props) {
  const [hasClickedEvolveCreator, setHasClickedEvolveCreator] = useLocalStorage('has-clicked-evolve-creator', false)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useGameContract()
  const user = useUser()
  const [, setDialog] = useDialog()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const { isCorrectNetwork } = useCheckNetwork()

  const {
    write,
    data,
    isLoading: loading,
    isError: error,
    reset,
  } = useContractWrite({
    calls: contract ? [contract.populateTransaction.evolve!(gameId)] : [],
  })

  useEffect(() => {
    if (hasClickedEvolveCreator) return

    setTimeout(() => {
      setHelpMessage('evolveCreator')
    }, 1000)
  }, [setHelpMessage, hasClickedEvolveCreator])

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined

    if (helpMessage === 'evolveCreator' && !isGameOver) {
      timer = setTimeout(() => {
        setHelpMessage(null)
        setHasClickedEvolveCreator(true)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [helpMessage, setHelpMessage, setHasClickedEvolveCreator, isGameOver])

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])

  useEffect(() => {
    if (data == null) return undefined

    const formData = new FormData()

    formData.append('hash', data.transaction_hash)
    formData.append('status', 'RECEIVED')
    formData.append('functionName', 'evolve')
    formData.append('functionCaller', user!.userId)
    formData.append('functionInputGameId', gameId)

    void fetch('/api/transaction', {
      body: formData,
      method: 'post',
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
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
      <Header>
        <Highlight
          collisonPadding={{ left: 24 }}
          onClose={() => {
            setHelpMessage(null)
            setHasClickedEvolveCreator(true)
          }}
          active={helpMessage === 'evolveCreator' && !isGameOver}
          title="Evolve game & earn tokens"
          desc="10 GOL tokens = 1 new game"
        >
          <Button
            onClick={() => {
              setHasClickedEvolveCreator(true)

              if (!isCorrectNetwork) {
                setDialog('WrongNetworkDialog')
                return
              }

              if (user != null) {
                // TODO test this
                write()
                return
              }
              setHelpMessage('connectWalletMessage')
            }}
            isLoading={loading}
            label="Evolve"
            icon={<HiOutlineLightningBolt size={24} />}
            disabled={isGameOver}
          />
        </Highlight>
      </Header>
    </>
  )
}
