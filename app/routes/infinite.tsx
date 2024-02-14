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
import PageIntro from '~/components/PageIntro'

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

interface Statistics {
  label: string
  value: string
}

export async function loader({ request, params }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const statistics = await sql<Statistics>`
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
        WHEN 'ACCEPTED_ON_L2' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
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
          WHEN 'ACCEPTED_ON_L2' THEN 'RECEIVED'
          else "status"
        END "status",
        CASE "functionName"
          WHEN 'create' THEN 'game_created'
          WHEN 'evolve' THEN 'game_evolved'
          WHEN 'give_life_to_cell' THEN 'cell_revived'
        END "type",
        "functionCaller" "owner",
        "createdAt",
        -1 "gameGeneration",
        -1 "gameState"
      FROM transaction t
      WHERE CASE "status"
          WHEN 'RECEIVED' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
          WHEN 'PENDING' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
          WHEN 'ACCEPTED_ON_L2' THEN (select "transactionHash" from infinite i where i."transactionHash" = t."hash") is null
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
        "createdAt",
        "gameGeneration",
        "gameState"
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
      <PageIntro.Container width="100%">
        <PageIntro.Icon color="#DBF267" />
        <PageIntro.Text>
          <span style={{ fontWeight: 700 }}>
            Mint NFT: <br />
          </span>
          Evolve the game to generate a unique Snapshot that vou can mint as an on-chain NFT!
        </PageIntro.Text>
      </PageIntro.Container>
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
