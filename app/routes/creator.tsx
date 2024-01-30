import { ThemeProvider } from '@emotion/react'
import ContainerInner from '../components/ContainerInner'
import PageIntro from '../components/PageIntro'
import SnapshotCreator from '../components/Snapshot/SnapshotCreator'
import Typography from '../components/Typography'
import { creator } from '../styles/themes/creator'
import { useFetcher, useLoaderData, useTransition } from '@remix-run/react'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { CreatorGame } from '~/db.server'
import { sql } from '~/db.server'
import { useUser } from '~/hooks/useUser'
import { getUserId } from '~/session.server'
import { num } from 'starknet'
import { useAutoRefresh } from '~/hooks/useAutoRefresh'
import { HiOutlineCube } from 'react-icons/hi'
import { AutoSizer, Grid, InfiniteLoader, WindowScroller } from 'react-virtualized'
import SnapshotEmpty from '~/components/Snapshot/SnapshotEmpty'
import { useCallback, useRef, useState } from 'react'
import Spinner from '~/components/Spinner'
import { useUpdateEffect } from 'react-use'
const hexToDecimalString = num.hexToDecimalString

interface LoaderData {
  readonly yourGames: CreatorGame[]
  readonly communityGames: CreatorGame[]
  readonly gamesCount: number
}

const IN_LIMIT = 40
const LIMIT = 40
const DATA_OVERSCAN = 20

const getStartLimit = (searchParams: URLSearchParams) => ({
  offset: Number(searchParams.get('start') || '0'),
  limit: Number(searchParams.get('limit') || IN_LIMIT.toString()),
})

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const userId = await getUserId(request)
  const { offset, limit } = getStartLimit(new URL(request.url).searchParams)

  const gamesCount = await sql`
      SELECT
          COUNT(*)
      FROM
          creator c1
      WHERE
          "transactionType" = 'game_created'
          AND "gameId" != 0;
  `

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
      order by "createdAt" desc limit ${limit} offset ${offset}
    `

    return json<LoaderData>({
      yourGames: [],
      communityGames: communityGames.rows,
      gamesCount: gamesCount.rows[0]?.count || 0,
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
order by "createdAt" desc limit ${limit} offset ${offset}
  `

  return json<LoaderData>({
    yourGames: yourGames.rows,
    communityGames: communityGames.rows,
    gamesCount: gamesCount.rows[0]?.count || 0,
  })
}

export default function CreatorPage() {
  console.log('rendering creator page')
  useAutoRefresh()
  const user = useUser()

  const { communityGames: games, yourGames, gamesCount } = useLoaderData<typeof loader>()
  const [communityGames, setItems] = useState<CreatorGame[]>(games as any)
  const onRowsRenderedRef = useRef<({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => void>()
  const columnCount = 4
  const fetcher = useFetcher()
  const [hasEnded, setHasEnded] = useState(false)

  useUpdateEffect(() => {
    if (fetcher.data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      setItems((prevItems) => [...prevItems, ...fetcher.data.communityGames])
    } else {
      setHasEnded(true)
    }
  }, [fetcher.data])

  const onSectionRendered = useCallback(
    ({
      columnStartIndex,
      columnStopIndex,
      rowStartIndex,
      rowStopIndex,
    }: {
      columnStartIndex: number
      columnStopIndex: number
      rowStartIndex: number
      rowStopIndex: number
    }) => {
      const startIndex = rowStartIndex * columnCount + columnStartIndex
      const stopIndex = rowStopIndex * columnCount + columnStopIndex

      // Call the function referenced in onRowsRenderedRef
      if (onRowsRenderedRef.current) {
        onRowsRenderedRef.current({
          startIndex,
          stopIndex,
        })
      }
    },
    [columnCount]
  )

  function isRowLoaded({ index }: { index: number }) {
    return !!communityGames[index]
  }

  const infiniteLoaderChildFunction = ({
    onRowsRendered,
    registerChild,
    ...props
  }: {
    onRowsRendered: ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => void
    registerChild: (ref: any) => void
    height: number
    width: number
    isScrolling: boolean
    onChildScroll: (params: { scrollTop: number }) => void
    scrollTop: number
  }) => {
    // Assign the onRowsRendered function to the ref
    onRowsRenderedRef.current = onRowsRendered

    return (
      <Grid
        cellRenderer={({ columnIndex, rowIndex, style, key }) => {
          const game = communityGames[rowIndex * 4 + columnIndex]
          if (game == null) return null
          return (
            <>
              <SnapshotCreator
                style={style}
                to={`/creator/game/${game.gameId}`}
                key={key}
                id={game.gameId}
                generationNumber={game.gameGeneration}
                address={game.gameOwner}
                gameState={game.gameState}
              />
            </>
          )
        }}
        onSectionRendered={onSectionRendered}
        ref={registerChild}
        columnCount={4}
        columnWidth={230}
        rowCount={Math.ceil(communityGames.length / 4)}
        rowHeight={335}
        autoHeight
        {...props}
      />
    )
  }

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000} paddingBottom={48}>
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
        <Typography.H2>Community Games ({gamesCount})</Typography.H2>

        <div
          style={{
            marginTop: 24,
          }}
        >
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => {
              return (
                <div>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div>
                        <InfiniteLoader
                          loadMoreRows={({ startIndex }) => {
                            const qs = new URLSearchParams([
                              ['start', String(startIndex)],
                              ['limit', String(LIMIT)],
                            ]).toString()
                            // loadMoreRows expects a promise to be returned
                            return new Promise((resolve) => {
                              fetcher.load(`/creator?${qs}`)
                              resolve({})
                            })
                          }}
                          isRowLoaded={isRowLoaded}
                          rowCount={gamesCount}
                          threshold={DATA_OVERSCAN}
                        >
                          {(p) => {
                            return infiniteLoaderChildFunction({
                              ...p,
                              height,
                              width,
                              isScrolling,
                              onChildScroll,
                              scrollTop,
                            })
                          }}
                        </InfiniteLoader>
                        {!hasEnded && gamesCount > LIMIT && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                              position: 'absolute',
                            }}
                          >
                            <Spinner color="pink" width="36px" height="36px" />
                          </div>
                        )}
                      </div>
                    )}
                  </AutoSizer>
                </div>
              )
            }}
          </WindowScroller>
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
