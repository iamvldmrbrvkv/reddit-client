import Markdown from "react-markdown"

const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.data.title}</h3>
      <Markdown>
        {post.data.selftext}
      </Markdown>
    </div>
  )
}

export default Post