import styled from '@emotion/styled'
import { FaCircleCheck } from 'react-icons/fa6'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { getShortMintAddress } from '~/helpers/starknet'
import { useAccount, useProvider } from '@starknet-react/core'
import { CallData, cairo } from 'starknet'
import Button from '../Button'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'

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

export const SnapshotMint = ({ generation, nft }: { generation: string }) => {
  const { account } = useAccount()
  const { provider } = useProvider()
  const { env } = useRootLoaderData()
  const voyagerUrl = env.USE_MAINNET ? 'https://voyager.online' : 'https://goerli.voyager.online'

  const mintGame = async (generation: string) => {
    if (!account) {
      return
    }

    const multiCall = await account.execute([
      {
        contractAddress: env.CONTRACT_ADDRESS!,
        entrypoint: 'increase_allowance',
        calldata: CallData.compile([env.NFT_CONTRACT_ADDRESS!, cairo.uint256(1)]),
      },
      // Calling the second contract
      {
        contractAddress: env.NFT_CONTRACT_ADDRESS!,
        entrypoint: 'mint',
        calldata: CallData.compile([generation]),
      },
    ])
    const res = await provider.waitForTransaction(multiCall.transaction_hash)
    console.log('res', res)
  }

  const isLoading = false
  if (!nft) {
    return (
      <Button
        secondary
        label={isLoading ? 'Pending' : 'Mint as NFT'}
        isLoading={isLoading}
        icon={isLoading}
        color="#F3E9E1"
        onClick={(e) => {
          mintGame(generation).then((minted) => {
            console.log('minted', minted)
          })
          e.stopPropagation()
        }}
      />
    )
  }

  if (nft) {
    return (
      <MintedAddressContainer>
        <FaCircleCheck color="#27CE60" />
        <div className="address">
          MINTED ON CHAIN:
          <a
            href={`${voyagerUrl}/tx/${nft.transactionHash}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {getShortMintAddress(nft.transactionHash, 5, 3)}
            <HiOutlineExternalLink />
          </a>
        </div>
      </MintedAddressContainer>
    )
  }

  return null
}
