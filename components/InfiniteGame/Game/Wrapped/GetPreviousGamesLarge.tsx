import { useStarknetCall } from '@starknet-react/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toHex } from 'starknet/dist/utils/number'
import { updateGenerations } from '../../../../features/Infinite/generations/generationsSlice'
import { useInfiniteGameContract } from '../../../../hooks/useInfiniteGameContract'

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
  const { latest_generation, generations, selected_generation } = useSelector((state) => state.generations)
  const dispatch = useDispatch()
  const { contract } = useInfiniteGameContract()
  const latest_gen = latest_generation && latest_generation.toString()
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'get_arbitrary_state_arrays',
    args: [missingGens, '0', ['0'], '0', '0'],
  })
  // console.log(error);
  // console.log(loading);
  // console.log(data);
  useEffect(() => {
    console.log('Get Previous Games large')
  }, [])
  useEffect(() => {
    if (data && data !== undefined && data.length > 0) {
      const stringData = data.gen_ids_array_result
      const perChunk = 32
      let result = stringData.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
      missingGens &&
        missingGens.map((gen, i) => {
          console.log('gen is', gen)
          // if (i < 1) return;
          const newGen = gen
          if (newGen in generations) return
          dispatch(
            updateGenerations({
              id: newGen,
              data: result[i],
            })
          )
          console.log('sending', newGen, result[i])
          return
        })
    }
  }, [data, loading, generations, missingGens, latest_gen, error, dispatch])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetPreviousGamesLarge
