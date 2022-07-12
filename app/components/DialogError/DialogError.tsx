import Dialog from '../Dialog/Dialog'
import { HiOutlineFire, HiOutlineX } from 'react-icons/hi'
import Button from '../Button/Button'


interface Props {
  readonly open?: boolean
  readonly onClose?: React.MouseEventHandler<HTMLButtonElement>
}

const DialogError = ({ open, onClose }: Props) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.IconWrapper>
            <Dialog.IconContainer>
              <HiOutlineFire size={40} />
            </Dialog.IconContainer>
          </Dialog.IconWrapper>
          <Dialog.Title>Sorry, it looks like something went wrong</Dialog.Title>
          <Dialog.Description>Can you please try again?</Dialog.Description>
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

export default DialogError
