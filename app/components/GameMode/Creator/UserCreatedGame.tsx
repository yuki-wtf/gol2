import styled from '@emotion/styled'
import Body from '../Shared/Game/Body'
import Footer from '../Shared/Game/Footer'
import Header from '../Shared/Game/Header'
import produce from 'immer'
import { useCreatorGrid } from '~/hooks/CreatorGrid'
import Cell from '../Shared/Game/Cell'
import GameGrid from '../Shared/Game/Grid'

const StyledGridContainer = styled.div`
  background-color: #000000;
  overflow: hidden;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
  margin-top: 32px;
`

const UserCreatedGame = () => {
  const [grid, setGrid] = useCreatorGrid()

  return (
    <StyledGridContainer>
      <Header empty />
      <Body>
        <GameGrid>
          {grid.map((rows, rowIndex) =>
            rows.map((cell, colIndex) => (
              <Cell
                onClick={() => {
                  const newCells = produce(grid, (draft) => {
                    draft[rowIndex][colIndex] = draft[rowIndex][colIndex] ? 0 : 1
                  })

                  setGrid(newCells)
                }}
                key={`${rowIndex}-${colIndex}`}
                state={cell ? 'createSelected' : 'dead'}
              />
            ))
          )}
        </GameGrid>
      </Body>
      <Footer empty />
    </StyledGridContainer>
  )
}

export default UserCreatedGame
