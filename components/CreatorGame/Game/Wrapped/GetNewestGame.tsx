import { useStarknetCall } from '@starknet-react/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCreatorGames } from '../../../../features/creator/creatorGamesSlice'
import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'

const GetNewestGame = ({ latestGeneration }) => {
  const dispatch = useDispatch()
  const { contract } = useCreatorGameContract()
  const { games } = useSelector((state) => state.creatorGames)
  // get latest game state
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'newest_game',
    args: ['0', '', 'pending'],
  })
  //   console.log("newest_game_error", error);
  //   console.log("newest_game_loading", loading);
  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      console.log('newest_game_game_id', data.game_id.toString())
      console.log('newest_game_game_index', data.game_index.toString())
      console.log('newest_game_generation', data.generation.toString())
      console.log('newest_game', data)
      const game_index = data.game_index.toString()
      const game_id = data.game_id.toString()
      const generation = data.generation.toString()
      //   if (latest_gen in generations) return;
      //   if (latest_gen !== undefined) {
      //     // console.log(data);
      if (game_index in games) return
      dispatch(
        updateCreatorGames({
          game_index,
          game_id,
          generation,
        })
      ) //   }
    }
  }, [data, loading, dispatch, games])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetNewestGame
