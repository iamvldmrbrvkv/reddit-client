import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "../features/Subreddit/subredditSlice";
import commentsReducer from "../features/Comments/commentsSlice";

const store = configureStore({
  reducer: {
    subreddit: subredditReducer,
    comments: commentsReducer
  }
})

export default store