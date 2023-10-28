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
  subredditData: [],
  commentsData: [],
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
        state.subredditData= action.payload[0].data.children
        state.commentsData = action.payload[1].data.children
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const selectSubredditData = state => state.comments.subredditData[0]

export const selectCommentsData = state => state.comments.commentsData

export const selectLoading = state => state.comments.loading

export const selectError = state => state.comments.error

export default commentsSlice.reducer