import axios from 'axios'
import dummyNFTs from './dummyNFTs.json'

export async function getUserNFTs(owner: string) {
  if (process.env.USE_MAINNET === 'false') {
    return Promise.resolve({
      data: dummyNFTs,
    })
  }
  const baseURL = `${process.env.ALCHEMY_API_BASE || ''}/nft/v3/${process.env.ALCHMEY_API_KEY || ''}}`

  // Alchemy URL
  const url = `${baseURL}/getNFTsForOwner/?owner=${owner}`

  const config = {
    method: 'get',
    url: url,
  }

  return axios(config)
}
