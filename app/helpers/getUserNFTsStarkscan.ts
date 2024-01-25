export async function getUserNFTs(owner: string) {
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS ?? ''
  const baseUrl = process.env.USE_MAINNET === 'true' ? 'https://api.starkscan.co' : 'https://api-testnet.starkscan.co'
  const url = `${baseUrl}/api/v0/nfts?contract_address=${contractAddress}&owner_address=${owner}&limit=100`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.STARKSCAN_API_KEY ?? '',
    },
  })
  const resJson = await res.json()
  if (resJson && resJson.status === 404) {
    throw new Error(resJson.message)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return resJson.data
}
