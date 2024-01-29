// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { getChecksumAddress } from 'starknet'
import type { MintedNFT } from '~/components/Snapshot/Snapshot'
const targetContractAddress = process.env.NFT_CONTRACT_ADDRESS

function transformNfts(nfts) {
  const nftsByGeneration = {}
  nfts.forEach((nft) => {
    if (nft.token_id) {
      nftsByGeneration[nft.token_id] = nft
    }
  })
  return nftsByGeneration
}

export function addMintedNftDetails(snapshots, nfts) {
  const nftsByGeneration = transformNfts(nfts)

  const snapshotsWithNfts = snapshots.map((snapshot) => {
    const snapshotWithNft = { ...snapshot }
    const nft = nftsByGeneration[snapshot.gameGeneration]

    if (nft && getChecksumAddress(nft.contract_address) === getChecksumAddress(targetContractAddress)) {
      const gameModeAttribute = nft.attributes.find((attr) => attr.trait_type === 'Game Mode')

      const nftData: MintedNFT = {
        type: 'minted',
        tokenId: nft.token_id,
        userAddress: nft.minted_by_address,
        gameGeneration: snapshot.gameGeneration,
        transactionHash: nft.minted_at_transaction_hash,
        contractAddress: nft.contract_address,
      }
      if (gameModeAttribute) {
        nftData.gameMode = gameModeAttribute.value
      }
      snapshotWithNft.nft = nftData
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return snapshotWithNft
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return snapshotsWithNfts
}
