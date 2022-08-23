import ControlBar from '../../GolGrid/Footer/ControlBar/ControlBar'
import Footer from '../../GolGrid/Footer/Footer'
import TempOverlay from '../../TempOverlay/TempOverlay'
import type { Actions, State } from '~/hooks/useGamePlayback'
import { useSelectedCell } from '~/hooks/SelectedCell'

interface Props {
  readonly state: State
  readonly actions: Actions
}

export default function IFooter({ state, actions }: Props) {
  const [selectedCell] = useSelectedCell()

  return (
    <Footer>
      {selectedCell != null && <TempOverlay />}
      <ControlBar actions={actions} state={state} />
    </Footer>
  )
}
