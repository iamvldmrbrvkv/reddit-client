
# Migration to Official Reddit API

## What Changed

### 1. Authentication
The app now uses the official Reddit OAuth API instead of unofficial JSON endpoints.

**Authentication type**: Application-Only OAuth (does not require user login)
- Suitable for displaying posts without user authentication
- Uses Client Credentials Grant Flow

### 2. Project Structure

#### New files:
- `src/services/redditAPI.js` - Service for working with the official Reddit API
- `netlify/functions/reddit-token.js` - Serverless function for secure token retrieval

#### Updated files:
- `src/features/Subreddit/subredditSlice.js` - Updated to use the API service
- `src/features/Comments/commentsSlice.js` - Updated to use the API service
- `src/features/SearchReddit/SearchReddit.js` - Updated to use the API service
- `src/features/Comments/FullPostWithComments/FullPostWithComments.js` - Simplified interface

#### Removed files:
- `.env` and `.env.example` - Environment variables moved to Netlify

## Setup

### 1. Register a Reddit App
1. Go to https://www.reddit.com/prefs/apps
2. Click "are you a developer? create an app..."
3. Choose "web app" type
4. Fill in the required fields
5. Get your Client ID and Client Secret

### 2. Configure Netlify Serverless Functions
1. Place `netlify/functions/reddit-token.js` in your project
2. In the Netlify dashboard, add environment variables:
   ```
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_CLIENT_SECRET=your_client_secret
   REDDIT_USER_AGENT=web:your-app-name:v1.0.0 (by /u/yourusername)
   ```
3. Mark them as "Secret" for security
4. Deploy the project to Netlify

## Benefits of the Official API

### 1. Reliability
- Officially supported endpoints
- Stable response structure
- Less risk of sudden changes

### 2. Performance
- Authenticated requests have higher rate limits
- 100 requests per minute (compared to heavily limited anonymous access)

### 3. Functionality
- Access to additional endpoints
- Better error handling
- Official documentation

### 4. Compliance
- Follows Reddit Terms of Service
- Proper app identification via User-Agent
- API usage tracking

## Rate Limits

The official API has the following limits:
- **100 requests per minute** for authenticated apps
- Limits are averaged over a 10-minute window to support burst traffic
- Monitor via response headers:
  - `X-Ratelimit-Used`: Requests used
  - `X-Ratelimit-Remaining`: Requests remaining
  - `X-Ratelimit-Reset`: Time until reset

## API Endpoints

### Fetching Subreddit Posts
```javascript
await redditAPI.getSubredditPosts('javascript', { limit: 25 })
```

### Fetching Post Comments
```javascript
await redditAPI.getPostComments('javascript', 'abc123', { limit: 50 })
```

### Searching Reddit
```javascript
await redditAPI.searchReddit('react hooks', {
  limit: 25,
  sort: 'relevance',
  time: 'all'
})
```

## Security

### Netlify Serverless Functions
- Client Secret is stored only in Netlify environment variables
- Tokens are obtained via the serverless function `/.netlify/functions/reddit-token`
- Secrets are never exposed to client code
- HTTPS secures all requests

### Security Architecture
```
Browser → Netlify Function → Reddit API
                ↑
           (secrets stored here)
```

### User-Agent
- Required by Reddit API
- Must include app name and developer contact
- Format: `<platform>:<app ID>:<version string> (by /u/<reddit username>)`

## Troubleshooting

### Authentication Errors
- Check your Client ID and Client Secret
- Make sure your app is registered as a "web app"
- Check the User-Agent format

### CORS Errors
- Reddit API is properly configured for CORS
- If issues occur, check endpoint URLs

### Rate Limiting
- Monitor response headers for rate limit info
- Implement delays between requests if needed

## Further Improvements

### Possible Additions:
1. **Token caching** - Store tokens in localStorage
2. **Retry mechanism** - Automatic retries on errors
3. **Pagination** - Load next pages of posts
4. **Filtering** - Additional search parameters
5. **User Authentication** - User login for personalized features

### Performance Monitoring:
- Track API rate limit usage
- Cache frequently requested data
- Optimize the number of requests

## Conclusion

Migrating to the official Reddit API makes your app more reliable, performant, and compliant with platform rules. While authentication setup requires extra steps, the benefits far outweigh the complexity.