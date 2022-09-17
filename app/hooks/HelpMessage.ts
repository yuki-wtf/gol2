import { createStateContext } from 'react-use'

type HelpMessage = 'connectWalletMessage' | 'balanceMessage' | 'evolveInfinite' | 'evolveCreator' | null

export const [useHelpMessage, HelpMessageProvider, HelpMessageContext] = createStateContext<HelpMessage>(null)
