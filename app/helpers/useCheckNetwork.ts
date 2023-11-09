import { useProvider } from '@starknet-react/core'
import { constants } from 'starknet'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
const StarknetChainId = constants.StarknetChainId

export const useCheckNetwork = () => {
  const { env } = useRootLoaderData()
  const currentStarknetChainId = env.USE_MAINNET ? StarknetChainId.SN_MAIN : StarknetChainId.SN_GOERLI
  const { provider } = useProvider()
  return {
    // @ts-expect-error TODO: provider type is incorrect
    isCorrectNetwork: provider?.chainId === currentStarknetChainId,
  }
}
