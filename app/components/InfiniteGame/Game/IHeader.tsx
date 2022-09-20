import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useLocalStorage } from 'react-use'
import { StarknetChainId } from 'starknet4/dist/constants'
import Highlight from '~/components/Highlight/Highlight'
import { INFINITE_GAME_GENESIS } from '~/env'
import { useDialog } from '~/hooks/Dialog'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useGameContract } from '~/hooks/useGameContract'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useUser } from '~/hooks/useUser'
import Button from '../../Button/Button'
import DialogTxnError from '../../DialogTxnError/DialogTxnError'
import DialogWaiting from '../../DialogWaiting/DialogWaiting'
import Header from '../../GolGrid/Header/Header'
import TempOverlay from '../../TempOverlay/TempOverlay'

export const IHeader = () => {
  const [hasClickedEvolveInfinite, setHasClickedEvolveInfinite] = useLocalStorage('has-clicked-evolve-infinite', false)
  const [active, setActive] = useState(false)
  const [selectedCell] = useSelectedCell()
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useGameContract()
  const user = useUser()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const balance = user?.balance ?? 0
  const { library } = useStarknet()
  const [dialog, setDialog] = useDialog()
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.MAINNET : StarknetChainId.TESTNET

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'evolve',
  })

  useEffect(() => {
    if (hasClickedEvolveInfinite) return
    setTimeout(() => {
      setHelpMessage('evolveInfinite')
    }, 1000)
  }, [])

  useEffect(() => {
    let timer
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
    formData.append('functionCaller', user.userId)
    formData.append('functionInputGameId', INFINITE_GAME_GENESIS)

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

              if (library.chainId != currentStarknetChainId) {
                setDialog('WrongNetworkDialog')
                return
              }

              if (user != null) {
                invoke({
                  args: [INFINITE_GAME_GENESIS],
                })
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
export default IHeader
