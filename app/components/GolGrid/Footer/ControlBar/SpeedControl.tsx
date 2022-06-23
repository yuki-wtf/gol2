import { HiCheck, HiChevronDown, HiChevronRight } from 'react-icons/hi'
import { useState } from 'react'
import DropUpMenu from '../../../DropUpMenu/DropUpMenu'
import { setPlaybackSpeed } from '../../../../features/Infinite/playback/playbackSlice'
import { useDispatch, useSelector } from 'react-redux'
import useUpdateEffect from '../../../../hooks/useUpdateEffect'

const SpeedControl = (props) => {
  const [speed, setSpeed] = useState(1000)
  const dispatch = useDispatch()

  const renderPlaybackSpeed = () => {
    switch (speed) {
      case 1000:
        return 'x1'

      case 500:
        return 'x2'

      case 250:
        return 'x3'

      case 125:
        return 'x4'

      default:
        return 'x1'
    }
  }

  useUpdateEffect(() => {
    if (speed === 1000) dispatch(setPlaybackSpeed(1000))
    else if (speed === 500) dispatch(setPlaybackSpeed(1000))
    else if (speed === 250) dispatch(setPlaybackSpeed(250))
    else if (speed === 125) dispatch(setPlaybackSpeed(125))
  }, [speed])
  return (
    <DropUpMenu.Root>
      <DropUpMenu.Trigger {...props}>
        {renderPlaybackSpeed()}
        <div>
          <HiChevronRight size={18} />
        </div>
      </DropUpMenu.Trigger>

      <DropUpMenu.Content side="top" align="center" sideOffset={5}>
        <DropUpMenu.RadioGroup value={speed} onValueChange={setSpeed}>
          <DropUpMenu.RadioItem value={1000}>
            x1 Normal Speed
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value={500}>
            x2
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value={250}>
            x3
            <DropUpMenu.ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </DropUpMenu.ItemIndicator>
          </DropUpMenu.RadioItem>
          <DropUpMenu.RadioItem value={125}>
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
