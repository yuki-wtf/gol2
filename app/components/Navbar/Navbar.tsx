import { useEffect } from 'react'
import styled from 'styled-components'
import ConnectWallet from './ConnectWallet/ConnectWallet'
import Credits from './Credits/Credits'
import CreatorCredits from './CreatorCredits/CreatorCredits'
import HeaderLogo from './Logo/Logo'
import MenuButton from './MenuButton/MenuButton'
import TempOverlay from '../TempOverlay/TempOverlay'
import { useSelector, useDispatch } from 'react-redux'
import useFetchTokens from '../../hooks/useFetchTokens'
import { updateSnapshots, updateTokenCount, updateTokenIds } from '../../features/Infinite/user/userSlice'
import GetUserCounts from '../CreatorGame/Game/Wrapped/GetUserCounts'
import { Route, Routes } from 'react-router-dom'

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
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid)
  const { creatorCreditsCount } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { tokenCount, tokens, snapshots } = useFetchTokens()
  // const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(updateTokenCount(tokenCount))
    dispatch(updateTokenIds(tokens))
    dispatch(updateSnapshots(snapshots))
  }, [tokenCount, snapshots, tokens, dispatch])
  return (
    <StyledNavbar>
      <GetUserCounts />
      {selectedCellRow !== null && <TempOverlay />}
      <StyledNavbarInner>
        <MenuButton onClick={() => console.log('test')} />

        <HeaderLogo />

        <Routes>
          <Route path="/infinite/*" element={<Credits />}></Route>
          <Route path="/creator/*" element={<CreatorCredits tokenCount={creatorCreditsCount} />}></Route>
        </Routes>

        <ConnectWallet />
      </StyledNavbarInner>
    </StyledNavbar>
  )
}

export default Navbar
