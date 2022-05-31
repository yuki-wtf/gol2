import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  updatePlaybackProgress,
  updateSelectedGeneration,
} from "../../../../features/Infinite/generations/generationsSlice";
import {
  togglePlayback,
  togglePlayPause,
} from "../../../../features/Infinite/playback/playbackSlice";
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
  const intervalId = useRef();
  const { selected_generation, latest_generation } = useSelector(
    (state) => state.generations
  );
  const { playbackMode, isPlaying, playbackSpeed } = useSelector(
    (state) => state.playback
  );

  useEffect(() => {
    const clear = () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };

    if (isPlaying) {
      intervalId.current = setInterval(() => {
        dispatch(togglePlayback(true));
        dispatch(updatePlaybackProgress());
      }, playbackSpeed && playbackSpeed);
      if (selected_generation === latest_generation) {
        clear();
        dispatch(togglePlayPause());
        dispatch(togglePlayback(false));
      }
    } else {
      clear();
    }
    return clear;
  }, [
    dispatch,
    isPlaying,
    playbackMode,
    playbackSpeed,
    selected_generation,
    latest_generation,
  ]);

  const calculateSelected = playbackMode
    ? selected_generation - 80
    : selected_generation;

  return (
    <StyledControlbar>
      <ControlButtons.ToStartBtn
        onClick={() => {
          dispatch(updateSelectedGeneration(1));
          dispatch(togglePlayback(true));
        }}
      />
      <ControlButtons.PlayPauseBtn
        isPlaying={isPlaying}
        disabled={!playbackMode}
        onClick={() => {
          console.log("clicked");
          dispatch(togglePlayPause(!isPlaying));
        }}
      />
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
        Generation # <span>{`${selected_generation}`}</span>
      </StyledGenerationLabel>
    </StyledControlbar>
  );
};

export default ControlBar;
