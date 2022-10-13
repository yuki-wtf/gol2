import Dialog from '../Dialog/Dialog'
import { HiOutlineX } from 'react-icons/hi'
import Button from '../Button'

const DialogSwitchWallet = ({ open, onClose, currentNetwork, wrongNetwork }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.IconWrapper>
            <Dialog.IconContainer>
              <HiOutlineX size={40} />
            </Dialog.IconContainer>
          </Dialog.IconWrapper>
          <Dialog.Title>Wrong Network selected</Dialog.Title>
          <Dialog.Description>
            You are using GoL2 on {currentNetwork}. Please switch your <br />
            wallet network from {wrongNetwork} to {currentNetwork}.<br /> <br /> Try refreshing the app if network used
            <br /> is not correctly detected by Gol2.
          </Dialog.Description>
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

export default DialogSwitchWallet
