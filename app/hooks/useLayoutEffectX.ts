import { useEffect, useLayoutEffect } from 'react'

export const useLayoutEffectX = typeof document === 'undefined' ? useEffect : useLayoutEffect
