import DropdownMenu from '../../../DropDownMenu/DropDownMenu'
import { HiChevronDown, HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaEthereum } from 'react-icons/fa'
import { useEffect, useState } from 'react'

function currentNetwork() {
  return location.hostname === 'gol2.io' ? 'mainnet' : 'goerli'
}

const NetworkDropdownMenu = () => {
  const [network, setNetwork] = useState(currentNetwork)

  const renderNetworkIcon = () => {
    switch (network) {
      case 'goerli':
        return <HiOutlineGlobeAlt size={15} />

      case 'mainnet':
        return <FaEthereum size={15} />

      default:
        return <HiOutlineGlobeAlt size={15} />
    }
  }

  useEffect(() => {
    if (currentNetwork() !== network) {
      if (network === 'goerli') {
        location.href = 'https://goerli.gol2.io/'
      } else if (network === 'mainnet') {
        location.href = 'https://gol2.io/'
      }
    }
  }, [network])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {renderNetworkIcon()}
        {network}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>Select a network</DropdownMenu.Label>
        <DropdownMenu.RadioGroup value={network} onValueChange={setNetwork}>
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
