import { goerli, mainnet } from '@starknet-react/chains'
import { StarknetConfig, argent, braavos, infuraProvider } from '@starknet-react/core'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { env } = useRootLoaderData()

  const chains = [goerli, mainnet]
  const provider = infuraProvider({ apiKey: env.INFURA_API_KEY! })

  const connectors = [argent(), braavos()]

  return (
    <StarknetConfig chains={chains} provider={provider} connectors={connectors} autoConnect>
      {children}
    </StarknetConfig>
  )
}
