import { createStateContext } from 'react-use'

type HelpMessage = 'connectWalletMessage' | 'balanceMessage' | null

export const [useHelpMessage, HelpMessageProvider, HelpMessageContext] = createStateContext<HelpMessage>(null)
