import Markdown from "react-markdown"

const Comment = ({ comment }) => {
  return (
    <div>
      <p>Posted by {comment.data.author}</p>
      <Markdown>
        {comment.data.body}
      </Markdown>
    </div>
  )
}

export default Comment