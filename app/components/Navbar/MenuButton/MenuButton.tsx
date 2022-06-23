import { Link } from '@remix-run/react'
import styled from 'styled-components'

const MenuButtonWrapper = styled(Link)`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding-block: 1px;
  padding-inline: 4px;
  height: 24px;

  &:hover {
    opacity: 0.4;
  }
`

const MenuButton = ({ onClick /* = () => console.log('rest') */, ...rest }) => {
  return (
    <MenuButtonWrapper to="/menu">
      <svg width={26} height={20} viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path
          d="M2.333 2h21.334M2.333 10h21.334M2.333 18h21.334"
          stroke="#F3E9E1"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </MenuButtonWrapper>
  )
}

export default MenuButton
