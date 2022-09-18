import DropdownMenu from '../../../DropDownMenu/DropDownMenu'
import { HiChevronDown, HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaEthereum } from 'react-icons/fa'
import { CurrentNetwork } from '~/hooks/useGameContract'

const NetworkDropdownMenu = () => {
  const renderNetworkIcon = () => {
    switch (CurrentNetwork) {
      case 'goerli':
        return <HiOutlineGlobeAlt size={15} />

      case 'mainnet':
        return <FaEthereum size={15} />

      default:
        return <HiOutlineGlobeAlt size={15} />
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {renderNetworkIcon()}
        {CurrentNetwork}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>Select a network</DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={CurrentNetwork}
          onValueChange={(value) => {
            if (CurrentNetwork !== value) {
              if (value === 'goerli') {
                location.href = 'https://goerli.gol2.io/'
              } else if (value === 'mainnet') {
                location.href = 'https://gol2.io/'
              }
            }
          }}
        >
          <DropdownMenu.RadioItem value="mainnet">
            <FaEthereum size={24} />
            Mainnet
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="goerli">
            <HiOutlineGlobeAlt size={24} />
            Goerli
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default NetworkDropdownMenu
