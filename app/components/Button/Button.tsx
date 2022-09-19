import styled from '@emotion/styled'
import T from '../Typography/Typography'
import Spinner from '../Spinner/Spinner'
import { css } from '@emotion/react'
import { Link } from '@remix-run/react'
import type { To } from 'react-router-dom'

interface Props {
  readonly primary?: boolean
  readonly secondary?: boolean
  readonly tertiary?: boolean
  readonly icon?: React.ReactNode
  readonly isLoading?: boolean
  readonly label?: React.ReactNode
  readonly disabled?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  readonly to?: To
  readonly full?: boolean
  readonly tertiaryColor?: string
}

// Defaults
const defaultButton = (p: any) => css`
  background-color: red;
  position: relative;
  text-transform: uppercase;
  font-weight: 800;
  height: 40px;
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  width: ${p.full ? '100%' : 'auto'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 0;
  padding-left: ${p.icon ? '16px' : '24px'};
  padding-right: ${p.icon ? '18px' : '24px'};
  border: 1px solid ${p.theme.colors.buttonPrimary.defaultBorder};
  border-radius: 5px;
  text-align: center;
  gap: 4px;
  pointer-events: ${p.isLoading ? 'none' : 'default'};
  letter-spacing: 0.1em;
`
// Primary Button
const hoveredButtonPrimary = (p: any) => css`
  background: ${p.theme.colors.buttonPrimary.hoverBackground};
  color: ${p.theme.colors.buttonPrimary.hoverText};
`
const focusedButtonPrimary = (p: any) => css`
  &:focus-visible {
    outline: 2px;
    &:after {
      content: '';
      position: absolute;
      display: flex;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid ${p.theme.colors.buttonPrimary.focusedBorder};
      outline: 3px solid ${p.theme.colors.buttonPrimary.focusedBackground};
      border-radius: 5px;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
`
const disabledButtonPrimary = (p: any) => css`
  pointer-events: none;
  background: ${p.theme.colors.buttonPrimary.disabledBackground};
  color: ${p.theme.colors.buttonPrimary.disabledText};
`
const activeButtonPrimary = (p: any) => css`
  background: ${p.theme.colors.buttonPrimary.activeBackground};
`
const primaryButton = (p: any) => css`
  background: ${p.theme.colors.buttonPrimary.defaultBackground};
  color: ${p.theme.colors.buttonPrimary.defaultText};
  &:hover {
    ${!p.disabled && hoveredButtonPrimary(p)}
  }
  &:focus {
    ${!p.disabled && focusedButtonPrimary(p)}
  }

  ${p.disabled && disabledButtonPrimary(p)}

  &:active {
    ${activeButtonPrimary(p)}
  }
`
// Secondary Button
const hoveredButtonSecondary = (p: any) => css`
  background: ${p.theme.colors.buttonSecondary.hoverBackground};
  color: ${p.theme.colors.buttonSecondary.hoverText};
`
const focusedButtonSecondary = (p: any) => css`
  &:focus-visible {
    background: ${p.theme.colors.buttonSecondary.focusedBackground};
    outline: 2px;
    &:after {
      content: '';
      position: absolute;
      display: flex;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid ${p.theme.colors.buttonSecondary.focusedBorder};
      outline: 3px solid ${p.theme.colors.buttonSecondary.focusedBackground};
      border-radius: 5px;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
`
const disabledButtonSecondary = (p: any) => css`
  pointer-events: none;
  background: ${p.theme.colors.buttonSecondary.disabledBackground};
  color: ${p.theme.colors.buttonSecondary.disabledColor};
  border: 1px solid transparent;
`
const activeButtonSecondary = (p: any) => css`
  background: ${p.theme.colors.buttonSecondary.activeBackground};
`
const secondaryButton = (p: any) => css`
  background: ${p.theme.colors.buttonSecondary.defaultBackground};
  color: ${p.theme.colors.buttonSecondary.defaultColor};
  &:hover {
    ${!p.disabled && hoveredButtonSecondary(p)}
  }
  &:focus {
    ${!p.disabled && focusedButtonSecondary(p)}
  }

  ${p.disabled && disabledButtonSecondary(p)}

  &:active {
    ${activeButtonSecondary(p)}
  }
`
// Tertiary Button
const hoveredButtonTertiary = (p: any) => css`
  background: ${p.theme.colors.buttonTertiary.hoverBackground};
  color: ${p.theme.colors.buttonTertiary.hoverText};
  opacity: 0.7;
`
const focusedButtonTertiary = (p: any) => css`
  &:focus-visible {
    outline: 2px;
    border: 2px solid green;
    &:after {
      content: '';
      position: absolute;
      display: block;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid green;
      outline: 3px solid red;
      border-radius: 5px;
      z-index: -1;
      background: red;
    }
  }
`
const disabledButtonTertiary = (p: any) => css`
  pointer-events: none;
  background: ${p.theme.colors.buttonTertiary.disabledBackground};
  color: ${p.theme.colors.buttonTertiary.disabledText};
`
const activeButtonTertiary = (p: any) => css`
  background: ${p.theme.colors.buttonTertiary.activeBackground};
`
const tertiaryButton = (p: any) => css`
  background: transparent;
  text-transform: none;
  font-weight: 500;
  border: none;
  color: ${p.tertiaryColor ? p.tertiaryColor : 'white'};
  &:hover {
    ${!p.disabled && hoveredButtonTertiary(p)}
  }
  &:focus {
    ${!p.disabled && focusedButtonTertiary(p)}
  }
  ${p.disabled && disabledButtonTertiary(p)}
  &:active {
    ${activeButtonTertiary(p)}
  }
`
export const StyledButton = styled.button<Props>`
  ${(p) => defaultButton(p)};

  ${(p) => {
    switch (true) {
      case p.primary:
        return primaryButton(p)

      case p.secondary:
        return secondaryButton(p)

      case p.tertiary:
        return tertiaryButton(p)

      default:
        return primaryButton(p)
    }
  }};
`

const StyledLink = StyledButton.withComponent(Link)

const Button = ({
  primary,
  secondary,
  tertiary,
  icon,
  isLoading,
  label,
  disabled,
  onClick,
  to,
  full,
  tertiaryColor,
}: Props) => {
  const Component = to != null ? StyledLink : StyledButton

  // if(isloading && icon)  render spinner
  // if (isloading and no icon ) render spinner
  const renderIconSpinner = () => {
    if (isLoading && icon != null) {
      return <Spinner />
    } else if (!isLoading && icon) {
      return icon
    }
  }
  return (
    <Component
      full={full}
      primary={primary}
      secondary={secondary}
      tertiary={tertiary}
      isLoading={isLoading}
      icon={icon}
      disabled={disabled}
      to={to}
      onClick={onClick}
      tertiaryColor={tertiaryColor}
    >
      {renderIconSpinner()}
      <T.Button>{label}</T.Button>
    </Component>
  )
}

export default Button
