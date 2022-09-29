import styled from '@emotion/styled'
import T from '../../Typography/Typography'
import GolToken from '~/components/Logos/Token/GolToken'
import { useUser } from '~/hooks/useUser'
import Button from '~/components/Button/Button'
import { HiPlus } from 'react-icons/hi'
import Highlight from '~/components/Highlight/Highlight'
import { useHelpMessage } from '~/hooks/HelpMessage'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DialogAddGolTokenToWallet from '~/components/DialogAddGolTokenToWallet/DialogAddGolTokenToWallet'
import golTokenIcon from '~/assets/images/gol-token-icon.png'
import { useLocalStorage } from 'react-use'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useStarknet } from '@starknet-react/core'
import { getChecksumAddress } from 'starknet4'
import { useLocation } from '@remix-run/react'

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
    height: ${(props) => (props.active ? '29px' : '33px')};
    background-color: black;
    position: absolute;
    top: -5px;
    top: ${(props) => (props.active ? '-1px' : '-2px')};
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
  const [addTokenDialogVisible, setAddTokenDialogVisible] = useState(false)
  const user = useUser()
  const balance = user?.balance ?? 0
  const hasIncomingTransfer = user?.hasIncomingTransfer ?? false
  const hasOutgoingTransfer = user?.hasOutgoingTransfer ?? false
  const location = useLocation()
  const [helpMessage, setHelpMessage] = useHelpMessage()
  const [hasDismissedFirstTokenEarnedMessage, setHasDismissedFirstTokenEarnedMessage] = useLocalStorage(
    'has-dismissed-first-token-earned-message',
    false
  )
  const {env} = useRootLoaderData()

  useEffect(() => {
    if (hasIncomingTransfer && !hasOutgoingTransfer && !hasDismissedFirstTokenEarnedMessage) {
      setHelpMessage('firstTokenEarnedMessage')
    }
  }, [hasDismissedFirstTokenEarnedMessage, hasIncomingTransfer, hasOutgoingTransfer, setHelpMessage])

  useEffect(() => {
    let timer
    if (helpMessage === 'balanceMessage' || helpMessage === 'firstTokenEarnedMessage') {
      timer = setTimeout(() => {
        if (helpMessage === 'firstTokenEarnedMessage') {
          setHasDismissedFirstTokenEarnedMessage(true)
          setAddTokenDialogVisible(true)
        }
        setHelpMessage(null)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [helpMessage, setHasDismissedFirstTokenEarnedMessage, setHelpMessage])

  const { connectors } = useStarknet()
  const [wallet, setWallet] = useState<{ id: string; name: string }>()
  const {account} = useStarknet()

  useEffect(() => {
    ;(async () => {
      for (const connector of connectors) {
        const accountObj = await connector.account()
        if (accountObj != null) {
          if (getChecksumAddress(accountObj.address) === getChecksumAddress(account)) {
            setWallet({
              id: connector.id(),
              name: connector.name(),
            })
          }
        }
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  function getMessageData() {
    if (helpMessage == 'balanceMessage') {
      return {
        title: 'Not enough Tokens',
        desc: '1 GOL token = 1 Give Life to a cell',
      }
    }

    if (helpMessage == 'firstTokenEarnedMessage') {
      return {
        title: 'You earned your first GOL token!',
        desc: 'You can give life to a cell by clicking the grid.',
      }
    }
  }

  return (
    <StyledContainer>
      <DialogAddGolTokenToWallet
        onClick={() => {
          const data = {
            type: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: env.CONTRACT_ADDRESS,
                name: 'Game of Life Token',
                symbol: 'GOL',
                decimals: '0',
                network: env.USE_MAINNET ? 'mainnet-alpha' : 'goerli-alpha',
                image: golTokenIcon,
              },
            },
          }

          if (wallet?.id === 'argentX') {
            if (window.starknet != null) {
              window.starknet.request(data)
            }
          }

          if (wallet?.id === 'braavos') {
            if (window.starknet_braavos != null) {
              window.starknet_braavos.request(data)
            }
          }

          setAddTokenDialogVisible(false)
        }}
        open={addTokenDialogVisible}
        onClose={() => setAddTokenDialogVisible(false)}
      />
      <Highlight
        style={{ height: 38, lineHeight: 38, alignItems: 'center', paddingLeft: 24, paddingRight: 24 }}
        highlightRadius={100}
        {...getMessageData()}
        active={helpMessage === 'balanceMessage' || helpMessage === 'firstTokenEarnedMessage'}
        sideOffset={5}
        onClose={() => {
          if (helpMessage === 'firstTokenEarnedMessage') {
            setHasDismissedFirstTokenEarnedMessage(true)
            setAddTokenDialogVisible(true)
          }
          setHelpMessage(null)
        }}
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
                {balance}
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
