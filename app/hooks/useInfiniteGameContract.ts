import { useContract } from '@starknet-react/core'
import { InfiniteAbi } from '../abi/GoL2_infinite'

// 0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f
// 0x0791e75345b4836755f2a7c2fa99d4b627b34d162a96973df45842b7bb9a7bd9
// network === 'goerli' - use this
export function useInfiniteGameContract() {
  return useContract({
    abi: InfiniteAbi,
    address: '0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f',
  })
}
