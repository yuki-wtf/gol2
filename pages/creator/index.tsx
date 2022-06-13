import { useStarknet } from '@starknet-react/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Button from '../../components/Button/Button'
import ContributeToGame from '../../components/CreatorGame/Game/Wrapped/ContributeToGame'
import CreateGame from '../../components/CreatorGame/Game/Wrapped/CreateGame'
import GetNewestGame from '../../components/CreatorGame/Game/Wrapped/GetNewestGame'
import GetRecentlyCreated from '../../components/CreatorGame/Game/Wrapped/GetRecentlyCreated'
import GetUserCounts from '../../components/CreatorGame/Game/Wrapped/GetUserCounts'
import GetViewGame from '../../components/CreatorGame/Game/Wrapped/GetViewGame'
import ContainerInner from '../../components/Layout/ContainerInner'
import PageIntro from '../../components/PageIntro/PageIntro'
import SnapshotCreator from '../../components/Snapshot/SnapshotCreator'
import Typography from '../../components/Typography/Typography'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import styled from 'styled-components'
import { creator } from '../../styles/themes/creator'
import Skeleton from '../../components/Skeleton/Skeleton'
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

const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

const Creator = () => {
  const dispatch = useDispatch()
  const Router = useRouter()
  const { games } = useSelector((state) => state.creatorGames)
  const { account } = useStarknet()
  const [userHasGames, setUserHasGames] = useState(false)
  return (
    <ThemeProvider theme={creator}>
      <ContainerInner maxWidth={1000}>
        {/* <GetNewestGame /> */}
        <GetRecentlyCreated />

        {/* <GetViewGame id={""} gen="0" /> */}

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
                if (account === games[key].owner) {
                  return (
                    <SnapshotCreator
                      onClick={() =>
                        Router.push(
                          `/creator/game/${games[key].game_index}?game_index=${games[key].game_index}&current_gen=${games[key].generation}&owner=${games[key].owner}`
                        )
                      }
                      key={games[key].game_index}
                      id={games[key].game_index}
                      generationNumber={games[key].generation}
                      address={games[key].owner}
                    />
                  )
                }
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
                if (account !== games[key].owner) {
                  return (
                    <SnapshotCreator
                      onClick={() =>
                        Router.push(
                          `/creator/game/${games[key].game_index}?game_index=${games[key].game_index}&current_gen=${games[key].generation}&owner=${games[key].owner}`
                        )
                      }
                      key={games[key].game_index}
                      id={games[key].game_index}
                      generationNumber={games[key].generation}
                      address={games[key].owner}
                    />
                  )
                }
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

export default Creator
{
  /* <SnapshotCreator
              onClick={() => Router.push(`/creator/game/${game.game_index}`)}
              key={game.game_id}
              id={game.game_index}
              generationNumber={game.generation}
              address="23232323423423423423432"
            /> */
}
