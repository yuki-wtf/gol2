import { useMemo, useState } from 'react'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useInfiniteGameContract } from './useInfiniteGameContract'
import useUpdateEffect from './useUpdateEffect'

const useFetchTokens = () => {
  const { contract: infinite } = useInfiniteGameContract()
  const { account, library, connectors } = useStarknet()
  const [snapshots, setSnapshots] = useState([])
  const {
    data: tokens,
    loading,
    error,
    refresh,
  } = useStarknetCall({
    contract: infinite,
    method: 'get_user_tokens',
    args: [account],
  })
  const tokenCount = useMemo(() => {
    if (tokens && tokens.length > 0) {
      return tokens.token_ids.length
    }
  }, [tokens])
  // const snapshotsIds = useMemo(() => {
  //   if (tokens && tokens.length > 0) {
  //     tokens.token_ids.map((item) => {
  //       if (!snapshots.includes(item.words[0])) {
  //         setSnapshots((oldArray) => [...oldArray, item.words[0]]);
  //       }
  //     });
  //   }
  // }, [tokens, snapshots]);
  useUpdateEffect(() => {
    if (tokens && tokens.length > 0) {
      tokens.token_ids.map((item) => {
        if (!snapshots.includes(item.words[0])) {
          setSnapshots((oldArray) => [...oldArray, item.words[0]])
        }
      })
    }
  }, [tokens, snapshots])
  return {
    tokens,
    tokenCount,
    loading,
    error,
    refresh,
    snapshots,
  }
}

export default useFetchTokens
