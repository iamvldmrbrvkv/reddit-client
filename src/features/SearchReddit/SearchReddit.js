import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Posts from '../Subreddit/Posts/Posts';
import redditAPI from '../../services/redditAPI';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';

const SearchReddit = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get('q');
  const [redditData, setRedditData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSearchResults = async () => {
      if (!params) return;

      setLoading(true);
      setError(null);

      try {
        const searchResults = await redditAPI.searchReddit(params);
        setRedditData(searchResults.data.children);
      } catch (err) {
        setError(`${err.name}: ${err.message}`);
        setRedditData(null);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [params]);

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', md: '740px', lg: '800px' },
        mx: 'auto',
        width: '100%',
      }}
    >
      {/* Search header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          bgcolor: 'background.paper',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SearchIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 700,
            }}
          >
            Search Results
          </Typography>
          {params && (
            <Typography variant="body2" color="text.secondary">
              Showing results for "{params}"
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Content */}
      {loading ? (
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
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : !redditData ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Enter a search term
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use the search bar above to find posts on Reddit
          </Typography>
        </Paper>
      ) : redditData.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography
            variant="h3"
            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
          >
            Hm... we couldn't find any results for "{params}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Double-check your spelling or try different keywords to adjust your search
          </Typography>
        </Paper>
      ) : (
        <Posts posts={redditData} isSearchResults={true} />
      )}
    </Box>
  );
};

export default SearchReddit;