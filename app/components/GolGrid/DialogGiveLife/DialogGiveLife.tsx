import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Button from '../../Button/Button'

import DialogWaiting from '../../DialogWaiting/DialogWaiting'
import DialogTxnError from '../../DialogTxnError/DialogTxnError'

import Typography from '../../Typography/Typography'
import { useGameContract } from '~/hooks/useGameContract'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

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
  /* gap: 24px; */
  height: 545px;
  right: -280px;
  background-color: #f3e9e1;
  z-index: 1000;
  border: 16px solid black;
  border-left: none;
  padding: 28px;
  padding-bottom: 43px;
`
const DialogTitle = styled(Typography.BaseBold)`
  color: #77777c;
  margin: 0;
`
const DialogSubtitle = styled(Typography.H2)`
  color: #252b38;
  margin: 0;
  margin-top: 8px;
`
const DialogDesc = styled(Typography.BaseRegular)`
  color: #252b38;
  margin: 0;
  margin-top: 32px;
  margin-bottom: 32px;
  width: 75%;
`

const DialogGiveLife = () => {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [userCancelledDialogOpen, setUserCancelledDialogOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useSelectedCell()
  const { balance } = useRootLoaderData()
  const { contract } = useGameContract()

  const {
    loading,
    error,
    reset,
    invoke,
  } = useStarknetInvoke({
    contract: contract,
    method: 'give_life_to_cell',
  })

  useEffect(() => {
    if (loading) {
      setApprovalDialogOpen(true)
      setUserCancelledDialogOpen(true)
    }
  }, [loading])

  console.log(selectedCell)

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
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
      {selectedCell != null && (
        <DialogContent>
          <DialogTitle>GIVE LIFE</DialogTitle>
          <DialogSubtitle>1 Credits</DialogSubtitle>
          <DialogDesc>
            You can select any cell in the game to give to it life. Click confirm to submit your move
          </DialogDesc>
          <ActionsContainer>
            <Button
              secondary
              onClick={() => {
                if (balance > 0) {
                  // TODO test this
                  invoke({
                    args: [
                      selectedCell.row * 15 + selectedCell.col
                    ],
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
