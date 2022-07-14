import { getChecksumAddress } from 'starknet'
import type { BigNumberish } from 'starknet/dist/utils/number'

export function getShortChecksumAddress(address: BigNumberish | string): string {
  if (typeof address !== 'string') {
    address = getChecksumAddress(address)
  }

  return address.slice(0, 2) + ' ' + address.slice(2, 6) + ' ... ' + address.slice(address.length - 4)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('getShortChecksumAddress', () => {
    {
      const long = '0x2bf0d1951393886de60fe3ef3d16482a1998d33e2572fac8b1fcfdcd59ead60'
      const short = '0x 2bf0 ... ad60'
      expect(getShortChecksumAddress(long)).toBe(short)
    }
    {
      const long = '123456aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7890'
      const short = '12 3456 ... 7890'
      expect(getShortChecksumAddress(long)).toBe(short)
    }
  })
}
