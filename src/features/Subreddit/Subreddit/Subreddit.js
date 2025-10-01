import { useDispatch, useSelector } from 'react-redux';
import {
  selectSubredditInfo,
  selectSubredditData,
  fetchSubreddit,
  selectLoading,
  selectError,
} from '../subredditSlice';
import { useEffect } from 'react';
import Posts from '../Posts/Posts';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const Subreddit = () => {
  const dispatch = useDispatch();
  const subredditInfo = useSelector(selectSubredditInfo);
  const subredditData = useSelector(selectSubredditData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { subreddit } = useParams();
  const reddit = 'reddit';

  useEffect(() => {
    !subreddit ? dispatch(fetchSubreddit(reddit)) : dispatch(fetchSubreddit(subreddit));
  }, [dispatch, subreddit]);

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
      {subredditInfo && (
        <>
          {/* Subreddit header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {subredditInfo.data.subreddit}
                </Typography>
                <Chip
                  label={subredditInfo.data.subreddit_name_prefixed}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              {subredditInfo.data.subscribers && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {subredditInfo.data.subscribers.toLocaleString()} members
                  </Typography>
                </Box>
              )}
            </Box>
            {subredditInfo.data.public_description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {subredditInfo.data.public_description}
              </Typography>
            )}
          </Paper>

          {/* Posts */}
          <Posts posts={subredditData} />
        </>
      )}
    </Box>
  );
};

export default Subreddit;