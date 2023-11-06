import { ThemeProvider } from '@emotion/react'
import ContainerInner from '../components/ContainerInner'
import PageIntro from '../components/PageIntro'
import SnapshotCreator from '../components/Snapshot/SnapshotCreator'
import Typography from '../components/Typography'
import { creator } from '../styles/themes/creator'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { CreatorGame } from '~/db.server'
import { sql } from '~/db.server'
import { useUser } from '~/hooks/useUser'
import { getUserId } from '~/session.server'
import { num } from 'starknet'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'
import { HiOutlineCube } from 'react-icons/hi'
import { AutoSizer, Grid, WindowScroller } from 'react-virtualized'
import SnapshotEmpty from '~/components/Snapshot/SnapshotEmpty'
const hexToDecimalString  = num.hexToDecimalString

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
        and "gameId" != 0
      order by "createdAt" desc
    `

    return json<LoaderData>({
      yourGames: [],
      communityGames: communityGames.rows,
    })
  }

  const yourGames = await sql<CreatorGame>`
    (
      select
        "functionCaller" "gameOwner",
        "functionInputGameState" "gameId",
        "functionInputGameState" "gameState",
        0 "gameGeneration",
        "createdAt"
      from "transaction" t
      where "functionName" = 'create'
        and "functionCaller" = ${hexToDecimalString(userId)}
        and CASE "status"
          WHEN 'RECEIVED' THEN TRUE
          WHEN 'PENDING' THEN (select "transactionHash" from creator c where c."transactionHash" = t."hash") is null
          else FALSE
        END
        and "functionInputGameState" != 0
      order by "createdAt" desc
    )

    UNION ALL

    (
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
        and "gameId" != 0
      order by "createdAt" desc
    )
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
      and "gameId" != 0
    order by "createdAt" desc
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
        <PageIntro.Container style={{ marginTop: 32 }}>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
            Evolve community games to earn GOL tokens. <br />
            Earn 10 GOL tokens and you can create a new game.
          </PageIntro.Text>
        </PageIntro.Container>

        <Typography.H2>Your Games</Typography.H2>

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {user == null && (
            <SnapshotEmpty
              style={{ height: 196, marginBottom: 32 }}
              icon={<HiOutlineCube size={40} />}
              label="You haven’t created any games! Earn 10 GOL tokens to create your first game."
            />
          )}
          {user != null && Object.keys(yourGames).length === 0 && (
            <SnapshotEmpty
              style={{ height: 196, marginBottom: 32 }}
              icon={<HiOutlineCube size={40} />}
              label="You haven’t created any games! Earn 10 GOL tokens to create your first game."
            />
          )}
          {user != null &&
            yourGames.map((game) =>
              game.gameGeneration == '0' ? (
                <SnapshotCreator gameState={game.gameState} isCreating />
              ) : (
                <SnapshotCreator
                  to={`/creator/game/${game.gameId}`}
                  key={game.gameId}
                  id={game.gameId}
                  generationNumber={game.gameGeneration}
                  address={game.gameOwner}
                  gameState={game.gameState}
                />
              )
            )}
        </div>
        <Typography.H2>Community Games</Typography.H2>

        <div
          style={{
            marginTop: 24,
          }}
        >
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => {
              return (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <Grid
                      cellRenderer={({ columnIndex, rowIndex, style, key }) => {
                        const game = communityGames[rowIndex * 4 + columnIndex]
                        if (game == null) return null
                        return (
                          <SnapshotCreator
                            style={style}
                            to={`/creator/game/${game.gameId}`}
                            key={key}
                            id={game.gameId}
                            generationNumber={game.gameGeneration}
                            address={game.gameOwner}
                            gameState={game.gameState}
                          />
                        )
                      }}
                      columnCount={4}
                      columnWidth={230}
                      rowCount={Math.ceil(communityGames.length / 4)}
                      rowHeight={335}
                      autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                    />
                  )}
                </AutoSizer>
              )
            }}
          </WindowScroller>
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
