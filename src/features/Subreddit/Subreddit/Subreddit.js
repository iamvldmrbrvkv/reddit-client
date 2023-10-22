import { useDispatch, useSelector } from "react-redux";
import { selectSubreddit, fetchSubreddit, isLoading } from "../subredditSlice";
import { useEffect } from "react";
import Posts from "../Posts/Posts";

const Subreddit = () => {
  const dispatch = useDispatch()
  const subreddit = useSelector(selectSubreddit)
  const loading = useSelector(isLoading)

  useEffect(() => {
    const enpoint = 'r/reddit/'
    dispatch(fetchSubreddit(enpoint))
  }, [dispatch])
 
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>{subreddit.subreddit}</h2>
      <p>{subreddit.subreddit_name_prefixed}</p>
      <Posts posts={subreddit.posts} />
    </div>
  )
}

export default Subreddit