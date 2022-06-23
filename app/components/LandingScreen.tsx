import { Link } from '@remix-run/react'
import styled, { css } from 'styled-components'

export const LandingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 800px;
  margin: 0 auto;
  /* height: 100vh; */
`

export const Message = styled(Link)`
  height: 100px;
  text-transform: uppercase;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding: 0 48px;
  border: 1px solid #5a647b;
  border-radius: 11px;
  opacity: 0;
  letter-spacing: 3.3px;
  color: inherit;
`

export const Tagline = styled.div`
  margin-top: 30px;
  color: #737373;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 0;
  /* line-height: 170%; */
  color: #ff7979;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  gap: 12px;
  letter-spacing: 2.3px;
  opacity: 0;

  > span {
    padding-right: 12px;
    border-right: 2px solid var(--color-neutral-neutral-100);
  }
`
export const Last = styled.span`
  ${Tagline} > & {
    border-right: 0px solid red;
  }
`
export const Logo = styled.svg`
  opacity: 0;
`
