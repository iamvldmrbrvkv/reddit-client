import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const PostPreview = ({ post, isSearchResults = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (post.data.is_video && post.data.media?.reddit_video?.hls_url && videoRef.current && !isSearchResults) {
      const video = videoRef.current;
      const hlsUrl = post.data.media.reddit_video.hls_url;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl;
      } 
      else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error('HLS fatal error:', data);
            if (post.data.media.reddit_video.fallback_url) {
              video.src = post.data.media.reddit_video.fallback_url;
            }
          }
        });

        return () => {
          hls.destroy();
        };
      }
    }
  }, [post.data.is_video, post.data.media, isSearchResults]);

  const getTitle = () => {
    let permalink = post.data.permalink.split('/').filter((item) => item !== '');
    return permalink[4];
  };

  const title = getTitle();
  const postLink = `/r/${post.data.subreddit}/comments/${post.data.id}/${title}/`;

  const formatScore = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score;
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: 'flex',
        '&:hover': {
          borderColor: 'grey.400',
        },
      }}
    >
      {/* Content section */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, minWidth: 0 }}>
        <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
          {/* Post header */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              r/{post.data.subreddit} • Posted by u/{post.data.author}
            </Typography>
          </Box>

          {/* Post title */}
          <Link
            component={RouterLink}
            to={postLink}
            underline="none"
            color="text.primary"
            sx={{
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 500,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
              }}
            >
              {post.data.title}
            </Typography>
          </Link>

          {/* Post preview text */}
          {post.data.selftext && post.data.selftext.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {post.data.selftext}
            </Typography>
          )}

          {/* Media - only for non-search results */}
          {post.data.is_video === true && !isSearchResults ? (
            <Box
              sx={{
                width: '100%',
                bgcolor: 'black',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: post.data.media?.reddit_video?.width && post.data.media?.reddit_video?.height
                  ? `${post.data.media.reddit_video.width} / ${post.data.media.reddit_video.height}`
                  : '16 / 9',
                maxHeight: '472px',
              }}
            >
              <video 
                ref={videoRef}
                controls 
                autoPlay 
                muted 
                playsInline
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'block',
                  objectFit: 'contain' 
                }}
              />
            </Box>
          ) : !isSearchResults && (() => {
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

            return imageUrl ? (
              <Box
                sx={{
                  width: '100%',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#f8f9fa',
                  borderRadius: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  component="img"
                  src={imageUrl}
                  alt={post.data.title}
                  loading="lazy"
                  sx={{
                    maxHeight: { xs: '250px', sm: '400px', md: '500px' },
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Box>
            ) : null;
          })()}

          <Divider sx={{ my: 1.5 }} />

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
            <Link
              component={RouterLink}
              to={postLink}
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#161617' : 'grey.100',
                borderRadius: '20px',
                px: 1,
                py: 0.5,
                minHeight: '36px',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#272729' : 'grey.200',
                },
              }}
            >
              <ChatBubbleOutlineIcon fontSize="small" />
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
            </Link>
          </Box>
        </CardContent>

        {/* Thumbnail on the right for videos in search results */}
        {isSearchResults && post.data.is_video === true && (() => {
          // Get the best preview image
          const previewUrl = post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&');
          const thumbnailUrl = post.data.thumbnail !== 'default' && 
                              post.data.thumbnail !== 'self' && 
                              post.data.thumbnail !== 'nsfw' &&
                              post.data.thumbnail?.startsWith('http') 
                                ? post.data.thumbnail 
                                : null;
          const imageUrl = previewUrl || thumbnailUrl;

          return imageUrl ? (
            <Box
              sx={{
                width: { xs: '96px', sm: '140px' },
                height: { xs: '72px', sm: '105px' },
                flexShrink: 0,
                mr: 2,
                my: 2,
                bgcolor: 'black',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                image={imageUrl}
                alt={post.data.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ) : null;
        })()}

        {/* Thumbnail on the right for regular images in search results */}
        {isSearchResults && !post.data.is_video && (() => {
          // Get preview image
          const previewUrl = post.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&');
          const thumbnailUrl = post.data.thumbnail !== 'default' && 
                              post.data.thumbnail !== 'self' && 
                              post.data.thumbnail !== 'nsfw' &&
                              post.data.thumbnail?.startsWith('http') 
                                ? post.data.thumbnail 
                                : null;
          const imageUrl = previewUrl || thumbnailUrl;

          return imageUrl ? (
            <Box
              sx={{
                width: { xs: '96px', sm: '140px' },
                height: { xs: '72px', sm: '105px' },
                flexShrink: 0,
                mr: 2,
                my: 2,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1b' : '#f6f7f8',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                image={imageUrl}
                alt={post.data.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ) : null;
        })()}
      </Box>
    </Card>
  );
};

export default PostPreview;