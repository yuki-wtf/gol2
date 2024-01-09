import { HiOutlinePhotograph, HiOutlineUser } from 'react-icons/hi'
import { FaXTwitter } from 'react-icons/fa6'
import styled from '@emotion/styled'
import type { AnimationProps } from 'framer-motion'
import { motion } from 'framer-motion'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { keyframes } from '@emotion/react'
import SnapshotLogo from './SnapshotLogo'
import SnapshotGrid from '../GameMode/Shared/SnapshotGrid'
import Button from '../Button'
import { SnapshotMint } from './SnapshotMint'

const animate = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`
const StyledSkeletonCard = styled(motion.li)`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 290px;
  height: 400px;
  background: #1b202b;
  border: 1px solid #0a0c10;
  padding-top: 24px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b202b;
  /* Figure out more performant way to animate skeletons */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: -webkit-radial-gradient(white, black);
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(38, 45, 60, 0.520859),
      rgba(255, 255, 255, 0)
    );
    background-repeat: repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    animation: ${animate} 1600ms cubic-bezier(0.65, 0, 0.35, 1);
    animation-iteration-count: infinite;
  }
`
const StyledSkeletonGridContainer = styled.div<{ large?: boolean }>`
  width: 244px;
  height: 244px;
  border: 1px solid #000000;
  border-radius: 4px;
  background-color: #1d222c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledActions = styled.div<{ large?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  margin-top: 0px;
  padding-left: ${(props) => (props.large ? '40px' : '0')};
  padding-top: ${(props) => (props.large ? '30px' : '0')};
`
const StyledCard = styled(motion.li)<{ large?: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: ${(props) => (props.large ? '525px' : '290px')};
  height: ${(props) => (props.large ? '733px' : '400px')};
  background: #fefcfa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => (props.large ? '36px' : '24px')};
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 0px;
  text-align: left;
  color: #1d222c;
  cursor: ${(props) => (props.onClick != null ? 'pointer' : 'auto')};
  position: relative;
  &:hover {
    background: #fcfaf8;
    box-shadow: 0px 14px 18px rgba(0, 0, 0, 0.9);
  }

  &:before {
    content: '';
    position: absolute;
    width: ${(props) => (props.large ? '20px' : '10px')};
    height: ${(props) => (props.large ? '165px' : '109px')};
    left: 0px;
    bottom: -2px;
    background: #dbf267;
    border-radius: 0px 0px 0px 10px;
  }
`
const StyledDivider = styled.div`
  height: 2px;
  width: 100%;
  background: #dbf267;
  border-radius: 1px;
  margin-top: 12px;
  margin-bottom: 8px;
`
const StyledGridContainer = styled.div<{ large?: boolean }>`
  width: ${(props) => (props.large ? '458px' : '244px')};
  height: ${(props) => (props.large ? '520px' : '244px')};

  border: 1px solid #000000;
  border-radius: ${(props) => (props.large ? '10px' : '4px')};
  color: white;
  pointer-events: none;
  background-color: #1d222c;
  overflow: hidden;
  padding-top: ${(props) => (props.large ? '25px' : '0')};
  padding-left: ${(props) => (props.large ? '24px' : '0')};
  padding-right: ${(props) => (props.large ? '24px' : '0')};
  padding-bottom: ${(props) => (props.large ? '85px' : '0')};
`
const StyledGenLabel = styled.div<{ large?: boolean }>`
  text-align: left;
  width: 100%;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 26px;
  color: #57637b;
  text-transform: uppercase;
  padding-top: ${(props) => (props.large ? '37px' : '11px')};
  padding-left: ${(props) => (props.large ? '40px' : '0')};
`
const StyledGenLabelLarge = styled.div`
  text-align: left;
  width: 100%;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 26px;
  color: #0a0c10;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding-top: 37px;
  padding-left: 40px;
`
const StyledGenNumber = styled.div<{ large?: boolean }>`
  text-align: left;
  width: 100%;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 34px;
  line-height: 26px;
  color: #2d3038;
  margin-top: 0px;
  letter-spacing: 0.05em;
  padding-left: ${(props) => (props.large ? '40px' : '0')};
`

const StyledUserAddress = styled.div<{ large?: boolean }>`
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding-left: ${(props) => (props.large ? '40px' : '0')};
`
const StyledShareText = styled.div`
  font-family: 'Mulish';
  color: #0a0c10;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  font-weight: 800;
`

const SkeletonImagePreview = () => {
  return (
    <StyledSkeletonGridContainer>
      <HiOutlinePhotograph size={48} color="#171B24" />
    </StyledSkeletonGridContainer>
  )
}

interface Props {
  readonly onClick?: React.MouseEventHandler<HTMLLIElement>
  readonly onClickTwitter?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  readonly large?: boolean
  readonly gameGeneration?: React.ReactNode
  readonly gameState?: string
  readonly user?: string
  readonly isLoading?: boolean
  readonly initial?: AnimationProps['initial']
  readonly animate?: AnimationProps['animate']
  readonly exit?: AnimationProps['exit']
}

const Snapshot = ({
  onClick,
  onClickTwitter,
  large = false,
  gameGeneration,
  gameState,
  user,
  isLoading,
  initial,
  animate,
  exit,
}: Props) => {
  const formattedUser = user ? getShortChecksumAddress(user) : null

  if (isLoading) {
    return (
      <StyledSkeletonCard initial={initial} animate={animate} exit={exit}>
        <SkeletonImagePreview />
      </StyledSkeletonCard>
    )
  }

  return (
    <StyledCard large={large} onClick={onClick} initial={initial} animate={animate} exit={exit}>
      <StyledGridContainer large={large}>
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
            borderRadius: large ? '7px' : 0,
            border: large ? '2px solid #000000 ' : '0px',
          }}
        >
          <SnapshotGrid data={gameStateToGrid(gameState ?? '0')} />
        </div>
        {large && <SnapshotLogo />}
      </StyledGridContainer>
      {!large && (
        <>
          <StyledGenLabel large={large}> Generation: </StyledGenLabel>
          <StyledGenNumber large={large}> {gameGeneration} </StyledGenNumber>
        </>
      )}

      {large && <StyledGenLabelLarge>Generation : {gameGeneration}</StyledGenLabelLarge>}

      {!large && <StyledDivider />}

      {large && (
        <StyledUserAddress large={large}>
          <HiOutlineUser color="#57637b" size={16} /> {formattedUser}
        </StyledUserAddress>
      )}
      <StyledActions large={large}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <SnapshotMint />
          {large && (
            <Button
              tertiary
              tertiaryColor="#0A0C10"
              label={
                <StyledShareText>
                  <span>SHARE ON</span>
                  <FaXTwitter />
                </StyledShareText>
              }
              onClick={onClickTwitter}
            />
          )}
        </div>
        {/* <div style={{ fontSize: 10, paddingTop: 12, color: '#57637b' }}>
            (If the image doesn’t appear in your tweet draft, close it and click share to twitter again!)
          </div> */}
      </StyledActions>
    </StyledCard>
  )
}

export default Snapshot
