import { useMemo } from 'react';
import Markdown from 'react-markdown';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';

const Post = ({ post }) => {
  const formatScore = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score;
  };

  // Memoize video URLs to prevent unnecessary re-renders
  const videoUrls = useMemo(() => ({
    dashUrl: post.data.media?.reddit_video?.dash_url,
    hlsUrl: post.data.media?.reddit_video?.hls_url,
    fallbackUrl: post.data.media?.reddit_video?.fallback_url,
  }), [post.data.media?.reddit_video?.dash_url, post.data.media?.reddit_video?.hls_url, post.data.media?.reddit_video?.fallback_url]);

  return (
    <Card
      sx={{
        mb: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
          {/* Post header */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<PersonIcon />}
              label={`u/${post.data.author}`}
              size="small"
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              in r/{post.data.subreddit}
            </Typography>
          </Box>

          {/* Post title */}
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 600,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
            {post.data.title}
          </Typography>

          {/* Post content */}
          {post.data.selftext && (
            <Box
              sx={{
                mb: 2,
                '& p': { mb: 1, wordBreak: 'break-word', overflowWrap: 'break-word' },
                '& a': { color: 'secondary.main', wordBreak: 'break-word' },
                fontSize: '0.95rem',
                lineHeight: 1.6,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              <Markdown>{post.data.selftext}</Markdown>
            </Box>
          )}

          {/* Media */}
          {post.data.is_video === true ? (
            <Box
              sx={{
                width: '100%',
                bgcolor: 'black',
                borderRadius: 1,
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <VideoPlayer
                key={post.data.id}
                dashUrl={videoUrls.dashUrl}
                hlsUrl={videoUrls.hlsUrl}
                fallbackUrl={videoUrls.fallbackUrl}
                maxHeight="600px"
                autoPlay={true}
                muted={true}
              />
            </Box>
          ) : (() => {
            // Attempt to get image from different sources
            let imageUrl = null;
            
            // Priority 1: Gallery post - get first image from gallery
            if (post.data.is_gallery && post.data.media_metadata) {
              const firstImageId = post.data.gallery_data?.items?.[0]?.media_id;
              if (firstImageId && post.data.media_metadata[firstImageId]) {
                const mediaItem = post.data.media_metadata[firstImageId];
                // Get highest resolution
                if (mediaItem.s?.u) {
                  imageUrl = mediaItem.s.u.replace(/&amp;/g, '&');
                } else if (mediaItem.s?.gif) {
                  imageUrl = mediaItem.s.gif.replace(/&amp;/g, '&');
                }
              }
            }
            // Priority 2: Direct link to Reddit image (original)
            else if (post.data.url &&
                (post.data.url.endsWith('.jpg') ||
                 post.data.url.endsWith('.jpeg') ||
                 post.data.url.endsWith('.png') ||
                 post.data.url.endsWith('.gif') ||
                 post.data.url.includes('i.redd.it') ||
                 post.data.url.includes('preview.redd.it'))) {
              imageUrl = post.data.url;
            }
            // Priority 3: preview source (high quality)
            else if (post.data.preview?.images?.[0]?.source?.url) {
              imageUrl = post.data.preview.images[0].source.url.replace(/&amp;/g, '&');
            }
            // Priority 4: preview resolutions (highest resolution)
            else if (post.data.preview?.images?.[0]?.resolutions?.length > 0) {
              const resolutions = post.data.preview.images[0].resolutions;
              const highestRes = resolutions[resolutions.length - 1];
              imageUrl = highestRes.url.replace(/&amp;/g, '&');
            }

            if (!imageUrl) {
              return null;
            }

            return (
              <Box
                sx={{
                  width: '100%',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#f8f9fa',
                  borderRadius: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  src={imageUrl}
                  alt={post.data.title}
                  loading="lazy"
                  sx={{
                    maxHeight: { xs: '300px', sm: '500px', md: '600px' },
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Box>
            );
          })()}

          {/* Original Reddit Post Link */}
          {post.data.url && (
            <Box
              sx={{
                width: '100%',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1b' : '#f6f7f8',
                borderRadius: 1,
                p: 2,
                mb: 2,
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? '#343536' : '#edeff1',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Original Post:
              </Typography>
              <Typography
                component="a"
                href={post.data.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'secondary.main',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  wordBreak: 'break-all',
                  overflowWrap: 'anywhere',
                  display: 'block',
                }}
              >
                {post.data.url}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Post footer with votes */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Vote section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#161617' : 'grey.100',
                borderRadius: '20px',
                px: 1,
                py: 0.5,
              }}
            >
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.5,
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
                fontWeight="bold"
                sx={{ fontSize: '12px', minWidth: '30px', textAlign: 'center' }}
              >
                {formatScore(post.data.score)}
              </Typography>
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.5,
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

            {/* Comments */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#161617' : 'grey.100',
                borderRadius: '20px',
                px: 1,
                py: 0.5,
                minHeight: '36px',
              }}
            >
              <ChatBubbleOutlineIcon fontSize="small" color="action" />
              <Typography 
                variant="body2" 
                fontWeight="bold"
                sx={{ 
                  fontSize: '0.875rem',
                  color: 'text.primary',
                }}
              >
                {post.data.num_comments}
              </Typography>
            </Box>
          </Box>
        </CardContent>
    </Card>
  );
};

export default Post;