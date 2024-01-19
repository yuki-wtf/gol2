import { createStateContext } from 'react-use'

export const [useCreatedSnapshot, CreatedSnapshotProvider, CreatedSnapshotContext] = createStateContext<boolean>(false)
