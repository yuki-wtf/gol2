export function bitCount(data: string): number {
  const int = BigInt(data)
  let count = 0

  for (let mask = BigInt(1); int > mask; mask <<= BigInt(1)) {
    if ((int & mask) != BigInt(0)) {
      count++
    }
  }

  return count
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('bitCount', () => {
    const input = '39132555273291485155644251043342963441664'
    const output = 7

    expect(bitCount(input)).toEqual(output)
  })
}
