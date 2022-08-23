import { useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useGameContract } from '~/hooks/useGameContract'
import { useUser } from '~/hooks/useUserId'
import Button from '../Button/Button'
import DialogTxnError from '../DialogTxnError/DialogTxnError'
import DialogWaiting from '../DialogWaiting/DialogWaiting'
import Header from '../GolGrid/Header/Header'

export const IHeader = ({ gameId }) => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useGameContract()
  const user = useUser()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'evolve',
  })

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])
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
        <Button
          onClick={() => {
            if (user != null) {
              // TODO test this
              invoke({
                args: [gameId],
              })
            }
          }}
          isLoading={loading}
          label="Evolve"
          icon={<HiOutlineLightningBolt size={24} />}
        />
      </Header>
    </>
  )
}
export default IHeader
