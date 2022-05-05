import React from "react";
import styled from "styled-components";
import ControlBar from "./ControlBar/ControlBar";

const StyledFooter = styled.footer`
  background-color: ${(props) =>
    props.empty ? "#1D222D" : props.theme.colors.neutral100};
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  height: 68px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`;

const Footer = ({ empty }) => {
  return <StyledFooter empty={empty}>{!empty && <ControlBar />}</StyledFooter>;
};

export default Footer;
