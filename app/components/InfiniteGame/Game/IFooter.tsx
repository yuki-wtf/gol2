import ControlBar from '../../GolGrid/Footer/ControlBar/ControlBar'
import Footer from '../../GolGrid/Footer/Footer'
import { useSelector } from 'react-redux'
import TempOverlay from '../../TempOverlay/TempOverlay'
import type { Actions, State } from '~/hooks/useInfiniteGamePlayback'

interface Props {
  readonly state: State
  readonly actions: Actions
}

export default function IFooter({ state, actions }: Props) {
  const { selectedCellRow } = useSelector((state) => state.infiniteGrid)

  return (
    <Footer>
      {selectedCellRow !== null && <TempOverlay />}
      <ControlBar actions={actions} state={state} />
    </Footer>
  )
}
