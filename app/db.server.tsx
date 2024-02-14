import type { QueryResultRow } from 'pg'
import { Pool } from 'pg'
import invariant from 'tiny-invariant'
import type { TxnStatus } from './components/TxnRow'

invariant(process.env.DATABASE_URL, 'DATABASE_URL must be set')

declare global {
  // eslint-disable-next-line no-var
  var __DB_POOL__: Pool | null | undefined
}

export function getPool(): Pool {
  global.__DB_POOL__ ??= new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  return global.__DB_POOL__
}

export async function sql<T extends QueryResultRow>(strings: TemplateStringsArray, ...values: unknown[]) {
  const db = getPool()

  return db.query<T>({
    text: String.raw(strings, ...values.map((_, i) => `$${i + 1}`)),
    values,
  })
}

export interface Infinite {
  readonly transactionHash: string
  readonly transactionType: string
  readonly transactionOwner: string
  readonly gameGeneration: string
  readonly gameState: string
  readonly revivedCellIndex: number | null
  readonly txStatus: string
  readonly gameExtinct: boolean
  readonly createdAt: Date
}

export interface Creator {
  readonly transactionHash: string
  readonly transactionType: string
  readonly transactionOwner: string
  readonly gameId: string
  readonly gameGeneration: string
  readonly gameState: string
  readonly txStatus: string
  readonly gameOver: boolean
  readonly createdAt: Date
}

export interface CreatorGame {
  readonly gameOwner: string
  readonly gameId: string
  readonly gameGeneration: string
  readonly gameState: string
  readonly createdAt: Date
}

export interface OnChainPlay {
  readonly hash: string
  readonly status: TxnStatus
  readonly type: 'game_created' | 'game_evolved' | 'cell_revived'
  readonly owner: string
  readonly gameGeneration?: string
  readonly gameState?: string
  readonly createdAt: Date
}

export interface ReceivedCell {
  readonly hash: string
  readonly status: string
  readonly owner: string
  readonly cellIndex: number
  readonly createdAt: Date
}
