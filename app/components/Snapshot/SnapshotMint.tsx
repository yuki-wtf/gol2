import styled from '@emotion/styled'
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
  const address = '0x04f556396283bb4702d8434542f31e76b8ed9a2ccdcf9af77efa629c72ed4218'
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
          <a
            href={`https://starkscan.co/block/${address}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {getShortMintAddress(address, 5, 3)}
            <HiOutlineExternalLink />
          </a>
        </div>
      </MintedAddressContainer>
    )
  }

  return null
}
