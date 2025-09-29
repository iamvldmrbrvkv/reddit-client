import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import redditAPI from "../../services/redditAPI";

export const fetchSubreddit = createAsyncThunk(
  'subreddit/fetchSubreddit',
  async (endpoint, { rejectWithValue }) => {
    try {
      const json = await redditAPI.getSubredditPosts(endpoint)
      return json
    } catch (err) {
      return rejectWithValue(`${err.name}: ${err.message}`)
    }
  }
)

const initialState = {
  subredditData: [],
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
        state.subredditData = action.payload.data.children
      })
      .addCase(fetchSubreddit.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const selectSubredditInfo = state => state.subreddit.subredditData[0]

export const selectSubredditData = state => state.subreddit.subredditData

export const selectLoading = state => state.subreddit.loading

export const selectError = state => state.subreddit.error

export default subredditSlice.reducer