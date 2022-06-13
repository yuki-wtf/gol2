import { useStarknetCall } from '@starknet-react/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'

const GetViewGame = ({ id, gen }) => {
  const { latest_generation, generations, selected_generation } = useSelector((state) => state.generations)
  const dispatch = useDispatch()
  const { contract } = useCreatorGameContract()
  // get latest game state
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'view_game',
    args: [id, gen, 'pending'],
  })
  console.log('view_game_error', error)
  console.log('view_game_loading', loading)
  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      console.log('view_game_game_id', data.game_id.toString())
      console.log('view_game_game_index', data.game_index.toString())
      console.log('view_game_generation', data.generation.toString())
      console.log('view_game', data) //   if (latest_gen in generations) return;
      //   if (latest_gen !== undefined) {
      //     // console.log(data);
      //     dispatch(updateGenerations({ id: latest_gen, data }));
      //   }
    }
  }, [data, loading])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetViewGame
