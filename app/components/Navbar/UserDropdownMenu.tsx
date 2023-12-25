import DropdownMenu from '../DropDownMenu'
import {
  HiChevronDown,
  HiOutlineClipboardCopy,
  HiOutlineDocumentSearch,
  HiOutlineLogout,
  HiOutlinePlusCircle,
} from 'react-icons/hi'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import { CgProfile } from 'react-icons/cg'
import { getShortChecksumAddress } from '~/helpers/starknet'
import golTokenIcon from '~/assets/images/gol-token-icon.png'
import { useEffect, useState } from 'react'
import { getChecksumAddress } from 'starknet'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useConnect } from '@starknet-react/core'

interface Props {
  readonly account: string
  readonly disconnect: () => void
}

const UserDropdownMenu = ({ account, disconnect }: Props) => {
  const [copyToClipboard, { success }] = useCopyToClipboard()
  const { connectors } = useConnect()
  const [wallet, setWallet] = useState<{ id: string; name: string }>()
  const { env } = useRootLoaderData()

  useEffect(() => {
    void (async () => {
      for (const connector of connectors) {
        const accountObj = await connector.account()
        if (accountObj != null) {
          if (getChecksumAddress(accountObj.address) === getChecksumAddress(account)) {
            setWallet({
              id: connector.id,
              name: connector.name,
            })
          }
        }
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <CgProfile size={15} />
        {getShortChecksumAddress(account)}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>
          Connected to <strong>{wallet?.name ?? 'Argent X'}</strong>
          {' via '} <strong>Starknet</strong>
        </DropdownMenu.Label>

        {/* // TODO show this only if a user has not added gol token to wallet */}
        <DropdownMenu.Item
          onClick={() => {
            const data = {
              type: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: env.CONTRACT_ADDRESS,
                  name: 'Game of Life Token',
                  symbol: 'GOL',
                  decimals: '0',
                  network: env.USE_MAINNET ? 'mainnet-alpha' : 'goerli-alpha',
                  image: golTokenIcon,
                },
              },
            }

            if (wallet?.id === 'argentX') {
              if (window.starknet != null) {
                void window.starknet.request(data)
              }
            }

            if (wallet?.id === 'braavos') {
              if (window.starknet_braavos != null) {
                void window.starknet_braavos.request(data)
              }
            }
          }}
        >
          <HiOutlinePlusCircle size={24} />
          Add GOL token to wallet
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={(e) => {
            e.preventDefault()
            copyToClipboard(account)
          }}
        >
          <HiOutlineClipboardCopy size={24} />
          {success ? 'Copied' : ' Copy Address'}
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => window.open(`https://voyager.online/contract/${account}`, '_blank')}>
          <HiOutlineDocumentSearch size={24} />
          View on Explorer
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            console.info('disconnect', disconnect())
          }}
        >
          <HiOutlineLogout size={24} />
          Disconnect
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default UserDropdownMenu
