import * as DialogPrimitive from '@radix-ui/react-dialog'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  background-color: rgba(29, 34, 44, 0.94);
  position: fixed;
  inset: 0;
  z-index: 9;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`

const StyledContent = styled(DialogPrimitive.Content)`
  background-color: transparent;
  border-radius: 6;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  padding: 25;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &:focus {
    outline: 'none';
  }
`

const StyledClose = styled(DialogPrimitive.Close)`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  )
}

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogClose = StyledClose
