import { HiOutlinePhotograph, HiOutlineUser } from 'react-icons/hi'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import ISnapshotGrid from '../InfiniteGame/SnapshotGrid/ISnapShotGrid'
import Button from '../Button/Button'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { keyframes } from '@emotion/react'
import SnapshotLogo from './SnapshotLogo'

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
  height: 394px;
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
  height: ${(props) => (props.large ? '763px' : '394px')};
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
  margin-bottom: 5px;
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

const SkeletonImagePreview = () => {
  return (
    <StyledSkeletonGridContainer>
      <HiOutlinePhotograph size={48} color="#171B24" />
    </StyledSkeletonGridContainer>
  )
}

const Snapshot = ({
  onClick,
  onClickTwitter,
  large = false,
  gameGeneration,
  gameState,
  user,
  id,
  isLoading,
  onClose,
  ...rest
}) => {
  let formattedUser

  if (user) {
    formattedUser = getShortChecksumAddress(user)
  }

  if (isLoading)
    return (
      <StyledSkeletonCard {...rest}>
        <SkeletonImagePreview />
      </StyledSkeletonCard>
    )
  return (
    <StyledCard large={large} {...rest} onClick={onClick}>
      <StyledGridContainer large={large}>
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
            borderRadius: large ? '7px' : 0,
            border: large ? '2px solid #000000 ' : '0px',
          }}
        >
          <ISnapshotGrid data={gameStateToGrid(gameState)} />
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

      <StyledUserAddress large={large}>
        <HiOutlineUser color="#57637b" size={16} /> {formattedUser}
      </StyledUserAddress>
      {large && (
        <StyledActions large={large}>
          <Button secondary label="share to twitter" onClick={onClickTwitter} />
          <div style={{ fontSize: 10, paddingTop: 12, color: '#57637b' }}>
            (If the image doesn’t appear in your tweet draft, close it and click share to twitter again!)
          </div>
        </StyledActions>
      )}
    </StyledCard>
    // color: #2d3038;
  )
}

export default Snapshot
