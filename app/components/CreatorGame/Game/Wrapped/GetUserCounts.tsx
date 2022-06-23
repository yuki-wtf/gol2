import { useStarknet, useStarknetCall } from '@starknet-react/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCreatorCredits, updateCreatorGamesOwned } from '../../../../features/Infinite/user/userSlice'
import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'

const GetUserCounts = ({ id, gen }) => {
  const dispatch = useDispatch()
  const { account } = useStarknet()
  const { contract } = useCreatorGameContract()
  // get latest game state
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'user_counts',
    args: [account, '', 'pending'],
  })
  //   console.log("user_counts_error", error);
  //   console.log("user_counts_loading", loading);
  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      //   console.log("user_counts", data);
      //   console.log("user_credits", data.credit_count.toString());
      //   console.log("user_game count", data.game_count.toString());
      const credits = parseInt(data.credit_count)
      const games_owned = parseInt(data.game_count)
      //   if (latest_gen in generations) return;
      //   if (latest_gen !== undefined) {
      //     // console.log(data);
      dispatch(updateCreatorGamesOwned(games_owned))
      dispatch(updateCreatorCredits(credits)) //   }
    }
  }, [data, loading, dispatch])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetUserCounts
