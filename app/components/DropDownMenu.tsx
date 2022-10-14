import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import styled from '@emotion/styled'
const Root = styled(DropdownMenuPrimitive.Root)``
const Trigger = styled(DropdownMenuPrimitive.Trigger)`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.dropdownMenu.triggerBorder};
  background-color: ${(props) => props.theme.colors.dropdownMenu.triggerBackground};
  color: #c2b9b2;
  height: 40px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Mulish';
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  text-transform: capitalize;
  cursor: pointer;
  gap: 8px;

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
  min-width: 338px;
  flex-direction: column;

  background-color: ${(props) => props.theme.colors.dropdownMenu.contentBackground};

  border: 1px solid ${(props) => props.theme.colors.dropdownMenu.contentBorder};
  border-radius: 8px;
  padding-bottom: 16px;
`
const Label = styled(DropdownMenuPrimitive.Label)`
  padding: 24px;
  color: ${(props) => props.theme.colors.dropdownMenu.contentLabel};
  border-bottom: 1px solid ${(props) => props.theme.colors.dropdownMenu.contentBorder};
  margin-bottom: 16px;
`
const Item = styled(DropdownMenuPrimitive.Item)`
  margin-left: 8px;
  margin-right: 8px;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
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
const RadioGroup = styled(DropdownMenuPrimitive.RadioGroup)``
const RadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  margin-left: 8px;
  position: relative;
  margin-right: 8px;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
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
  right: 16px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #8aed9b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const LinkItemIndicator = styled.div`
  position: absolute;
  right: 16px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #8aed9b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const exportedObject = {
  Root,
  Trigger,
  Content,
  Label,
  Item,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  LinkItemIndicator,
}
export default exportedObject
