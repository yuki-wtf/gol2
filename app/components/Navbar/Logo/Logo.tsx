import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import AboutLogo from '../../Logos/Header/AboutLogo'
import CreatorLogo from '../../Logos/Header/CreatorLogo'
import DefaultLogo from '../../Logos/Header/DefaultLogo'
import HowitworksLogo from '../../Logos/Header/HowitworksLogo'
import InfiniteLogo from '../../Logos/Header/InfiniteLogo'
import SnapshotsLogo from '../../Logos/Header/SnapshotsLogo'

const LogoWrapper = styled.div`
  position: relative;
  top: 3px;
`

export default function HeaderLogo() {
  return (
    <LogoWrapper>
      <Routes>
        <Route path="/infinite/*" element={<InfiniteLogo />}></Route>
        <Route path="/creator/*" element={<CreatorLogo />}></Route>
        <Route path="/snapshots/*" element={<SnapshotsLogo />}></Route>
        <Route path="/howitworks/*" element={<HowitworksLogo />}></Route>
        <Route path="/about/*" element={<AboutLogo />}></Route>
        <Route path='/*' element={<DefaultLogo />}></Route>
      </Routes>
    </LogoWrapper>
  )
}
