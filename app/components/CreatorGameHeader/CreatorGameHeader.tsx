import { useNavigate } from '@remix-run/react'
import { HiOutlineArrowLeft, HiOutlineUser } from 'react-icons/hi'
import styled from 'styled-components'
import { getShortChecksumAddress } from '~/helpers/starknet'
import Button from '../Button/Button'
import Typography from '../Typography/Typography'

const StyledCreatorHeader = styled.header`
  display: flex;
  flex-direction: row;
  height: 58px;
  margin-bottom: 16px;
`
const StyledButtonIdWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`
const StyledCreatedBy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const StyledButtonWrapper = styled.div`
  position: relative;
  left: -16px;
  margin-top: -5px;
`
const StyledId = styled(Typography.H2)`
  margin: 0;
`
const StyledCreatedByWrapper = styled.div`
  color: #c2b9b2;
  display: flex;
  flex-direction: row;
  gap: 8px;
`
const StyledCreatedByText = styled(Typography.BaseRegular)`
  margin: 0;
  color: #c2b9b2;
`
const StyledCreatedUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`

interface Props {
  readonly address: string
  readonly gameId: string
  readonly title: string
}

export default function CreatorGameHeader({ address, gameId, title }: Props) {
  const navigate = useNavigate()

  return (
    <StyledCreatorHeader>
      <StyledButtonIdWrapper>
        <StyledButtonWrapper>
          <Button
            onClick={() => navigate('/creator')}
            tertiaryColor="#C2B9B2"
            icon={<HiOutlineArrowLeft />}
            label="All games"
            tertiary
          />
        </StyledButtonWrapper>
        {gameId && <StyledId>Game #{gameId}</StyledId>}
        {title && <StyledId>{title}</StyledId>}
      </StyledButtonIdWrapper>
      {address && (
        <StyledCreatedBy>
          <StyledCreatedByWrapper>
            <StyledCreatedByText>Created by: </StyledCreatedByText>
            <StyledCreatedUser>
              <HiOutlineUser />
              {getShortChecksumAddress(address)}
            </StyledCreatedUser>
          </StyledCreatedByWrapper>
        </StyledCreatedBy>
      )}
    </StyledCreatorHeader>
  )
}
