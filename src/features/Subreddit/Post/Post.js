import Markdown from "react-markdown"

const Post = ({ post }) => {
  return (
    <div>
      <p>Posted by {post.data.author_fullname}</p>
      <h3>{post.data.title}</h3>
      <Markdown>
        {post.data.selftext}
      </Markdown>
      <span>Post score {post.data.score}</span>
      <br />
      <span>{post.data.num_comments} Comments</span>
    </div>
  )
}

export default Post