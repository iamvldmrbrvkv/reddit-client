import { useRef } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search({ fullWidth = false }) {
  const navigate = useNavigate();
  const searchInputRef = useRef();
  
  const performSearch = () => {
    if (searchInputRef.current.value.length > 0) {
      const searchQuery = {
        q: searchInputRef.current.value,
      };
      const query = createSearchParams(searchQuery);
      navigate({
        pathname: 'search/',
        search: `?${query}`,
      });
    }
  };
  
  const onSearchHandler = (e) => {
    e.preventDefault();
    performSearch();
  };

  const onIconClickHandler = () => {
    performSearch();
  };

  return (
    <form onSubmit={onSearchHandler} style={{ width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        inputRef={searchInputRef}
        type="search"
        placeholder="Search Reddit"
        size="small"
        variant="outlined"
        fullWidth={fullWidth}
        sx={{
          minWidth: fullWidth ? 'unset' : { xs: '150px', sm: '250px', md: '300px', lg: '536px' },
          '& .MuiOutlinedInput-root': {
            paddingLeft: '4px',
          },
          '& .MuiInputBase-input': {
            fontSize: { xs: '16px', sm: '14px' }, // 16px on mobile to avoid auto-zoom in iOS
          },
          '& .MuiInputBase-input::placeholder': {
            fontSize: { xs: '16px', sm: '14px' }, // Placeholder must also be 16px
          },
          // Styles for browser autofill
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: (theme) => `0 0 0 100px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: (theme) => theme.palette.text.primary,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={onIconClickHandler}
                size="small"
                edge="start"
                sx={{ 
                  ml: 0.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
                aria-label="search"
              >
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{
          enterKeyHint: 'search',
        }}
      />
    </form>
  );
}

export default Search;