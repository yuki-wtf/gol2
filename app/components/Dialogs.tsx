import { useDialog } from '~/hooks/Dialog'

import { useRootLoaderData } from '~/hooks/useRootLoaderData'

import { HiOutlineX } from 'react-icons/hi'
import Dialog from './Dialog/Dialog'
import { useNetwork } from '@starknet-react/core'

export default function Dialogs() {
  const [dialog, setDialog] = useDialog()
  const { env } = useRootLoaderData()
  const { chain } = useNetwork()

  return (
    <>
      <Dialog
        hasConfirmButton
        title="Wrong Network selected"
        description={
          <span>
            You are using GoL2 on {env.USE_MAINNET ? 'Mainnet' : 'Testnet'}. Please switch your wallet network from{' '}
            {!chain.testnet ? 'Mainnet' : 'Testnet'} to {env.USE_MAINNET ? 'Mainnet' : 'Testnet'}
            <br /> <br /> Try refreshing the app if network used is not correctly detected by Gol2.
          </span>
        }
        open={dialog === 'WrongNetworkDialog'}
        icon={<HiOutlineX size={40} />}
        onClose={() => {
          setDialog(null)
        }}
      />
    </>
  )
}
