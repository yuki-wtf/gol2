import { ThemeProvider } from '@emotion/react'
import ContainerInner from '../../components/Layout/ContainerInner'
import PageIntro from '../../components/PageIntro/PageIntro'
import SnapshotCreator from '../../components/Snapshot/SnapshotCreator'
import Typography from '../../components/Typography/Typography'
import { creator } from '../../styles/themes/creator'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { CreatorGame } from '~/db.server'
import { sql } from '~/db.server'
import { useUser } from '~/hooks/useUser'
import { getUserId } from '~/session.server'
import { hexToDecimalString } from 'starknet/utils/number'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'

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
      select
        "transactionOwner" "gameOwner",
        "gameId",
        (
          select c2."gameState"
          from creator c2
          where c1."gameId" = c2."gameId"
          order by COALESCE(c2."gameGeneration", 1) desc
          limit 1
        ) as "gameState",
        (
          select COALESCE(c2."gameGeneration", 1)
          from creator c2
          where c1."gameId" = c2."gameId"
          order by COALESCE(c2."gameGeneration", 1) desc
          limit 1
        ) as "gameGeneration",
        "createdAt"
      from creator c1
      where "transactionType" = 'game_created'
      order by "createdAt"
    `

    return json<LoaderData>({
      yourGames: [],
      communityGames: communityGames.rows,
    })
  }

  const yourGames = await sql<CreatorGame>`
    select
      "transactionOwner" "gameOwner",
      "gameId",
      (
        select c2."gameState"
        from creator c2
        where c1."gameId" = c2."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameState",
      (
        select COALESCE(c2."gameGeneration", 1)
        from creator c2
        where c1."gameId" = c2."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameGeneration",
      "createdAt"
    from creator c1
    where "transactionType" = 'game_created'
      and "transactionOwner" = ${hexToDecimalString(userId)}
    order by "createdAt"
  `
  const communityGames = await sql<CreatorGame>`
    select
      "transactionOwner" "gameOwner",
      "gameId",
      (
        select c2."gameState"
        from creator c2
        where c1."gameId" = c2."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameState",
      (
        select COALESCE(c2."gameGeneration", 1)
        from creator c2
        where c1."gameId" = c2."gameId"
        order by COALESCE(c2."gameGeneration", 1) desc
        limit 1
      ) as "gameGeneration",
      "createdAt"
    from creator c1
    where "transactionType" = 'game_created'
      and "transactionOwner" != ${hexToDecimalString(userId)}
    order by "createdAt"
  `

  return json<LoaderData>({
    yourGames: yourGames.rows,
    communityGames: communityGames.rows,
  })
}

export default function CreatorPage() {
  useAutoRefresh()
  const { communityGames, yourGames } = useLoaderData<typeof loader>()
  const user = useUser()

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        <PageIntro.Container>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
          Evolve community games to earn GOL tokens. <br />
          Earn 10 GOL tokens and you can create a new game.
          </PageIntro.Text>
        </PageIntro.Container>
        <div></div>
        {user != null && <Typography.H2>Your Games</Typography.H2>}

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {user != null &&
            yourGames.map((game) => {
              return (
                <SnapshotCreator
                  to={`/creator/game/${game.gameId}`}
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
                to={`/creator/game/${game.gameId}`}
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
