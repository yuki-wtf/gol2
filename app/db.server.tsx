import { Client } from 'pg'
import invariant from 'tiny-invariant';

declare global {
  var __db__: Client
}

invariant(process.env.DATABASE_URL, "DATABASE_URL must be set");

global.__db__ ??= getClient()

function getClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  client.connect()

  return client
}

export const db = global.__db__

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
