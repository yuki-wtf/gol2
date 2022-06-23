import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAnimation, motion } from 'framer-motion'
import Link from 'next/link'
import { HiOutlineHeart } from 'react-icons/hi'
import { TxnRowStatus } from './TxnRow'
import { truncate } from '../../utils/truncate'
import { useStarknet } from '@starknet-react/core'
import Skeleton from '../Skeleton/Skeleton'
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
  background-color: white;

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
  align-items: center;
  display: flex;
  a {
    color: white;
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
  color: red;
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
  display: flex;
  flex: 1;
`
const StatusContainer = styled.div`
  color: white;
  display: flex;
  flex: 1;
`

const TransactionRowLoading = ({ status = 'COMPLETED', delay = 1 }) => {
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
    >
      <InnerContainer>
        <IconContainerComplete>
          <HiOutlineHeart size={18} color="#57637B" />
        </IconContainerComplete>

        <StatusContainer status={status}>
          <UserContainer
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            status={status}
          >
            <Skeleton size={6} />
          </UserContainer>
        </StatusContainer>

        <ButtonContainer>
          <Skeleton size={6} />
        </ButtonContainer>
      </InnerContainer>
    </Container>
  )
}

export default TransactionRowLoading
