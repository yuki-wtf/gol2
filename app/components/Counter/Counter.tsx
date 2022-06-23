import React from 'react'
import useCounter from '../../hooks/useCounter'
import { InjectedConnector, useStarknet } from '@starknet-react/core'

const Counter = () => {
  const { counter, increment, decrement } = useCounter()
  const { account, connect, disconnect } = useStarknet()
  return (
    <div
      style={{
        padding: 32,
        display: 'flex',
        gap: 16,
      }}
    >
      <div>{account}</div>
      <div>{counter}</div>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>decrement</button>
        <button onClick={() => connect(new InjectedConnector())}>Connect </button>
        <button onClick={() => disconnect()}>disConnect</button>
      </div>
    </div>
  )
}

export default Counter
