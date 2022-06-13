import React, { useEffect, useState } from 'react'
import SidebarSection from '../../SidebarSection/SidebarSection'
import TxnRow from '../../TxnRow/TxnRow'
import { useStarknetTransactionManager } from '@starknet-react/core'
import { useSelector } from 'react-redux'
import { toHex } from 'starknet/dist/utils/number'
import TransactionRowLoading from '../../TxnRow/TxnLoadingRow'

const Gameplay = ({ title, type }) => {
  const { transactions } = useStarknetTransactionManager()
  const { recentGames } = useSelector((state) => state.gameplay)
  return (
    <SidebarSection type={type} title={title}>
      <div
        style={{
          height: 260,
          overflowY: 'auto',
        }}
      >
        <div>
          {transactions.length === 0
            ? ''
            : transactions
                .map((tx, index) => {
                  console.log(tx)
                  return <TxnRow key={index} data={tx} />
                })
                .reverse()}
          {recentGames && recentGames.length ? (
            recentGames[0].map((game, index) => {
              const gameTxn = {
                status: 'ACCEPTED_ON_L2',
                transaction: {
                  contract_address: toHex(game),
                },
              }
              return <TxnRow key={index} data={gameTxn} />
            })
          ) : (
            <>
              <TransactionRowLoading />
              <TransactionRowLoading />
              <TransactionRowLoading />
              <TransactionRowLoading />
              <TransactionRowLoading />
            </>
          )}
        </div>
      </div>
    </SidebarSection>
  )
}

export default Gameplay
