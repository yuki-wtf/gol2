import ContainerInner from '../../components/Layout/ContainerInner'
import Sidebar from '../../components/InfiniteGame/Sidebar/Sidebar'
import GameContainer from '../../components/InfiniteGame/Game/GameContainer'
import { GameWrapper, GameGridWrapper, SideBarWrapper } from '../../components/Layout/GameLayouts'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Infinite } from '~/db.server'
import { sql } from '~/db.server'
import type { TypedResponse } from '@remix-run/react/dist/components'
import { createStateContext } from 'react-use'
import { SelectedCellProvider } from '~/hooks/SelectedCell'

interface LoaderData {
  readonly generations: number
  readonly livesGiven: number
  readonly extinctions: number
  readonly longestStablePeriod: number

  readonly onChainPlay: Infinite[]
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const statistics = await sql<{ label: string; value: string }>`
    (
      select 'Generations' "label",
        max("gameGeneration") "value"
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

  const onChainPlay = await sql<Infinite>`
    select *
    from infinite
    order by "transactionType" = 'game_created', "gameGeneration", "gameState"
    limit 5
  `

  return json<LoaderData>({
    generations: parseInt(statistics.rows.find((r) => r.label === 'Generations').value),
    livesGiven: parseInt(statistics.rows.find((r) => r.label === 'Lives given').value),
    extinctions: parseInt(statistics.rows.find((r) => r.label === 'Extinctions').value),
    longestStablePeriod: 0,
    onChainPlay: onChainPlay.rows,
  })
}

export default function InfinitePage() {
  const { extinctions, generations, livesGiven, longestStablePeriod, onChainPlay } = useLoaderData<typeof loader>()

  return (
    <ContainerInner>
      <GameWrapper>
        <GameGridWrapper>
          <GameContainer currentFrame={generations} maxFrame={generations} />
        </GameGridWrapper>
        <SideBarWrapper>
          <Sidebar
            extinctions={extinctions}
            generations={generations}
            livesGiven={livesGiven}
            longestStablePeriod={longestStablePeriod}
            onChainPlay={onChainPlay}
          />
        </SideBarWrapper>
      </GameWrapper>
    </ContainerInner>
  )
}
