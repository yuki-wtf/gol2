import React from 'react'
import styled, { css } from 'styled-components'
const defaultButton = css`
  position: relative;
  height: 48px;
  width: 48px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border: 2px solid ${({ theme }) => theme.colors.buttonPrimary.defaultBorder};
  border-radius: 50%;
  text-align: center;
`
// Primary Button
const hoveredButtonPrimary = css`
  background: ${({ theme }) => theme.colors.buttonPrimary.hoverBackground};
  color: ${({ theme }) => theme.colors.buttonPrimary.hoverText};
`
const focusedButtonPrimary = css`
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
      border-radius: 50%;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
`
const disabledButtonPrimary = css`
  pointer-events: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.buttonPrimary.disabledText};
`
const activeButtonPrimary = css`
  background: ${({ theme }) => theme.colors.buttonPrimary.activeBackground};
`
const primaryButton = css`
  background: ${({ theme }) => theme.colors.buttonPrimary.defaultBackground};
  color: ${({ theme }) => theme.colors.buttonPrimary.defaultText};
  &:hover {
    ${(p) => !p.disabled && hoveredButtonPrimary}
  }
  &:focus {
    ${(p) => !p.disabled && focusedButtonPrimary}
  }
  &:disabled {
    /* border: 20px solid red; */
    background-color: transparent;
    pointer-events: none;
    > div svg path {
      fill: #0a0c10;
    }
  }
  &:active {
    ${activeButtonPrimary}
  }
`
export const StyledPlayPause = styled.button`
  ${defaultButton}
  ${primaryButton}
`

const PlayPauseBtn = ({ onClick, disabled, isPlaying, rest }) => {
  return (
    <StyledPlayPause onClick={onClick} disabled={disabled} {...rest}>
      {isPlaying ? (
        <svg width={14} height={20} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <rect width={4} height={20} rx={2} fill="#0A0C10" />
          <rect x={10} width={4} height={20} rx={2} fill="#0A0C10" />
        </svg>
      ) : (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.944 4.276l10.098 6.028c1.277.762 1.277 2.629 0 3.39L7.944 19.722C6.644 20.5 5 19.552 5 18.026V5.972c0-1.523 1.644-2.47 2.944-1.696z"
            fill="#0A0C10"
          />
        </svg>
      )}
    </StyledPlayPause>
  )
}

const StyledButtonContainer = styled.button`
  border: none;
  outline: none;
  width: 25px;
  height: 25px;
  background: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > div svg path {
    fill: #f3e9e1;
  }
  &:hover {
    > div svg path {
      fill: #e9d7c8;
    }
  }
  &:active {
    > div svg path {
      fill: #e9d7c8;
    }
  }
  &:disabled {
    pointer-events: none;
    > div svg path {
      fill: #0a0c10;
    }
  }
`

const ToStartBtn = (props) => {
  return (
    <StyledButtonContainer {...props}>
      <div>
        <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M0 1a1 1 0 012 0v18a1 1 0 11-2 0V1z" fill="#F3E9E1" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 7.402L16 1.34c2-1.155 4.5.288 4.5 2.598v12.124c0 2.31-2.5 3.753-4.5 2.598L5.5 12.598c-2-1.155-2-4.041 0-5.196zm1 1.732a1 1 0 000 1.732L17 16.928a1 1 0 001.5-.866V3.938a1 1 0 00-1.5-.866L6.5 9.134z"
            fill="#F3E9E1"
          />
        </svg>
      </div>
    </StyledButtonContainer>
  )
}

const StepForwardBtn = (props) => {
  return (
    <StyledButtonContainer {...props}>
      <div>
        <svg width={20} height={24} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M12.51 16.95V18H8.12v-1.05h1.56v-4.59l-1.45.87v-1.15l1.98-1.2h.75v6.07h1.55z" fill="#F3E9E1" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 6.732L12.5 9.33c-1.333.77-3-.192-3-1.732V2.402C9.5.862 11.167-.1 12.5.67L17 3.268c1.333.77 1.333 2.694 0 3.464zm-.75-1.299a.5.5 0 000-.866l-4.5-2.598a.5.5 0 00-.75.433v5.196a.5.5 0 00.75.433l4.5-2.598z"
            fill="#F3E9E1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 6a8 8 0 108 8 1 1 0 112 0A10 10 0 1110 4a1 1 0 110 2z"
            fill="#F3E9E1"
          />
        </svg>
      </div>
    </StyledButtonContainer>
  )
}

const ToEndBtn = (props) => {
  return (
    <StyledButtonContainer {...props}>
      <div>
        <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M19 1a1 1 0 112 0v18a1 1 0 11-2 0V1z" fill="#F3E9E1" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5 12.598L5 18.66C3 19.815.5 18.372.5 16.062V3.938C.5 1.628 3 .185 5 1.34l10.5 6.062c2 1.155 2 4.041 0 5.196zm-1-1.732a1 1 0 000-1.732L4 3.072a1 1 0 00-1.5.866v12.124a1 1 0 001.5.866l10.5-6.062z"
            fill="#F3E9E1"
          />
        </svg>
      </div>
    </StyledButtonContainer>
  )
}

const exportedObject = {
  ToStartBtn,
  StepForwardBtn,
  ToEndBtn,
  PlayPauseBtn,
}
export default exportedObject
