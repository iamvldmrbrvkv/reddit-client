import { useDispatch, useSelector } from "react-redux";
import { selectSubreddit, selectPosts, fetchSubreddit, isLoading, isError } from "../subredditSlice";
import { useEffect } from "react";
import Posts from "../Posts/Posts";
import { useParams } from "react-router-dom";

const Subreddit = () => {
  const dispatch = useDispatch()
  const subreddit = useSelector(selectSubreddit)
  const posts = useSelector(selectPosts)
  const loading = useSelector(isLoading)
  const error = useSelector(isError)
  const { subredditName } = useParams()
  const reddit = 'reddit/'

  useEffect(() => {
    !subredditName ? dispatch(fetchSubreddit(reddit)) : dispatch(fetchSubreddit(subredditName))
  }, [dispatch, subredditName])
 
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{subreddit.subreddit}</h2>
          <p>{subreddit.subreddit_name_prefixed}</p>
          <Posts posts={posts} />
        </>
      )}
    </div>
  )
}

export default Subreddit