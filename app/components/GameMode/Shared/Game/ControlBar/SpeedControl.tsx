import { HiCheck, HiChevronRight } from 'react-icons/hi'
import type { Actions, State } from '~/hooks/useGamePlayback'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import styled from '@emotion/styled'

interface Props {
  readonly state: State
  readonly actions: Actions
  readonly disabled?: boolean
}

export default function SpeedControl({ state, actions, disabled }: Props) {
  return (
    <Root>
      <Trigger disabled={disabled}>
        x{state.playbackSpeed}
        <div>
          <HiChevronRight size={18} />
        </div>
      </Trigger>

      <Content side="top" align="center" sideOffset={5}>
        <RadioGroup
          value={state.playbackSpeed.toString()}
          onValueChange={(value) => {
            actions.setPlaybackSpeed(parseInt(value))
          }}
        >
          <RadioItem value="1">
            x1 Normal Speed
            <ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </ItemIndicator>
          </RadioItem>
          <RadioItem value="2">
            x2
            <ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </ItemIndicator>
          </RadioItem>
          <RadioItem value="3">
            x3
            <ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </ItemIndicator>
          </RadioItem>
          <RadioItem value="4">
            x4
            <ItemIndicator>
              <div>
                <HiCheck size={16} />
              </div>
            </ItemIndicator>
          </RadioItem>
        </RadioGroup>
      </Content>
    </Root>
  )
}

const Root = styled(DropdownMenuPrimitive.Root)``
const Trigger = styled(DropdownMenuPrimitive.Trigger)`
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.colors.dropdownMenu.triggerBorder};
  background-color: ${(props) => props.theme.colors.buttonPrimary.defaultBackground};
  color: #0a0c10;
  height: 20px;
  padding: 0 6px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 100%;
  display: flex;
  width: 51px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  cursor: pointer;
  gap: 4px;
  &:disabled {
    background-color: transparent;
    pointer-events: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.dropdownMenu.triggerHoverBackground};
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.dropdownMenu.triggerHoverBackground};
    outline: none;
  }
  &[data-state='open'] {
    background-color: ${(props) => props.theme.colors.dropdownMenu.triggerHoverBackground};
  }
`
const Content = styled(DropdownMenuPrimitive.Content)`
  display: inline-flex;
  min-width: 168px;
  flex-direction: column;
  overflow: hidden;
  background-color: #1d222c;

  border: 2px solid #0a0c10;
  border-radius: 4px;
`
const RadioGroup = styled(DropdownMenuPrimitive.RadioGroup)``
const RadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;

  height: 39px;
  padding-left: 40px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 26px;
  color: #f3e9e1;
  gap: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.dropdownMenu.itemHoverBackground};
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.dropdownMenu.itemHoverBackground};
    border: 0;
    outline: none;
  }
`
const ItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
  position: absolute;
  left: 16px;
  top: 50%;
  width: 10px;
  height: 10px;
  color: #8aed9b;
  display: flex;
  align-items: center;
  justify-content: center;
`
