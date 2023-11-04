import type { ProviderInterface } from 'starknet/dist/provider'

export const getLibraryChainId = (library: ProviderInterface) => {
  // @ts-expect-error chainId seems to be moved to provider
  return library.chainId || library.provider?.chainId
}
