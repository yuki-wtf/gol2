import { useFetcher } from '@remix-run/react'
import produce from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import { dataToGrid } from '~/helpers/dataToGrid'
import { useInfiniteGameContract } from './useInfiniteGameContract'

interface Params {
  readonly maxFrame: number
  readonly currentFrame: number
}

export interface State {
  readonly maxFrame: null | number
  readonly currentFrame: null | number
  readonly playbackSpeed: number
  readonly isPlaying: boolean
  readonly frames: {
    readonly [frame: number]: {
      readonly state?: string
    }
  }
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

export function useInfiniteGamePlayback({ maxFrame, currentFrame }: Params): [State, Actions] {
  // state
  const [state, setState] = useState<State>({
    currentFrame,
    maxFrame,
    playbackSpeed: 1,
    isPlaying: false,
    frames: {},
  })

  useEffect(() => {
    setState((state) => ({
      ...state,
      maxFrame,
      currentFrame,
    }))
  }, [maxFrame, currentFrame])

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
      if (state.maxFrame == null) return state
      if (state.currentFrame == null) return state
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

  useEffect(() => {
    if (state.maxFrame == null) return
    if (state.currentFrame == null) return

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
          return frame <= state.maxFrame && state.frames[frame] == null
        })
      ).values()
    )

    if (framesToLoad.length === 0) return

    setState(
      produce((draft) => {
        framesToLoad.forEach((frame) => {
          draft.frames[frame] = {
            state: null,
          }
        })
      })
    )

    const request = fetch(`/api/infinite/state?frames=${framesToLoad.join(',')}`)

    request
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setState(
          produce((draft) => {
            for (let i = 0; i < framesToLoad.length; i++) {
              if (data[framesToLoad[i]] != null) {
                draft.frames[framesToLoad[i]] = {
                  state: data[framesToLoad[i]],
                }
              } else {
                draft.frames[framesToLoad[i]] = null
              }
            }
          })
        )
      })
      .catch(() => {
        setState(
          produce((draft) => {
            for (let i = 0; i < framesToLoad.length; i++) {
              draft.frames[framesToLoad[i]] = null
            }
          })
        )
      })
  }, [state.currentFrame, state.frames, state.maxFrame])
  console.log(state)

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
