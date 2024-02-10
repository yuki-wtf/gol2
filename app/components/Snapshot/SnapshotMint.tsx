import styled from '@emotion/styled'
import { FaCircleCheck } from 'react-icons/fa6'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { getShortMintAddress } from '~/helpers/starknet'
import { useAccount, useProvider } from '@starknet-react/core'
import { CallData, cairo } from 'starknet'
import Button from '../Button'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useNftContract } from '~/hooks/useNftContract'
import { useCheckNetwork } from '~/helpers/useCheckNetwork'
import { useDialog } from '~/hooks/Dialog'
import { useUser } from '~/hooks/useUser'
import type { NFT } from './Snapshot'

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

interface Props {
  generation: string
  gameState: string
  createdAt: string
  nft?: NFT
  refreshPage?: () => void
}
export const SnapshotMint = ({ generation, gameState, createdAt, nft, refreshPage }: Props) => {
  const user = useUser()
  const { account } = useAccount()
  const { provider } = useProvider()
  const { env } = useRootLoaderData()
  const starkscan = env.USE_MAINNET ? 'https://starkscan.co' : 'https://testnet.starkscan.co'
  const { isCorrectNetwork } = useCheckNetwork()
  const [_, setDialog] = useDialog()
  const { contract: nftContract } = useNftContract()
  const isPreMigrationGeneration = Number(generation) <= Number(env.MIGRATION_GENERATION_MARKER)

  const addMintToPending = async (generationNumber: number, txHash: string) => {
    const formData = new FormData()

    formData.append('generation', String(generationNumber))
    formData.append('txHash', txHash)
    formData.append('userId', user?.userId || '')
    formData.append('status', 'RECEIVED')

    const res = await fetch('/api/mints', {
      body: formData,
      method: 'post',
    })

    const data = await res.json()
    if (data.status === 'success') {
      refreshPage?.()
    }
  }

  const onMintError = async (generationNumber: string) => {
    const formData = new FormData()

    formData.append('generation', String(generationNumber))

    const res = await fetch('/api/mints', {
      body: formData,
      method: 'delete',
    })

    const data = await res.json()
    if (data.status === 'success') {
      refreshPage?.()
    }
  }

  const mintGame = async (generation: string) => {
    if (!account || !nftContract) {
      return
    }

    const { mint_token_address, mint_price } = nftContract
    const price = await mint_price()
    const tokenAddress = await mint_token_address()
    const calls = [
      {
        contractAddress: tokenAddress.toString(),
        entrypoint: 'increaseAllowance',
        calldata: CallData.compile([env.NFT_CONTRACT_ADDRESS!, cairo.uint256(price)]),
      },
    ]

    if (isPreMigrationGeneration) {
      const response = await fetch(`/api/proof/${generation}`)
      const data = await response.json()

      if (!data?.proof) {
        console.error(`No proof exists for generation ${generation}`)
      }

      if (!createdAt || !gameState) {
        console.error(`Missing createdAt or gameState for generation ${generation}`)
      }

      const proofs = data.proof.split(',')
      const timestamp = Math.floor(new Date(data[0]?.createdAt).getTime() / 1000)
      const callData = [Number(generation), gameState, timestamp, proofs]
      const whitelistMint = {
        contractAddress: env.NFT_CONTRACT_ADDRESS!,
        entrypoint: 'whitelist_mint',
        calldata: CallData.compile(callData),
      }
      calls.push(whitelistMint)
    } else {
      const mint = {
        contractAddress: env.NFT_CONTRACT_ADDRESS!,
        entrypoint: 'mint',
        calldata: CallData.compile([generation]),
      }
      calls.push(mint)
    }
    const multiCall = await account.execute(calls)

    addMintToPending(generation, multiCall.transaction_hash)

    return provider.waitForTransaction(multiCall.transaction_hash)
  }

  const isPending = nft?.type === 'pending'
  const isDisabled = isPending || isPreMigrationGeneration
  let mint = null
  if (!nft || isPending) {
    mint = (
      <Button
        secondary
        label={isPending ? 'Pending' : isPreMigrationGeneration ? 'Mint soon' : 'Mint as NFT'}
        isLoading={isPending}
        icon={isPending}
        color="#F3E9E1"
        disabled={isDisabled}
        disableCursor={true}
        onClick={(e) => {
          e.stopPropagation()
          if (!isCorrectNetwork) {
            setDialog('WrongNetworkDialog')
            return
          }
          mintGame(generation).catch((err) => onMintError(generation))
        }}
      />
    )
  } else {
    mint = (
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

  return mint
}
