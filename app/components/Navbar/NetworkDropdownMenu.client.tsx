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
        <DropdownMenu.Item asChild>
          <a href="https://gol2.io/" title="Mainnet">
            <FaEthereum size={24} />
            Mainnet
            {env.USE_MAINNET && <DropdownMenu.LinkItemIndicator />}
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <a href="https://goerli.gol2.io/" title="Goerli">
            <HiOutlineGlobeAlt size={24} /> Goerli
            {!env.USE_MAINNET && <DropdownMenu.LinkItemIndicator />}
          </a>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default NetworkDropdownMenu
