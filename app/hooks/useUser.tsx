import { useFetcher, useLoaderData } from '@remix-run/react'
import { useStarknet } from '@starknet-react/core'
import { createContext, useContext, useState } from 'react'
// import type { AccountInterface } from 'starknet3'
// import { getChecksumAddress } from 'starknet3'
// import { StarknetChainId } from 'starknet3/dist/constants'
import type { loader } from '~/root'
import { useLayoutEffectX } from './useLayoutEffectX'

interface User {
  readonly userId: string
  readonly balance: number | null
  readonly hasIncomingTransfer: boolean
  readonly hasOutgoingTransfer: boolean
}

const UserContext = createContext<User | null>(null)

interface Props {
  readonly children: React.ReactNode
}

export function UserProvider({ children }: Props) {
  const starknet = useStarknet()
  const data = useLoaderData<typeof loader>()

  const { account } = starknet
  // const { account, connectors } = starknet
  // console.log('account UserIdProvider', account)

  const user: User | null =
    data.userId != null
      ? {
          userId: data.userId,
          balance: data.balance,
          hasIncomingTransfer: data.hasIncomingTransfer,
          hasOutgoingTransfer: data.hasOutgoingTransfer,
        }
      : null

  const [userId, setUserId] = useState(data.userId)
  const fetcher = useFetcher()

  // const [accountObj, setAccountObj] = useState<AccountInterface>()

  // useLayoutEffectX(() => {
  //   if (account == null) return

  //   ;(async () => {
  //     for (const connector of connectors) {
  //       const accountObj = await connector.account()

  //       if (accountObj != null) {
  //         if (getChecksumAddress(accountObj.address) === getChecksumAddress(account)) {
  //           setAccountObj(accountObj)
  //         }
  //       }
  //     }
  //   })()
  // }, [account])

  // useLayoutEffectX(() => {
  //   if (accountObj == null) return

  //   const currentNet = location.hostname === 'gol2.io' ? 'SN_MAIN' : 'SN_GOERLI'
  //   console.log(accountObj.chainId)

  //   if (currentNet !== (accountObj.chainId as any)) {
  //     if (window.starknet != null) {
  //       window.starknet.request({
  //         type: 'wallet_switchStarknetChain',
  //         params: {
  //           chainId: currentNet,
  //         },
  //       })
  //     }
  //   }
  // }, [accountObj])

  useLayoutEffectX(() => {
    // console.log([userId, account])
    if (userId == account) return

    setUserId(account ?? null)

    fetcher.submit(
      {
        userId: account ?? '',
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
