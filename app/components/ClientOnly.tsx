import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

let hydrating = true

interface Props {
  readonly children: () => JSX.Element | undefined
  readonly fallback?: ReactNode | undefined
}

export default function ClientOnly({ children, fallback }: Props) {
  const [hydrated, setHydrated] = useState(() => !hydrating)

  useEffect(() => {
    hydrating = false
    setHydrated(true)
  }, [])

  return <>{hydrated ? children() : fallback}</>
}
