import DropdownMenu from '../../../DropDownMenu/DropDownMenu'
import {
  HiChevronDown,
  HiOutlineClipboardCopy,
  HiOutlineDocumentSearch,
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi'
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

        {/* // TODO show this only if a user has not added gol token to wallet */}
        <DropdownMenu.Item>
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
        <DropdownMenu.Item>
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
