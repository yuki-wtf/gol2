import { ThemeProvider } from 'styled-components'
import ContainerInner from '../../components/Layout/ContainerInner'
import PageIntro from '../../components/PageIntro/PageIntro'
import SnapshotCreator from '../../components/Snapshot/SnapshotCreator'
import Typography from '../../components/Typography/Typography'
import styled from 'styled-components'
import { creator } from '../../styles/themes/creator'
import { useNavigate } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Creator } from '~/db.server'
import { sql } from '~/db.server'
import type { TypedResponse } from '@remix-run/react/dist/components'

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
  readonly communityGames: Creator[]
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const communityGames = await sql<Creator>`
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
        select max("gameGeneration")
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as gameGeneration,
      (
        select max("gameState")
        from creator c
        where c."gameId" = g."gameId"
        group by c."gameId"
      ) as gameState
    from games g
    order by "createdAt"
  `

  return json<LoaderData>({
    communityGames: communityGames.rows,
  })
}

export default function CreatorPage() {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { games } = useSelector((state) => state.creatorGames)
  // const { account } = useStarknet()
  // const [userHasGames, setUserHasGames] = useState(false)
  const { communityGames } = useLoaderData<typeof loader>()

  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        {/* <GetNewestGame /> */}
        {/* <GetRecentlyCreated /> */}

        <PageIntro.Container>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
            Create your own games by evolving the communities games. <br />
            Earn 10 credits and you can spawn a brand new game.
          </PageIntro.Text>
        </PageIntro.Container>
        <div></div>
        {/* {userid && <Typography.H2>Your Games</Typography.H2>}

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {userid && Object.keys(games).length > 0
            ? Object.entries(games).map(([key, value]) => {
                if (account !== games[key].owner) {
                  return null
                }

                return (
                  <SnapshotCreator
                    onClick={() =>
                      navigate(
                        `/creator/game/${games[key].game_index}?game_index=${games[key].game_index}&current_gen=${games[key].generation}&owner=${games[key].owner}`
                      )
                    }
                    key={games[key].game_index}
                    id={games[key].game_index}
                    generationNumber={games[key].generation}
                    address={games[key].owner}
                  />
                )
              })
            : [1, 2, 3, 4].map((i) => (
                <Loading key={i}>
                  <div
                    style={{
                      width: '100%',
                      opacity: 0.1,
                    }}
                  >
                    <Skeleton />
                  </div>
                </Loading>
              ))}
        </div> */}
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
                onClick={() =>
                  navigate(`/creator/game/${game.gameId}?current_gen=${game.gameGeneration}&owner=${game.gameOwner}`)
                }
                key={game.gameId}
                id={game.gameId}
                generationNumber={game.gameGeneration}
                address={game.gameOwner}
              />
            )
          })}
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
