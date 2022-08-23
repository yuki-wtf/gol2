import { useFetcher, useLoaderData } from '@remix-run/react'
import { useStarknet } from '@starknet-react/core'
import React, { useState } from 'react'
import type { loader } from '~/root'
import { useLayoutEffectX } from './useLayoutEffectX'

const UserIdContext = React.createContext<string>(null)

interface Props {
  readonly children: React.ReactNode
}

export function UserIdProvider({ children }: Props) {
  const starknet = useStarknet()
  const data = useLoaderData<typeof loader>()

  const { account } = starknet
  console.log('account UserIdProvider', account)


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

  return <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
}

export function useUserId() {
  return React.useContext(UserIdContext)
}
