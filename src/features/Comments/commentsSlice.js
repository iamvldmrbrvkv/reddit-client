import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import redditAPI from "../../services/redditAPI";

export const fetchComments = createAsyncThunk(
  'comments/fethcComments',
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      const json = await redditAPI.getPostComments(subreddit, postId)
      return json
    } catch (err) {
      return rejectWithValue(`${err.name}: ${err.message}`)
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