import { useState, useEffect } from 'react'
import { useStarknet } from '@starknet-react/core'
import Button from '../Button'
import UserDropdownMenu from './UserDropdownMenu'
import NetworkDropdownMenu from './NetworkDropdownMenu.client'
import Highlight from '~/components/Highlight'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { clearTimeout } from 'timers'
import Dialog from '../Dialog/Dialog'

const ConnectWallet = () => {
  const [open, setOpen] = useState(false)
  const { account, error, connectors, connect, disconnect } = useStarknet()
  const [helpMessage, setHelpMessage] = useHelpMessage()

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
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
      <Dialog
        contentActions={
          !account &&
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
            )
        }
        title="Connect a wallet to play"
        smallDescription={
          <p>
            By connecting a wallets, you agree to Starknet’s Terms of Service and acknowledge that you have read and
            understand the Starknet Protocol Disclaimer.
          </p>
        }
        open={open}
        onClose={() => setOpen(false)}
      />

      <Dialog
        contentActions={
          <>
            <a
              href="https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb"
              target="_blank"
              rel="noreferrer"
            >
              <Button full label="Install Argent X" secondary />
            </a>
            <a
              href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
              target="_blank"
              rel="noreferrer"
            >
              <Button full label="Install Braavos" secondary />
            </a>
          </>
        }
        title="Install a wallet"
        smallDescription={
          <p>
            By connecting a wallets, you agree to Starknet’s Terms of Service and acknowledge that you have read and
            understand the Starknet Protocol Disclaimer.
          </p>
        }
        open={open && !connectors.length}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

export default ConnectWallet
