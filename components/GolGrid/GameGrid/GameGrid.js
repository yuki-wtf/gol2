import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const StyledGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-template-rows: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-gap: 0;
  gap: 0;
  background: url("/assets/grid/grid-body.svg");
  background-size: ${(p) => (p.small ? "244px" : "512px")};
  border: 0;
  height: ${(p) => (p.small ? "244px" : "512px")};
  width: ${(p) => (p.small ? "244px" : "512px")};
  position: relative;
  overflow: ${(p) => (p.small ? "hidden" : "visible")};
`;

const StyledGridNoMotion = styled.div`
  display: grid;
  grid-template-columns: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-template-rows: ${(p) =>
    p.small ? "repeat(32, 8px)" : "repeat(32, 16px)"};
  grid-gap: 0;
  gap: 0;
  background: url("/assets/grid/grid-body.svg");
  background-size: ${(p) => (p.small ? "244px" : "512px")};
  border: 0;
  height: ${(p) => (p.small ? "244px" : "512px")};
  width: ${(p) => (p.small ? "244px" : "512px")};
  position: relative;
  overflow: ${(p) => (p.small ? "hidden" : "visible")};
`;
const StyledGridCreatorNoMotion = styled.div`
  display: grid;
  grid-template-columns: ${(p) =>
    p.small ? "repeat(32, 6.625px)" : "repeat(32, 6.625px)"};
  grid-template-rows: ${(p) =>
    p.small ? "repeat(32, 6.625px)" : "repeat(32, 6.625px)"};
  grid-gap: 0;
  gap: 0;
  background: url("/assets/grid/grid-body.svg");
  background-size: ${(p) => (p.small ? "212px" : "512px")};
  border: 0;
  height: ${(p) => (p.small ? "212px" : "512px")};
  width: ${(p) => (p.small ? "212px" : "512px")};
  position: relative;
  overflow: ${(p) => (p.small ? "hidden" : "visible")};
`;

const GameGrid = ({ children, small, isSnapshot, isSnapshotCreator }) => {
  if (isSnapshot)
    return <StyledGridNoMotion small={small}>{children}</StyledGridNoMotion>;
  if (isSnapshotCreator) {
    return (
      <StyledGridCreatorNoMotion small={small}>
        {children}
      </StyledGridCreatorNoMotion>
    );
  }
  return (
    <StyledGrid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      {children}
    </StyledGrid>
  );
};

export default GameGrid;
