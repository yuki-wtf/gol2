import styled from '@emotion/styled'
import type { Actions, State } from '~/hooks/useGamePlayback'
import ControlButtons from './ControlButtons'
import SpeedDropdownMenu from './SpeedControl'

const StyledControlbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  width: 100%;
  gap: 15px;
`
const StyledGenerationLabel = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
  color: #f3e9e1;
  margin-right: 26px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  & span {
    font-size: 14px;
  }
`

interface Props {
  readonly state: State
  readonly actions: Actions
}

export default function ControlBar({ state, actions }: Props) {
  return (
    <StyledControlbar>
      <ControlButtons.ToStartBtn
        onClick={() => {
          actions.pause()
          actions.goToFirstFrame()
        }}
      />
      <ControlButtons.PlayPauseBtn
        isPlaying={state.isPlaying}
        disabled={state.currentFrame >= state.maxFrame}
        onClick={() => {
          if (state.isPlaying) {
            actions.pause()
          } else {
            actions.play()
          }
        }}
      />
      <ControlButtons.StepForwardBtn
        disabled={state.currentFrame >= state.maxFrame}
        onClick={() => {
          actions.goToNextFrame()
        }}
      />
      <ControlButtons.ToEndBtn
        disabled={state.currentFrame >= state.maxFrame}
        onClick={() => {
          actions.goToLastFrame()
        }}
      />
      <SpeedDropdownMenu disabled={state.currentFrame >= state.maxFrame} state={state} actions={actions} />

      <StyledGenerationLabel>
        Generation # <span>{state.currentFrame}</span>
      </StyledGenerationLabel>
    </StyledControlbar>
  )
}
