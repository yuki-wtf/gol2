import React from "react";
import styled from "styled-components";
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-template-rows: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-gap: 0;
  gap: 0;
  background: url("/assets/grid/grid-body.png");
  background-size: ${(p) => (p.small ? "244px" : "512px")};
  border: 0;
  height: ${(p) => (p.small ? "244px" : "512px")};
  width: ${(p) => (p.small ? "244px" : "512px")};
  position: relative;
`;

const GameGrid = ({ children, small }) => {
  return <StyledGrid small={small}>{children}</StyledGrid>;
};

export default GameGrid;
