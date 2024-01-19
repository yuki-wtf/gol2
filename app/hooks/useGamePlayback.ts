import produce from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { useInterval } from 'react-use'

interface Params {
  readonly maxFrame: number
  readonly currentFrame: number
  readonly fetchFrames: (frames: number[]) => Promise<string[]>
  readonly lastFrameRefreshInterval?: number | null | undefined
}

export interface State {
  readonly maxFrame: number
  readonly currentFrame: number
  readonly playbackSpeed: number
  readonly isPlaying: boolean
  readonly frames: Readonly<
    Record<
      number,
      | undefined
      | null
      | {
          readonly shouldRefresh?: boolean
          readonly state?: string
        }
    >
  >
}

export interface Actions {
  readonly play: () => void
  readonly pause: () => void
  readonly setPlaybackSpeed: (playbackSpeed: number) => void
  readonly goToFrame: (frame: number) => void
  readonly goToNextFrame: () => void
  readonly goToFirstFrame: () => void
  readonly goToLastFrame: () => void
}

export function useGamePlayback({
  maxFrame,
  currentFrame,
  fetchFrames,
  lastFrameRefreshInterval,
}: Params): [State, Actions] {
  // state
  const [state, setState] = useState<State>({
    currentFrame,
    maxFrame,
    playbackSpeed: 1,
    isPlaying: false,
    frames: {},
  })

  useEffect(() => {
    setState((state) => {
      if (state.currentFrame === state.maxFrame) {
        return {
          ...state,
          maxFrame,
          isPlaying: true,
        }
      } else {
        return {
          ...state,
          maxFrame,
        }
      }
    })
  }, [maxFrame])

  // methods
  const goToFrame = useCallback((frame: number) => {
    setState((state) => {
      if (frame < 1) return state
      if (frame > state.maxFrame) return state

      return {
        ...state,
        currentFrame: frame,
      }
    })
  }, [])

  const play = useCallback(() => {
    setState((state) => {
      if (state.currentFrame === state.maxFrame) return state

      return {
        ...state,
        isPlaying: true,
      }
    })
  }, [])
  const setPlaybackSpeed = useCallback((playbackSpeed: number) => {
    setState((state) => {
      return {
        ...state,
        playbackSpeed,
      }
    })
  }, [])
  const pause = useCallback(() => {
    setState((state) => {
      return {
        ...state,
        isPlaying: false,
      }
    })
  }, [])
  const goToNextFrame = useCallback(() => {
    goToFrame(state.currentFrame + 1)
  }, [goToFrame, state.currentFrame])

  const goToLastFrame = useCallback(() => {
    goToFrame(state.maxFrame)
  }, [goToFrame, state.maxFrame])

  const goToFirstFrame = useCallback(() => {
    goToFrame(1)
  }, [goToFrame])

  const getInterval = useCallback(() => {
    if (!state.isPlaying) return null
    if (state.frames[state.currentFrame]?.state == null) return null

    return 1000 / 2 ** (state.playbackSpeed - 1)
  }, [state.currentFrame, state.frames, state.isPlaying, state.playbackSpeed])

  useInterval(goToNextFrame, getInterval())

  useInterval(() => {
    setState(
      produce((draft) => {
        if (draft.frames[maxFrame]) {
          draft.frames[maxFrame]!.shouldRefresh = true
        }
      })
    )
  }, lastFrameRefreshInterval ?? null)

  useEffect(() => {
    const chunkSize = 20
    const currentChunkStart = Math.floor((state.currentFrame - 1) / chunkSize) * chunkSize + 1
    const currentChunkEnd = currentChunkStart + chunkSize
    const currentChunkFrame = ((state.currentFrame - 1) % chunkSize) + 1

    const framesToLoad = Array.from(
      new Set(
        [
          state.maxFrame,
          ...Array.from({ length: chunkSize }, (v, k) => k + 1),
          ...Array.from({ length: chunkSize }, (v, k) => k + currentChunkStart),
          ...(currentChunkFrame > chunkSize / 2
            ? Array.from({ length: chunkSize }, (v, k) => k + currentChunkEnd)
            : []),
        ].filter((frame) => {
          const isValidFrame = frame >= 1 && frame <= state.maxFrame && frame !== null
          return isValidFrame && (state.frames[frame] == null || state.frames[frame]!.shouldRefresh === true)
        })
      ).values()
    )

    if (framesToLoad.length === 0) return

    setState(
      produce((draft) => {
        framesToLoad.forEach((frame) => {
          if (draft.frames[frame]?.state != null) {
            draft.frames[frame]!.shouldRefresh = false
          } else {
            draft.frames[frame] = {
              state: undefined,
            }
          }
        })
      })
    )

    const request = fetchFrames(framesToLoad)

    request
      .then((data: string[]) => {
        setState(
          produce((draft) => {
            framesToLoad.forEach((frame, index) => {
              if (data[index] != null) {
                draft.frames[frame] = {
                  state: data[index],
                }
              } else {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete draft.frames[frame]
              }
            })
          })
        )
      })
      .catch(() => {
        setState(
          produce((draft) => {
            framesToLoad.forEach((frame) => {
              if (draft.frames[frame] != null) {
                draft.frames[frame]!.shouldRefresh = true
              }
            })
          })
        )
      })
  }, [fetchFrames, state.currentFrame, state.maxFrame])
  // }, [fetchFrames, state.currentFrame, state.frames, state.maxFrame])

  return [
    state,
    {
      play,
      pause,
      setPlaybackSpeed,
      goToFrame,
      goToNextFrame,
      goToFirstFrame,
      goToLastFrame,
    },
  ]
}

export function useFetchInfiniteFrames(): (frames: number[]) => Promise<string[]> {
  return useCallback((frames: number[]) => {
    const framesQuery = frames.filter((f) => f !== null).join(',')
    return fetch(`/api/infinite/state?frames=${framesQuery}`).then((response) => response.json())
  }, [])
}

export function useFetchCreatorFrames(gameId: string): (frames: number[]) => Promise<string[]> {
  return useCallback(
    (frames: number[]) => {
      const framesQuery = frames.join(',')
      return fetch(`/api/creator/${gameId}/state?frames=${framesQuery}`).then((response) => response.json())
    },
    [gameId]
  )
}
