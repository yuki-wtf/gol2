import styled from '@emotion/styled'
import T from '../../Typography/Typography'
import GolToken from '~/components/Logos/Token/GolToken'
import { useUser } from '~/hooks/useUserId'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const StyledIconWrapper = styled.div`
  color: ${(props) => props.theme.colors.infinitePrimary};
`
const StyledTextWrapper = styled.div`
  line-height: 12px;
  @media (max-width: 750px) {
    > h4 {
      line-height: 18px;
      text-align: left;
    }
  }
`
const StyledTokenIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 8px;
  height: 27px;
  &:before {
    content: '';
    width: 1px;
    height: 36px;
    background-color: black;
    position: absolute;
    top: -5px;
    right: -16px;
  }
  color: ${(props) => props.theme.colors.creatorPrimary};
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div > h4 {
      line-height: 0px;
      padding: 0;
      margin: 0;
      text-align: left;
      margin-top: 12px;
    }
  }
`

export default function CreditsContainer() {
  const user = useUser()

  return (
    <StyledContainer>
      <StyledTokenIconWrapper>
        <StyledTextWrapper>
          <T.H4SemiBold style={{ fontSize: 20, fontWeight: 500 }}> {user?.balance ?? 0} </T.H4SemiBold>
        </StyledTextWrapper>
        <StyledIconWrapper>
          <GolToken />
        </StyledIconWrapper>
      </StyledTokenIconWrapper>
      <StyledTextWrapper>
        <T.H4SemiBold>Gol Tokens</T.H4SemiBold>
      </StyledTextWrapper>
    </StyledContainer>
  )
}
