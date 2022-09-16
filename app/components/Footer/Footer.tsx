import styled from '@emotion/styled'
import Typography from '../Typography/Typography'
import StarknetLogoLink from './Links/StarknetLogo'
import YukiLogoLink from './Links/YukiLogo'

const StyledFooter = styled.footer`
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.headerBackground};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.headerGradientStart} 1.01%,
    ${(props) => props.theme.colors.headerGradientEnd} 96.42%
  );
  border-top: 1px solid ${(props) => props.theme.colors.headerBorder};
`
const StyledFooterInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
`
const StyledStarkware = styled.div`
  display: flex;
  flex: 1;
  margin-left: auto;
  color: ${(props) => props.theme.colors.text200};
`
const StyledYuki = styled.div`
  display: flex;
  margin-left: auto;

  color: ${(props) => props.theme.colors.text200};
  & a {
    color: white;
    text-decoration: none;
  }
`
const StyledCredits = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  margin-left: auto;
`

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
const Link = styled.a`
  display: block;

  &:hover {
    opacity: 0.4;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterInner>
        <StyledLinks>
          <Link rel="noreferrer" href="https://twitter.com/GoL2io" title="Go to GOL2 Twitter" target="_blank">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10V10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.19077 14.4122 4.53013 14.4362 3.89004 14.31C4.16165 15.1625 4.69358 15.9084 5.41106 16.4429C6.12854 16.9775 6.99549 17.2737 7.89004 17.29C6.37367 18.4904 4.49404 19.1393 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
                fill="#57637B"
              />
            </svg>
          </Link>
          <Link rel="noreferrer" href="https://discord.gg/XNFJ6HCt" title="Join GOL2 Discord" target="_blank">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.2892 1.33294C16.9094 0.701268 15.4529 0.253139 13.9567 0C13.752 0.366002 13.5667 0.74257 13.4017 1.12813C11.808 0.887969 10.1873 0.887969 8.59355 1.12813C8.42847 0.742609 8.24322 0.366046 8.03857 0C6.54142 0.255277 5.08391 0.70447 3.7028 1.33624C0.960937 5.39287 0.217662 9.34875 0.589299 13.2485C2.195 14.4348 3.99224 15.3371 5.90289 15.916C6.33311 15.3374 6.7138 14.7235 7.04093 14.0809C6.4196 13.8489 5.81992 13.5626 5.24881 13.2253C5.39912 13.1163 5.54612 13.004 5.68817 12.895C7.34996 13.6765 9.16372 14.0817 11.0001 14.0817C12.8365 14.0817 14.6503 13.6765 16.312 12.895C16.4557 13.0123 16.6027 13.1246 16.7514 13.2253C16.1792 13.5631 15.5784 13.85 14.956 14.0826C15.2827 14.7249 15.6634 15.3382 16.094 15.916C18.0063 15.3394 19.8049 14.4376 21.4109 13.2501C21.847 8.7277 20.666 4.80816 18.2892 1.33294ZM7.51167 10.8502C6.47604 10.8502 5.62045 9.91033 5.62045 8.75413C5.62045 7.59792 6.44631 6.64983 7.50836 6.64983C8.57042 6.64983 9.41941 7.59792 9.40124 8.75413C9.38307 9.91033 8.56712 10.8502 7.51167 10.8502ZM14.4885 10.8502C13.4513 10.8502 12.599 9.91033 12.599 8.75413C12.599 7.59792 13.4248 6.64983 14.4885 6.64983C15.5523 6.64983 16.3946 7.59792 16.3765 8.75413C16.3583 9.91033 15.544 10.8502 14.4885 10.8502Z"
                fill="#57637B"
              />
            </svg>
          </Link>
        </StyledLinks>
        <StyledCredits>
          <StyledYuki>
            <Typography.XL1Semibold>
              Created by{' '}
              <a href="https://yuki.wtf" title="Go to Yūki">
                <YukiLogoLink />
              </a>
            </Typography.XL1Semibold>
          </StyledYuki>
          <StyledStarkware>
            powered by <StarknetLogoLink />
          </StyledStarkware>
        </StyledCredits>
      </StyledFooterInner>
    </StyledFooter>
  )
}

export default Footer
