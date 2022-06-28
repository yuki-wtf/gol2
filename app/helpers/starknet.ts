import { getChecksumAddress } from 'starknet'
import { BigNumberish } from 'starknet/dist/utils/number'

export function getShortChecksumAddress(address: BigNumberish | string): string {
  if (typeof address !== 'string') {
    address = getChecksumAddress(address)
  }

  return address.slice(0, 2) + ' ' + address.slice(2, 6) + ' ... ' + address.slice(address.length - 4)
}
