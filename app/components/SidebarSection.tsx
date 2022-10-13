import styled from '@emotion/styled'
import T from './Typography'

const StyledSidebarSection = styled.div<{ type?: string }>`
  display: flex;
  max-width: 300px;

  flex-direction: column;
  border-bottom: ${(props) => (props.type === 'statistics' ? '2px solid transparent' : '2px solid black')};
`
const StyledHeading = styled(T.H4Bold)<{ type?: string }>`
  padding-bottom: 16px;
  border-bottom: ${(props) => (props.type === 'statistics' ? '2px solid transparent' : '2px solid black')};
  margin-bottom: 8px;
`

interface Props {
  readonly children: React.ReactNode
  readonly title: string
  readonly type?: string
}

const SidebarSection = ({ children, title, type = 'statistics' }: Props) => {
  return (
    <StyledSidebarSection type={type}>
      <StyledHeading type={type}>{title}</StyledHeading>
      {children}
    </StyledSidebarSection>
  )
}

export default SidebarSection
