import Dialog from '../Dialog/Dialog'
import { HiOutlineX } from 'react-icons/hi'
import Button from '../Button'

const DialogTxnError = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.IconWrapper>
            <Dialog.IconContainer>
              <HiOutlineX size={40} />
            </Dialog.IconContainer>
          </Dialog.IconWrapper>
          <Dialog.Title centered>Transaction rejected </Dialog.Title>
          {/* <Dialog.Description centered>
           Confirm this transaction in your wallet
          </Dialog.Description> */}
          <Dialog.ActionContainer>
            <Button onClick={onClose} full label="ok" secondary />
          </Dialog.ActionContainer>
          <Dialog.Close asChild>
            <button onClick={onClose}>
              <HiOutlineX size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  )
}

export default DialogTxnError
