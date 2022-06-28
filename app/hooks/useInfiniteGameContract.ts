import { useContract } from '@starknet-react/core'
import { InfiniteModeAbi, InfiniteModeAddress } from '../smartContracts/InfiniteMode'

export function useInfiniteGameContract() {
  return useContract({
    abi: InfiniteModeAbi,
    address: InfiniteModeAddress,
  })
}
