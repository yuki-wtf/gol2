import Dialog from '../Dialog/Dialog'
import { HiOutlineX } from 'react-icons/hi'
import Button from '../Button'

const DialogDownloadWallet = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.Title>Install a wallet</Dialog.Title>
          <Dialog.ActionContainer>
            <a
              href="https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb"
              target="_blank"
              rel="noreferrer"
            >
              <Button full label="Install Argent X" secondary />
            </a>
            <a
              href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
              target="_blank"
              rel="noreferrer"
            >
              <Button full label="Install Braavos" secondary />
            </a>
          </Dialog.ActionContainer>
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

export default DialogDownloadWallet
