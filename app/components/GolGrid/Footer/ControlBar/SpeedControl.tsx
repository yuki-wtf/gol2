import { HiCheck, HiChevronRight } from 'react-icons/hi'
import DropUpMenu from '../../../DropUpMenu/DropUpMenu'
import type { Actions, State } from '~/hooks/useGamePlayback'

interface Props {
  readonly state: State
  readonly actions: Actions
  readonly disabled?: boolean
}

const SpeedControl = ({ state, actions, disabled }: Props) => {
  return (
    <DropUpMenu.Root>
      <DropUpMenu.Trigger disabled={disabled}>
        x{state.playbackSpeed}
        <div>
          <HiChevronRight size={18} />
        </div>
      </DropUpMenu.Trigger>

      <DropUpMenu.Content side="top" align="center" sideOffset={5}>
        <DropUpMenu.RadioGroup
          value={state.playbackSpeed.toString()}
          onValueChange={(value) => {
            actions.setPlaybackSpeed(parseInt(value))
          }}
        >
          <DropUpMenu.RadioItem value="1">
            x1 Normal Speed
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="2">
            x2
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="3">
            x3
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value="4">
            x4
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
        </DropUpMenu.RadioGroup>
      </DropUpMenu.Content>
    </DropUpMenu.Root>
  )
}

export default SpeedControl
