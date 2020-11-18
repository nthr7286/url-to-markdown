import React, { createContext, useReducer, useContext } from 'react'

const FlashStateContext = createContext()
const FlashDispatchContext = createContext()

const FlashReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FLASH':
      const { severity, message } = action.payload
      return {
        ...state,
        open: true,
        severity,
        message,
      }
    case 'RESET_FLASH':
      return {
        ...state,
        open: false,
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const FlashProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FlashReducer, { open: false, severity: '', message: '' })
  return (
    <FlashDispatchContext.Provider value={ dispatch }>
      <FlashStateContext.Provider value={ state }>
        {children}
      </FlashStateContext.Provider>
    </FlashDispatchContext.Provider>
  )
}

export const useFlashState = () => useContext(FlashStateContext)
export const useFlashDispatch = () => useContext(FlashDispatchContext)