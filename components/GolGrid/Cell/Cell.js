import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const pendingCell = css`
  background-color: ${(p) => p.theme.colors.cell.cellPendingBackground};
  pointer-events: none;
  box-shadow: inset 0 0 0 1px ${(p) => p.theme.colors.cell.cellLiveBackground};
`;
const aliveCell = css`
  background-color: ${(p) => p.theme.colors.cell.cellLiveBackground};
  pointer-events: none;
`;
const selectedCell = css`
  background-color: ${(p) => p.theme.colors.cell.cellPreLiveBackground};
  pointer-events: none;
`;
const defaultCell = css`
  background-color: ${(p) => p.theme.colors.cell.cellDefaultBackground};
  cursor: ${(p) => (!p.isSnapshot ? "pointer" : "default")};
`;

const StyledCell = styled(motion.div)`
  ${(p) => {
    switch (p.state) {
      case "pending":
        return pendingCell;
      case "alive":
        return aliveCell;
      case "selected":
        return selectedCell;
      case "dead":
        return defaultCell;
      default:
        return defaultCell;
    }
  }}

  &:hover {
    background-color: ${(p) =>
      !p.isSnapshot && p.theme.colors.cell.cellDefaultHover};
  }
`;

const StyledCell2 = styled.div`
  ${(p) => {
    switch (p.state) {
      case "pending":
        return pendingCell;
      case "alive":
        return aliveCell;
      case "selected":
        return selectedCell;
      case "dead":
        return defaultCell;
      default:
        return defaultCell;
    }
  }}

  &:hover {
    background-color: ${(p) =>
      !p.isSnapshot && p.theme.colors.cell.cellDefaultHover};
  }
`;

const Cell = ({ state = "default", onClick, isSnapshot }) => {
  const { playbackMode } = useSelector((state) => state.playback);
  if (isSnapshot || playbackMode) {
    return <StyledCell2 isSnapshot state={state} onClick={onClick} />;
  }
  return (
    <StyledCell
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
      state={state}
      onClick={onClick}
    />
  );
};

export default Cell;
