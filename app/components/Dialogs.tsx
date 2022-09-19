import { useDialog } from '~/hooks/Dialog'
import DialogSwitchWallet from './DialogSwitchWallet/DialogSwitchWallet'
import { useStarknet } from '@starknet-react/core'
import { StarknetChainId } from 'starknet/dist/constants'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

export default function Dialogs() {
  const [dialog, setDialog] = useDialog()
  const { library } = useStarknet()
  const { env } = useRootLoaderData()

  return (
    <>
      <DialogSwitchWallet
        currentNetwork={env.USE_MAINNET ? 'Mainnet' : 'Testnet'}
        wrongNetwork={library.chainId === StarknetChainId.MAINNET ? 'Mainnet' : 'Testnet'}
        open={dialog === 'WrongNetworkDialog'}
        onClose={() => {
          setDialog(null)
        }}
      />
    </>
  )
}
