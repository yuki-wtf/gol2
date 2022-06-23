import { useStarknetCall } from '@starknet-react/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateGenerations } from '../../../../features/Infinite/generations/generationsSlice'
import { useInfiniteGameContract } from '../../../../hooks/useInfiniteGameContract'

const TestComponent = ({ latestGeneration }) => {
  const { latest_generation, generations, selected_generation } = useSelector((state) => state.generations)
  const dispatch = useDispatch()
  const { contract } = useInfiniteGameContract()
  const latest_gen = latest_generation && latest_generation.toString()
  // get latest game state
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'view_game',
    args: [latest_generation, '', 'pending'],
  })
  // console.log("view_game_error", error);
  // console.log("view_game_loading", loading);
  // console.log("view_game_data", toHex(data));
  // console.log(loading);
  // console.log(error);
  // console.log(data);
  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      if (latest_gen in generations) return

      if (latest_gen !== undefined) {
        // console.log(data);
        dispatch(
          updateGenerations({
            id: latest_gen,
            data,
          })
        )
      }
    }
  }, [data, generations, latest_gen, dispatch])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default TestComponent
