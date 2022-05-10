import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Body from "../../GolGrid/Body/Body";
import Loader from "../../Loader/Loader";
import Grid from "./Grid";
import { dataToGrid } from "../../../utils/dataToGrid";

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`;
const GridWrapper = () => {
  const { latest_generation, generations, selected_generation } = useSelector(
    (state) => state.generations
  );
  return (
    <Body>
      {latest_generation !== null &&
      selected_generation !== null &&
      generations !== undefined &&
      generations[selected_generation] !== undefined ? (
        <Grid data={dataToGrid(generations[selected_generation])} />
      ) : (
        <StyledLoaderContainer
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <Loader theme="dark" centered />
        </StyledLoaderContainer>
      )}
    </Body>
  );
};

export default GridWrapper;
