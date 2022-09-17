import { createStateContext } from 'react-use'

type HelpMessage =
  | 'connectWalletMessage'
  | 'balanceMessage'
  | 'evolveInfinite'
  | 'evolveCreator'
  | 'firstTokenEarnedMessage'
  | null

export const [useHelpMessage, HelpMessageProvider, HelpMessageContext] = createStateContext<HelpMessage>(null)
