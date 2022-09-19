import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useAnimation, motion } from 'framer-motion'
import { HiOutlineHeart, HiOutlineLightningBolt } from 'react-icons/hi'
import { TxnRowStatus } from './TxnRow'
import { getShortChecksumAddress } from '~/helpers/starknet'
import { useUser } from '~/hooks/useUser'
import { hexToDecimalString } from 'starknet/utils/number'
import { VoyagerUrl } from '~/hooks/useGameContract'
import usePrevious from '~/hooks/usePrevious'

const Container = styled(motion.div)`
  height: 48px;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  /* opacity: 0; */
`
const Progress = styled(motion.div)`
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
const ButtonContainer = styled.div`
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
const IconContainer = styled.div`
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
const StatusContainer = styled.div`
  color: ${(p) => TxnRowStatus[p.status].textColor};
`

const TransactionRowTemp = ({ url = '/', type = 'game_evolved', status, delay = 0.5, duration = 0.3, label, user }) => {
  const [statusInternal, setStatusInternal] = useState(null)
  const controls = useAnimation()
  const currentUser = useUser()
  const currentUserFormatted = currentUser && hexToDecimalString(currentUser.userId)
  const currentUserId = currentUserFormatted ?? null
  const currentRowUser = user && hexToDecimalString(user)
  const prevStatus = usePrevious(status)
  // console.log('previous state ======', prevStatus)

  useEffect(() => {
    if (status === 'TRANSACTION_RECEIVED' || status === 'RECEIVED' || status === 'NOT_RECEIVED') {
      // console.log('transaction status', status)
      controls.start({
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
        // console.log('transaction status 2')
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
      controls.start({
        width: '100%',
        transition: {
          duration: duration,
          delay: 0,
        },
      })
      setTimeout(() => {
        // console.log('transaction status 1')
        controls.start({
          width: '0%',
          transition: { duration: 0.3 },
        })
      }, 2000)
      setTimeout(() => {
        // console.log('transaction status 2')
        controls.set({
          width: '0%',
        })
        setStatusInternal('COMPLETED')
      }, 2000)
    } else if (status === 'REJECTED') {
      //   controls.set({ width: "0%" });
      controls.start({
        width: '0%',
        transition: {
          duration: duration,
        },
      })
      setTimeout(() => {
        setStatusInternal('REJECTED') // controls.start({
        //   width: "0%",
        //   transition: { duration: 0.3 },
        // });
      }, 2000)
    } else if (statusInternal === 'COMPLETED') {
      controls.set({
        width: '0%',
      })
      // controls.start({
      //   width: "0%",
      //   transition: { duration: duration },
      // });
      setTimeout(() => {
        controls.start({
          width: '0%',
          transition: {
            duration: 0.3,
          },
        })
      }, 2000)
    }
  }, [status, controls, statusInternal, delay, duration, prevStatus])
  // console.log('current userid', currentUserId)
  // console.log('user', currentRowUser)
  // console.log('isEqual', currentRowUser == currentUserId)
  const showUserAddress = statusInternal === 'REJECTED' || statusInternal === 'COMPLETED'
  const isMyTxn = currentUserId === currentRowUser
  const isCellRevivedTxn = type === 'cell_revived'

  return (
    <Container
      status={status}
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
              status={status}
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
            <a rel="noreferrer" target="_blank" href={`${VoyagerUrl}/tx/${url}`}>
              view
            </a>
          </ButtonContainer>
        ) : (
          <ButtonContainerCompleted status={status}>
            <a rel="noreferrer" target="_blank" href={`${VoyagerUrl}/tx/${url}`}>
              view
            </a>
          </ButtonContainerCompleted>
        )}
      </InnerContainer>
    </Container>
  )
}

export default TransactionRowTemp
