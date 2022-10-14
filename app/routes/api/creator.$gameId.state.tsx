import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { sql } from '~/db.server'

export async function loader({ request, params }: LoaderArgs): Promise<TypedResponse<string[]>> {
  const url = new URL(request.url)
  const frames = url.searchParams.get('frames')!.split(',')

  const result = await sql`
    select (
        select "gameState"
        from creator
        where "value" = COALESCE("gameGeneration", 1)
          and "transactionType" in ('game_created', 'game_evolved')
          and "gameId" = ${params.gameId}
      ) as "gameState"
    from (
        select unnest (${frames}::int []) as value
      ) as ids
  `

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return json(result.rows.map((r) => r.gameState))
}
