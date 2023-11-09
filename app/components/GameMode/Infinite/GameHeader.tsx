import { useContractWrite } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import { useLocalStorage } from 'react-use'
import Dialog from '~/components/Dialog/Dialog'
import Highlight from '~/components/Highlight'
import Loader from '~/components/Loader'
import { INFINITE_GAME_GENESIS } from '~/env'
import { useDialog } from '~/hooks/Dialog'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useGameContract } from '~/hooks/useGameContract'
import { useUser } from '~/hooks/useUser'
import Button from '../../Button'
import TempOverlay from '../../TempOverlay'
import Header from '../Shared/Game/Header'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'

export default function GameHeader() {
  const [hasClickedEvolveInfinite, setHasClickedEvolveInfinite] = useLocalStorage('has-clicked-evolve-infinite', false)
  const [selectedCell] = useSelectedCell()
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useGameContract()
  const user = useUser()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const [, setDialog] = useDialog()

  const {
    write,
    data,
    isLoading: loading,
    error,
    reset,
  } = useContractWrite({
    calls: contract ? [contract.populateTransaction.evolve!(INFINITE_GAME_GENESIS)] : [],
  })

  const { isCorrectNetwork } = useCheckNetwork()

  useEffect(() => {
    if (hasClickedEvolveInfinite) return
    setTimeout(() => {
      setHelpMessage('evolveInfinite')
    }, 1000)
  }, [hasClickedEvolveInfinite, setHelpMessage])

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined

    if (helpMessage === 'evolveInfinite') {
      timer = setTimeout(() => {
        setHelpMessage(null)
        setHasClickedEvolveInfinite(true)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [helpMessage, setHelpMessage, setHasClickedEvolveInfinite])

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
    formData.append('functionCaller', user!.userId)
    formData.append('functionInputGameId', INFINITE_GAME_GENESIS)

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
        {selectedCell != null && <TempOverlay />}
        <Highlight
          collisonPadding={{ left: 24 }}
          onClose={() => {
            setHelpMessage(null)
            setHasClickedEvolveInfinite(true)
          }}
          active={helpMessage === 'evolveInfinite'}
          title="Evolve game & earn tokens"
          desc="1 GOL token = 1 Give Life to a cell "
        >
          <Button
            onClick={() => {
              setHasClickedEvolveInfinite(true)

              if (!isCorrectNetwork) {
                setDialog('WrongNetworkDialog')
                return
              }

              if (user != null) {
                write()
                return
              }

              setHelpMessage('connectWalletMessage')
            }}
            isLoading={loading}
            label="Evolve"
            icon={<HiOutlineLightningBolt size={24} />}
          />
        </Highlight>
      </Header>
    </>
  )
}
