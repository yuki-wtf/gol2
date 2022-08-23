import { useLoaderData } from '@remix-run/react'
import type { loader } from '~/root'

export function useRootLoaderData() {
  return useLoaderData<typeof loader>()
}
