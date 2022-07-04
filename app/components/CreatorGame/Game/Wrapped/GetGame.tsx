import { useStarknetCall } from '@starknet-react/core'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateGameState } from '../../../../features/creator/creatorGamesSlice'
import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'

const GetGame = ({ gameId, currentGen }) => {
  const dispatch = useDispatch()
  const { contract } = useCreatorGameContract()
  const { data } = useStarknetCall({
    contract: contract,
    method: 'view_game',
    args: [gameId, currentGen],
  })
  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      dispatch(
        updateGameState({
          game_index: gameId,
          data,
        })
      )
    }
  }, [data, dispatch, gameId])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetGame
