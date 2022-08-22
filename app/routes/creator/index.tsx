import { ThemeProvider } from '@emotion/react'
import ContainerInner from '../../components/Layout/ContainerInner'
import PageIntro from '../../components/PageIntro/PageIntro'
import SnapshotCreator from '../../components/Snapshot/SnapshotCreator'
import Typography from '../../components/Typography/Typography'
import { creator } from '../../styles/themes/creator'
import { useNavigate } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { CreatorGame } from '~/db.server'
import { sql } from '~/db.server'
import type { TypedResponse } from '@remix-run/react/dist/components'
import { useUserId } from '~/hooks/useUserId'
import { getUserId } from '~/session.server'
import { hexToDecimalString } from 'starknet/utils/number'

// const Loading = styled.div`
//   width: 210px;
//   height: 211px;
//   display: flex;
//   background: #1b202b;
//   border: 1px solid #000000;
//   margin-right: 3px;
//   margin-left: 14px;
//   margin-bottom: 16px;
// `
interface LoaderData {
  readonly yourGames: CreatorGame[]
  readonly communityGames: CreatorGame[]
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const userId = await getUserId(request)

  if (userId == null) {
    const communityGames = await sql<CreatorGame>`
    with games as (
      select "transactionOwner" "gameOwner",
        "gameId",
        "createdAt"
      from creator
      where "transactionType" = 'game_created'
      order by "createdAt"
    )
    select *,
      (
        select COALESCE(max(c."gameGeneration"), 1)
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameGeneration",
      (
        select max(c."gameState")
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameState"
    from games g
    order by "createdAt"
  `

    return json<LoaderData>({
      yourGames: [],
      communityGames: communityGames.rows,
    })
  }

  const yourGames = await sql<CreatorGame>`
    with games as (
      select "transactionOwner" "gameOwner",
        "gameId",
        "createdAt"
      from creator
      where "transactionType" = 'game_created' and "transactionOwner" = ${hexToDecimalString(userId)}
      order by "createdAt"
    )
    select *,
      (
        select COALESCE(max(c."gameGeneration"), 1)
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameGeneration",
      (
        select max(c."gameState")
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameState"
    from games g
    order by "createdAt"
  `
  const communityGames = await sql<CreatorGame>`
    with games as (
      select "transactionOwner" "gameOwner",
        "gameId",
        "createdAt"
      from creator
      where "transactionType" = 'game_created' and "transactionOwner" != ${hexToDecimalString(userId)}
      order by "createdAt"
    )
    select *,
      (
        select COALESCE(max(c."gameGeneration"), 1)
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameGeneration",
      (
        select max(c."gameState")
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as "gameState"
    from games g
    order by "createdAt"
  `

  return json<LoaderData>({
    yourGames: yourGames.rows,
    communityGames: communityGames.rows,
  })
}

export default function CreatorPage() {
  const navigate = useNavigate()
  const { communityGames, yourGames } = useLoaderData<typeof loader>()
  const userId = useUserId()

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        <PageIntro.Container>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
            Create your own games by evolving the communities games. <br />
            Earn 10 credits and you can spawn a brand new game.
          </PageIntro.Text>
        </PageIntro.Container>
        <div></div>
        {userId && <Typography.H2>Your Games</Typography.H2>}

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {userId &&
            yourGames.map((game) => {
              return (
                <SnapshotCreator
                  onClick={() => navigate(`/creator/game/${game.gameId}`)}
                  key={game.gameId}
                  id={game.gameId}
                  generationNumber={game.gameGeneration}
                  address={game.gameOwner}
                  gameState={game.gameState}
                />
              )
            })}
        </div>
        <Typography.H2>Community Games</Typography.H2>

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {communityGames.map((game) => {
            return (
              <SnapshotCreator
                onClick={() => navigate(`/creator/game/${game.gameId}`)}
                key={game.gameId}
                id={game.gameId}
                generationNumber={game.gameGeneration}
                address={game.gameOwner}
                gameState={game.gameState}
              />
            )
          })}
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
