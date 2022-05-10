import React from "react";
import styled from "styled-components";
import ContainerInner from "../Layout/ContainerInner";
import Typography from "../Typography/Typography";
import StarknetLogoLink from "./Links/StarknetLogo";

const StyledFooter = styled.footer`
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.headerBackground};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.headerGradientStart} 1.01%,
    ${(props) => props.theme.colors.headerGradientEnd} 96.42%
  );
  border-top: 1px solid ${(props) => props.theme.colors.headerBorder};
`;
const StyledFooterInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
`;
const StyledStarkware = styled.div`
  display: flex;
  flex: 1;
`;
const StyledYuki = styled.div`
  display: flex;
  margin-left: auto;
  color: ${(props) => props.theme.colors.text200};
  & a {
    color: white;
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterInner>
        <StyledStarkware>
          <StarknetLogoLink />
        </StyledStarkware>
        <StyledYuki>
          <Typography.XL1Extrabold>
            Design &amp; frontend by <a href="https://yuki.wtf">Yuki</a>
          </Typography.XL1Extrabold>
        </StyledYuki>
      </StyledFooterInner>
    </StyledFooter>
  );
};

export default Footer;
