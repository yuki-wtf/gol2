import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { sql } from '~/db.server'

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<string[]>> {
  const url = new URL(request.url)
  const frames = url.searchParams.get('frames')!.split(',')

  const result = await sql`
    select (
        select max("gameState")
        from infinite
        where (
            (
              "value" = 1
              and "transactionType" = 'game_created'
            )
            or (
              "value" = "gameGeneration"
              and "transactionType" in ('game_evolved', 'cell_revived')
            )
          )
      ) as "gameState"
    from (
        select unnest (${frames}::int []) as value
      ) as ids
  `

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json(result.rows.map((r) => r.gameState))
}
