/**
 * RedditAPI service for official OAuth authentication and data access.
 * Handles token management and all requests to the Reddit API via a secure backend.
 * @class
 */
class RedditAPI {
  /**
   * Initializes the RedditAPI instance.
   * @constructor
   */
  constructor() {
    /**
     * The current OAuth access token.
     * @type {string|null}
     */
    this.accessToken = null
    /**
     * The timestamp (in ms) when the token expires.
     * @type {number|null}
     */
    this.tokenExpiry = null
    /**
     * The base URL for Reddit OAuth API requests.
     * @type {string}
     */
    this.baseURL = 'https://oauth.reddit.com'
  }

  /**
   * Retrieves a valid OAuth access token, refreshing if necessary.
   * Uses a Netlify serverless function to securely obtain the token.
   * @returns {Promise<string>} The access token string.
   * @throws {Error} If the token cannot be obtained.
   */
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }
    try {
      const response = await fetch('/.netlify/functions/reddit-token')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      this.accessToken = data.access_token
      /**
       * Set expiry time (subtract 60 seconds for buffer to avoid using an expired token).
       * @type {number}
       */
      this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
      return this.accessToken
    } catch (error) {
      console.error('Failed to get access token:', error)
      throw error
    }
  }

  /**
   * Makes an authenticated request to the Reddit API.
   * @param {string} endpoint - The API endpoint (should start with '/').
   * @param {Object} [options={}] - Fetch options (method, headers, etc).
   * @returns {Promise<Object>} The parsed JSON response.
   * @throws {Error} If the request fails or returns a non-OK status.
   */
  async makeAuthenticatedRequest(endpoint, options = {}) {
    try {
      const token = await this.getAccessToken()
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `bearer ${token}`,
          ...options.headers
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  /**
   * Fetches posts from a subreddit.
   * @param {string} [subreddit='reddit'] - The subreddit name.
   * @param {Object} [options={}] - Options: limit, after, before.
   * @param {number} [options.limit=25] - Number of posts to fetch.
   * @param {string|null} [options.after=null] - Fetch posts after this ID.
   * @param {string|null} [options.before=null] - Fetch posts before this ID.
   * @returns {Promise<Object>} The subreddit posts data.
   */
  async getSubredditPosts(subreddit = 'reddit', options = {}) {
    const { limit = 25, after = null, before = null } = options
    let endpoint = `/r/${subreddit}`
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit)
    if (after) params.append('after', after)
    if (before) params.append('before', before)
    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }
    return await this.makeAuthenticatedRequest(endpoint)
  }

  /**
   * Fetches comments for a specific post.
   * @param {string} subreddit - The subreddit name.
   * @param {string} postId - The post ID.
   * @param {Object} [options={}] - Options: limit, sort.
   * @param {number} [options.limit=25] - Number of comments to fetch.
   * @param {string} [options.sort='confidence'] - Sort order for comments.
   * @returns {Promise<Object>} The post comments data.
   */
  async getPostComments(subreddit, postId, options = {}) {
    const { limit = 25, sort = 'confidence' } = options
    let endpoint = `/r/${subreddit}/comments/${postId}`
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit)
    if (sort) params.append('sort', sort)
    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }
    return await this.makeAuthenticatedRequest(endpoint)
  }

  /**
   * Searches Reddit posts or subreddits.
   * @param {string} query - The search query string.
   * @param {Object} [options={}] - Options: limit, sort, time, subreddit.
   * @param {number} [options.limit=25] - Number of results to fetch.
   * @param {string} [options.sort='relevance'] - Sort order for results.
   * @param {string} [options.time='all'] - Time filter for results.
   * @param {string|null} [options.subreddit=null] - Subreddit to restrict search to.
   * @returns {Promise<Object>} The search results data.
   */
  async searchReddit(query, options = {}) {
    const { 
      limit = 25, 
      sort = 'relevance', 
      time = 'all',
      subreddit = null 
    } = options
    let endpoint = subreddit ? `/r/${subreddit}/search` : '/search'
    const params = new URLSearchParams()
    params.append('q', query)
    if (limit) params.append('limit', limit)
    if (sort) params.append('sort', sort)
    if (time) params.append('t', time)
    if (subreddit) params.append('restrict_sr', 'true')
    endpoint += `?${params.toString()}`
    return await this.makeAuthenticatedRequest(endpoint)
  }
}

/**
 * Singleton instance of RedditAPI for use throughout the app.
 * @type {RedditAPI}
 */
const redditAPI = new RedditAPI()
export default redditAPI