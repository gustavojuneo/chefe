import { createContext } from 'react'

export const ListsContext = createContext({} as any)

export const ListsProvider = ({ children }: any) => {
  return <ListsContext.Provider value={{}}>{children}</ListsContext.Provider>
}
