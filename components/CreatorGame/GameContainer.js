import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import GridWrapper from "./GridWrapper";

import CHeader from "./CHeader";
import CFooter from "./CFooter";

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`;

const GameContainer = ({ gameId, generationNumber }) => {
  return (
    <StyledGridContainer>
      <CHeader gameId={gameId} />
      <GridWrapper />
      <CFooter gameId={gameId} />
    </StyledGridContainer>
  );
};

export default GameContainer;
