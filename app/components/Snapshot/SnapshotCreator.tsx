import { HiOutlineUser } from 'react-icons/hi'
import styled from '@emotion/styled'
import CSnapshotGrid from '../CreatorGame/CSnapshotGrid'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import { Link } from '@remix-run/react'

const StyledGridContainer = styled.div`
  width: 212px;
  height: 212px;
  border: 4px solid #8aed9b;
  border-radius: 4px;
  overflow: hidden;
  background-color: #1d222c;
  pointer-events: none;
`
const StyledCard = styled(Link)`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 230px;
  height: 335px;
  /* background: #fefcfa; */
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); */
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: left;
  color: #1d222c;
  cursor: pointer;
  position: relative;

  &:hover ${StyledGridContainer} {
    box-shadow: 0px 6px 10px #000000;
    border-color: white;
  }

  /* &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 129px;
    left: 0px;
    bottom: -2px;
    background: #dbf267;
    border-radius: 0px 0px 0px 10px;
  } */
`
const StyledGenLabel = styled.div`
  text-align: left;
  width: 100%;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 26px;
  color: #c2b9b2;
  padding-left: 8px;

  margin-top: 4px;
`
const StyledGenNumber = styled.div`
  padding-left: 8px;
  text-align: left;
  width: 100%;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 26px;
  color: #f3e9e1;
  margin-top: 16px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`
// const StyledGenId = styled.div`
//   font-family: 'Mulish';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 13px;
//   line-height: 26px;
//   text-align: left;
//   width: 100%;
//   color: #2d3038;
//   margin-top: 4px;
//   & span {
//     color: #57637b;
//     font-weight: 600;
//   }
// `
const StyledUserAddress = styled.div`
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
  color: #c2b9b2;
  padding-left: 8px;
  margin-top: 4px;
`

const SnapshotCreator = ({ to, generationNumber, address, id, gameState, isCreating }) => {
  return (
    <StyledCard to={!isCreating && to}>
      <StyledGridContainer>
        <CSnapshotGrid data={gameStateToGrid(gameState)} isGameOver={gameState == 0} />
      </StyledGridContainer>
      {isCreating === 'RECEIVED' ? (
        <>
          <StyledGenNumber> Creating Game </StyledGenNumber>
          <StyledGenLabel> Pending... </StyledGenLabel>
        </>
      ) : (
        <>
          <StyledGenNumber> Game #{id.slice(0, 3)} </StyledGenNumber>
          <StyledGenLabel> Generation: {generationNumber} </StyledGenLabel>{' '}
          <StyledUserAddress>
            <HiOutlineUser color="#c2b9b2" size={16} /> {getShortChecksumAddress(address)}
          </StyledUserAddress>
        </>
      )}
    </StyledCard>
  )
}

export default SnapshotCreator
