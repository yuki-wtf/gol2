import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useGameContract } from '~/hooks/useGameContract'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useUser } from '~/hooks/useUser'
import { useDialog } from '~/hooks/Dialog'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { StarknetChainId } from 'starknet4/dist/constants'
import Button from '~/components/Button'
import Typography from '~/components/Typography'
import Loader from '~/components/Loader'
import { HiOutlineX } from 'react-icons/hi'
import Dialog from '~/components/Dialog/Dialog'

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
  const { library } = useStarknet()
  const [, setDialog] = useDialog()
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.MAINNET : StarknetChainId.TESTNET

  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract: contract,
    method: 'give_life_to_cell',
  })

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
    formData.append('functionName', 'give_life_to_cell')
    formData.append('functionCaller', user!.userId)
    formData.append('functionInputCellIndex', payload!.toString())

    fetch('/api/transaction', {
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
                if (library.chainId != currentStarknetChainId) {
                  setDialog('WrongNetworkDialog')
                  return
                }

                if (user != null && user!.balance && user!.balance > 0) {
                  const payload = selectedCell.row * 15 + selectedCell.col

                  setPayload(payload)

                  // TODO test this
                  invoke({
                    args: [payload],
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
