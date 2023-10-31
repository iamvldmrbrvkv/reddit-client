import { useDispatch, useSelector } from "react-redux";
import { selectSubredditInfo, selectSubredditData, fetchSubreddit, selectLoading, selectError } from "../subredditSlice";
import { useEffect } from "react";
import Posts from "../Posts/Posts";
import { useParams } from "react-router-dom";

const Subreddit = () => {
  const dispatch = useDispatch()
  const subredditInfo = useSelector(selectSubredditInfo)
  const subredditData = useSelector(selectSubredditData)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const { subreddit } = useParams()
  const reddit = 'reddit'

  useEffect(() => {
    !subreddit ? dispatch(fetchSubreddit(reddit)) : dispatch(fetchSubreddit(subreddit))
  }, [dispatch, subreddit])
 
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : subredditInfo && (
        <>
          <h2>{subredditInfo.data.subreddit}</h2>
          <p><b>{subredditInfo.data.subreddit_name_prefixed}</b></p>
          <Posts posts={subredditData} />
        </>
      )}
    </div>
  )
}

export default Subreddit