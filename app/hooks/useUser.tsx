import { useFetcher, useLoaderData } from '@remix-run/react'
import { createContext, useContext, useState } from 'react'
import type { loader } from '~/root'
import { useLayoutEffectX } from './useLayoutEffectX'
import { useAccount } from '@starknet-react/core'

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
  const data = useLoaderData<typeof loader>()

  const { account: _account } = useAccount()
  const account = _account?.address

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
