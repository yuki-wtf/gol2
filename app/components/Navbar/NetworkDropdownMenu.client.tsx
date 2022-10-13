import DropdownMenu from '../DropDownMenu'
import { HiChevronDown, HiOutlineGlobeAlt } from 'react-icons/hi'
import { FaEthereum } from 'react-icons/fa'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

const NetworkDropdownMenu = () => {
  const { env } = useRootLoaderData()
  const currentNetwork = env.USE_MAINNET ? 'mainnet' : 'goerli'

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {env.USE_MAINNET ? <FaEthereum size={15} /> : <HiOutlineGlobeAlt size={15} />}
        {currentNetwork}
        <HiChevronDown size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={5}>
        <DropdownMenu.Label>Select a network</DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={currentNetwork}
          onValueChange={(value) => {
            if (currentNetwork !== value) {
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
