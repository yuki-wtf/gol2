import { useFetchInfiniteFrames, useGamePlayback } from '~/hooks/useGamePlayback'
import ContainerInner from '../components/Layout/ContainerInner'

export default function Playground() {
  const [state, actions] = useGamePlayback({
    maxFrame: 690,
    currentFrame: 10,
    fetchFrames: useFetchInfiniteFrames(),
  })

  return (
    <ContainerInner>
      <div>
        <button onClick={() => actions.play()}>play</button>
        <button onClick={() => actions.pause()}>pause</button>
        <button onClick={() => actions.goToFirstFrame()}>goToFirstFrame</button>
        <button onClick={() => actions.goToLastFrame()}>goToLastFrame</button>
        <button onClick={() => actions.goToNextFrame()}>goToNextFrame</button>
        <button onClick={() => actions.setPlaybackSpeed(1)}>p1</button>
        <button onClick={() => actions.setPlaybackSpeed(2)}>p2</button>
        <button onClick={() => actions.setPlaybackSpeed(3)}>p3</button>
        <button onClick={() => actions.setPlaybackSpeed(4)}>p4</button>
      </div>
      <pre>{JSON.stringify(state, null, '  ')}</pre>
    </ContainerInner>
  )
}
