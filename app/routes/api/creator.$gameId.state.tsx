import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { TypedResponse } from '@remix-run/react/dist/components'
import { sql } from '~/db.server'

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<string[]>> {
  const url = new URL(request.url)
  const frames = url.searchParams.get('frames').split(',')

  const result = await sql`
    select (
        select max("gameState")
        from creator
        where "value" = COALESCE("gameGeneration", 1)
          and "transactionType" in ('game_created', 'game_evolved')
      ) as "gameState"
    from (
        select unnest (${frames}::int []) as value
      ) as ids
  `

  return json(result.rows.map((r) => r.gameState))
}
