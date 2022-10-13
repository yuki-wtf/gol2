import { HiOutlineUser } from 'react-icons/hi'
import styled from '@emotion/styled'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import ClientOnly from '../ClientOnly'
import SnapshotGrid from '../GameMode/Shared/SnapshotGrid'

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

interface Props {
  readonly style?: React.CSSProperties
  readonly to?: LinkProps['to']
  readonly generationNumber?: string
  readonly address?: string
  readonly id?: string
  readonly gameState: string
  readonly isCreating?: boolean
}

const SnapshotCreator = ({ style, to, generationNumber, address, id, gameState, isCreating }: Props) => {
  return (
    <StyledCard to={to} style={style}>
      <StyledGridContainer>
        <ClientOnly>
          {() => <SnapshotGrid data={gameStateToGrid(gameState)} isGameOver={gameState == '0'} />}
        </ClientOnly>
      </StyledGridContainer>
      {isCreating ? (
        <>
          <StyledGenNumber> Creating Game </StyledGenNumber>
          <StyledGenLabel> Pending... </StyledGenLabel>
        </>
      ) : (
        <>
          <StyledGenNumber> Game #{id.slice(0, 3)} </StyledGenNumber>
          <StyledGenLabel> Generation: {generationNumber} </StyledGenLabel>
          <StyledUserAddress>
            <HiOutlineUser color="#c2b9b2" size={16} /> {getShortChecksumAddress(address)}
          </StyledUserAddress>
        </>
      )}
    </StyledCard>
  )
}

export default SnapshotCreator
