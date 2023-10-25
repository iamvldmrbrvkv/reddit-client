import { useDispatch, useSelector } from "react-redux";
import { selectComments, fetchComments, isLoading, isError } from "../commentsSlice";
import { useEffect } from "react";
import Comments from "../Comments/Comments";

const FullPostWithComments = () => {
  const dispatch = useDispatch()
  const comments = useSelector(selectComments)
  const loading = useSelector(isLoading)
  const error = useSelector(isError)

  useEffect(() => {
    const endpoint = 'comments/sphocx/test_post_please_ignore/'
    dispatch(fetchComments(endpoint))
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Comments comments={comments.comments} />
        </>
      )}
    </div>
  )
}

export default FullPostWithComments