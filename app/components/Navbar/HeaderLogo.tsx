import { Route, Routes } from 'react-router-dom'
import styled from '@emotion/styled'
import PageLogoTitle from '~/components/PageLogoTitle'

const LogoWrapper = styled.div`
  position: relative;
  top: 3px;
`

export default function HeaderLogo() {
  return (
    <LogoWrapper>
      <Routes>
        <Route path="/infinite/*" element={<PageLogoTitle variant="infinite" text="Infinite" />}></Route>
        <Route path="/creator/*" element={<PageLogoTitle variant="creator" text="Creator" />}></Route>
        <Route path="/snapshots/*" element={<PageLogoTitle variant="snapshots" text="Snapshots" />}></Route>
        <Route path="/howitworks/*" element={<PageLogoTitle variant="howitworks" text="How it works" />}></Route>
        <Route path="/about/*" element={<PageLogoTitle variant="about" text="About" />}></Route>
        <Route path="/*" element={<PageLogoTitle variant="default" />}></Route>
      </Routes>
    </LogoWrapper>
  )
}
