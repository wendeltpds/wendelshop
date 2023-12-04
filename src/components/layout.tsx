'use client'

import React from 'react'
import {SessionProvider} from 'next-auth/react'
import { persistor , store } from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const layout = ({children}: {children:React.ReactNode}) => {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <SessionProvider>
            {children}
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}

export default layout
