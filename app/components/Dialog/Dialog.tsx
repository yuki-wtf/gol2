import { HiOutlineX } from 'react-icons/hi'
import Button from '../Button'
import StyledDialog from './StyledDialog'

interface Props {
  readonly open?: boolean
  readonly onClose?: React.MouseEventHandler<HTMLButtonElement>
  readonly title: string
  readonly description?: React.ReactNode
  readonly smallDescription?: React.ReactNode
  readonly contentActions?: React.ReactNode
  readonly footerActions?: React.ReactNode
  readonly hasConfirmButton?: boolean
  readonly icon?: React.ReactNode
  readonly animation?: React.ReactNode
  readonly textCentered?: boolean
}

const Dialog = ({
  animation,
  icon,
  open,
  onClose,
  title,
  description,
  smallDescription,
  hasConfirmButton,
  textCentered,
  contentActions,
  footerActions,
}: Props) => {
  return (
    <StyledDialog.Root open={open}>
      <StyledDialog.Overlay>
        <StyledDialog.Content>
          {animation && <StyledDialog.IconWrapper>{animation}</StyledDialog.IconWrapper>}
          {icon && (
            <StyledDialog.IconWrapper>
              <StyledDialog.IconContainer>{icon}</StyledDialog.IconContainer>
            </StyledDialog.IconWrapper>
          )}
          <StyledDialog.Title centered={textCentered}>{title}</StyledDialog.Title>
          {description && <StyledDialog.Description centered={textCentered}>{description}</StyledDialog.Description>}
          {contentActions && <StyledDialog.ActionContainer>{contentActions}</StyledDialog.ActionContainer>}
          {hasConfirmButton && (
            <StyledDialog.ActionContainer>
              <Button onClick={onClose} full label="ok" secondary />
            </StyledDialog.ActionContainer>
          )}

          {smallDescription && <StyledDialog.SmallCopy>{smallDescription}</StyledDialog.SmallCopy>}
          {footerActions && <StyledDialog.ActionContainer>{footerActions}</StyledDialog.ActionContainer>}

          <StyledDialog.Close asChild>
            <button onClick={onClose}>
              <HiOutlineX size={24} />
            </button>
          </StyledDialog.Close>
        </StyledDialog.Content>
      </StyledDialog.Overlay>
    </StyledDialog.Root>
  )
}

export default Dialog
