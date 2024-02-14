import { useSearchParams } from '@remix-run/react'
import { useInterval } from 'react-use'

export function useAutoRefresh() {
  const [, setSearchParams] = useSearchParams()

  useInterval(() => {
    setSearchParams({}, { replace: true, state: { scroll: false } })
  }, 5000)
}

export function useRefreshPage() {
  const [, setSearchParams] = useSearchParams()
  const refreshPage = () => {
    setSearchParams({}, { replace: true, state: { scroll: false } })
  }

  return refreshPage
}
