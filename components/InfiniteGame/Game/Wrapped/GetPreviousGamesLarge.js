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

  //   useEffect(() => {
  //     if (latest_generation === null || latest_generation === undefined) return;
  //     let fakeArray = [];
  //     if (latest_generation) {
  //       Array.from(Array(latest_generation)).forEach((x, i) => {
  //         if (i in generations || missingGens.includes(i)) {
  //           return;
  //         } else {
  //           fakeArray.push(i);
  //           setMissingGens((prevArray) => [...fakeArray]);
  //         }
  //       });
  //     }
  //   }, [generations, latest_generation, missingGens]);

  //   get_arbitrary_state_arrays;
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: "get_arbitrary_state_arrays",
    args: [missingGens, "0", ["0"], "0", "0"],
  });
  console.log(error);
  console.log(loading);

  //   useEffect(() => {
  //     if (data && data !== undefined && data.length > 0) {
  //       console.log(error);
  //       console.log(loading);
  //       const stringData = data.gen_ids_array_result;
  //       if (id in generations) return;

  //       //   dispatch(updateGenerations({ id: id, data: stringData }));
  //     }
  //   }, [data, loading, generations, latest_gen, error, dispatch]);

  return <div style={{ position: "fixed", left: -3232323232 }}></div>;
};

export default GetPreviousGamesLarge;
