import React from "react";
import styled from "styled-components";
import Skeleton from "../../Skeleton/Skeleton";
import T from "../../Typography/Typography";
import { HiOutlineHeart, HiOutlineLightningBolt, HiPlus } from "react-icons/hi";
import Button from "../../Button/Button";
import { useRouter } from "next/router";
const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;
const StyledIconWrapper = styled.div`
  color: ${(props) => props.theme.colors.creatorPrimary};
`;
const StyledButtonWrapper = styled.div`
  margin-left: 16px;
`;
const StyledTextWrapper = styled.div`
  > h4 {
    line-height: 18px;
  }
  @media (max-width: 750px) {
    > h4 {
      line-height: 18px;
      text-align: left;
    }
  }
`;

const StyledTokenIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.colors.creatorPrimary};
  position: relative;
  gap: 4px;
  height: 27px;
  &:before {
    content: "";
    width: 1px;
    height: 36px;
    background-color: black;
    position: absolute;
    top: -5px;
    right: -16px;
  }
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
`;

const CreatorCredits = ({ loading, tokenCount, error }) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledTokenIconWrapper>
        <StyledTextWrapper>
          {loading && !error ? (
            <Skeleton size={12} />
          ) : (
            <T.H4SemiBold color="inherit"> 1 </T.H4SemiBold>
          )}
        </StyledTextWrapper>
        <StyledIconWrapper>
          <HiOutlineLightningBolt size={24} />
        </StyledIconWrapper>
      </StyledTokenIconWrapper>
      <StyledTextWrapper>
        <T.H4SemiBold>Creator Credits</T.H4SemiBold>
      </StyledTextWrapper>
      <StyledButtonWrapper>
        <Button
          onClick={() => router.push("/creator/create")}
          icon={<HiPlus size={24} />}
          label="new game"
          secondary
        />
      </StyledButtonWrapper>
    </StyledContainer>
  );
};

export default CreatorCredits;
