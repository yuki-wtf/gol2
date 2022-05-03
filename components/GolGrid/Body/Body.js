import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  margin: 16px;
  background-color: ${(props) => props.theme.colors.neutral300};
  height: 512px;
`;

const Body = () => {
  return <StyledBody>Body</StyledBody>;
};

export default Body;
