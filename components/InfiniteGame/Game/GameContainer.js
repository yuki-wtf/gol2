import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import IHeader from "./IHeader";
import { useSelector } from "react-redux";

import DialogGiveLife from "../../GolGrid/DialogGiveLife/DialogGiveLife";
import IFooter from "./IFooter";
import GridWrapper from "./GridWrapper";
import GetLatestGame from "./Wrapped/GetLatestGame";
import GetPreviousGames from "./Wrapped/GetPreviousGames";
import GetPreviousGamesLarge from "./Wrapped/GetPreviousGamesLarge";

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`;

const GameContainer = () => {
  const [missingGens, setMissingGens] = useState([]);
  const [callIncrement, setCallIncrement] = useState(0);
  const [lUS, setLUS] = useState(true);
  const [missingGensIncrements, setMissingGensIncrements] = useState([]);
  const { latest_generation, generations } = useSelector(
    (state) => state.generations
  );

  useEffect(() => {
    setTimeout(() => {
      setLUS(false);
    }, 10000);
  }, []);

  useEffect(() => {
    let fakeArray = [];
    // console.log(missingGens);
    if (latest_generation) {
      Array.from(Array(latest_generation)).forEach((x, i) => {
        if (i in generations || missingGens.includes(i)) {
          return;
        } else {
          fakeArray.push(i);
          setMissingGens((prevArray) => [...fakeArray]);
        }
      });
    }
  }, [latest_generation, generations, missingGens]);

  useEffect(() => {
    if (missingGens.length) {
      const perChunk = 30;
      const callNum = Math.round(latest_generation / perChunk);

      let result = missingGens.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
      console.log("result", result);
      setMissingGensIncrements(result);

      const intervalId = setInterval(() => {
        setCallIncrement(callIncrement + 1);
      }, 10000);

      if (callIncrement === callNum) {
        clearInterval(intervalId);
      }
    }
    return () => clearInterval(intervalId);
  }, [missingGens, callIncrement, latest_generation]);

  // useEffect(() => {
  //   if (latest_generation === null || latest_generation === undefined) return;
  //   let fakeArray = [];
  //   console.log(missingGens);
  //   if (latest_generation) {
  //     Array.from(Array(latest_generation)).forEach((x, i) => {
  //       if (i in generations || missingGens.includes(i)) {
  //         return;
  //       } else {
  //         fakeArray.push(i);
  //         setMissingGens((prevArray) => [...fakeArray]);
  //       }
  //     });
  //   }
  // }, [generations, latest_generation, missingGens]);
  return (
    <StyledGridContainer>
      <IHeader />
      <DialogGiveLife />
      {latest_generation ? <GetLatestGame /> : null}
      {latest_generation && lUS ? <GetPreviousGames latest_generation /> : null}
      {latest_generation &&
      missingGensIncrements.length > 0 &&
      callIncrement !== null ? (
        <GetPreviousGamesLarge
          missingGens={missingGensIncrements[callIncrement]}
        />
      ) : null}

      <GridWrapper />
      <IFooter />
    </StyledGridContainer>
  );
};

export default GameContainer;

// get latest game state

// const {
//   data: latestUsefulData,
//   loading: latestUsefulLoading,
//   error: latestUsefulError,
// } = useStarknetCall({
//   contract: contract,
//   method: "latest_useful_state",
//   args: ["0"],
// });

// const {
//   data: latestUsefulData2,
//   loading: latestUsefulLoading2,
//   error: latestUsefulError2,
// } = useStarknetCall({
//   contract: contract,
//   method: "latest_useful_state",
//   args: [latest_gen - 3],
// });

// store gen_id - latest generation
// select the 3 most recent generations  a0 - a31 , b0 -b31, c0 -c31
// select the 3 most recent owners a_owner, b_owner, c_owner
// store latest
// store

// useEffect(() => {
//   if (latestUsefulData) {
//     dispatch(updateRecentGames({ id: "a", owner: latestUsefulData.a_owner }));
//   }
// }, [latestUsefulData]);

// if (latestUsefulData) {
//   console.log("latest_use", latestUsefulData);
//   console.log("a_owner", toHex(latestUsefulData.a_owner));
//   console.log("b_owner", toHex(latestUsefulData.b_owner));
//   console.log("c_owner", toHex(latestUsefulData.c_owner));
//   dispatch(updateRecentGames(latestUsefulData.a_owner));
//   dispatch(updateRecentGames(latestUsefulData.b_owner));
//   dispatch(updateRecentGames(latestUsefulData.c_owner));
//   // console.log("gen_ids_array_result", latestUsefulData.n_latest_states_result);
// }
// if (latestUsefulData2) {
//   console.log("latest_use", latestUsefulData2);
//   console.log("e_owner", toHex(latestUsefulData2.a_owner));
//   console.log("f_owner", toHex(latestUsefulData2.b_owner));
//   console.log("g_owner", toHex(latestUsefulData2.c_owner));
//   dispatch(updateRecentGames(latestUsefulData.a_owner));
//   dispatch(updateRecentGames(latestUsefulData.b_owner));
//   dispatch(updateRecentGames(latestUsefulData.c_owner));
//   // console.log("gen_ids_array_result", latestUsefulData.n_latest_states_result);
// }
// console.log(latestUsefulError);

// const {
//   data: arbData,
//   loading: arbLoading,
//   error: arbError,
// } = useStarknetCall({
//   contract: contract,
//   method: "get_arbitrary_state_arrays",
//   args: [["0"], "3", ["0"], "0"],
// });

// if (arbData) {
//   console.log(arbData);
//   console.log("gen_ids_array_result", arbData.n_latest_states_result);
// }
// console.log(arbError);

// useEffect(() => {
//   if (data && data.length > 0) {
//     dispatch(updateGenerations({ id: latest_gen, data }));
//   }
// }, [data, latest_gen, dispatch]);

// let newData;
// const latestGenValue = useMemo(() => {
//   if (data && data.length > 0) {
//     const value = toBN(data[0]);
//     data.map((item) => console.log(toBN(item).toString(10)));
//   }
// }, [data, newData]);
