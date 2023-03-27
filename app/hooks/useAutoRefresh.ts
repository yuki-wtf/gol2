import { useRevalidator } from '@remix-run/react'
import { useInterval } from 'react-use'

export function useAutoRefresh() {
  const { revalidate, state } = useRevalidator()

  useInterval(revalidate, state === 'idle' ? 5000 : null)
}
