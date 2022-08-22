import * as ToastPrimitive from '@radix-ui/react-toast'
import styled from '@emotion/styled'
export const Provider = ToastPrimitive.Provider
export const Root = styled(ToastPrimitive.Root)`
  display: flex;
  width: 300px;
  height: 100px;
  z-index: 100000;
  background-color: white;
  position: absolute;
  bottom: 60px;
  right: 50px;
`
export const Title = styled(ToastPrimitive.Title)``
export const Description = ToastPrimitive.Description
export const Action = ToastPrimitive.Action
export const Close = ToastPrimitive.Close
export const Viewport = ToastPrimitive.Viewport
const Toast = {
  Provider,
  Root,
  Title,
  Description,
  Action,
  Close,
  Viewport,
}
export default Toast
