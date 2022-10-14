import { createContext } from 'react'

export interface ServerStyleContextData {
  key: string
  ids: string[]
  css: string
}

const ServerStyleContext = createContext<null | ServerStyleContextData[]>(null)

export default ServerStyleContext
