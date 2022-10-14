import type { Theme } from '@emotion/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { RefAttributes } from 'react'
import { HiOutlineHeart, HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import Typography from './Typography'

interface Props {
  readonly title?: React.ReactNode
  readonly desc?: React.ReactNode
  readonly children?: React.ReactNode
  readonly active?: boolean
  readonly type?: 'evolve' | 'give_life'
  readonly highlightRadius?: number
  readonly sideOffset?: number
  readonly style?: React.CSSProperties
  readonly onClose?: React.MouseEventHandler<HTMLButtonElement>
  readonly collisonPadding?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }
}

const Hop = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const StyledTrigger = styled(PopoverPrimitive.Trigger)`
  margin: 0;
  padding: 0;
  background-color: transparent;
  appearance: none;
  outline: 0;
  border: 0;
  position: relative;
  z-index: 5;
`

const StyledContainer = styled.span<{ active?: boolean; highlightRadius?: number }>`
  border: 2px solid ${(p) => (p.active ? '#f06b97' : 'transparent')};

  border-radius: ${(p) => (p.highlightRadius ? `${p.highlightRadius}px` : '5px')};
  box-shadow: 0px 0px 25px 2px ${(p) => (p.active ? '#f06b97' : 'transparent')};
  display: inline-flex;
  padding: 2px;
  position: relative;
  pointer-events: ${(p) => (p.active ? 'auto' : 'auto')};
  z-index: 5;
  transition: all 0.5s ease;

  /* overflow: hidden; */

  &::before {
    content: '';
    opacity: ${(p) => (p.active ? '0.5' : '0')};
    /* Section/Snapshots-200 */
    position: absolute;
    padding: 4px;
    left: -7px;
    top: -7px;
    right: -7px;
    bottom: -7px;
    border-radius: ${(p) => (p.highlightRadius ? `${p.highlightRadius}px` : '8px')};
    border: 2px solid ${(p) => (p.active ? '#f06b97' : 'transparent')};
    pointer-events: ${(p) => (p.active ? 'none' : 'auto')};
    z-index: 5 !important;
    transition: all 0.5s ease;
    visibility: ${(p) => (p.active ? 'visible' : 'hidden')};
  }
  &::after {
    content: '';
    opacity: ${(p) => (p.active ? '0.7' : '0')};

    position: fixed;
    inset: 0;
    z-index: 4;
    background-color: #1d222c;
    visibility: ${(p) => (p.active ? 'visible' : 'hidden')};
    pointer-events: ${(p) => (p.active ? 'none' : 'auto')};
    transition: all 0.5s ease;
  }
`

const StyledContent = styled(PopoverPrimitive.Content)`
  border-radius: 8px;
  padding: 20px;
  width: 420px;
  background-color: #f3e9e1;
  z-index: 5;
  animation: ${Hop} 300ms linear;
  padding: 17px 12px;

  overflow: hidden;

  &[data-state='open'] {
    &[data-side='top'] {
      ${Hop}
    }
    &[data-side='right'] {
      ${Hop}
    }
    &[data-side='bottom'] {
      ${Hop}
    }
    &[data-side='left'] {
      ${Hop}
    }
  }
`
const StyledArrow = styled(PopoverPrimitive.Arrow)`
  fill: #f3e9e1;
`

function Content(
  props: JSX.IntrinsicAttributes &
    PopoverPrimitive.PopoverContentProps &
    RefAttributes<HTMLDivElement> & { theme?: Theme | undefined }
) {
  return (
    <PopoverPrimitive.Portal>
      <StyledContent {...props}>
        {props.children}
        <StyledArrow width={27} height={10} />
      </StyledContent>
    </PopoverPrimitive.Portal>
  )
}

const StyledClose = styled(PopoverPrimitive.Close)`
  all: unset;
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  top: 12px;
  color: #3b3f49;
  font-weight: 600;
`

const StyledTitle = styled(Typography.XL1Extrabold)`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 26px;
  color: #0a0c10;
  margin-bottom: 8px;
  padding: 0;
  margin: 0;
`
const StyledDesc = styled(Typography.BaseRegular)`
  color: #2d3038;
  padding: 0;
  margin: 0;
`
const StyledContentInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`
const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f06b97;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
`

export default function Highlight({
  highlightRadius = 8,
  collisonPadding,
  title,
  desc,
  children,
  active = true,
  onClose,
  type = 'evolve',
  style,
  sideOffset = 15,
}: Props) {
  return (
    <StyledContainer highlightRadius={highlightRadius} active={active} style={{ ...style }}>
      <PopoverPrimitive.Root defaultOpen={true} open={active}>
        <StyledTrigger>
          <>{children} </>
        </StyledTrigger>

        <Content
          collisionPadding={collisonPadding}
          sideOffset={sideOffset}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <StyledContentInner>
            <StyledIcon>
              {type === 'evolve' ? <HiOutlineHeart size={20} /> : <HiOutlineLightningBolt size={20} />}
            </StyledIcon>
            <div>
              <StyledTitle>{title}</StyledTitle>
              <StyledDesc>{desc}</StyledDesc>
            </div>
          </StyledContentInner>

          <StyledClose onClick={onClose} aria-label="Close">
            <HiOutlineX />
          </StyledClose>
        </Content>
      </PopoverPrimitive.Root>
    </StyledContainer>
  )
}
