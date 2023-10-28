import { useDispatch, useSelector } from "react-redux";
import { selectSubredditData, selectCommentsData, fetchComments, selectLoading, selectError } from "../commentsSlice";
import { useEffect } from "react";
import Comments from "../Comments/Comments";
import Post from "../../Subreddit/Post/Post";
import { useParams } from "react-router-dom";

const FullPostWithComments = () => {
  const dispatch = useDispatch()
  const subredditData = useSelector(selectSubredditData)
  const commentsData = useSelector(selectCommentsData)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const { subreddit, id, title } = useParams()

  useEffect(() => {
    const endpoint = `r/${subreddit}/comments/${id}/${title}/`
    dispatch(fetchComments(endpoint))
  }, [dispatch, id, subreddit, title])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : subredditData && (
        <>
          <Post post={subredditData} />
          <Comments comments={commentsData} />
        </>
      )}
    </div>
  )
}

export default FullPostWithComments