import Dialog from '../Dialog/Dialog'
import { HiOutlineX } from 'react-icons/hi'

const DialogWallet = ({ children, open, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.Title>Connect a wallet provider to play</Dialog.Title>
          <Dialog.Description>More options coming soon!</Dialog.Description>
          <Dialog.ActionContainer>{children}</Dialog.ActionContainer>
          <Dialog.SmallCopy>
            <p
              style={{
                maxWidth: 322,
              }}
            >
              By connecting a wallet, you agree to Starknet’s Terms of Service and acknowledge that you have read and
              understand the Starknet Protocol Disclaimer.
            </p>
          </Dialog.SmallCopy>
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

export default DialogWallet
