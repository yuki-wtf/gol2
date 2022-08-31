import { useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogTxnError from '~/components/DialogTxnError/DialogTxnError'
import DialogWaiting from '~/components/DialogWaiting/DialogWaiting'
import { gridToGameState } from '~/helpers/gridToGameState'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import { useGameContract } from '~/hooks/useGameContract'
import { useUser } from '~/hooks/useUser'
import Button from '../../../Button/Button'

export default function CreateGame() {
  const [grid] = useCreatorGrid()
  const user = useUser()
  const { contract } = useGameContract()
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
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

  useEffect(() => {
    if (data == null) return undefined

    const gameState = gridToGameState(grid)

    const formData = new FormData()

    formData.append('hash', data)
    formData.append('status', 'RECEIVED')
    formData.append('functionName', 'create')
    formData.append('functionCaller', user.userId)
    formData.append('functionInputGameState', gameState)

    fetch('/api/transaction', {
      body: formData,
      method: 'post'
    })

    navigate('/creator')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigate])

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
            })
          }
        }}
      />
    </>
  )
}
