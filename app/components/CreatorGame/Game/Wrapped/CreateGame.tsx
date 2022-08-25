import { useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogTxnError from '~/components/DialogTxnError/DialogTxnError'
import DialogWaiting from '~/components/DialogWaiting/DialogWaiting'
import { gridToGameState } from '~/helpers/gridToGameState'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import { useGameContract } from '~/hooks/useGameContract'
import { useUser } from '~/hooks/useUserId'
import Button from '../../../Button/Button'

export default function CreateGame() {
  const [grid] = useCreatorGrid()
  const user = useUser()
  const { contract } = useGameContract()
  const { loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'create',
  })

  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])

  const navigate = useNavigate()

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
      <Button
        label="Create Game"
        isLoading={loading}
        onClick={() => {
          if (user != null) {
            const gameState = gridToGameState(grid)
            console.log(gameState)

            // TODO test this
            invoke({
              args: [gameState],
            }).then((tx) => {
              if (tx != null) {
                navigate('/creator')
              }
            })
          }
        }}
      />
    </>
  )
}
