import * as DialogPrimitve from '@radix-ui/react-dialog'
import styled from '@emotion/styled'
const Root = styled(DialogPrimitve.Root)``
const Portal = styled(DialogPrimitve.Portal)``
const Overlay = styled(DialogPrimitve.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100000;
`
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 104px;
  background-color: #f06b97;
  border-radius: 50%;
`
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const SmallCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  /* or 18px */

  color: #94887f;
`
const Content = styled(DialogPrimitve.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f3e9e1;
  box-shadow: 0px 4px 20px #000000;
  border-radius: 8px;
  min-width: 370px;
  padding: 24px;
  padding-top: 60px;
  min-height: 225px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  z-index: 100000;
`
const Title = styled(DialogPrimitve.Title)<{ centered?: boolean }>`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 26px;
  color: #0a0c10;
  padding: 0;
  margin: 0;
  text-align: ${(p) => (p.centered ? 'center' : 'left')};
`
const Description = styled(DialogPrimitve.Description)<{ centered?: boolean }>`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #2d3038;
  padding: 0;
  margin: 0;
  margin-top: -24px;
  text-align: ${(p) => (p.centered ? 'center' : 'left')};
`
const Close = styled(DialogPrimitve.Close)`
  position: absolute;
  right: 8px;
  top: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`
const Dialog = {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
  IconWrapper,
  IconContainer,
  ActionContainer,
  SmallCopy,
}
export default Dialog
