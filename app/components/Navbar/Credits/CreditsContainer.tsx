import styled from '@emotion/styled'
import T from '../../Typography/Typography'
import GolToken from '~/components/Logos/Token/GolToken'
import { useUser } from '~/hooks/useUser'
import Button from '~/components/Button/Button'
import { useLocation } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import Highlight from '~/components/Highlight/Highlight'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DialogAddGolTokenToWallet from '~/components/DialogAddGolTokenToWallet/DialogAddGolTokenToWallet'
import { ContractAddress } from '~/hooks/useGameContract'
import golTokenIcon from '~/assets/images/gol-token-icon.png'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const StyledIconWrapper = styled.div`
  color: ${(props) => props.theme.colors.infinitePrimary};
`
const StyledTextWrapper = styled.div`
  line-height: 12px;
  @media (max-width: 750px) {
    > h4 {
      line-height: 18px;
      text-align: left;
    }
  }
`
const StyledTokenIconWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 8px;
  height: 27px;
  &:before {
    content: '';
    width: 1px;
    height: ${(props) => (props.active ? '29px' : '36px')};
    background-color: black;
    position: absolute;
    top: -5px;
    top: ${(props) => (props.active ? '-1px' : '-5px')};
    right: -16px;
  }
  color: ${(props) => props.theme.colors.creatorPrimary};
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div > h4 {
      line-height: 0px;
      padding: 0;
      margin: 0;
      text-align: left;
      margin-top: 12px;
    }
  }
`
const StyledButtonWrapper = styled.div`
  margin-left: 16px;
`
const TestContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
  position: relative;
`

export default function CreditsContainer() {
  const [addTokenDialogVisible, setaddTokenDialogVisible] = useState(false)
  const [title, setTitle] = useState('Not enough Tokens')
  const [desc, setDesc] = useState('1 GOL token = 1 Give Life to a cell')
  const user = useUser()
  const balance = user?.balance ?? 0
  const location = useLocation()
  const [helpMessage, setHelpMessage] = useHelpMessage()

  useEffect(() => {
    let timer
    if (helpMessage === 'balanceMessage' || helpMessage === 'firstTokenEarnedMessage') {
      timer = setTimeout(() => {
        setHelpMessage(null)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [helpMessage, setHelpMessage])

  useEffect(() => {
    if (helpMessage == 'balanceMessage') {
      setTitle('Not enough Tokens')
      setDesc('You can give life to a cell by clicking the grid.')
      return
    }
    if (helpMessage == 'firstTokenEarnedMessage') {
      setTitle('You earned your first GOL token!')
      setDesc('1 GOL token = 1 Give Life to a cell')
      return
    }
  }, [helpMessage])

  return (
    <StyledContainer>
      <DialogAddGolTokenToWallet
        onClick={() => {
          if (window.starknet != null) {
            window.starknet.request({
              type: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: ContractAddress,
                  name: 'Game of Life Token',
                  symbol: 'GOL',
                  decimals: '0',
                  network: 'goerli-alpha',
                  image: golTokenIcon,
                },
              },
            })
          }
          setaddTokenDialogVisible(false)
        }}
        open={addTokenDialogVisible}
        onClose={() => setaddTokenDialogVisible(false)}
      />
      <Highlight
        style={{ height: 38, lineHeight: 38, alignItems: 'center', paddingLeft: 24, paddingRight: 24 }}
        highlightRadius={100}
        title={title}
        desc={desc}
        active={helpMessage === 'balanceMessage' || helpMessage === 'firstTokenEarnedMessage'}
        sideOffset={5}
        onClose={() => setHelpMessage(null)}
      >
        <TestContainer>
          <StyledTokenIconWrapper
            active={helpMessage === 'balanceMessage' || helpMessage === 'firstTokenEarnedMessage'}
          >
            <StyledTextWrapper>
              <T.H4SemiBold
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(180deg, #79FFF7 0%, #79EDA1 100%)',
                }}
              >
                {' '}
                {balance}{' '}
              </T.H4SemiBold>
            </StyledTextWrapper>
            <StyledIconWrapper>
              <GolToken />
            </StyledIconWrapper>
          </StyledTokenIconWrapper>

          <StyledTextWrapper>
            <T.H4SemiBold color="#EBEBEB">Gol Tokens</T.H4SemiBold>
          </StyledTextWrapper>
        </TestContainer>
      </Highlight>
      {/^\/creator(\/|$)/.test(location.pathname) && (
        <StyledButtonWrapper>
          <Button to="/creator/create" icon={<HiPlus size={24} />} label="new game" secondary disabled={balance < 10} />
        </StyledButtonWrapper>
      )}
    </StyledContainer>
  )
}
