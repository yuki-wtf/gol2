import Image from "next/image";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
function GameOver() {
  return (
    <Container>
      <Image
        alt="game over"
        src="/assets/creator/gameOver.png"
        width={512}
        height={512}
      />
    </Container>
  );
}

export default GameOver;
