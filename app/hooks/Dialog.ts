import { createStateContext } from 'react-use'

type Dialog =
  | 'WrongNetworkDialog'
  | 'ConnectWalletDialog'
  | 'DownloadWalletDialog'
  | 'AddTokenToWalletDialog'
  | 'TxnRejectedDialog'
  | 'TxnConfirmDialog'
  | 'GenericErrorDialog'
  | null

export const [useDialog, DialogProvider, DialogContext] = createStateContext<Dialog>(null)
