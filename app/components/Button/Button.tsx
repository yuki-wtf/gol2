import styled, { css } from 'styled-components'
import T from '../Typography/Typography'
import Spinner from '../Spinner/Spinner'

interface Props {
  readonly primary?: boolean
  readonly secondary?: boolean
  readonly tertiary?: boolean
  readonly icon?: React.ReactNode
  readonly isLoading?: boolean
  readonly label?: React.ReactNode
  readonly disabled?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
  readonly full?: boolean
  readonly tertiaryColor?: string
}

// Defaults
const defaultButton = css<Props>`
  position: relative;
  text-transform: uppercase;
  font-weight: 800;
  height: 40px;
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  width: ${(p) => (p.full ? '100%' : 'auto')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 0;
  padding-left: ${(p) => (p.icon ? '16px' : '24px')};
  padding-right: ${(p) => (p.icon ? '18px' : '24px')};
  border: 1px solid ${({ theme }) => theme.colors.buttonPrimary.defaultBorder};
  border-radius: 5px;
  text-align: center;
  gap: 4px;
  pointer-events: ${(p) => (p.isLoading ? 'none' : 'default')};
  letter-spacing: 0.1em;
`
// Primary Button
const hoveredButtonPrimary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonPrimary.hoverBackground};
  color: ${({ theme }) => theme.colors.buttonPrimary.hoverText};
`
const focusedButtonPrimary = css<Props>`
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
      border: 2px solid ${({ theme }) => theme.colors.buttonPrimary.focusedBorder};
      outline: 3px solid ${({ theme }) => theme.colors.buttonPrimary.focusedBackground};
      border-radius: 5px;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
`
const disabledButtonPrimary = css<Props>`
  pointer-events: none;
  background: ${({ theme }) => theme.colors.buttonPrimary.disabledBackground};
  color: ${({ theme }) => theme.colors.buttonPrimary.disabledText};
`
const activeButtonPrimary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonPrimary.activeBackground};
`
const primaryButton = css<Props>`
  background: ${({ theme }) => theme.colors.buttonPrimary.defaultBackground};
  color: ${({ theme }) => theme.colors.buttonPrimary.defaultText};
  &:hover {
    ${(p) => !p.disabled && hoveredButtonPrimary}
  }
  &:focus {
    ${(p) => !p.disabled && focusedButtonPrimary}
  }
  &:disabled {
    ${disabledButtonPrimary}
  }
  &:active {
    ${activeButtonPrimary}
  }
`
// Secondary Button
const hoveredButtonSecondary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonSecondary.hoverBackground};
  color: ${({ theme }) => theme.colors.buttonSecondary.hoverText};
`
const focusedButtonSecondary = css<Props>`
  &:focus-visible {
    background: ${({ theme }) => theme.colors.buttonSecondary.focusedBackground};
    outline: 2px;
    &:after {
      content: '';
      position: absolute;
      display: flex;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid ${({ theme }) => theme.colors.buttonSecondary.focusedBorder};
      outline: 3px solid ${({ theme }) => theme.colors.buttonSecondary.focusedBackground};
      border-radius: 5px;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
`
const disabledButtonSecondary = css<Props>`
  pointer-events: none;
  background: ${({ theme }) => theme.colors.buttonSecondary.disabledBackground};
  color: ${({ theme }) => theme.colors.buttonSecondary.disabledColor};
  border: 1px solid transparent;
`
const activeButtonSecondary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonSecondary.activeBackground};
`
const secondaryButton = css<Props>`
  background: ${({ theme }) => theme.colors.buttonSecondary.defaultBackground};
  color: ${({ theme }) => theme.colors.buttonSecondary.defaultColor};
  &:hover {
    ${(p) => !p.disabled && hoveredButtonSecondary}
  }
  &:focus {
    ${(p) => !p.disabled && focusedButtonSecondary}
  }
  &:disabled {
    ${disabledButtonSecondary}
  }
  &:active {
    ${activeButtonSecondary}
  }
`
// Tertiary Button
const hoveredButtonTertiary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonTertiary.hoverBackground};
  color: ${({ theme }) => theme.colors.buttonTertiary.hoverText};
  opacity: 0.7;
`
const focusedButtonTertiary = css<Props>`
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
const disabledButtonTertiary = css<Props>`
  pointer-events: none;
  background: ${({ theme }) => theme.colors.buttonTertiary.disabledBackground};
  color: ${({ theme }) => theme.colors.buttonTertiary.disabledText};
`
const activeButtonTertiary = css<Props>`
  background: ${({ theme }) => theme.colors.buttonTertiary.activeBackground};
`
const tertiaryButton = css<Props>`
  background: transparent;
  text-transform: none;
  font-weight: 500;
  border: none;
  color: ${(p) => (p.tertiaryColor ? p.tertiaryColor : 'white')};
  &:hover {
    ${(p) => !p.disabled && hoveredButtonTertiary}
  }
  &:focus {
    ${(p) => !p.disabled && focusedButtonTertiary}
  }
  &:disabled {
    ${disabledButtonTertiary}
  }
  &:active {
    ${activeButtonTertiary}
  }
`
export const StyledButton = styled.button<Props>`
  ${defaultButton}

  ${({ primary, secondary, tertiary }) => {
    switch (true) {
      case primary:
        return primaryButton

      case secondary:
        return secondaryButton

      case tertiary:
        return tertiaryButton

      default:
        return primaryButton
    }
  }}
`

const Button = ({
  primary,
  secondary,
  tertiary,
  icon,
  isLoading,
  label,
  disabled,
  onClick,
  full,
  tertiaryColor,
}: Props) => {
  return (
    <StyledButton
      full={full}
      primary={primary}
      secondary={secondary}
      tertiary={tertiary}
      isLoading={isLoading}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      tertiaryColor={tertiaryColor}
    >
      {icon && !isLoading && icon}
      {isLoading ? <Spinner /> : <T.Button>{label}</T.Button>}
    </StyledButton>
  )
}

export default Button
