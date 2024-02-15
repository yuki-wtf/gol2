import type { OnChainPlay } from '~/db.server'
import { getChecksumAddress } from 'starknet'
import type { SerializeFrom } from '@remix-run/node'
import TxnRow, { TxnRowStatus } from '~/components/TxnRow'
import SidebarSection from '~/components/SidebarSection'
import TxnList from '~/components/TxnList'

interface Props {
  readonly title: string
  readonly type: string

  readonly onChainPlay: SerializeFrom<readonly OnChainPlay[]>
}

export default function Gameplay({ title, type, onChainPlay }: Props) {
  return (
    <SidebarSection type={type} title={title}>
      <TxnList>
        {onChainPlay.map((data) => (
          <TxnRow
            key={data.hash}
            label={TxnRowStatus[data.status].statusText}
            status={data.status}
            user={getChecksumAddress(data.owner)}
            url={data.hash}
            type={data.type}
          />
        ))}
      </TxnList>
    </SidebarSection>
  )
}
