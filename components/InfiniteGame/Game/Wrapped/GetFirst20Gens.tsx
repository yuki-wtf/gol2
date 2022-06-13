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
const GetFirst20Gens = () => {
  const [missingGens, setMissingGens] = useState([])
  const [result, setResult] = useState([])
  const { latest_generation, generations, selected_generation } = useSelector((state) => state.generations)
  const dispatch = useDispatch()
  const { contract } = useInfiniteGameContract()
  const latest_gen = latest_generation && latest_generation.toString()
  const { data, loading, error } = useStarknetCall({
    contract: contract,
    method: 'get_arbitrary_state_arrays',
    args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], '0', ['0'], '0', '0'],
  })
  // console.log(error);
  // console.log(loading);
  // console.log(data);
  useEffect(() => {
    console.log('Get First 20 states')
  }, [])
  useEffect(() => {
    if (data && data !== undefined && data.length >= 0) {
      const stringData = data.gen_ids_array_result
      const perChunk = 32
      let result = stringData.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)
        setResult(resultArray)
        return resultArray
      }, [])
    }
  }, [data, loading, generations, missingGens, error, dispatch])
  useEffect(() => {
    if (result.length) {
      ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((gen, i) => {
        console.log('gen is', gen)
        const newGen = gen
        if (newGen in generations) return
        dispatch(
          updateGenerations({
            id: newGen,
            data: result[i],
          })
        )
        return
      })
    }
  }, [result, dispatch, generations])
  return (
    <div
      style={{
        position: 'fixed',
        left: -3232323232,
      }}
    ></div>
  )
}

export default GetFirst20Gens
