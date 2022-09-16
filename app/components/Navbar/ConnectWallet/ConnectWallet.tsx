import { useState, useEffect } from 'react'
import { useStarknet } from '@starknet-react/core'
import Button from '../../Button/Button'
import UserDropdownMenu from './UserDropdownMenu/UserDropdownMenu'
import NetworkDropdownMenu from './NetworkDropdownMenu/NetworkDropdownMenu'
import DialogDownloadWallet from '../../DialogDownloadWallet/DialogDownloadWallet'
import DialogWallet from '~/components/DialogWallet/DialogWallet'
import Highlight from '~/components/Highlight/Highlight'
import { useHelpMessage } from '~/hooks/HelpMessage'

const ConnectWallet = () => {
  const [open, setOpen] = useState(false)
  const { account, error, connectors, connect, disconnect } = useStarknet()
  const [helpMessage, setHelpMessage] = useHelpMessage()

  useEffect(() => {
    if (helpMessage === 'connectWalletMessage') {
      setTimeout(() => {
        setHelpMessage(null)
      }, 5000)
    }
  }, [helpMessage, setHelpMessage])

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
        <NetworkDropdownMenu account={account} disconnect={disconnect} />
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
      {!account && (
        <Highlight
          collisonPadding={{ right: 24 }}
          active={helpMessage === 'connectWalletMessage'}
          onClose={() => setHelpMessage(null)}
          title="Connect wallet"
          desc="Start playing Game of Life!"
        >
          <Button primary label="Connect" onClick={() => setOpen(true)} />
        </Highlight>
      )}

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
