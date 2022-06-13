import React from 'react'
import styled from 'styled-components'
import Skeleton from '../../Skeleton/Skeleton'
import T from '../../Typography/Typography'
import { HiOutlineHeart } from 'react-icons/hi'
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
  gap: 4px;
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
  color: ${(props) => props.theme.colors.infinitePrimary};
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

const CreditsContainer = ({ loading, tokenCount, error }) => {
  return (
    <StyledContainer>
      <StyledTokenIconWrapper>
        <StyledTextWrapper>
          {loading && !error ? <Skeleton size={6} /> : <T.H4SemiBold> {tokenCount} </T.H4SemiBold>}
        </StyledTextWrapper>
        <StyledIconWrapper>
          <HiOutlineHeart size={24} />
        </StyledIconWrapper>
      </StyledTokenIconWrapper>
      <StyledTextWrapper>
        <T.H4SemiBold>Life Credits</T.H4SemiBold>
      </StyledTextWrapper>
    </StyledContainer>
  )
}

export default CreditsContainer
