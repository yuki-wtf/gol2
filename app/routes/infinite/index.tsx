import ContainerInner from '../../components/Layout/ContainerInner'
import Sidebar from '../../components/InfiniteGame/Sidebar/Sidebar'
import GameContainer from '../../components/InfiniteGame/Game/GameContainer'
import { GameWrapper, GameGridWrapper, SideBarWrapper } from '../../components/Layout/GameLayouts'

export default function Infinite() {
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