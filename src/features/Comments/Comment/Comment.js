import Markdown from "react-markdown"

const Comment = ({ comment }) => {
  return (
    <div>
      <p><b>{comment.data.author}</b></p>
      <Markdown>
        {comment.data.body}
      </Markdown>
    </div>
  )
}

export default Comment