import React from 'react'
import { FlashProvider } from './flash'

export default function ContextProvider ({ children }) {
  return (
    <FlashProvider>
      { children }
    </FlashProvider>
  )
} 