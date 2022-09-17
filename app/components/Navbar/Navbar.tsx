import styled from '@emotion/styled'
import ConnectWallet from './ConnectWallet/ConnectWallet.client'
import HeaderLogo from './Logo/Logo'
import MenuButton from './MenuButton/MenuButton'
import TempOverlay from '../TempOverlay/TempOverlay'
import CreditsContainer from './Credits/CreditsContainer'
import { useSelectedCell } from '~/hooks/SelectedCell'
import { useLocation } from 'react-router-dom'
import { Link } from '@remix-run/react'
import ClientOnly from '../ClientOnly'

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

const Navbar = () => {
  const [selectedCell] = useSelectedCell()
  const location = useLocation()

  return (
    <StyledNavbar>
      {selectedCell !== null && <TempOverlay />}

      <StyledNavbarInner>
        {/^\/menu(\/|$)/.test(location.pathname) ? null : <MenuButton />}

        <Link to="/" title="Home">
          <HeaderLogo />
        </Link>
        {/^\/menu(\/|$)/.test(location.pathname) ? null : <CreditsContainer />}
        <div style={{ minWidth: 330 }}>
          <ClientOnly>{() => <ConnectWallet />}</ClientOnly>
        </div>
      </StyledNavbarInner>
    </StyledNavbar>
  )
}

export default Navbar
