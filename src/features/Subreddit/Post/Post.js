import Markdown from "react-markdown"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  const getTitle = () => {
    let permalink = post.data.permalink.split("/").filter(item => item !== "")
    return permalink[4]
  }

  const title = getTitle()
  
  return (
    <div>
      <p>Posted by {post.data.author}</p>
      <h3><Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.title}</Link></h3>
      <Markdown>
        {post.data.selftext}
      </Markdown>
      <span>Post score {post.data.score}</span> | <span><Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.num_comments} Comments</Link></span>
    </div>
  )
}

export default Post