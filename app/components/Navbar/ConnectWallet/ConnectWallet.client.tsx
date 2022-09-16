import { useState } from 'react'
import { useStarknet } from '@starknet-react/core'
import Button from '../../Button/Button'
import UserDropdownMenu from './UserDropdownMenu/UserDropdownMenu'
import NetworkDropdownMenu from './NetworkDropdownMenu/NetworkDropdownMenu.client'
import DialogDownloadWallet from '../../DialogDownloadWallet/DialogDownloadWallet'
import DialogWallet from '~/components/DialogWallet/DialogWallet'

const ConnectWallet = () => {
  const [open, setOpen] = useState(false)
  const { account, error, connectors, connect, disconnect } = useStarknet()

  if (account) {
    return (
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: 8,
          minWidth: 330,
          justifyContent: 'flex-end',
        }}
      >
        <NetworkDropdownMenu />
        <UserDropdownMenu account={account} disconnect={disconnect} />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        marginLeft: 'auto',
        minWidth: 330,
        justifyContent: 'flex-end',
      }}
    >
      {!account && <Button primary label="Connect" onClick={() => setOpen(true)} />}

      <DialogWallet open={open} onClose={() => setOpen(false)}>
        {!account &&
          !error &&
          connectors.map((connector, i) =>
            connector.available() ? (
              <Button
                onClick={() => {
                  setOpen(false)
                  connect(connector)
                }}
                full
                label={connector.name()}
                secondary
                key={connector.id()}
              />
            ) : null
          )}
      </DialogWallet>

      <DialogDownloadWallet
        open={open && !connectors.length}
        onClose={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default ConnectWallet
