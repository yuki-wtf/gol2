import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function GameOver() {
  return (
    <Container>
      <img alt="game over" src="/assets/creator/gameOver.png" width={512} height={512} />
    </Container>
  )
}

export default GameOver
