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
  const { subreddit, id } = useParams()

  useEffect(() => {
    dispatch(fetchComments({ subreddit, postId: id }))
  }, [dispatch, id, subreddit])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : subredditData && (
        <>
          <Post post={subredditData} />
          <h3>Comments</h3>
          <Comments comments={commentsData} />
        </>
      )}
    </div>
  )
}

export default FullPostWithComments