// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const targetContractAddress = process.env.NFT_CONTRACT_ADDRESS

function transformNfts(nfts) {
  const nftsByGeneration = {}
  nfts.forEach((nft) => {
    const generationAttribute = nft.raw.metadata?.attributes.find((attr) => attr.trait_type === 'Generation')
    if (generationAttribute) {
      const generation = generationAttribute.value.toString()
      nftsByGeneration[generation] = nft
    }
  })
  return nftsByGeneration
}

export function mergeSnapshotsWithNFTs(snapshots, nfts) {
  const nftsByGeneration = transformNfts(nfts)

  const snapshotsWithNfts = snapshots.map((snapshot) => {
    const snapshotWithNft = { ...snapshot }
    const nft = nftsByGeneration[snapshot.gameGeneration]
    if (nft && nft.contract.address === targetContractAddress) {
      const gameModeAttribute = nft.raw.metadata.attributes.find((attr) => attr.trait_type === 'Game Mode')

      const nftData = {
        ...nft.raw?.metadata,
        gameGeneration: snapshot.gameGeneration,
        tokenUri: nft.raw.tokenUri,
        transactionHash: snapshot.transactionHash,
      }
      if (gameModeAttribute) {
        nftData.gameMode = gameModeAttribute.value
      }
      delete nftData.attributes
      snapshotWithNft.nft = nftData
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return snapshotWithNft
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return snapshotsWithNfts
}
