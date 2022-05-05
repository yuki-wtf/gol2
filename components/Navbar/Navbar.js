import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import ContainerInner from "../Layout/ContainerInner";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import Credits from "./Credits/Credits";
import CreatorCredits from "./CreatorCredits/CreatorCredits";
import HeaderLogo from "./Logo/Logo";
import MenuButton from "./MenuButton/MenuButton";

const StyledNavbar = styled.header`
  height: 120px;
  background-color: ${(props) => props.theme.colors.headerBackground};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.headerGradientStart} 1.01%,
    ${(props) => props.theme.colors.headerGradientEnd} 96.42%
  );
  border-bottom: 1px solid ${(props) => props.theme.colors.headerBorder};
`;
const StyledNavbarInner = styled.header`
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 32px;
  gap: 40px;
  @media (max-width: 790px) {
    gap: 25px;
  }
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <StyledNavbar>
      <StyledNavbarInner>
        <MenuButton onClick={() => console.log("test")} />

        <HeaderLogo page={router.pathname} />
        {router.pathname === "/infinite" ? <Credits /> : null}
        {router.pathname === "/creator" ||
        router.pathname === "/creator/create" ||
        router.pathname === "/creator/[cid]" ? (
          <CreatorCredits />
        ) : null}

        <ConnectWallet />
      </StyledNavbarInner>
    </StyledNavbar>
  );
};

export default Navbar;
