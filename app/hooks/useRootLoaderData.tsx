import type { SerializeFrom } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createContext, useContext } from 'react'
import type { loader } from '~/root'

type RootLoaderData = SerializeFrom<typeof loader>

const RootLoaderDataContext = createContext<RootLoaderData>(null)

interface Props {
  readonly children: React.ReactNode
}

export function RootLoaderDataProvider({ children }: Props) {
  const data = useLoaderData<typeof loader>()

  return <RootLoaderDataContext.Provider value={data}>{children}</RootLoaderDataContext.Provider>
}

export function useRootLoaderData() {
  return useContext(RootLoaderDataContext)
}
