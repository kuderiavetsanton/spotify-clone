import React, {createContext,useContext,useReducer} from 'react'

const DataLayerContext = createContext()

export default function DataLayer({initialState,reducer,children}) {
    return (
        <DataLayerContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </DataLayerContext.Provider>
    )
}

export const useDataLayerStore = () => useContext(DataLayerContext)
