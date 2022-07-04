import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useInfiniteGameContract } from '../../../hooks/useInfiniteGameContract'
import Button from '../../Button/Button'
import DialogTxnError from '../../DialogTxnError/DialogTxnError'
import DialogWaiting from '../../DialogWaiting/DialogWaiting'
import Header from '../../GolGrid/Header/Header'
import { useSelector } from 'react-redux'
import TempOverlay from '../../TempOverlay/TempOverlay'

export const IHeader = () => {
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useInfiniteGameContract()
  const { account } = useStarknet()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'evolve_and_claim_next_generation',
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
        {selectedCellRow !== null && <TempOverlay />}
        <Button
          onClick={() => {
            if (account) {
              // console.log('clicked')
              invoke({
                args: [account.toString()],
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
