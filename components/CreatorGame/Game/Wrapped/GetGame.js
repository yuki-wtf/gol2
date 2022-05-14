import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGameState } from "../../../../features/creator/creatorGamesSlice";
import { useCreatorGameContract } from "../../../../hooks/useCreatorGameContract";

const GetGame = ({ id, gen }) => {
  const dispatch = useDispatch();
  const { contract } = useCreatorGameContract();
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: "view_game",
    args: [gen, id, "pending"],
  });

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      dispatch(updateGameState({ game_index: id, data }));
    }
  }, [data, dispatch, id]);
  return <div style={{ position: "fixed", left: -3232323232 }}></div>;
};

export default GetGame;
