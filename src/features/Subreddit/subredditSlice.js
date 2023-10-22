import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubreddit = createAsyncThunk(
  'subreddit/fetchSubreddit',
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/${endpoint}.json`)
      const json = await response.json()
      return json
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const initialState = {
  posts: [],
  loading: false,
  error: null
}

const subredditSlice = createSlice({
  name: 'subreddit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddit.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubreddit.fulfilled, (state, action) => {
        state.loading = false
        state.subreddit = action.payload.data.children[0].data.subreddit
        state.subreddit_name_prefixed = action.payload.data.children[0].data.subreddit_name_prefixed
        state.posts = action.payload.data.children
      })
      .addCase(fetchSubreddit.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export const selectSubreddit = state => state.subreddit

export const isLoading = state => state.subreddit.loading

export const isError = state => state.subreddit.error

export default subredditSlice.reducer