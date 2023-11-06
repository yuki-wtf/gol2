import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAnimation, motion } from 'framer-motion'
import { HiOutlineHeart, HiOutlineLightningBolt } from 'react-icons/hi'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { useUser } from '~/hooks/useUser'
import { num } from 'starknet'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { usePreviousDistinct } from 'react-use'
const hexToDecimalString = num.hexToDecimalString

export const TxnRowStatus = {
  TRANSACTION_RECEIVED: {
    statusText: 'Pending ...',
    color: '#83E8FE',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  RECEIVED: {
    statusText: 'Pending ...',
    color: '#83E8FE',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  NOT_RECEIVED: {
    statusText: 'Pending...',
    color: '#83E8FE',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  REJECTED: {
    statusText: '(failed)',
    color: 'transparent',
    textColor: '#F06B97',
    iconColor: '#F06B97',
    buttonColor: '#F3E9E1',
    userColor: '#F3E9E1',
  },
  ACCEPTED_ON_L1: {
    statusText: 'Accepted',
    color: '#8AED9B',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  PENDING: {
    statusText: 'Accepted',
    color: '#8AED9B',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  ACCEPTED_ON_L2: {
    statusText: 'Accepted',
    color: '#8AED9B',
    textColor: '#0A0C10',
    iconColor: '#0A0C10',
    buttonColor: '#0A0C10',
    userColor: '#0A0C10',
  },
  COMPLETED: {
    statusText: '',
    color: 'transparent',
    textColor: '#F06B97',
    iconColor: '#57637B',
    buttonColor: '#FCFAF8',
    userColor: '#F3E9E1',
  },
} as const

export type TxnStatus = keyof typeof TxnRowStatus

const Container = styled(motion.div)`
  height: 48px;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`
const Progress = styled(motion.div)<{ status: TxnStatus }>`
  border: 1px solid #1d222c;
  background-color: ${(p) => TxnRowStatus[p.status].color};

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  z-index: 1;
  border-radius: 6px;
`
const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  position: absolute;
  inset: 0;
  height: 48px;
  z-index: 2;
`
const ButtonContainer = styled.div<{ status: TxnStatus }>`
  margin-left: auto;
  a {
    color: ${(p) => TxnRowStatus[p.status].buttonColor};
    &:hover {
      opacity: 0.4;
    }
  }
`
const ButtonContainerCompleted = styled.div`
  margin-left: auto;
  a {
    color: white;
    &:hover {
      opacity: 0.4;
    }
  }
`
const IconContainer = styled.div<{ status: TxnStatus }>`
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: ${(p) => TxnRowStatus[p.status].iconColor};
`
const IconContainerComplete = styled.div`
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: white;
`
const UserContainer = styled(motion.span)`
  color: #f3e9e1;
`
const StatusContainer = styled.div<{ status: TxnStatus }>`
  color: ${(p) => TxnRowStatus[p.status].textColor};
`

interface Props {
  readonly url: string
  readonly type: 'game_evolved' | 'cell_revived' | 'game_created'
  readonly status: TxnStatus
  readonly delay?: number
  readonly duration?: number
  readonly label: string
  readonly user: string
}

const TxnRow = ({ url = '/', type = 'game_evolved', status, delay = 0.5, duration = 0.3, label, user }: Props) => {
  const [statusInternal, setStatusInternal] = useState<TxnStatus | null>(null)
  const controls = useAnimation()
  const currentUser = useUser()
  const currentUserFormatted = currentUser && hexToDecimalString(currentUser.userId)
  const currentUserId = currentUserFormatted ?? null
  const currentRowUser = user && hexToDecimalString(user)
  const prevStatus = usePreviousDistinct(status)

  const { env } = useRootLoaderData()
  const voyagerUrl = env.USE_MAINNET ? 'https://voyager.online' : 'https://goerli.voyager.online'

  useEffect(() => {
    if (status === 'TRANSACTION_RECEIVED' || status === 'RECEIVED' || status === 'NOT_RECEIVED') {
      void controls.start({
        width: '100%',
        transition: {
          delay: delay,
          duration: duration,
        },
      })
    } else if (
      prevStatus === 'PENDING' ||
      prevStatus === 'ACCEPTED_ON_L2' ||
      prevStatus === 'ACCEPTED_ON_L1' ||
      prevStatus === undefined
    ) {
      setTimeout(() => {
        controls.set({
          width: '0%',
        })
        setStatusInternal('COMPLETED')
      }, 0)
      return
    } else if (status === 'PENDING' || status === 'ACCEPTED_ON_L2' || status === 'ACCEPTED_ON_L1') {
      controls.set({
        width: '0%',
      })
      void controls.start({
        width: '100%',
        transition: {
          duration: duration,
          delay: 0,
        },
      })
      setTimeout(() => {
        void controls.start({
          width: '0%',
          transition: { duration: 0.3 },
        })
      }, 2000)
      setTimeout(() => {
        controls.set({
          width: '0%',
        })
        setStatusInternal('COMPLETED')
      }, 2000)
    } else if (status === 'REJECTED') {
      void controls.start({
        width: '0%',
        transition: {
          duration: duration,
        },
      })
      setTimeout(() => {
        setStatusInternal('REJECTED')
      }, 2000)
    } else if (statusInternal === 'COMPLETED') {
      controls.set({
        width: '0%',
      })
      setTimeout(() => {
        void controls.start({
          width: '0%',
          transition: {
            duration: 0.3,
          },
        })
      }, 2000)
    }
  }, [status, controls, statusInternal, delay, duration, prevStatus])

  const showUserAddress = statusInternal === 'REJECTED' || statusInternal === 'COMPLETED'
  const isMyTxn = currentUserId === currentRowUser
  const isCellRevivedTxn = type === 'cell_revived'

  return (
    <Container
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: delay,
        },
      }}
      exit={{
        opacity: 0,
      }}
      layout
    >
      {statusInternal !== 'COMPLETED' ? (
        <Progress
          status={status}
          initial={{
            width: '0%',
          }}
          animate={controls}
        />
      ) : null}

      <InnerContainer>
        {statusInternal !== 'COMPLETED' ? (
          <IconContainer status={status}>
            {isCellRevivedTxn ? <HiOutlineHeart size={18} /> : <HiOutlineLightningBolt size={18} />}
          </IconContainer>
        ) : (
          <IconContainerComplete>
            {isCellRevivedTxn ? (
              <HiOutlineHeart size={18} color="white" />
            ) : (
              <HiOutlineLightningBolt size={18} color="white" />
            )}
          </IconContainerComplete>
        )}

        <StatusContainer status={status}>
          {showUserAddress && (
            <UserContainer
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              {getShortChecksumAddress(user)} {isMyTxn && <span>(you)</span>}
            </UserContainer>
          )}
          {statusInternal === 'COMPLETED' ? (
            ''
          ) : (
            <>
              {label} {isMyTxn && <span>(you) </span>}
            </>
          )}
          {}
        </StatusContainer>
        {statusInternal !== 'COMPLETED' ? (
          <ButtonContainer status={status}>
            <a rel="noreferrer" target="_blank" href={`${voyagerUrl}/tx/${url}`}>
              view
            </a>
          </ButtonContainer>
        ) : (
          <ButtonContainerCompleted>
            <a rel="noreferrer" target="_blank" href={`${voyagerUrl}/tx/${url}`}>
              view
            </a>
          </ButtonContainerCompleted>
        )}
      </InnerContainer>
    </Container>
  )
}

export default TxnRow
