import { Client } from 'pg'
import invariant from 'tiny-invariant'

invariant(process.env.DATABASE_URL, 'DATABASE_URL must be set')

declare global {
  var __db__: Promise<Client> | null | undefined
}

export async function getDB() {
  global.__db__ ??= new Promise((resolve, reject) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    })

    client
      .connect()
      .then(() => resolve(client))
      .catch((err) => reject(err))
  })

  return global.__db__
}

export async function sql<T = any>(strings: TemplateStringsArray, ...values: any[]) {
  const db = await getDB()

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
  readonly gameOwner: string
  readonly gameId: string
  readonly gameGeneration: string
  readonly gameState: string
  readonly createdAt: Date
}
