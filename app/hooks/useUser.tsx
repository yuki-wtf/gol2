import { useFetcher, useLoaderData } from '@remix-run/react'
import { useStarknet } from '@starknet-react/core'
import { createContext, useContext, useState } from 'react'
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

  const { account } = starknet
  console.log('account UserIdProvider', account)

  const user = data.userId != null && data.balance != null ? { userId: data.userId, balance: data.balance } : null

  const [userId, setUserId] = useState(data.userId)
  const fetcher = useFetcher()

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
