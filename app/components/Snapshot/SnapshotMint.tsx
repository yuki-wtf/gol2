import styled from '@emotion/styled'
import { Link } from '@remix-run/react'
import { FaCircleCheck } from 'react-icons/fa6'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { getShortMintAddress } from '~/helpers/starknet'
import Button from '../Button'

const MintedAddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  a {
    color: inherit;
    :hover {
      opacity: 0.6;
    }
  }

  .address {
    color: #2d3038;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Mulish';
    font-weight: 800;
    font-size: 13px;
    line-height: 26px;
    > a {
      font-weight: 600;
    }
  }
`

export const SnapshotMint = () => {
  const address = '0x1234567890123456789012345678901234567890'
  const isLoading = false
  if (!address) {
    return (
      <Button
        secondary
        label={isLoading ? 'Pending' : 'Mint as NFT'}
        isLoading={isLoading}
        icon={isLoading}
        color="#F3E9E1"
      />
    )
  }

  if (address) {
    return (
      <MintedAddressContainer>
        <FaCircleCheck color="#27CE60" />
        <div className="address">
          MINTED ON CHAIN:
          <Link
            to={`https://rinkeby.etherscan.io/address/${address}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {getShortMintAddress(address, 5, 3)}
            <HiOutlineExternalLink />
          </Link>
        </div>
      </MintedAddressContainer>
    )
  }

  return null
}
