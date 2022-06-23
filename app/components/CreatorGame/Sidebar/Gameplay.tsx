import React, { useEffect, useState } from 'react'
import SidebarSection from '../../SidebarSection/SidebarSection'
import TxnRow from '../../TxnRow/TxnRow'
import { useStarknetTransactionManager } from '@starknet-react/core'
import TransactionRowLoading from '../../TxnRow/TxnLoadingRow'

const Gameplay = ({ title, type }) => {
  const { transactions } = useStarknetTransactionManager()
  return (
    <SidebarSection type={type} title={title}>
      <div
        style={{
          height: 260,
          overflowY: 'auto',
        }}
      >
        {transactions.length === 0 ? (
          <>
            <TransactionRowLoading />
            <TransactionRowLoading />
            <TransactionRowLoading />
            <TransactionRowLoading />
            <TransactionRowLoading />
          </>
        ) : (
          transactions
            .map((tx, index) => {
              // console.log(tx)
              return <TxnRow key={index} data={tx} />
            })
            .reverse()
        )}
      </div>
    </SidebarSection>
  )
}

export default Gameplay
