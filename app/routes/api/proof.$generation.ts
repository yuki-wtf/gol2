import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { sql } from '~/db.server'

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<string[]>> {
  const result = await sql<{ generation: string; proof: string }[]>`
    SELECT *
    FROM whitelist
    WHERE generation = ${params.generation}
  `

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return json(result.rows[0] ?? null)
}
