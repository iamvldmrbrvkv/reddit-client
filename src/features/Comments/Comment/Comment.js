import Markdown from 'react-markdown';
import { Box, Paper, Typography, IconButton, Divider } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Comment = ({ comment }) => {
  const formatScore = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 1,
        p: { xs: 1.5, sm: 2 },
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      {/* Comment content */}
      <Box>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ mb: 0.5, color: 'text.primary' }}
        >
          u/{comment.data.author}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Box
          sx={{
            '& p': { 
              mb: 1, 
              fontSize: '0.875rem', 
              lineHeight: 1.5,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            },
            '& p:last-child': { mb: 0 },
            '& a': { 
              color: 'secondary.main', 
              textDecoration: 'underline',
              wordBreak: 'break-all',
              overflowWrap: 'anywhere',
            },
            '& code': {
              bgcolor: 'grey.100',
              p: 0.5,
              borderRadius: 0.5,
              fontSize: '0.85em',
            },
          }}
        >
          <Markdown>{comment.data.body}</Markdown>
        </Box>
      </Box>

      {/* Footer with vote section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 1,
          gap: 1,
        }}
      >
        {/* Vote section without background */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <IconButton 
            size="small" 
            sx={{ 
              p: 0.25,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#272729' : 'grey.200',
              }
            }}
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          <Typography 
            variant="body2"
            sx={{ 
              fontSize: '12px',
              color: 'text.primary',
              minWidth: '20px',
              textAlign: 'center',
            }}
          >
            {comment.data.score ? formatScore(comment.data.score) : 0}
          </Typography>
          <IconButton 
            size="small" 
            sx={{ 
              p: 0.25,
              color: 'text.secondary',
              '&:hover': {
                color: 'secondary.main',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#272729' : 'grey.200',
              }
            }}
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;