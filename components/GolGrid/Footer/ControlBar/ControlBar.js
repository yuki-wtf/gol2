import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateSelectedGeneration } from "../../../../features/Infinite/generations/generationsSlice";
import { togglePlayback } from "../../../../features/Infinite/playback/playbackSlice";
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
  const dispatch = useDispatch();
  const { selected_generation, latest_generation } = useSelector(
    (state) => state.generations
  );
  const { playbackMode } = useSelector((state) => state.playback);
  return (
    <StyledControlbar>
      <ControlButtons.ToStartBtn
        onClick={() => {
          dispatch(updateSelectedGeneration(1));
          dispatch(togglePlayback(true));
        }}
      />
      <ControlButtons.PlayPauseBtn disabled={!playbackMode} />
      <ControlButtons.StepForwardBtn
        disabled={!playbackMode}
        onClick={() => {
          dispatch(updateSelectedGeneration(selected_generation + 1));
        }}
      />
      <ControlButtons.ToEndBtn
        disabled={!playbackMode}
        onClick={() => {
          dispatch(updateSelectedGeneration(latest_generation));
          dispatch(togglePlayback(false));
        }}
      />
      <SpeedDropdownMenu disabled={!playbackMode} />

      <StyledGenerationLabel>
        Generation #{" "}
        <span>{`${selected_generation ? selected_generation : ""}`}</span>
      </StyledGenerationLabel>
    </StyledControlbar>
  );
};

export default ControlBar;
