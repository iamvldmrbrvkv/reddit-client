import Markdown from "react-markdown"

const Post = ({ post }) => {
  return (
    <div>
      <p>Posted by {post.data.author_fullname}</p>
      <h3>{post.data.title}</h3>
      <Markdown>
        {post.data.selftext}
      </Markdown>
      <button>-</button> {post.data.score} <button>+</button>
      <br />
      <span>Comments {post.data.num_comments}</span>
    </div>
  )
}

export default Post