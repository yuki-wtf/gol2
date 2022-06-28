import { useContract } from '@starknet-react/core'
import { CreatorModeAbi, CreatorModeAddress } from '../smartContracts/CreatorMode'

export function useCreatorGameContract() {
  return useContract({
    abi: CreatorModeAbi,
    address: CreatorModeAddress,
  })
}
