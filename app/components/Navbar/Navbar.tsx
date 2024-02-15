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
  const [snapshotCreated, setSnapshotCreated] = useCreatedSnapshot()
  const { pathname } = useLocation()
  useEffect(() => {
    setSnapshotCreated(false)
  }, [pathname, setSnapshotCreated])
  return (
    <Highlight
      collisonPadding={{ left: 24 }}
      onClose={() => {
        setSnapshotCreated(false)
      }}
      type="snapshot"
      noOverlay={true}
      active={snapshotCreated && pathname === '/infinite'}
      title="Keep track of mint status on Snapshots page"
      desc="View snapshots"
      descLink="/snapshots"
      containerPadding="5px 2px 3px 2px"
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
