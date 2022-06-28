import DropdownMenu from '../../../DropDownMenu/DropDownMenu'
import { InjectedConnector } from '@starknet-react/core'
import { HiChevronDown, HiOutlineClipboardCopy, HiOutlineDocumentSearch, HiOutlineLogout } from 'react-icons/hi'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import { CgProfile } from 'react-icons/cg'
import { getShortChecksumAddress } from '~/helpers/starknet'

const UserDropdownMenu = ({ account, disconnect }) => {
  const [copyToClipboard, { success }] = useCopyToClipboard()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <CgProfile size={15} />
        {getShortChecksumAddress(account)}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>
          Connected to <strong>ArgentX</strong> via <strong>Starknet</strong>
        </DropdownMenu.Label>
        <DropdownMenu.Item
          onClick={(e) => {
            e.preventDefault()
            copyToClipboard(account)
          }}
        >
          <HiOutlineClipboardCopy size={24} />
          {success ? 'Copied' : ' Copy Address'}
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <HiOutlineDocumentSearch size={24} />
          View on Explorer
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => disconnect(new InjectedConnector())}>
          <HiOutlineLogout size={24} />
          Disconnect
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default UserDropdownMenu
