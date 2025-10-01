import Comment from '../Comment/Comment';
import { Box } from '@mui/material';

const Comments = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.map((comment) => (
        <Comment key={comment.data.id} comment={comment} />
      ))}
    </Box>
  );
};

export default Comments;