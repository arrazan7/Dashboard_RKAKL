// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import { string } from 'yup'
// ** Fetch Lembaga

export const fetchLembaga = createAsyncThunk('lembaga/getAllLembaga', async (token: string) => {
  // const response = await axios.get(`https://my-json-server.typicode.com/mnurhuda08/jsonplaceholder/posts`)
  const response = await axios.get(`/api/lembaga`, {
    headers: {
      Authorization: token
    }
  })
  return response.data.data.data
})

const initialState = {
  lembagaData: [],
  loading: false
} as any

const lembagaSlice = createSlice({
  name: 'lembaga',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLembaga.fulfilled, (state, action) => {
      state.loading = false
      state.lembagaData.push(...action.payload)
    })
    builder.addCase(fetchLembaga.rejected, (state, action) => {
      state.loading = false
      console.log('reducer', action)
    })
    builder.addCase(fetchLembaga.pending, (state, action) => {
      state.loading = true
    })
  }
})

export default lembagaSlice.reducer
