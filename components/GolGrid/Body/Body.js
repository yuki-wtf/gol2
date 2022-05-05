import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cell from "../Cell/Cell";
import Grid from "../Grid/Grid";
import { data as mockdata } from "../../../data/data";
import { dataToGrid } from "../../../utils/dataToGrid";
import Loader from "../../Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
const StyledContainer = styled.div`
  margin: 16px;
  background-color: ${(props) => props.theme.colors.neutral300};
  height: 512px;
`;

const Body = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setData(mockdata);
    }, 3000);
  }, []);

  return (
    <StyledContainer>
      {data && data.length ? (
        <Grid data={data && dataToGrid(data[0])} />
      ) : (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ width: 512, height: 512, backgroundColor: "black" }}
        >
          <Loader theme="dark" centered />
        </div>
      )}
    </StyledContainer>
  );
};

export default Body;
