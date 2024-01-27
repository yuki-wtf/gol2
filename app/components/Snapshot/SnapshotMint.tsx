import styled from '@emotion/styled'
import { FaCircleCheck } from 'react-icons/fa6'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { getShortMintAddress } from '~/helpers/starknet'
import { useAccount, useProvider } from '@starknet-react/core'
import { CallData, cairo } from 'starknet'
import Button from '../Button'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useFetcher } from '@remix-run/react'
import { useNftContract } from '~/hooks/useNftContract'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'
import { useDialog } from '~/hooks/Dialog'

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
  const starkscan = env.USE_MAINNET ? 'https://starkscan.co' : 'https://testnet.starkscan.co'
  const fetcher = useFetcher()
  const { isCorrectNetwork } = useCheckNetwork()
  const [_, setDialog] = useDialog()
  const { contract: nftContract } = useNftContract()

  const mintGame = async (generation: string) => {
    if (!account || !nftContract) {
      return
    }

    const { mint_token_address, mint_price } = nftContract
    const price = await mint_price()
    const tokenAddress = await mint_token_address()

    const multiCall = await account.execute([
      {
        contractAddress: tokenAddress.toString(),
        entrypoint: 'increaseAllowance',
        calldata: CallData.compile([env.NFT_CONTRACT_ADDRESS!, cairo.uint256(price)]),
      },
      // Calling the second contract
      {
        contractAddress: env.NFT_CONTRACT_ADDRESS!,
        entrypoint: 'mint',
        calldata: CallData.compile([generation]),
      },
    ])
    return provider.waitForTransaction(multiCall.transaction_hash)
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
          e.stopPropagation()
          if (!isCorrectNetwork) {
            setDialog('WrongNetworkDialog')
            return
          }
          mintGame(generation).then((minted) => {
            console.log('minted', minted)
            fetcher.load('/snapshots')
          })
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
            href={`${starkscan}/nft/${nft.contractAddress}/${nft.gameGeneration}`}
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
