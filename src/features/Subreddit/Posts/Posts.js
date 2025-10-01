import PostPreview from '../PostPreview/PostPreview';
import { Box } from '@mui/material';

const Posts = ({ posts, isSearchResults = false }) => {
  return (
    <Box>
      {posts.map((post) => (
        <PostPreview key={post.data.id} post={post} isSearchResults={isSearchResults} />
      ))}
    </Box>
  );
};

export default Posts;