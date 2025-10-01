import { useDispatch, useSelector } from 'react-redux';
import {
  selectSubredditData,
  selectCommentsData,
  fetchComments,
  selectLoading,
  selectError,
} from '../commentsSlice';
import { useEffect } from 'react';
import Comments from '../Comments/Comments';
import Post from '../../Subreddit/Post/Post';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Divider } from '@mui/material';

const FullPostWithComments = () => {
  const dispatch = useDispatch();
  const subredditData = useSelector(selectSubredditData);
  const commentsData = useSelector(selectCommentsData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { subreddit, id } = useParams();

  useEffect(() => {
    dispatch(fetchComments({ subreddit, postId: id }));
  }, [dispatch, id, subreddit]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', md: '740px', lg: '800px' },
        mx: 'auto',
        width: '100%',
      }}
    >
      {subredditData && (
        <>
          <Post post={subredditData} />
          
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 600,
                mb: 1,
              }}
            >
              Comments ({commentsData.length})
            </Typography>
            <Divider />
          </Box>
          
          <Comments comments={commentsData} />
        </>
      )}
    </Box>
  );
};

export default FullPostWithComments;