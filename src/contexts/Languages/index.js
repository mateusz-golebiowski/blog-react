import React from "react"
import { reducer, initialState } from "./languages"

export const LanguageContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const LanguageProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <LanguageContext.Provider value={[ state, dispatch ]}>
            { children }
        </LanguageContext.Provider>
    )
}