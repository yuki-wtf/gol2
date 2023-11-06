import { useDialog } from '~/hooks/Dialog'

import { useStarknet } from '@starknet-react/core'
import { constants } from 'starknet'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

import { HiOutlineX } from 'react-icons/hi'
import Dialog from './Dialog/Dialog'
import { getLibraryChainId } from '~/helpers/getLibraryChainId'
const StarknetChainId = constants.StarknetChainId;

export default function Dialogs() {
  const [dialog, setDialog] = useDialog()
  const { library } = useStarknet()
  const { env } = useRootLoaderData()

  return (
    <>
      <Dialog
        hasConfirmButton
        title="Wrong Network selected"
        description={
          <span>
            You are using GoL2 on {env.USE_MAINNET ? 'Mainnet' : 'Testnet'}. Please switch your wallet network from{' '}
            {getLibraryChainId(library) === StarknetChainId.SN_MAIN ? 'Mainnet' : 'Testnet'} to{' '}
            {env.USE_MAINNET ? 'Mainnet' : 'Testnet'}
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
