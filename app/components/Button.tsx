import styled from '@emotion/styled'
import T from './Typography'
import Spinner from './Spinner'
import { css } from '@emotion/react'
import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'

interface Props {
  readonly primary?: boolean
  readonly secondary?: boolean
  readonly tertiary?: boolean
  readonly icon?: React.ReactNode
  readonly isLoading?: boolean
  readonly label?: React.ReactNode
  readonly disabled?: boolean
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  readonly to?: LinkProps['to']
  readonly full?: boolean
  readonly tertiaryColor?: string
  readonly color?: string
  readonly disableCursor?: boolean
}

const StyledButton = styled.button<Props>`
  background-color: red;
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
  border: 1px solid ${(p) => p.theme.colors.buttonPrimary.defaultBorder};
  border-radius: 5px;
  text-align: center;
  gap: 4px;
  pointer-events: ${(p) => (p.isLoading ? 'none' : 'default')};
  letter-spacing: 0.1em;

  ${(p) => {
    switch (true) {
      case p.secondary:
        return css`
          background: ${p.theme.colors.buttonSecondary.defaultBackground};
          color: ${p.theme.colors.buttonSecondary.defaultColor};
          &:hover {
            ${!p.disabled &&
            css`
              background: ${p.theme.colors.buttonSecondary.hoverBackground};
              color: ${p.theme.colors.buttonSecondary.hoverColor};
            `}
          }
          &:focus {
            ${!p.disabled &&
            css`
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
            `}
          }

          ${p.disabled &&
          css`
            ${p.disableCursor
              ? css`
                  cursor: not-allowed;
                `
              : css`
                  pointer-events: none;
                `}
            background: ${p.theme.colors.buttonSecondary.disabledBackground};
            color: ${p.theme.colors.buttonSecondary.disabledColor};
            border: 1px solid transparent;
          `}

          &:active {
            ${css`
              background: ${p.theme.colors.buttonSecondary.activeBackground};
            `}
          }
        `

      case p.tertiary:
        return css`
          background: transparent;
          text-transform: none;
          font-weight: 500;
          border: none;
          color: ${p.tertiaryColor ? p.tertiaryColor : 'white'};
          &:hover {
            ${!p.disabled &&
            css`
              background: ${p.theme.colors.buttonTertiary.hoverBackground};
              color: ${p.theme.colors.buttonTertiary.hoverColor};
              opacity: 0.7;
            `}
          }
          &:focus {
            ${!p.disabled &&
            css`
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
            `}
          }
          ${p.disabled &&
          css`
            ${p.disableCursor
              ? css`
                  cursor: not-allowed;
                `
              : css`
                  pointer-events: none;
                `}
            background: ${p.theme.colors.buttonTertiary.disabledBackground};
            color: ${p.theme.colors.buttonTertiary.disabledColor};
          `}
          &:active {
            ${css`
              background: ${p.theme.colors.buttonTertiary.activeBackground};
            `}
          }
        `
      case p.primary:
      default:
        return css`
          background: ${p.theme.colors.buttonPrimary.defaultBackground};
          color: ${p.theme.colors.buttonPrimary.defaultColor};
          &:hover {
            ${!p.disabled &&
            css`
              background: ${p.theme.colors.buttonPrimary.hoverBackground};
              color: ${p.theme.colors.buttonPrimary.hoverColor};
            `}
          }
          &:focus {
            ${!p.disabled &&
            css`
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
            `}
          }

          ${p.disabled &&
          css`
            pointer-events: none;
            ${p.disableCursor
              ? css`
                  cursor: not-allowed;
                `
              : css`
                  pointer-events: none;
                `}
            background: ${p.theme.colors.buttonPrimary.disabledBackground};
            color: ${p.theme.colors.buttonPrimary.disabledColor};
          `}

          &:active {
            ${css`
              background: ${p.theme.colors.buttonPrimary.activeBackground};
            `}
          }
        `
    }
  }};
`

const StyledLink = StyledButton.withComponent(Link)

export default function Button({
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
  color,
  disableCursor,
}: Props) {
  const Component = to != null ? StyledLink : StyledButton

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
      to={to!}
      onClick={onClick}
      tertiaryColor={tertiaryColor}
      disableCursor={disableCursor}
    >
      {renderIconSpinner()}
      <T.Button color={color}>{label}</T.Button>
    </Component>
  )
}
