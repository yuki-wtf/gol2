import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGenerations } from "../../../../features/Infinite/generations/generationsSlice";
import { useInfiniteGameContract } from "../../../../hooks/useInfiniteGameContract";

const GetPreviousGames = () => {
  const { latest_generation, generations, selected_generation } = useSelector(
    (state) => state.generations
  );

  const dispatch = useDispatch();
  const { contract } = useInfiniteGameContract();
  const latest_gen = latest_generation && latest_generation.toString();

  // get latest game state
  const id = "1";
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: "view_game",
    args: [id, "", "pending"],
  });

  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      if (id in generations) return;
      dispatch(updateGenerations({ id: "1", data }));
    }
  }, [data, generations, latest_gen, dispatch]);
  return <div style={{ position: "fixed", left: -3232323232 }}></div>;
};

export default GetPreviousGames;
