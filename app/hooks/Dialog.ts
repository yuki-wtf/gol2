import { createStateContext } from 'react-use'

type Dialog =
  | 'WrongNetworkDialog'
  | null

export const [useDialog, DialogProvider, DialogContext] = createStateContext<Dialog>(null)
