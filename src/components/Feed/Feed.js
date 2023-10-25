import Subreddit from "../../features/Subreddit/Subreddit/Subreddit"
import FullPostWithComments from "../../features/Comments/FullPostWithComments/FullPostWithComments"

function Feed() {
  return (
    <div>
      <Subreddit />
      <FullPostWithComments />
    </div>
  )
}

export default Feed