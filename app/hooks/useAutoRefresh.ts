import { useSearchParams } from '@remix-run/react'
import { useInterval } from 'react-use'

export function useAutoRefresh() {
  const [, setSearchParams] = useSearchParams()

  useInterval(() => {
    setSearchParams({}, { replace: true, state: { scroll: false } })
  }, 5000)
}
