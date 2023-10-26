import Comment from "../Comment/Comment"

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.data.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments