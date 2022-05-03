import React from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";
import styled from "styled-components";
import { dataToGrid } from "../../utils/dataToGrid";
import Button from "../Button/Button";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const StyledGridContainer = styled.div`
  background-color: #000000;
  overflow: hidden;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`;

const GolGrid = () => {
  return (
    <StyledGridContainer>
      <Header>
        <Button label="Evolve" icon={<HiOutlineLightningBolt size={24} />} />
      </Header>
      <Body />
      <Footer />
    </StyledGridContainer>
  );
};

export default GolGrid;
