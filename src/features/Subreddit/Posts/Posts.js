import PostPreview from "../PostPreview/PostPreview"

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <PostPreview key={post.data.id} post={post} />
      ))}
    </div>
  )
}

export default Posts