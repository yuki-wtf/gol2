import SidebarSection from '../../SidebarSection/SidebarSection'
import { TxnRowStatus } from '../../TxnRow/TxnRow'
import type { Infinite } from '~/db.server'
import TransactionRow from '~/components/TxnRow/TxnRow.styles'
import type { UseDataFunctionReturn } from '@remix-run/react/dist/components'
import { getChecksumAddress } from 'starknet'

interface Props {
  readonly title: string
  readonly type: string

  readonly onChainPlay: UseDataFunctionReturn<readonly Infinite[]>
}

export default function Gameplay({ title, type, onChainPlay }: Props) {
  // const { transactions } = useStarknetTransactionManager()
  // const { recentGames } = useSelector((state) => state.gameplay)
  console.log(onChainPlay)
  return (
    <SidebarSection type={type} title={title}>
      <div
        style={{
          height: 260,
          overflowY: 'auto',
        }}
      >
        <div>
          {Array.from(onChainPlay)
            .reverse()
            .map((data, index) => (
              <TransactionRow
                key={index}
                label={TxnRowStatus[data.txStatus ?? 'ACCEPTED_ON_L1'].statusText}
                status={data.txStatus ?? 'ACCEPTED_ON_L1'}
                user={getChecksumAddress(data.transactionOwner)}
              />
            ))}

          {/* {recentGames && recentGames.length ? (
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
          )} */}
        </div>
      </div>
    </SidebarSection>
  )
}
