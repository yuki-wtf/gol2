import { useState, useEffect } from 'react'
import { useStarknet } from '@starknet-react/core'
import Button from '../../Button/Button'
import UserDropdownMenu from './UserDropdownMenu/UserDropdownMenu'
import NetworkDropdownMenu from './NetworkDropdownMenu/NetworkDropdownMenu.client'
import DialogDownloadWallet from '../../DialogDownloadWallet/DialogDownloadWallet'
import DialogWallet from '~/components/DialogWallet/DialogWallet'
import Highlight from '~/components/Highlight/Highlight'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { clearTimeout } from 'timers'
import DialogSwitchWallet from '~/components/DialogSwitchWallet/DialogSwitchWallet'

const ConnectWallet = () => {
  const [open, setOpen] = useState(false)
  const [wrongNetworkDialogOpen, setWrongNetworkDialogOpen] = useState(false)
  const { account, error, connectors, connect, disconnect } = useStarknet()
  const [helpMessage, setHelpMessage] = useHelpMessage()

  useEffect(() => {
    let timer
    if (helpMessage === 'connectWalletMessage') {
      timer = setTimeout(() => {
        setHelpMessage(null)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
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
      {!account && (
        <Highlight
          collisonPadding={{ right: 24 }}
          active={helpMessage === 'connectWalletMessage'}
          onClose={() => setHelpMessage(null)}
          title="Connect wallet"
          desc="Start playing Game of Life!"
        >
          <Button
            primary
            label="Connect"
            onClick={() => {
              setHelpMessage(null)
              setOpen(true)
            }}
          />
        </Highlight>
      )}
      <DialogWallet open={open} onClose={() => setOpen(false)}>
        {!account &&
          !error &&
          connectors
            .sort((a, b) => a.id().localeCompare(b.id()))
            .map((connector, i) =>
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
      {/* TODO - wrong network modal to be shown */}
      <DialogSwitchWallet
        currentNetwork={'Testnet'}
        wrongNetwork={'Mainnet'}
        open={wrongNetworkDialogOpen}
        onClose={() => {
          setWrongNetworkDialogOpen(false)
        }}
      />
    </div>
  )
}

export default ConnectWallet
