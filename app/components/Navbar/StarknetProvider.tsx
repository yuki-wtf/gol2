import { useLoaderData } from '@remix-run/react'
import { goerli, mainnet } from '@starknet-react/chains'
import { StarknetConfig, argent, braavos, infuraProvider } from '@starknet-react/core'

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { env } = useLoaderData()

  const chains = [goerli, mainnet]
  const provider = infuraProvider({ apiKey: env.INFURA_API_KEY })

  const connectors = [argent(), braavos()]

  return (
    <StarknetConfig chains={chains} provider={provider} connectors={connectors} autoConnect>
      {children}
    </StarknetConfig>
  )
}
