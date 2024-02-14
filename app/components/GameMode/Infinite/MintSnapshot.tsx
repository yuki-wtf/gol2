import { HiOutlineX } from 'react-icons/hi'
import Snapshot from '~/components/Snapshot/Snapshot'
import * as SnapshotDialog from '~/components/Snapshot/SnapshotDialog'
import { twitter } from '~/helpers/twitter'
import { useRootLoaderData } from '~/hooks/useRootLoaderData'
import { useUser } from '~/hooks/useUser'

interface MintSnapshotProps {
  snapshot: {
    gameGeneration: string
    gameState: string
  }
  onClose: () => void
  onSnapshotMintCreated: () => void
}
export default function MintSnapshot({ snapshot, onClose, onSnapshotMintCreated }: MintSnapshotProps) {
  const currentUser = useUser()
  const { env } = useRootLoaderData()

  return (
    <SnapshotDialog.Dialog
      open={!!snapshot.gameGeneration}
      onOpenChange={(openState) => {
        if (!openState) {
          onClose()
        }
      }}
    >
      <SnapshotDialog.DialogContent>
        <div style={{ position: 'absolute', top: 10, right: 5, zIndex: 100 }}>
          <SnapshotDialog.DialogClose>
            <HiOutlineX size={24} />
          </SnapshotDialog.DialogClose>
        </div>
        <Snapshot
          large
          gameGeneration={snapshot.gameGeneration}
          gameState={snapshot.gameState}
          user={currentUser?.userId}
          refreshPage={onSnapshotMintCreated}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0,
            },
          }}
          onClickTwitter={() => {
            open(
              twitter(
                `I own generation ${snapshot.gameGeneration} in @GoL2io 💪 #GoL2 #Starknet`,
                `${env.BASE_URL!}/infinite/${snapshot.gameGeneration}`
              )
            )
          }}
        />
      </SnapshotDialog.DialogContent>
    </SnapshotDialog.Dialog>
  )
}
