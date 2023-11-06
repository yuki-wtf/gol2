import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import { useLocalStorage } from 'react-use'
import { constants } from 'starknet';

import Button from '~/components/Button'
import Dialog from '~/components/Dialog/Dialog'
import Highlight from '~/components/Highlight'
import Loader from '~/components/Loader'
import { useDialog } from '~/hooks/Dialog'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useGameContract } from '~/hooks/useGameContract'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useUser } from '~/hooks/useUser'
import Header from '../Shared/Game/Header'
import { getLibraryChainId } from '~/helpers/getLibraryChainId'
const StarknetChainId = constants.StarknetChainId;
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
  const { library } = useStarknet()
  const [, setDialog] = useDialog()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.SN_MAIN : StarknetChainId.SN_GOERLI

  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'evolve',
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

    formData.append('hash', data)
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

              if (getLibraryChainId(library) != currentStarknetChainId) {
                setDialog('WrongNetworkDialog')
                return
              }

              if (user != null) {
                // TODO test this
                void invoke({
                  args: [gameId],
                })
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
