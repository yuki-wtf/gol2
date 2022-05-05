import { HiOutlineLightBulb } from "react-icons/hi";
import styled from "styled-components";
import Typography from "../Typography/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  position: relative;
  min-height: 52px;
  margin-top: 56px;
  padding-left: 24px;
  width: 70%;
  margin-bottom: 56px;
  align-items: center;
  &:before {
    content: "";
    z-index: 2;
    position: absolute;
    min-height: 52px;
    height: 100%;
    left: 0;
    top: 0;
    width: 2px;
    background-color: #0a0c10;
    border-radius: 2px;
  }
`;
const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-self: flex-start;
`;
const TextWrapper = styled.div`
  display: flex;
  flex: 1;
`;
const StyledText = styled(Typography.BaseRegular)`
  margin: 0;
`;
const Icon = ({ color }) => {
  return (
    <IconWrapper>
      <HiOutlineLightBulb size={48} color={color} />
    </IconWrapper>
  );
};
const Text = ({ children }) => {
  return (
    <TextWrapper>
      <StyledText>{children}</StyledText>
    </TextWrapper>
  );
};
const PageIntro = {
  Container,
  Icon,
  TextWrapper,
  Text,
};
export default PageIntro;
