// Reddit API service for official OAuth authentication
class RedditAPI {
  constructor() {
    this.accessToken = null
    this.tokenExpiry = null
    this.baseURL = 'https://oauth.reddit.com'
  }

  // Get application-only OAuth token
  async getAccessToken() {
    // Check if we already have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      // Получаем access_token через Netlify serverless function
      const response = await fetch('/.netlify/functions/reddit-token')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      this.accessToken = data.access_token
      // Set expiry time (subtract 60 seconds for buffer)
      this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
      return this.accessToken
    } catch (error) {
      console.error('Failed to get access token:', error)
      throw error
    }
  }

  // Generic method to make authenticated requests
  async makeAuthenticatedRequest(endpoint, options = {}) {
    try {
      const token = await this.getAccessToken()
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `bearer ${token}`,
          'User-Agent': this.userAgent,
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

  // Get subreddit posts
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

  // Get post comments
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

  // Search Reddit
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

// Create and export a singleton instance
const redditAPI = new RedditAPI()
export default redditAPI