import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { HiOutlineHeart, HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import Typography from '../Typography/Typography'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { clearInterval } from 'timers'

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
const Hop = keyframes`


  0%{
    opacity:0;

  }


  100% {
   opacity:1;

  }
`

// const bounce = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(-2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// })

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

const StyledContainer = styled.span`
  border: 2px solid ${(p) => (p.active ? '#f06b97' : 'transparent')};

  border-radius: ${(p) => (p.highlightRadius ? `${p.highlightRadius}px` : '5px')};
  box-shadow: 0px 0px 25px 2px ${(p) => (p.active ? '#f06b97' : 'transparent')};
  display: inline-flex;
  padding: 2px;
  position: relative;
  pointer-events: ${(p) => (p.active ? 'none' : 'auto')};
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
    opacity: ${(p) => (p.active ? '0.4' : '0')};

    position: fixed;
    inset: 0;
    z-index: 4;
    background-color: #1d222c;
    visibility: ${(p) => (p.active ? 'visible' : 'hidden')};
    pointer-events: ${(p) => (p.active ? 'none' : 'auto')};
    transition: all 0.5s ease;
  }
`

const StyledBackdrop = styled.div`
  opacity: ${(p) => (p.active ? '0.4' : '0')};
  /* Section/Snapshots-200 */
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: #1d222c;
  visibility: ${(p) => (p.active ? 'visible' : 'hidden')};
  pointer-events: ${(p) => (p.active ? 'none' : 'auto')};
  transition: all 0.5s ease;
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

const StyledProgress = styled(ProgressPrimitive.Root)`
  position: absolute;
  left: 0;
  bottom: 0px;
  overflow: hidden;
  /* background: green; */
  border-radius: 0;
  height: 5px;
  width: 100%;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: translateZ(0);
`
const StyledIndicator = styled(ProgressPrimitive.Indicator)`
  background-color: #f06b97;
  width: 100%;
  height: 100%;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  border-bottom-left-radius: 8px;
`
const Progress = StyledProgress
const ProgressIndicator = StyledIndicator

function Content({ children, ...props }) {
  const [progress, setProgress] = useState(0)

  // useEffect(() => {
  //   console.log('mount')
  //   const timer = setTimeout(() => setProgress(100), 3000)
  //   return () => {
  //     clearTimeout(timer)
  //     console.log('unmounted')
  //   }
  // }, [])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((oldValue) => {
  //       const newValue = oldValue + 20
  //       if (newValue === 100) {
  //         clearInterval(interval)
  //         setProgress(0)
  //       }

  //       return newValue
  //     })
  //   }, 500)
  //   return () => {
  //     setProgress(0)
  //     clearInterval(interval)
  //   }
  // }, [])

  return (
    <PopoverPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow width={27} height={10} />
        {/* <Progress value={100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - progress}%)` }} />
        </Progress> */}
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

// Exports
export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverContent = Content
export const PopoverClose = StyledClose

const Highlight = ({
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
}: Props) => {
  console.log(highlightRadius)
  return (
    <StyledContainer highlightRadius={highlightRadius} active={active} style={{ ...style }}>
      <Popover defaultOpen={true} open={active}>
        {/* <StyledBackdrop active={active} /> */}
        <StyledTrigger>
          <>{children} </>
        </StyledTrigger>
        {/* <PopoverPrimitive.Anchor /> */}

        <PopoverContent
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

          <PopoverClose onClick={onClose} aria-label="Close">
            <HiOutlineX />
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </StyledContainer>
  )
}

export default Highlight
