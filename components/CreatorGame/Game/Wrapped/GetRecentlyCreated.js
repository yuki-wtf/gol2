import { useStarknetCall } from "@starknet-react/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toHex } from "starknet/dist/utils/number";
import { updateCreatorGames } from "../../../../features/creator/creatorGamesSlice";
import { useCreatorGameContract } from "../../../../hooks/useCreatorGameContract";

const GetRecentlyCreated = ({ latestGeneration }) => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.creatorGames);
  const { contract } = useCreatorGameContract();

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }
  // get latest game state

  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: "get_recently_created",
    args: ["0", "", "pending"],
  });

  // console.log("get_recently_created_error", error);
  // console.log("get_recently_created_loading", loading);

  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      console.log("get_recently_created", data);
      const latest_game_index = parseInt(data.game_index);

      const ownerA = {
        owner: toHex(data.a_owner),
        generation: parseInt(data.a_gen, 16),
        game_index: latest_game_index,
      };
      const ownerB = {
        owner: toHex(data.b_owner),
        generation: parseInt(data.b_gen, 16),
        game_index: latest_game_index - 1,
      };
      const ownerC = {
        owner: toHex(data.c_owner),
        generation: parseInt(data.c_gen, 16),
        game_index: latest_game_index - 2,
      };
      const ownerD = {
        owner: toHex(data.d_owner),
        generation: parseInt(data.d_gen, 16),
        game_index: latest_game_index - 3,
      };
      const ownerE = {
        owner: toHex(data.e_owner),
        generation: parseInt(data.e_gen, 16),
        game_index: latest_game_index - 4,
      };

      console.log("ownera", ownerA);
      console.log("ownerb", ownerB);

      // const generation = data.generation.toString();
      // console.log("latest_game_index", latest_game_index);
      // console.log("ownerA", ownerA);
      // console.log("ownerB", ownerB);
      // console.log("ownerC", ownerC);
      // console.log("ownerD", ownerD);
      // console.log("ownerE", ownerE);

      if (
        ownerA.game_index !== 0 ||
        ownerA.game_index !== "0x0" ||
        !isNegative(ownerA.game_index)
      ) {
        console.log("I'm doing something A");
        // if (ownerA.game_index in games) return;
        dispatch(updateCreatorGames({ ...ownerA }));
      }

      if (
        ownerB.game_index !== 0 ||
        ownerB.game_index !== "0x0" ||
        !isNegative(ownerB.game_index)
      ) {
        console.log("I'm doing something b");
        dispatch(updateCreatorGames({ ...ownerB }));
      }

      if (
        ownerC.game_index !== 0 ||
        ownerC.game_index !== "0x0" ||
        !isNegative(ownerC.game_index)
      ) {
        console.log("I'm doing something b");
        dispatch(updateCreatorGames({ ...ownerC }));
      }
      if (
        ownerD.game_index !== 0 ||
        ownerD.game_index !== "0x0" ||
        !isNegative(ownerD.game_index)
      ) {
        console.log("I'm doing something b");
        dispatch(updateCreatorGames({ ...ownerD }));
      }
      if (
        ownerE.game_index !== 0 ||
        ownerE.game_index !== "0x0" ||
        !isNegative(ownerE.game_index)
      ) {
        console.log("I'm doing something b");
        dispatch(updateCreatorGames({ ...ownerE }));
      }

      //   if (latest_gen in generations) return;
      //   if (latest_gen !== undefined) {
      //     // console.log(data);
      //     dispatch(updateGenerations({ id: latest_gen, data }));
      //   }
    }
  }, [data, loading, dispatch]);
  return <div style={{ position: "fixed", left: -3232323232 }}></div>;
};

export default GetRecentlyCreated;
