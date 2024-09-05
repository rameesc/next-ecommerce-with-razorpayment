"use client"

import { store } from '@/reduct-toolkit/store'
import React from 'react'
import { Provider } from 'react-redux'


const ReducProvider = ({children}) => {
  return (
    <Provider store={store}>
         {children}
    </Provider>
  )
}

export default ReducProvider