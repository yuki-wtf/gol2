import { useState, useCallback } from 'react'

const useCounter = () => {
  const [counter, setCounter] = useState(0)
  const increment = useCallback(() => {
    setCounter((counter) => counter + 1)
  }, [setCounter])
  const decrement = useCallback(() => {
    setCounter((counter) => counter - 1)
  }, [setCounter])
  return {
    counter,
    decrement,
    increment,
  }
}

export default useCounter
