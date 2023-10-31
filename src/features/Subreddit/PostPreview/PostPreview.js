import { Link } from "react-router-dom"
import styles from './PostPreview.module.css'

const PostPreview = ({ post }) => {
  const getTitle = () => {
    let permalink = post.data.permalink.split("/").filter(item => item !== "")
    return permalink[4]
  }

  const title = getTitle()

  return (
    <div>
      <h3><Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.title}</Link></h3>
      {post.data.is_video === true ? (
        <video src={post.data.media.reddit_video.fallback_url} controls autostart autoPlay muted playsInline className={styles.video}/>
      ) : (
        <img src={post.data.url} alt="" className={styles.img}/>
      )}
      <br />
      <span>Post score <b>{post.data.score}</b></span> | <Link to={`/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`}>{post.data.num_comments} Comments</Link>
    </div>
  )
}

export default PostPreview