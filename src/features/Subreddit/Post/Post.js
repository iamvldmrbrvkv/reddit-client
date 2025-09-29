import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import styles from './Post.module.css'

const Post = ({ post }) => {
  const getTitle = () => {
    let permalink = post.data.permalink.split("/").filter(item => item !== "")
    return permalink[4]
  }

  const title = getTitle()
  
  return (
    <div>
      <p>Posted by <b>{post.data.author}</b></p>
      <h3><Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.title}</Link></h3>
      <Markdown>
        {post.data.selftext}
      </Markdown>
      {post.data.is_video === true ? (
        <video src={post.data.media.reddit_video.fallback_url} controls autoPlay muted playsInline className={styles.video}/>
      ) : (
        <img src={post.data.url} alt="" className={styles.img}/>
      )}
      <br />
      <span>Post score <b>{post.data.score}</b></span> | <Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.num_comments} Comments</Link>
    </div>
  )
}

export default Post