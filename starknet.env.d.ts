// https://github.com/argentlabs/argent-x/blob/e57225f5841f47782e444ae7c75b28cb8840c23b/packages/extension/src/inpage/inpage.model.ts

import type { AccountInterface, ProviderInterface } from 'starknet'

type AccountChangeEventHandler = (accounts: string[]) => void

type NetworkChangeEventHandler = (network?: string) => void

type WalletEventHandlers = AccountChangeEventHandler | NetworkChangeEventHandler

type WalletEvents =
  | {
      type: 'accountsChanged'
      handler: AccountChangeEventHandler
    }
  | {
      type: 'networkChanged'
      handler: NetworkChangeEventHandler
    }

// EIP-747:
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md
interface WatchAssetParameters {
  type: 'ERC20' // The asset's interface, e.g. 'ERC20'
  options: {
    address: string // The hexadecimal StarkNet address of the token contract
    symbol?: string // A ticker symbol or shorthand, up to 5 alphanumerical characters
    decimals?: number // The number of asset decimals
    image?: string // A string url of the token logo
    name?: string // The name of the token - not in spec
  }
}

// EIP-3085
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md

interface AddStarknetChainParameters {
  id: string
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  baseUrl: string
  rpcUrl?: string
  blockExplorerUrl?: string
  accountImplementation?: string

  nativeCurrency?: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  } // Currently ignored.
  iconUrls?: string[] // Currently ignored.
}

interface SwitchStarknetChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
}

type RpcMessage =
  | {
      type: 'wallet_watchAsset'
      params: WatchAssetParameters
      result: boolean
    }
  | {
      type: 'wallet_addStarknetChain'
      params: AddStarknetChainParameters
      result: boolean
    }
  | {
      type: 'wallet_switchStarknetChain'
      params: SwitchStarknetChainParameter
      result: boolean
    }
  | {
      type: string
      params: unknown
      result: never
    }


interface IStarketWindowObject {
  id: string
  name: string
  version: string
  icon: string
  request: <T extends RpcMessage>(call: Omit<T, 'result'>) => Promise<T['result']>
  enable: () => Promise<string[]>
  isPreauthorized: () => Promise<boolean>
  on: (event: WalletEvents['type'], handleEvent: WalletEvents['handler']) => void
  off: (event: WalletEvents['type'], handleEvent: WalletEvents['handler']) => void
  account?: AccountInterface
  provider?: ProviderInterface
  selectedAddress?: string
  chainId?: string
}

interface ConnectedStarketWindowObject extends IStarketWindowObject {
  isConnected: true
  account: AccountInterface
  provider: ProviderInterface
  selectedAddress: string
  chainId: string
}

interface DisconnectedStarketWindowObject extends IStarketWindowObject {
  isConnected: false
}

type StarknetWindowObject = ConnectedStarketWindowObject | DisconnectedStarketWindowObject

declare global {
  interface Window {
    starknet?: StarknetWindowObject
    starknet_braavos?: StarknetWindowObject
  }
}
