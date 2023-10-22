const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.data.title}</h3>
      <p>{post.data.selftext}</p>
    </div>
  )
}

export default Post