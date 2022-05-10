import React, { useMemo } from "react";
import Statistics from "./Statistics";
import styled from "styled-components";
import Gameplay from "./Gameplay";
import TempOverlay from "../../TempOverlay/TempOverlay";
import { useSelector } from "react-redux";
const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  min-width: 274px;
  gap: 24px;
  position: relative;
`;
const Sidebar = () => {
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid);
  return (
    <StyledSidebar>
      {selectedCellRow !== null && <TempOverlay />}
      <Statistics title="Statistics" />
      <Gameplay type="gameplay" title="On-chain Play" />
    </StyledSidebar>
  );
};

export default Sidebar;
