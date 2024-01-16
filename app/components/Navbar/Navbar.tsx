import styled from '@emotion/styled'
import ConnectWallet from './ConnectWallet.client'
import HeaderLogo from './HeaderLogo'
import MenuButton from './MenuButton'
import TempOverlay from '../TempOverlay'
import CreditsContainer from './CreditsContainer'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { Link, useLocation } from '@remix-run/react'
import ClientOnly from '../ClientOnly'
import Highlight from '../Highlight'
import { useCreatedSnapshot } from '~/hooks/CreatedSnapshot'
import { useEffect } from 'react'

const StyledNavbar = styled.header`
  position: relative;
  height: 120px;
  background-color: ${(props) => props.theme.colors.headerBackground};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.headerGradientStart} 1.01%,
    ${(props) => props.theme.colors.headerGradientEnd} 96.42%
  );
  border-bottom: 1px solid ${(props) => props.theme.colors.headerBorder};
`
const StyledNavbarInner = styled.header`
  height: 120px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 32px;
  gap: 40px;
  @media (max-width: 790px) {
    gap: 25px;
  }
`

const MenuButtonWithHighlight = () => {
  const [snapshot, setSnapshot] = useCreatedSnapshot()
  const { pathname } = useLocation()
  useEffect(() => {
    setSnapshot(null)
  }, [pathname, setSnapshot])
  return (
    <Highlight
      collisonPadding={{ left: 24 }}
      onClose={() => {
        setSnapshot(null)
      }}
      active={!!snapshot?.snapshotId}
      title="Snapshot created"
      desc="Mint as an NFT"
      descLink="/snapshots"
    >
      <MenuButton />
    </Highlight>
  )
}
const Navbar = () => {
  const [selectedCell] = useSelectedCell()
  const location = useLocation()

  return (
    <StyledNavbar>
      {selectedCell !== null && <TempOverlay />}

      <StyledNavbarInner>
        {/^\/menu(\/|$)/.test(location.pathname) ? null : <MenuButtonWithHighlight />}

        <Link to="/" title="Home">
          <HeaderLogo />
        </Link>
        {/^\/menu(\/|$)/.test(location.pathname) ? null : <CreditsContainer />}
        <div style={{ minWidth: 330, marginLeft: 'auto' }}>
          <ClientOnly>{() => <ConnectWallet />}</ClientOnly>
        </div>
      </StyledNavbarInner>
    </StyledNavbar>
  )
}

export default Navbar
