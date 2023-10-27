import { useDispatch, useSelector } from "react-redux";
import { selectComments, fetchComments, isLoading, isError } from "../commentsSlice";
import { useEffect } from "react";
import Comments from "../Comments/Comments";
import Post from "../../Subreddit/Post/Post";
import { useParams } from "react-router-dom";
import { selectPostInfo } from "../commentsSlice";

const FullPostWithComments = () => {
  const dispatch = useDispatch()
  const comments = useSelector(selectComments)
  const loading = useSelector(isLoading)
  const error = useSelector(isError)
  const { subredditName, id, title } = useParams()
  const post = useSelector(selectPostInfo)

  useEffect(() => {
    const endpoint = `r/${subredditName}/comments/${id}/${title}/`
    dispatch(fetchComments(endpoint))
  }, [dispatch, id, subredditName, title])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Post post={post} />
          <Comments comments={comments} />
        </>
      )}
    </div>
  )
}

export default FullPostWithComments