import ContainerInner from '../../components/Layout/ContainerInner'
import Sidebar from '../../components/InfiniteGame/Sidebar/Sidebar'
import GameContainer from '../../components/InfiniteGame/Game/GameContainer'
import { GameWrapper, GameGridWrapper, SideBarWrapper } from '../../components/Layout/GameLayouts'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { OnChainPlay, ReceivedCell } from '~/db.server'
import { sql } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'
import { INFINITE_GAME_GENESIS } from '~/env'

interface LoaderData {
  readonly generations: number
  readonly livesGiven: number
  readonly extinctions: number
  readonly longestStablePeriod: number

  readonly onChainPlay: OnChainPlay[]
  readonly receivedCells: ReceivedCell[]
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const statistics = await sql<{ label: string; value: string }>`
    (
      select 'Generations' "label",
        max(COALESCE("gameGeneration", 1)) "value"
      from infinite
      limit 1
    )
    UNION ALL
    (
      select 'Lives given' "label",
        count(*) "value"
      from infinite
      where "transactionType" = 'cell_revived'
    )
    UNION ALL
    (
      select 'Extinctions' "label",
        count(*) "value"
      from infinite
      where "transactionType" = 'game_evolved'
        and "gameExtinct" = True
    )
  `

  const receivedCells = await sql<ReceivedCell>`
    SELECT
      "hash",
      "status",
      "functionCaller" "owner",
      "functionInputCellIndex" "cellIndex",
      "createdAt"
    FROM transaction
    WHERE status = 'RECEIVED'
      AND "functionName" = 'give_life_to_cell'
    ORDER BY "createdAt" DESC
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
      FROM transaction
      WHERE status = 'RECEIVED'
        AND CASE "functionName"
          WHEN 'create' THEN "functionInputGameState" = ${INFINITE_GAME_GENESIS}
          WHEN 'evolve' THEN "functionInputGameId" = ${INFINITE_GAME_GENESIS}
          WHEN 'give_life_to_cell' THEN TRUE
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
      FROM infinite
      ORDER BY COALESCE("gameGeneration", 1) desc, "gameState" desc
      LIMIT 5
    )
  `

  return json<LoaderData>({
    generations: parseInt(statistics.rows.find((r) => r.label === 'Generations').value),
    livesGiven: parseInt(statistics.rows.find((r) => r.label === 'Lives given').value),
    extinctions: parseInt(statistics.rows.find((r) => r.label === 'Extinctions').value),
    longestStablePeriod: 0,
    onChainPlay: onChainPlay.rows,
    receivedCells: receivedCells.rows,
  })
}

export default function InfinitePage() {
  useAutoRefresh()
  const data = useLoaderData<typeof loader>()
  console.log(data)
  return (
    <ContainerInner>
      <GameWrapper>
        <GameGridWrapper>
          <GameContainer
            currentFrame={data.generations}
            maxFrame={data.generations}
            receivedCells={data.receivedCells}
          />
        </GameGridWrapper>
        <SideBarWrapper>
          <Sidebar
            extinctions={data.extinctions}
            generations={data.generations}
            livesGiven={data.livesGiven}
            longestStablePeriod={data.longestStablePeriod}
            onChainPlay={data.onChainPlay}
          />
        </SideBarWrapper>
      </GameWrapper>
    </ContainerInner>
  )
}
