import styled from '@emotion/styled'

interface Props {
  readonly maxWidth?: number
  readonly paddingBottom?: number
  readonly paddingTop?: number
}

const ContainerInner = styled.div<Props>`
  max-width: ${(p) => (p.maxWidth ? `${p.maxWidth}px` : '916px')};
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  padding-bottom: ${(p) => (p.paddingBottom ? `${p.paddingBottom}px` : '24px')};
  padding-top: ${(p) => (p.paddingTop ? `${p.paddingTop}px` : '24px')};
`
export default ContainerInner
