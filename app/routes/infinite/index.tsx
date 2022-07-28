import ContainerInner from '../../components/Layout/ContainerInner'
import Sidebar from '../../components/InfiniteGame/Sidebar/Sidebar'
import GameContainer from '../../components/InfiniteGame/Game/GameContainer'
import { GameWrapper, GameGridWrapper, SideBarWrapper } from '../../components/Layout/GameLayouts'
import { getUserId } from '~/session.server'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { db } from '~/db.server'
import type { Infinite } from '~/db.server'
import type { TypedResponse } from '@remix-run/react/dist/components'

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<Infinite[]>> {
  const userId = await getUserId(request)

  if (userId == null) return json([])

  const statistics = await db.query<{ label: string; value: number }>(
    `
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
      );
    `
  )

  return json(statistics.rows)
}

export default function InfinitePage() {
  return (
    <ContainerInner>
      <GameWrapper>
        <GameGridWrapper>
          <GameContainer />
        </GameGridWrapper>
        <SideBarWrapper>
          <Sidebar />
        </SideBarWrapper>
      </GameWrapper>
    </ContainerInner>
  )
}
