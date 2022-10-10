/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    name: string
    colors: {
      cell: {
        cellPendingBackground: string
        cellLiveBackground: string
        cellDefaultBackground: string
        cellPreLiveBackground: string
        cellDefaultHover: string
      }
      dropdownMenu: {
        triggerBackground: string
        triggerColor: string
        triggerBorder: string
        triggerHoverBackground: string
        triggerHoverColor: string
        contentBackground: string
        contentBorder: string
        contentLabel: string
        itemBackground: string
        itemColor: string
        itemHoverBackground: string
      }
      buttonPrimary: {
        defaultBackground: string
        defaultColor: string
        defaultBorder: string
        hoverBackground: string
        hoverColor: string
        hoverBorder: string
        activeBackground: string
        activeColor: string
        activeBorder: string
        focusedBackground: string
        focusedColor: string
        focusedBorder: string
        disabledBackground: string
        disabledColor: string
        disabledBorder: string
      }
      buttonSecondary: {
        defaultBackground: string
        defaultColor: string
        defaultBorder: string
        hoverBackground: string
        hoverColor: string
        hoverBorder: string
        activeBackground: string
        activeColor: string
        activeBorder: string
        focusedBackground: string
        focusedColor: string
        focusedBorder: string
        disabledBackground: string
        disabledColor: string
        disabledBorder: string
      }
      buttonTertiary: {
        defaultBackground: string
        defaultColor: string
        defaultBorder: string
        hoverBackground: string
        hoverColor: string
        hoverBorder: string
        activeBackground: string
        activeColor: string
        activeBorder: string
        focusedBackground: string
        focusedColor: string
        focusedBorder: string
        disabledBackground: string
        disabledColor: string
        disabledBorder: string
      }
      body: string
      bodyText: string
      disabledText: string
      disabled: string
      grid: string
      gridBorder: string
      gridLine: string
      gridCellLive: string
      gridCellActive: string
      gridCellDead: string
      gridCellBorder: string
      gridCellHover: string
      gridHeaderFooter: string
      gridHeaderFooterBackground: string
      primary: string
      secondary: string
      infinitePrimary: string
      creatorPrimary: string
      snapshotsPrimary: string
      howitworksPrimary: string
      aboutPrimary: string
      infinite100: string
      creator100: string
      snapshots100: string
      howitworks100: string
      about100: string
      infinite200: string
      creator200: string
      snapshots200: string
      howitworks200: string
      about200: string
      headerBackground: string
      headerGradientStart: string
      headerGradientEnd: string
      headerBorder: string
      neutral100: string
      neutral200: string
      neutral300: string
      neutral400: string
      text50: string
      text100: string
      text200: string
      text300: string
      text400: string
      highLight: string
      lightGrey: string
      heart: string
    }
    flexboxgrid: {
      gridSize: number
      gutterWidth: number
      outerMargin: number
      mediaQuery: string
      container: {
        sm: number
        md: number
        lg: number
      }
      breakpoints: {
        xs: number
        sm: number
        md: number
        lg: number
      }
    }
  }
}

interface Window {
  __style?: Element
}
