import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React, { useEffect, useState } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useCreatorGameContract } from '../../hooks/useCreatorGameContract'
import Button from '../Button/Button'
import DialogTxnError from '../DialogTxnError/DialogTxnError'
import DialogWaiting from '../DialogWaiting/DialogWaiting'
import Header from '../GolGrid/Header/Header'
export const IHeader = ({ gameId }) => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const { contract } = useCreatorGameContract()
  const { account } = useStarknet()
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'contribute',
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
            if (account) {
              console.log('clicked')
              invoke({
                args: [gameId.toString()],
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
