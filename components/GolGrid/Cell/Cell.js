import React from "react";
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
  cursor: pointer;
`;

const StyledCell = styled.div`
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
    background-color: ${(p) => p.theme.colors.cell.cellDefaultHover};
  }
`;

const Cell = ({ state = "default", onClick }) => {
  return <StyledCell state={state} onClick={onClick} />;
};

export default Cell;
