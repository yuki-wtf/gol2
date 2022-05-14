import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dataToGrid } from "../../utils/dataToGrid";
import Body from "../GolGrid/Body/Body";
import Loader from "../Loader/Loader";
import GetGame from "./Game/Wrapped/GetGame";
import Grid from "./Grid";

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`;
const GridWrapper = ({ gameId, generationNumber }) => {
  const { gameStates } = useSelector((state) => state.creatorGames);
  const router = useRouter();
  const data = router.query;
  console.log(gameStates);
  useEffect(() => {
    if (!gameStates) {
      console.log("rr");
    }
  }, [gameStates]);

  return (
    <Body>
      {data && data.game_index ? (
        <Grid data={dataToGrid(gameStates[data.game_index].data)} />
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
