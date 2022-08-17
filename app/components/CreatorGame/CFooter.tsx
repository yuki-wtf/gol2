import ControlBar from '../GolGrid/Footer/ControlBar/ControlBar'
import Footer from '../GolGrid/Footer/Footer'
import type { Actions, State } from '~/hooks/useGamePlayback'

interface Props {
  readonly state: State
  readonly actions: Actions
}

export default function CFooter({ state, actions }: Props) {
  return (
    <Footer>
      <ControlBar actions={actions} state={state} />
    </Footer>
  )
}
