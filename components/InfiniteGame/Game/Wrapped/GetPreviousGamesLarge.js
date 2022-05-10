import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toHex } from "starknet/dist/utils/number";
import { updateGenerations } from "../../../../features/Infinite/generations/generationsSlice";
import { useInfiniteGameContract } from "../../../../hooks/useInfiniteGameContract";

// const {
//   data: arbData,
//   loading: arbLoading,
//   error: arbError,
// } = useStarknetCall({
//   contract: contract,
//   method: "get_arbitrary_state_arrays",
//   args: [["0"], "3", ["0"], "0"],
// });

const GetPreviousGamesLarge = ({ missingGens }) => {
  //   const [missingGens, setMissingGens] = useState([]);
  const { latest_generation, generations, selected_generation } = useSelector(
    (state) => state.generations
  );

  const dispatch = useDispatch();
  const { contract } = useInfiniteGameContract();
  const latest_gen = latest_generation && latest_generation.toString();

  // useEffect(() => {
  //   if (latest_generation === null || latest_generation === undefined) return;
  //   let fakeArray = [];
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

  //   get_arbitrary_state_arrays;
  console.log(missingGens.length);
  console.log(missingGens);
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: "get_arbitrary_state_arrays",
    args: [missingGens, "0", ["0"], "0", "0"],
  });
  console.log(error);
  console.log(loading);
  console.log(data);

  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      const stringData = data.gen_ids_array_result;
      const perChunk = 32;
      let result = stringData.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
      console.log(result);
      missingGens.map((gen, i) => {
        console.log("gen is", gen);
        const newGen = gen - 40;
        if (newGen in generations) return;
        dispatch(updateGenerations({ id: newGen, data: result[i] }));
        return;
      });

      //   dispatch(updateGenerations({ id: id, data: stringData }));
    }
  }, [data, loading, generations, missingGens, latest_gen, error, dispatch]);

  return <div style={{ position: "fixed", left: -3232323232 }}></div>;
};

export default GetPreviousGamesLarge;
