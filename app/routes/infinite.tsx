import ContainerInner from '../components/ContainerInner'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { OnChainPlay, ReceivedCell } from '~/db.server'
import { sql } from '~/db.server'
import { useLoaderData } from '@remix-run/react'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'
import { INFINITE_GAME_GENESIS } from '~/env'
import GameContainer from '~/components/GameMode/Infinite/GameContainer'
import Sidebar from '~/components/GameMode/Infinite/Sidebar'
import styled from '@emotion/styled'

interface LoaderData {
  readonly generations: number
  readonly livesGiven: number
  readonly extinctions: number
  readonly longestStablePeriod: number

  readonly currentFrame: number
  readonly maxFrame: number

  readonly onChainPlay: OnChainPlay[]
  readonly receivedCells: ReceivedCell[]
}

export async function loader({ request, params }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
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
    FROM transaction t
    WHERE CASE "status"
        WHEN 'RECEIVED' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
        WHEN 'PENDING' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
        else FALSE
      END
      AND "functionName" = 'give_life_to_cell'
    ORDER BY "createdAt" DESC
  `

  const onChainPlay = await sql<OnChainPlay>`
    (
      SELECT
        "hash",
        CASE "status"
          WHEN 'PENDING' THEN 'RECEIVED'
          else "status"
        END "status",
        CASE "functionName"
          WHEN 'create' THEN 'game_created'
          WHEN 'evolve' THEN 'game_evolved'
          WHEN 'give_life_to_cell' THEN 'cell_revived'
        END "type",
        "functionCaller" "owner",
        "createdAt"
      FROM transaction t
      WHERE CASE "status"
          WHEN 'RECEIVED' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
          WHEN 'PENDING' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
          WHEN 'REJECTED' THEN "createdAt" > (now() - interval '15 minutes')
          else FALSE
        END
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

  const stats = {
    generations: parseInt(statistics.rows.find((r) => r.label === 'Generations')!.value),
    livesGiven: parseInt(statistics.rows.find((r) => r.label === 'Lives given')!.value),
    extinctions: parseInt(statistics.rows.find((r) => r.label === 'Extinctions')!.value),
    longestStablePeriod: 0,
  }

  return json<LoaderData>({
    ...stats,
    onChainPlay: onChainPlay.rows,
    receivedCells: receivedCells.rows,
    currentFrame: params.gameGeneration != null ? parseInt(params.gameGeneration) : stats.generations,
    maxFrame: stats.generations,
  })
}

export default function InfinitePage() {
  useAutoRefresh()
  const data = useLoaderData<typeof loader>()

  return (
    <ContainerInner>
      <GameWrapper>
        <GameGridWrapper>
          <GameContainer currentFrame={data.currentFrame} maxFrame={data.maxFrame} receivedCells={data.receivedCells} />
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

const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  margin: 6vh auto 0;
  padding-bottom: 64px;
  gap: 64px;
`
const GameGridWrapper = styled.div`
  width: 544px;
`
const SideBarWrapper = styled.div`
  display: flex;
  flex: 1;
`
