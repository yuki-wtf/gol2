import { Global, css } from '@emotion/react'
import { useTheme } from '@emotion/react'

export const GlobalStyle = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        :root {
          --infinite-primary: #dbf267;
          --creator-primary: #8aed9b;
          --snapshots-primary: #f06b97;
          --howitworks-primary: #83e8fe;
          --about-primary: #ffceaa;
          --about-secondary: #ffceaa;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Mulish', sans-serif;
          color: ${theme.colors.bodyText};
          background-color: #000;
          font-size: 16px;
        }
        .tagline2 {
          opacity: 0;
        }
        .link {
          font-size: 36px;
          text-decoration: none;
          text-transform: uppercase;
          height: 139px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 26px;
          /* background: aqua; */
          margin: 0;
          padding-left: 144px;
        }

        @media only screen and (max-height: 900px) {
          .link {
            height: 110px;
            font-size: 32px;
          }
        }
        @media only screen and (max-width: 1000px) {
          .menuCont {
            width: 50% !important;
          }
          .link {
            padding-left: 64px;
          }
        }

        .descP {
          font-size: 15px;
          line-height: 26px;
          position: relative;
        }
        .descHeading {
          font-size: 24px;
          font-weight: 800;
          position: relative;
        }
        .descImg {
          margin-top: 20px;
          position: relative;
        }
        a {
          text-decoration: none;
        }
        .mobileMessage {
          display: none;
        }
        @media (max-width: 750px) {
          .appContainer {
            display: none;
          }
          .mobileMessage {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            background-color: #1d222c;
            height: 100vh;
            padding: 20px;
          }
          .mobileMessageIconContainer {
            position: absolute;
            width: 122px;
            height: 122px;
            border-radius: 50%;
            border: 1px solid #0a0c10;
            z-index: 3;
            left: 50%;
            top: 50%;
            margin-left: -61px;
            margin-top: -61px;
            background-color: #1d222c;
            color: #f9c7d8;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .mobileMessageLogoContainerTag {
            text-align: center;
            color: #ff7979;
            text-transform: uppercase;

            font-style: normal;
            font-weight: 600;
            font-size: 12.2651px;
            line-height: 14px;
            letter-spacing: 1px;
          }
          .mobileMessageLogoContainer {
            width: 100%;
            flex: 1;
            border: 1px solid #0a0c10;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #f9c7d8;
          }
          .mobileMessageTextContainer {
            flex: 1;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            font-size: 18px;

            border: 1px solid #0a0c10;
            border-top: 0;
            color: #f9c7d8;
            line-height: 170%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .mobileMessageTextContainer p {
            max-width: 320px;
            text-align: center;
          }
        }
      `}
    />
  )
}
