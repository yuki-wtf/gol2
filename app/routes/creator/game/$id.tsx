import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { creator } from '../../../styles/themes/creator'
import ContainerInner from '../../../components/Layout/ContainerInner'
import Sidebar from '../../../components/CreatorGame/Sidebar/Sidebar'
import CreatorGameHeader from '../../../components/CreatorGameHeader/CreatorGameHeader'
import GameContainer from '../../../components/CreatorGame/GameContainer'
import GetGame from '../../../components/CreatorGame/Game/Wrapped/GetGame'
import { useSearchParams } from '@remix-run/react'

const CreatorGame = () => {
  const [needsData, setNeedsData] = useState(false)
  const [searchParams] = useSearchParams()

  const game_index = searchParams.get('game_index')
  const current_gen = searchParams.get('current_gen')
  const owner = searchParams.get('owner')

  useEffect(() => {
    setTimeout(() => {
      setNeedsData(true)
    }, 500)
  }, [needsData])

  return (
    <ThemeProvider theme={creator}>
      {needsData ? <GetGame gameId={game_index} currentGen={current_gen} /> : null}
      <ContainerInner>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '100%',
            maxWidth: '882px',
            margin: '1vh auto 0',
            paddingBottom: 64,
            gap: 64,
          }}
        >
          <div style={{ width: 544, minWidth: 544 }}>
            <CreatorGameHeader gameId={game_index} address={owner} />
            <GameContainer gameId={game_index} address={owner} currentGen={current_gen} />
          </div>
          <div
            style={{
              display: 'flex',
              // maxWidth: "274px",
              flex: 1,
            }}
          >
            <Sidebar currentGen={current_gen} />
          </div>
        </div>
      </ContainerInner>
    </ThemeProvider>
  )
}

export default CreatorGame