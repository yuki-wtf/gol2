import type { PendingNFT } from '~/components/Snapshot/Snapshot'

export const addPendingNftDetails = (snapshotsWithMintedNfts: any[], pendingMints: any[]) => {
  const idsToRemove: number[] = []
  const snapshotsWithPendingAndMintedNfts = [...snapshotsWithMintedNfts]
  snapshotsWithPendingAndMintedNfts.forEach((snapshot: any) => {
    const pendingMint = pendingMints.find((mint) => mint.generation == snapshot.gameGeneration)

    if (pendingMint) {
      if (snapshot.nft) {
        idsToRemove.push(pendingMint.generation)
        // remove pending mint from db
      } else {
        const pendingNft: PendingNFT = {
          type: 'pending',
          generation: pendingMint.generation,
          status: pendingMint.status,
          txHash: pendingMint.txHash,
          userId: pendingMint.userId,
        }

        snapshot.nft = pendingNft
      }
    }
  })

  return { snapshotsWithPendingAndMintedNfts, idsToRemove }
}
