import { ThemeProvider } from '@emotion/react'
import { creator } from '../../../styles/themes/creator'
import ContainerInner from '../../../components/Layout/ContainerInner'
import Sidebar from '../../../components/CreatorGame/Sidebar/Sidebar'
import CreatorGameHeader from '../../../components/CreatorGameHeader/CreatorGameHeader'
import GameContainer from '../../../components/CreatorGame/GameContainer'
import type { CreatorGame, OnChainPlay } from '~/db.server'
import { sql } from '~/db.server'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { TypedResponse } from '@remix-run/server-runtime'
import { bitCount } from '~/helpers/bitCount'
import { useLoaderData } from '@remix-run/react'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'

interface LoaderData {
  readonly generations: number
  readonly uniquePlayers: number
  readonly cellsToStart: number
  readonly gamesByUser: number
  readonly game: CreatorGame
  readonly onChainPlay: readonly OnChainPlay[]
}

export async function loader({ request, params }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const games = await sql<CreatorGame>`
    select
      "transactionOwner" "gameOwner",
      "gameId",
      "createdAt",
      (
        select COALESCE(c2."gameGeneration", 1)
        from creator c2
        where c2."gameId" = c1."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameGeneration",
      (
        select c2."gameState"
        from creator c2
        where c2."gameId" = c1."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameState"
    from creator c1
    where "transactionType" = 'game_created'
      and "gameId" = ${params.gameId}
    limit 1
  `

  const game = games.rows[0]

  const statistics = await sql<{ label: string; value: string }>`
    (
      select 'Generations' "label",
        COALESCE(max("gameGeneration"), 1) "value"
      from creator
      where "gameId" = ${params.gameId}
      limit 1
    )
    UNION ALL
    (
      select 'Unique Players' "label",
        COUNT(DISTINCT "transactionOwner") "value"
      from creator
      where "gameId" = ${params.gameId}
    )
    UNION ALL
    (
      select 'Cells To Start' "label",
        "gameState" "value"
      from creator
      where "gameId" = ${params.gameId}
        and "transactionType" = 'game_created'
    )
    UNION ALL
    (
      select 'Games By User' "label",
        count(*) "value"
      from creator
      where "transactionOwner" = ${game.gameOwner}
        and "transactionType" = 'game_created'
    )
  `

  const onChainPlay = await sql<OnChainPlay>`
    (
      SELECT
        "hash",
        "status",
        CASE "functionName"
          WHEN 'create' THEN 'game_created'
          WHEN 'evolve' THEN 'game_evolved'
          WHEN 'give_life_to_cell' THEN 'cell_revived'
        END "type",
        "functionCaller" "owner",
        "createdAt"
      FROM transaction t
      WHERE CASE "status"
          WHEN 'RECEIVED' THEN TRUE
          WHEN 'PENDING' THEN (select "transactionHash" from creator c where c."transactionHash" = t."hash") is null
          else FALSE
        END
        AND CASE "functionName"
          WHEN 'create' THEN "functionInputGameState" = ${params.gameId}
          WHEN 'evolve' THEN "functionInputGameId" = ${params.gameId}
          WHEN 'give_life_to_cell' THEN FALSE
        END
      ORDER BY "createdAt" DESC
    )

    UNION ALL

    (
      SELECT
        "transactionHash" "hash",
        "txStatus" "status",
        "transactionType" "type",
        "transactionOwner" "owner",
        "createdAt"
      FROM creator
      WHERE "gameId" = ${params.gameId}
      ORDER BY COALESCE("gameGeneration", 1) DESC
      LIMIT 5
    )

  `

  return json<LoaderData>({
    generations: parseInt(statistics.rows.find((r) => r.label === 'Generations').value),
    uniquePlayers: parseInt(statistics.rows.find((r) => r.label === 'Unique Players').value),
    cellsToStart: bitCount(statistics.rows.find((r) => r.label === 'Cells To Start').value),
    gamesByUser: parseInt(statistics.rows.find((r) => r.label === 'Games By User').value),
    game: games.rows[0],
    onChainPlay: onChainPlay.rows,
  })
}

export default function CreatorGamePage() {
  useAutoRefresh()
  const { cellsToStart, gamesByUser, generations, uniquePlayers, onChainPlay, game } = useLoaderData<typeof loader>()

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '100%',
            maxWidth: '882px',
            margin: '1vh auto 0',
            paddingBottom: 64,
            gap: 64,
          }}
        >
          <div style={{ width: 544, minWidth: 544 }}>
            <CreatorGameHeader gameId={game.gameId} gameOwner={game.gameOwner} />
            <GameContainer
              gameId={game.gameId}
              currentFrame={parseInt(game.gameGeneration)}
              maxFrame={parseInt(game.gameGeneration)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              // maxWidth: "274px",
              flex: 1,
            }}
          >
            <Sidebar
              cellsToStart={cellsToStart}
              gamesByUser={gamesByUser}
              generations={generations}
              onChainPlay={onChainPlay}
              uniquePlayers={uniquePlayers}
            />
          </div>
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
