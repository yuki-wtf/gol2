import { getChecksumAddress } from 'starknet'
import type { BigNumberish } from 'starknet'

export function getShortChecksumAddress(address: BigNumberish | string): string {
  const checksumAddress = getChecksumAddress(address).toLowerCase()

  return checksumAddress.slice(0, 6) + '...' + checksumAddress.slice(checksumAddress.length - 4)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('getShortChecksumAddress #1', () => {
    const long = '0x2bf0d1951393886de60fe3ef3d16482a1998d33e2572fac8b1fcfdcd59ead60'
    const short = '0x02bf...ad60'
    expect(getShortChecksumAddress(long)).toBe(short)
  })
  it('getShortChecksumAddress #2', () => {
    const long = '1242183891794214040002074274514933996473193662983245409254398531555775393120'
    const short = '0x02bf...ad60'
    expect(getShortChecksumAddress(long)).toBe(short)
  })
  it('getShortChecksumAddress #2', () => {
    const long = '932097343094516780977311641685690157093908922685193531952538698512374685643'
    const short = '0x020f...dfcb'
    expect(getShortChecksumAddress(long)).toBe(short)
  })
}
