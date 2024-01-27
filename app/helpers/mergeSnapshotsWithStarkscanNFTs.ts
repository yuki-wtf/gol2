// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { getChecksumAddress } from 'starknet'
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

export function mergeSnapshotsWithNFTs(snapshots, nfts) {
  const nftsByGeneration = transformNfts(nfts)

  const snapshotsWithNfts = snapshots.map((snapshot) => {
    const snapshotWithNft = { ...snapshot }
    const nft = nftsByGeneration[snapshot.gameGeneration]

    if (nft && getChecksumAddress(nft.contract_address) === getChecksumAddress(targetContractAddress)) {
      const gameModeAttribute = nft.attributes.find((attr) => attr.trait_type === 'Game Mode')

      const nftData = {
        ...nft.raw?.metadata,
        gameGeneration: snapshot.gameGeneration,
        transactionHash: nft.minted_at_transaction_hash,
        contractAddress: nft.contract_address,
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

// Sample data
// nft_id: '0x00f4ad66ea867300f97ec6e47c2d0aaa201367c1265a00b6b643fab77531bb82_5',
// contract_address: '0x00f4ad66ea867300f97ec6e47c2d0aaa201367c1265a00b6b643fab77531bb82',
// token_id: '5',
// name: 'GoL2 #5',
// description: 'Snapshot of GoL2 Game at Generation #5',
// external_url: 'https://gol2.io',
// attributes: [ [Object], [Object], [Object], [Object], [Object] ],
// image_url: 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22910%22%20height=%22910%22%20viewBox=%220%200%20910%20910%22%3E%3Cg%20transform=%22translate(5%205)%22%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22%231e222b%22/%3E%3Cg%20stroke=%22%235e6266%22%20stroke-width=%221%22%3E%3Cline%20x1=%220%22%20y1=%2260%22%20x2=%22900%22%20y2=%2260%22/%3E%3Cline%20x1=%2260%22%20y1=%220%22%20x2=%2260%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22120%22%20x2=%22900%22%20y2=%22120%22/%3E%3Cline%20x1=%22120%22%20y1=%220%22%20x2=%22120%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22180%22%20x2=%22900%22%20y2=%22180%22/%3E%3Cline%20x1=%22180%22%20y1=%220%22%20x2=%22180%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22240%22%20x2=%22900%22%20y2=%22240%22/%3E%3Cline%20x1=%22240%22%20y1=%220%22%20x2=%22240%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22300%22%20x2=%22900%22%20y2=%22300%22/%3E%3Cline%20x1=%22300%22%20y1=%220%22%20x2=%22300%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22360%22%20x2=%22900%22%20y2=%22360%22/%3E%3Cline%20x1=%22360%22%20y1=%220%22%20x2=%22360%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22420%22%20x2=%22900%22%20y2=%22420%22/%3E%3Cline%20x1=%22420%22%20y1=%220%22%20x2=%22420%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22480%22%20x2=%22900%22%20y2=%22480%22/%3E%3Cline%20x1=%22480%22%20y1=%220%22%20x2=%22480%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22540%22%20x2=%22900%22%20y2=%22540%22/%3E%3Cline%20x1=%22540%22%20y1=%220%22%20x2=%22540%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22600%22%20x2=%22900%22%20y2=%22600%22/%3E%3Cline%20x1=%22600%22%20y1=%220%22%20x2=%22600%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22660%22%20x2=%22900%22%20y2=%22660%22/%3E%3Cline%20x1=%22660%22%20y1=%220%22%20x2=%22660%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22720%22%20x2=%22900%22%20y2=%22720%22/%3E%3Cline%20x1=%22720%22%20y1=%220%22%20x2=%22720%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22780%22%20x2=%22900%22%20y2=%22780%22/%3E%3Cline%20x1=%22780%22%20y1=%220%22%20x2=%22780%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22840%22%20x2=%22900%22%20y2=%22840%22/%3E%3Cline%20x1=%22840%22%20y1=%220%22%20x2=%22840%22%20y2=%22900%22/%3E%3C/g%3E%3Cg%20fill=%22%23dff17b%22%20stroke=%22%23dff17b%22%20stroke-width=%220.5%22%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(660%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(840%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20540)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20540)%22/%3E%3C/g%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22none%22%20stroke=%22%230a0c10%22%20stroke-width=%225%22/%3E%3C/g%3E%3C/svg%3E',
// image_small_url: 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22910%22%20height=%22910%22%20viewBox=%220%200%20910%20910%22%3E%3Cg%20transform=%22translate(5%205)%22%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22%231e222b%22/%3E%3Cg%20stroke=%22%235e6266%22%20stroke-width=%221%22%3E%3Cline%20x1=%220%22%20y1=%2260%22%20x2=%22900%22%20y2=%2260%22/%3E%3Cline%20x1=%2260%22%20y1=%220%22%20x2=%2260%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22120%22%20x2=%22900%22%20y2=%22120%22/%3E%3Cline%20x1=%22120%22%20y1=%220%22%20x2=%22120%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22180%22%20x2=%22900%22%20y2=%22180%22/%3E%3Cline%20x1=%22180%22%20y1=%220%22%20x2=%22180%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22240%22%20x2=%22900%22%20y2=%22240%22/%3E%3Cline%20x1=%22240%22%20y1=%220%22%20x2=%22240%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22300%22%20x2=%22900%22%20y2=%22300%22/%3E%3Cline%20x1=%22300%22%20y1=%220%22%20x2=%22300%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22360%22%20x2=%22900%22%20y2=%22360%22/%3E%3Cline%20x1=%22360%22%20y1=%220%22%20x2=%22360%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22420%22%20x2=%22900%22%20y2=%22420%22/%3E%3Cline%20x1=%22420%22%20y1=%220%22%20x2=%22420%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22480%22%20x2=%22900%22%20y2=%22480%22/%3E%3Cline%20x1=%22480%22%20y1=%220%22%20x2=%22480%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22540%22%20x2=%22900%22%20y2=%22540%22/%3E%3Cline%20x1=%22540%22%20y1=%220%22%20x2=%22540%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22600%22%20x2=%22900%22%20y2=%22600%22/%3E%3Cline%20x1=%22600%22%20y1=%220%22%20x2=%22600%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22660%22%20x2=%22900%22%20y2=%22660%22/%3E%3Cline%20x1=%22660%22%20y1=%220%22%20x2=%22660%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22720%22%20x2=%22900%22%20y2=%22720%22/%3E%3Cline%20x1=%22720%22%20y1=%220%22%20x2=%22720%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22780%22%20x2=%22900%22%20y2=%22780%22/%3E%3Cline%20x1=%22780%22%20y1=%220%22%20x2=%22780%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22840%22%20x2=%22900%22%20y2=%22840%22/%3E%3Cline%20x1=%22840%22%20y1=%220%22%20x2=%22840%22%20y2=%22900%22/%3E%3C/g%3E%3Cg%20fill=%22%23dff17b%22%20stroke=%22%23dff17b%22%20stroke-width=%220.5%22%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(660%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(840%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20540)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20540)%22/%3E%3C/g%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22none%22%20stroke=%22%230a0c10%22%20stroke-width=%225%22/%3E%3C/g%3E%3C/svg%3E',
// image_medium_url: 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22910%22%20height=%22910%22%20viewBox=%220%200%20910%20910%22%3E%3Cg%20transform=%22translate(5%205)%22%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22%231e222b%22/%3E%3Cg%20stroke=%22%235e6266%22%20stroke-width=%221%22%3E%3Cline%20x1=%220%22%20y1=%2260%22%20x2=%22900%22%20y2=%2260%22/%3E%3Cline%20x1=%2260%22%20y1=%220%22%20x2=%2260%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22120%22%20x2=%22900%22%20y2=%22120%22/%3E%3Cline%20x1=%22120%22%20y1=%220%22%20x2=%22120%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22180%22%20x2=%22900%22%20y2=%22180%22/%3E%3Cline%20x1=%22180%22%20y1=%220%22%20x2=%22180%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22240%22%20x2=%22900%22%20y2=%22240%22/%3E%3Cline%20x1=%22240%22%20y1=%220%22%20x2=%22240%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22300%22%20x2=%22900%22%20y2=%22300%22/%3E%3Cline%20x1=%22300%22%20y1=%220%22%20x2=%22300%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22360%22%20x2=%22900%22%20y2=%22360%22/%3E%3Cline%20x1=%22360%22%20y1=%220%22%20x2=%22360%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22420%22%20x2=%22900%22%20y2=%22420%22/%3E%3Cline%20x1=%22420%22%20y1=%220%22%20x2=%22420%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22480%22%20x2=%22900%22%20y2=%22480%22/%3E%3Cline%20x1=%22480%22%20y1=%220%22%20x2=%22480%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22540%22%20x2=%22900%22%20y2=%22540%22/%3E%3Cline%20x1=%22540%22%20y1=%220%22%20x2=%22540%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22600%22%20x2=%22900%22%20y2=%22600%22/%3E%3Cline%20x1=%22600%22%20y1=%220%22%20x2=%22600%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22660%22%20x2=%22900%22%20y2=%22660%22/%3E%3Cline%20x1=%22660%22%20y1=%220%22%20x2=%22660%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22720%22%20x2=%22900%22%20y2=%22720%22/%3E%3Cline%20x1=%22720%22%20y1=%220%22%20x2=%22720%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22780%22%20x2=%22900%22%20y2=%22780%22/%3E%3Cline%20x1=%22780%22%20y1=%220%22%20x2=%22780%22%20y2=%22900%22/%3E%3Cline%20x1=%220%22%20y1=%22840%22%20x2=%22900%22%20y2=%22840%22/%3E%3Cline%20x1=%22840%22%20y1=%220%22%20x2=%22840%22%20y2=%22900%22/%3E%3C/g%3E%3Cg%20fill=%22%23dff17b%22%20stroke=%22%23dff17b%22%20stroke-width=%220.5%22%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20360)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(540%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20420)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(600%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(660%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(840%20480)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(720%20540)%22/%3E%3Crect%20width=%2260%22%20height=%2260%22%20transform=%22translate(780%20540)%22/%3E%3C/g%3E%3Crect%20width=%22900%22%20height=%22900%22%20fill=%22none%22%20stroke=%22%230a0c10%22%20stroke-width=%225%22/%3E%3C/g%3E%3C/svg%3E',
// animation_url: null,
// minted_by_address: '0x03a33a013cc7a9b632c685b7e7df3c318beb1cc8e9d08e0e54a3fd34b88abeba',
// minted_at_transaction_hash: '0x06da7e4ae39d153b658ea7eb3ab6948db71eeb3c69e826ab0eb6e489a8520e66',
// minted_at_timestamp: 1705573232
