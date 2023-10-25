import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  'comments/fethcComments',
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/${endpoint}.json`)
      const json = await response.json()
      if (response.status !== 200) {
        const errorMessage = `${response.status}`
        throw new Error(errorMessage)
      }
      return json
    } catch (err) {
      return rejectWithValue(`${err.name}: ${err.errorMessage}`)
    }
  }
)

const initialState = {
  comments: [],
  loading: false,
  error: null
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload[1].data.children
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const selectComments = state => state.comments

export const isLoading = state => state.comments.loading

export const isError = state => state.comments.error

export default commentsSlice.reducer