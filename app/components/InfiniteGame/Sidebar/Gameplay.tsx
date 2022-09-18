import SidebarSection from '../../SidebarSection/SidebarSection'
import { TxnRowStatus } from '../../TxnRow/TxnRow'
import type { OnChainPlay } from '~/db.server'
import { getChecksumAddress } from 'starknet'
import type { SerializeFrom } from '@remix-run/node'
import TransactionRowTemp from '~/components/TxnRow/TransactionRowTemp'
import TxnList from '~/components/TxnRowNew/TxnList'

interface Props {
  readonly title: string
  readonly type: string

  readonly onChainPlay: SerializeFrom<readonly OnChainPlay[]>
}

export default function Gameplay({ title, type, onChainPlay }: Props) {
  // const { transactions } = useStarknetTransactionManager()
  // const { recentGames } = useSelector((state) => state.gameplay)
  // console.log(onChainPlay)
  return (
    <SidebarSection type={type} title={title}>
      <TxnList>
        {onChainPlay.map((data) => (
          <TransactionRowTemp
            key={data.hash}
            label={TxnRowStatus[data.status ?? 'ACCEPTED_ON_L1'].statusText}
            status={data.status ?? 'ACCEPTED_ON_L1'}
            user={getChecksumAddress(data.owner)}
            url={data.hash}
            type={data.type}
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
      </TxnList>
    </SidebarSection>
  )
}
