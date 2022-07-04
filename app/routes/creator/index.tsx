import { useStarknet } from '@starknet-react/core'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import GetRecentlyCreated from '../../components/CreatorGame/Game/Wrapped/GetRecentlyCreated'
import ContainerInner from '../../components/Layout/ContainerInner'
import PageIntro from '../../components/PageIntro/PageIntro'
import SnapshotCreator from '../../components/Snapshot/SnapshotCreator'
import Typography from '../../components/Typography/Typography'
import styled from 'styled-components'
import { creator } from '../../styles/themes/creator'
import Skeleton from '../../components/Skeleton/Skeleton'
import { useNavigate } from '@remix-run/react'

const Loading = styled.div`
  width: 210px;
  height: 211px;
  display: flex;
  background: #1b202b;
  border: 1px solid #000000;
  margin-right: 3px;
  margin-left: 14px;
  margin-bottom: 16px;
`

// const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

export default function Creator() {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { games } = useSelector((state) => state.creatorGames)
  const { account } = useStarknet()
  // const [userHasGames, setUserHasGames] = useState(false)
  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        {/* <GetNewestGame /> */}
        <GetRecentlyCreated />

        <PageIntro.Container>
          <PageIntro.Icon color="#8AED9B" />
          <PageIntro.Text>
            Create your own games by evolving the communities games. <br />
            Earn 10 credits and you can spawn a brand new game.
          </PageIntro.Text>
        </PageIntro.Container>
        <div></div>
        {account && <Typography.H2>Your Games</Typography.H2>}

        <div
          style={{
            display: 'flex',
            gap: 0,
            flexWrap: 'wrap',
            marginTop: 24,
          }}
        >
          {account && Object.keys(games).length > 0
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
          {Object.keys(games).length > 0
            ? Object.entries(games && games).map(([key, value]) => {
                if (account === games[key].owner) {
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
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}
