import { useFetcher, useLoaderData } from '@remix-run/react'
import { useStarknet } from '@starknet-react/core'
import { createContext, useContext, useState } from 'react'
import type { AccountInterface } from 'starknet3'
import { getChecksumAddress } from 'starknet3'
import { StarknetChainId } from 'starknet3/dist/constants'
import type { loader } from '~/root'
import { useLayoutEffectX } from './useLayoutEffectX'

interface User {
  readonly userId: string
  readonly balance: number
}

const UserContext = createContext<User>(null)

interface Props {
  readonly children: React.ReactNode
}

export function UserProvider({ children }: Props) {
  const starknet = useStarknet()
  const data = useLoaderData<typeof loader>()

  const { account, connectors } = starknet
  console.log('account UserIdProvider', account)

  const user = data.userId != null && data.balance != null ? { userId: data.userId, balance: data.balance } : null

  const [userId, setUserId] = useState(data.userId)
  const fetcher = useFetcher()

  const [accountObj, setAccountObj] = useState<AccountInterface>()

  useLayoutEffectX(() => {
    ;(async () => {
      for (const connector of connectors) {
        const accountObj = await connector.account()
        if (getChecksumAddress(accountObj.address) === getChecksumAddress(account)) {
          setAccountObj(accountObj)
        }
      }
    })()
  }, [account, connectors])

  useLayoutEffectX(() => {
    if (accountObj == null) return

    const currentNet = location.hostname === 'gol2.io' ? StarknetChainId.MAINNET : StarknetChainId.TESTNET

    if (currentNet !== accountObj.chainId) {
      if (window.starknet != null) {
        window.starknet.request({
          type: 'wallet_switchStarknetChain',
          params: {
            chainId: currentNet,
          },
        })
      }
    }
  }, [accountObj])

  useLayoutEffectX(() => {
    console.log([userId, account])
    if (userId == account) return

    setUserId(account)

    fetcher.submit(
      {
        userId: account || '',
      },
      {
        method: 'post',
      }
    )
  }, [account, userId])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
