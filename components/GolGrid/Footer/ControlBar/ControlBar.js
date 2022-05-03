import React from "react";
import styled from "styled-components";
import ControlButtons from "./ControlButtons";
import SpeedDropdownMenu from "./SpeedControl";
const StyledControlbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  width: 100%;
  gap: 15px;
`;
const StyledGenerationLabel = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  color: #f3e9e1;
  margin-right: 26px;
  font-family: "Mulish";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  & span {
    font-size: 14px;
  }
`;
const ControlBar = () => {
  return (
    <StyledControlbar>
      <ControlButtons.ToStartBtn />
      <ControlButtons.PlayPauseBtn />
      <ControlButtons.StepForwardBtn />
      <ControlButtons.ToEndBtn />
      <SpeedDropdownMenu />

      <StyledGenerationLabel>
        Generation # <span>6</span>
      </StyledGenerationLabel>
    </StyledControlbar>
  );
};

export default ControlBar;
