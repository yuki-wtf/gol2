import React from "react";
import styled from "styled-components";
import AboutLogo from "../../Logos/Header/AboutLogo";
import CreatorLogo from "../../Logos/Header/CreatorLogo";
import DefaultLogo from "../../Logos/Header/DefaultLogo";
import HowitworksLogo from "../../Logos/Header/HowitworksLogo";
import InfiniteLogo from "../../Logos/Header/InfiniteLogo";
import SnapshotsLogo from "../../Logos/Header/SnapshotsLogo";

const LogoWrapper = styled.div`
  position: relative;
  top: 3px;
`;
const HeaderLogo = ({ page }) => {
  const renderHeaderLogo = () => {
    switch (page) {
      case "/infinite":
        return <InfiniteLogo />;
      case "/creator":
        return <CreatorLogo />;
      case "/snapshots":
        return <SnapshotsLogo />;
      case "/howitworks":
        return <HowitworksLogo />;
      case "/about":
        return <AboutLogo />;
      case "/nav":
        return <DefaultLogo />;

      default:
        return <DefaultLogo />;
    }
  };
  return <LogoWrapper>{renderHeaderLogo()}</LogoWrapper>;
};

export default HeaderLogo;
