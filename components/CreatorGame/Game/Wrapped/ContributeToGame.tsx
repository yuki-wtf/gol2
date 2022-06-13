// 2247209412414640349576742040122551266312186675058405126471989646827419512213
import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React from 'react'
import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'
import Button from '../../../Button/Button'

const ContributeToGame = () => {
  const { contract } = useCreatorGameContract()
  const { account } = useStarknet()
  const { data, loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: 'contribute',
  })
  //   console.log(error);
  return (
    <Button
      label="Testing Contribute to Game"
      onClick={() => {
        if (account) {
          console.log('clicked')
          invoke({
            args: ['2'],
          })
        }
      }}
    />
  )
}

export default ContributeToGame
