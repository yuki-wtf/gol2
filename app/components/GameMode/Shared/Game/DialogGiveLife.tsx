import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useGameContract } from '~/hooks/useGameContract'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useUser } from '~/hooks/useUser'
import { useDialog } from '~/hooks/Dialog'
import Button from '~/components/Button'
import Typography from '~/components/Typography'
import Loader from '~/components/Loader'
import { HiOutlineX } from 'react-icons/hi'
import Dialog from '~/components/Dialog/Dialog'
import { useContractWrite } from '@starknet-react/core'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`
const DialogContent = styled.div`
  position: absolute;
  width: 296px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 545px;
  right: -280px;
  background-color: #f3e9e1;
  z-index: 1000;
  border: 16px solid black;
  border-left: none;
  padding: 28px;
  padding-bottom: 43px;
`
const DialogSubtitle = styled(Typography.H2)`
  color: #252b38;
  margin: 0;
`
const DialogDesc = styled(Typography.BaseRegular)`
  color: #252b38;
  margin: 0;
  margin-top: 16px;
  margin-bottom: 32px;
  width: 75%;
`

const DialogGiveLife = () => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useSelectedCell()
  const [payload, setPayload] = useState<number>()
  const user = useUser()
  const { contract } = useGameContract()
  const [, setDialog] = useDialog()
  const { isCorrectNetwork } = useCheckNetwork()

  const { data, isLoading, isError, reset, write } = useContractWrite({ calls: [] })

  useEffect(() => {
    if (isLoading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (data == null) return undefined

    const formData = new FormData()

    formData.append('hash', data.transaction_hash)
    formData.append('status', 'RECEIVED')
    formData.append('functionName', 'give_life_to_cell')
    formData.append('functionCaller', user!.userId)
    formData.append('functionInputCellIndex', payload!.toString())

    void fetch('/api/transaction', {
      body: formData,
      method: 'post',
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {isLoading && (
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

      {isError && (
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
      {selectedCell != null && (
        <DialogContent>
          <DialogSubtitle>GIVE LIFE</DialogSubtitle>
          <DialogDesc>
            Select any inactive cell in the game to give to it life. Click confirm to submit your move.
          </DialogDesc>
          <ActionsContainer>
            <Button
              secondary
              onClick={() => {
                if (!isCorrectNetwork) {
                  setDialog('WrongNetworkDialog')
                  return
                }

                if (user?.balance && user.balance > 0) {
                  const payload = selectedCell.row * 15 + selectedCell.col

                  setPayload(payload)

                  // TODO test this
                  write({
                    calls: contract ? contract.populateTransaction.give_life_to_cell!(payload) : [],
                  })

                  setSelectedCell(null)
                }
              }}
              label="Confirm"
            />
            <Button
              onClick={() => {
                setSelectedCell(null)
              }}
              tertiary
              tertiaryColor="black"
              label="CANCEL"
            />
          </ActionsContainer>
        </DialogContent>
      )}
    </div>
  )
}

export default DialogGiveLife
