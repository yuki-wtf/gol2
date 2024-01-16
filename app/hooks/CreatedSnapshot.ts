import { createStateContext } from 'react-use'

export interface CreatedSnapshot {
  readonly snapshotId: string
}

export const [useCreatedSnapshot, CreatedSnapshotProvider, CreatedSnapshotContext] =
  createStateContext<CreatedSnapshot | null>(null)
