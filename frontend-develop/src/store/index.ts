// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import lembagaSlice from './satker/lembaga/lembaga-slice'

// ** Reducers

export const store = configureStore({
  reducer: {
    lembaga: lembagaSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
